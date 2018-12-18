HTMLElement.prototype.clear = function() {
	while(this.firstChild) {
		this.removeChild(this.firstChild);
	}
};

HTMLElement.prototype.reset = function(children = []) {
	this.clear();

	children = children instanceof Array ? children : [children];
	for(let child of children) {
		child = typeof child === 'string' ? document.createTextNode(child) : child;
		this.appendChild(child);
	}
};
