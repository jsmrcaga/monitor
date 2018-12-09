# monitor
A simple & straightforward server/pc monitor;

## Installation
If you haven't yet, install NodeJS and npm (tons of tuts online)

`npm i -g @jsmrcaga/monitor`

(depending on settings, `sudo` might be required)

## Usage
`monitor` will launch a server to monitor and log to the terminal.

To launch monitor without logs, simply use `monitor &`

## API

## GET `/perfs`
Returns all performance information and host general information :

```
{
	// RAM with free -m
	"ram": {
		"total":,
		"used":,
		"free":,
		"shared":,
		"buffer":,
		"available":,
		"usage": <percent>
	},

	// os.cpus()
	"cpu": {
		"cpus": [
			{
				"model": "Intel(R) Core(TM) i5-7360U CPU @ 2.30GHz",
				"speed": 2300,
				"times": {
					"user": 111715970,
					"nice": 0,
					"sys": 113884460,
					"idle": 595231360,
					"irq": 0
				},
				"usage": 0.2748436802137013
			},
			...
		],
		"global": {
			"user": 325727140,
			"nice": 0,
			"sys": 297567490,
			"idle": 2659961710,
			"irq": 0,
			"usage": 0.1898403796275011
		}
	},

	// disk from df -m
	"disk": {
		"blocks": "115411",
		"used": "83387",
		"usage": 0.000009999970972777843,
		"available": "24205",
		"mounted": "2272833"
	},

	// os.networkInterfaces() + ipify.org for external
	"ip": {
		"ipv4": {
			"address": "xxx.xxxx.xx.x",
			"netmask": "255.255.255.0",
			"family": "IPv4",
			"mac": "00:00:00:00:00:00",
			"internal": false,
			"cidr": "xxx.xxx.xx.x/24"
		},
		"ipv6": {
			"address": "yyyy::zzzz:zzzz:zzzz:zzzz",
			"netmask": "ffff:ffff:ffff:ffff::",
			"family": "IPv6",
			"mac": "00:00:00:00:00:00",
			"scopeid": 12,
			"internal": false,
			"cidr": "fe80::db97:b69a:4053:fdcc/64"
		},
		"external": {
			"address": "xxx.xxx.xxx.xxx"
		}
	},

	// os.uptime()
	"uptime": 1918514000,

	// multiple process and os functions
	"info": {
		"node": "v10.12.0",
		"platform": "darwin",
		"env": "development",
		"uname": "Darwin XXXXXXXXXXX 18.2.0 Darwin Kernel Version 18.2.0: Fri Oct  5 19:41:49 PDT 2018;",
		"architecture": "x64",
		"hostname": "your-hostname",
		"osrelease": "18.2.0"
	}
}
```

## GET `/perfs/ram`
Returns all RAM information

## GET `/perfs/cpu`
Returns all CPU information

## GET `/perfs/disk`
Returns all Disk information

## GET `/perfs/info`
Returns all OS information
