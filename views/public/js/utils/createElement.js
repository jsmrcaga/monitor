const createElement = (tag, props, children = []) => {
	let element = document.createElement(tag);

	if(props instanceof Array) {
		children = props;
		props = {};
	}

	if(!(children instanceof Array)) {
		children = [children];
	}

	for(let k in props) {
		element.setAttribute(k, props[k]);
	}

	for(let c of children) {
		if(typeof c === 'string') {
			c = document.createTextNode(c);
		}
		
		element.appendChild(c);
	}

	return element;
};

module.exports = createElement;
