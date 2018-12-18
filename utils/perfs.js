const os = require('os');
const Process = require('child_process');
const redfox = require('./redfox');
const fishingrod = require('fishingrod');

const perfs = {};

let external_ip = null;

/**
 * Return all different performance values & info
 */
perfs.all = () => {
	let promises = [];

	for(let k in perfs) {
		if(k === 'all') {
			continue;
		}

		try {
			promises.push(perfs[k]());
		} catch(e) {
			redfox.error(`[PERFS][${k}]`, e);
			promises.push(Promise.resolve({
				error: {
					message: e.message
				}
			}));
		}
	}

	return Promise.all(promises).then(result => {
		let ret = {};

		let ctr = 0;
		for(let k in perfs) {
			if(k === 'all') {
				continue;
			}

			ret[k] = result[ctr];
			ctr++;
		}

		return ret;
	});
};

/**
 * Return RAM information using free -b
 */
perfs.ram = () => {
	let ram = Process.execSync('free -b');
	let [, mem, swap] = ram.toString('utf8').split('\n');
	
	// for now only mem, no swap
	let [, total, used, free, shared, buffer, available] = mem.split(' ').filter(m => m);
	
	let usage = (used + free + shared + buffer + available) / total;

	return Promise.resolve({
		total,
		used,
		free,
		shared,
		buffer,
		available,
		usage
	});
};

/**
 * Return CPU from os.cpus()
 */
perfs.cpu = () => {
	let ret = {
		cpus: os.cpus(),
		global: {
			times: {}
		}
	};

	for(let cpu of ret.cpus) {
		let { user, nice, idle, sys, irq } = cpu.times;
		let total = user + nice + sys + irq + idle;
		let percentage = idle / total;

		for(let k in cpu.times) {
			ret.global.times[k] = ret.global[k] ? (ret.global[k] + cpu.times[k]) : cpu.times[k];
		}

		cpu.usage = 1 - percentage;
	}

	let { user, nice, idle, sys, irq } = ret.global.times;
	let globalTotal = user + nice + idle + sys + irq;
	ret.global.usage = 1 - (idle / globalTotal);

	return Promise.resolve(ret);
};

/**
 * Return disk information for first line of df -m
 */
perfs.disk = () => {
	let disk = Process.execSync('df -m');

	// only root for now
	let [, root] = disk.toString('utf8').split('\n');
	let [, blocks, used, available, use, mounted] = root.split(' ').filter(m => m);
	let usage = used / (used + available);

	return Promise.resolve({
		blocks,
		used,
		usage,
		available,
		mounted
	});
};

/**
 * Gets network IP + external IP (from ipify)
 */
perfs.ip = () => {
	let ifaces = os.networkInterfaces();
	let ret = {
		ipv4: null,
		ipv6: null
	};

	for(let iface in ifaces) {
		for(let address of ifaces[iface]) {
			if(address.internal) {
				continue;
			}

			if(address.family === 'IPv4') {
				ret.ipv4 = address;
				continue;
			}

			ret.ipv6 = address;

		}
	}

	if(external_ip) {
		ret['external'] = {
			address: external_ip
		};

		return Promise.resolve(ret);
	}

	return new Promise((resolve, reject) => {
		fishingrod.fish({
			host: 'api.ipify.org',
			path: '/'
		}).then(res => {
			ret['external'] = {
				address: res.response
			};

			external_ip = res.response;

			return resolve(ret);
		}).catch(e => {
			ret['external'] = {
				error: {
					message: e.message
				}
			};

			return resolve(e);
		});
	});
};

/**
 * Gets uptime (os.uptime())
 */
perfs.uptime = () => {
	return Promise.resolve(os.uptime() * 1000);
};

/**
 * Get system info (node version, platform, uname, node_env)
 */
perfs.info = () => {
	return {
		node: process.version,
		platform: process.platform,
		env: process.env.NODE_ENV || 'development',
		uname: Process.execSync('uname -a').toString('utf8'),
		architecture: os.arch(),
		hostname: os.hostname(),
		osrelease: os.release()
	}
};

module.exports = perfs;
