class RequestError extends Error {
	constructor(message, response, code) {
		super(message);
		this.message = message;
		this.response = response;
		this.code = code;
		this.name = this.constructor.name;
	}
}
