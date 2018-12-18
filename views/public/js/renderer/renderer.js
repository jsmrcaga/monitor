const UI  = require('../ui');
const c = UI.createElement;

class Renderer {
	render(perfs) {
		let { ram, cpu, disk, ip, uptime, info } = perfs;
		this.renderInfo(info, ip, uptime);
		this.renderInternals(ram, cpu, disk);
	}

	renderInfo(info, ip, uptime) {
		document.querySelector('.server-title').reset(info.hostname);

		document.querySelector('.uptime').reset(c('div', ['Uptime: ', c('span', [`${uptime / 1000} seconds`])]));

		document.querySelector('#ips').reset(c('div', ['External IP: ', c('span', [ip.external.address])]));

		document.querySelector('.dev-stats').reset([
			c('div', ['Platform: ', c('span', [info.platform])]),
			c('div', ['Environment: ', c('span', [info.env])]),
			c('div', ['Node Version: ', c('span', [info.node])])
		]);
	}

	renderInternals(ram, cpu, disk) {
		if(cpu.cpus.length > 1) {
			let cpusContainer = document.body.querySelector('#cpus');
			let cpu_elements = cpu.cpus.map(ccpu => this.renderCPU(ccpu));
			cpu_elements.forEach((card, index) => {
				card.classList.add('panel');
				card.classList.add(index % 2 ? 'right' : 'left');

			});

			cpusContainer.reset(cpu_elements);

		} else {
			let global_cpu = this.renderCPU(cpu.global, 'cpu global');

			let globalCPUContianer = document.body.querySelector('#global_cpu');
			globalCPUContianer.reset(global_cpu);
		}

		let ram_element = this.renderRAM(ram);
		let ramContainer = document.querySelector('#ram');
		ramContainer.reset(ram_element);

		let disk_element = this.renderDisk(disk);

	}

	renderCPU(cpu, className = 'cpu') {
		// create graph
		let canvas = c('canvas');
		let graph = c('div', { class: className }, [
			canvas
		]);

		const ctx = canvas.getContext('2d');
		const usage = cpu.usage;

		let cpuChart = new Chart(ctx, {
			type: 'doughnut',
			data: {
				datasets: [{
					data: [ usage * 100, (1 - usage) * 100 ],
					backgroundColor: ['rgb(255, 89, 100)', 'rgb(149, 224, 108)']
				}],
				labels: ['CPU Usage', 'CPU Free']
			},
			options: {
				circumference: Math.PI,
				rotation: -1 * Math.PI
			}
		});

		this.renderCPUUsage(ctx, usage, {
			width: canvas.width,
			height: canvas.height
		});

		// create card
		const card = UI.Card(cpu.name || cpu.model || 'Global CPU', graph);
		return card;
	}

	renderCPUUsage(ctx, usage, { width, height }) {
		usage *= 100;
		usage = `${usage.toFixed(2)}%`;

		ctx.font = '30px "Google Sans"';
		ctx.textAlign = 'center';
		ctx.fillText(usage, width / 2, 20);
	}

	renderRAM(ram) {
		let canvas = c('canvas');
		let graph = c('div', [
			canvas
		]);

		const ctx = canvas.getContext('2d');
		const usage = ram.used / ram.total;

		let cpuChart = new Chart(ctx, {
			type: 'doughnut',
			data: {
				datasets: [{
					data: [ usage * 100, (1 - usage) * 100 ],
					backgroundColor: ['rgb(255, 89, 100)', 'rgb(149, 224, 108)']
				}],
				labels: ['RAM Usage', 'RAM Free']
			},
			options: {
				circumference: Math.PI,
				rotation: -1 * Math.PI
			}
		});

		// create card
		const card = UI.Card('Memory (RAM)', graph);
		return card;
	}

	renderDisk(disk) {
		let disk_element = c('div', { class: 'disk-progress' });
		let container = c('div', { class: 'disk-container'});
		let usage = (container.style.width * disk.usage).toFixed(2);
		disk_element.style.width = `${usage}%`;

		container.reset(disk_element);

		let title = c('span', { class: 'disk-title'}, [`Disk (${usage}%)`]);

		let diskContainer = document.querySelector('#disk');
		diskContainer.reset([title, container]);
	}
}

let renderer = new Renderer();

module.exports = renderer;
