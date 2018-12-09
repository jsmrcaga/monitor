const expect = require('chai').expect;
const perfs = require('../utils/perfs');

describe('Performance tests', () => {

	it('Should return uptime value', done => {
		perfs.uptime().then(uptime => {
			expect(isNaN(uptime)).to.be.eql(false);
			expect(uptime).to.be.gt(0);
			done();
			
		}).catch(e => {
			done(e);
		});
	});

});
