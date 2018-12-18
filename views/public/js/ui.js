const c = require('./utils/createElement');
const UI = {};

/**
 * Creates a card for the dashboard
 */
UI.Card = function(title, body) {
	let titleNode = title instanceof Node ? title : document.createTextNode(title);
	return c('div', { class: 'card' }, [
		c('div', { class: 'title' }, [
			c('span', { class: 'title' }, [titleNode])
		]),
		c('div', { class: 'content' }, [
			body
		])
	]);
};

/**
 * Collection of functions to create graphs
 */
UI.graphs = {};

/**
 * Donut Graph
 */
UI.graphs.donut = function(data) {
	// return html element
};

/**
 * Normal chart
 */
UI.graphs.chart = function(data, type = 'line') {

};

UI.createElement = c;


module.exports = UI;
