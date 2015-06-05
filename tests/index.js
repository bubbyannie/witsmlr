var witsmlr = require('../'),
	should = require('should'),
	sinon = require('sinon');

describe('witsmlr', function() {
	it('should be defined', function() {
		witsmlr.should.be.ok;
	});

	it('should be a function', function() {
		witsmlr.should.be.a.Function;
	});

	it('witsmlr(null) should return undefined', function() {
		should(witsmlr()).be.Undefined;
	});

	describe('witsmlr(string) should return a promise', function() {
		var result = witsmlr('sample.xml');

		it('promise should have .then function', function() {
			result.then.should.be.a.Function;
		});

		it('promise should have .catch function', function() {
			result.catch.should.be.a.Function;
		});

		it('promise should have a .finally function', function() {
			result.finally.should.be.a.Function;
		});
	});

	it('witsmlr(invalid filepath) should reject with error', function(done) {
		witsmlr('./samples/fake.xml').catch(function(err) {
			err.should.be.ok;
			done();
		});
	});

	describe('witsmlr(filepath)', function(done) {
		var promise = witsmlr('./tests/samples/Lagmud_183KKJH14.xml')

		it('should resolve with data', function(done) {
			promise.then(function(data) {
				data.should.be.ok;
				done();
			});
		});

		it('should contain uidWell', function(done) {
			promise.then(function(data) {
				data.uidWell.should.be.ok;
				done();
			});
		});

		it('should contain uidWellbore', function(done) {
			promise.then(function(data) {
				data.uidWellbore.should.be.ok;
				done();
			});
		});

		it('should contain uidLog', function(done) {
			promise.then(function(data) {
				data.uidLog.should.be.ok;
				done();
			});
		});

		it('should contain uidSource', function(done) {
			promise.then(function(data) {
				data.uidSource.should.be.ok;
				done();
			});
		});

		describe('logHeader', function() {
			it('should be an object', function(done) {
				promise.then(function(data) {
					data.logHeader.should.be.an.Object;
					done();
				});
			});

			it('should not contain logCurveInfo', function(done) {
				promise.then(function(data) {
					should(data.logHeader.logCurveInfo).not.be.ok;
					done();
				});
			});
		});

		describe('logData', function() {
			it('should be an object', function(done) {
				promise.then(function(data) {
					data.logData.should.be.ok;
					done();
				});
			});
		});
	});
});