function querystring(query, interrogation = false) {
	let str = Object.entries(query).map(([key, value]) => `${key}=${value}`).join('&');
	return str ? (interrogation ? `?${str}` : str) : '';
}

class Fetcher {
	constructor(endpoint, key) {
		this.endpoint = endpoint;
		this.key = key;
	}

	request({ endpoint, path, headers = {}, query = {} , data, method = 'GET'}) {
		const url = endpoint ? endpoint : this.endpoint + path + querystring(query, true);
		let params = { method, headers };

		if(['POST', 'PUT'].indexOf(method) > -1) {
			params.headers['Content-Type'] = 'application/json';
			params.body = JSON.stringify(data);
		}

		params.headers['Authorization'] = this.key;

		return fetch(url, params).then(res => res.json());
	}

	get(path, params = {}) {
		params.path = path;
		return this.request(params);
	}
}

module.exports = Fetcher;
