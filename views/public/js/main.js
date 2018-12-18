require('./utils/polyfills');
const Renderer = require('./renderer/renderer');
const Fetcher = require('./fetcher/fetcher');

const fetcher = new Fetcher(Config.api_endpoint, Config.api_key);

const init = async () => {
	loop();
};

const loop = async () => {
	// fetch
	let perfs = await fetcher.get('/api/perfs');

	// render
	Renderer.render(perfs);

	setTimeout(loop, 10000);
};

window.addEventListener('load', init);
