var Q = require('q'),
	fs = require('fs'),
	parser = require('./parser');

module.exports = function(filepath) {
	if(filepath) {
		var deferred = Q.defer();

		fs.exists(filepath, function(exists) {
			if(!exists) {
				return deferred.reject('filepath does not exist');
			}

			var result = parser(fs.createReadStream(filepath));

			result.then(function(result) {
				deferred.resolve(result);
			});

			result.catch(function() {

			});
		});

		return deferred.promise;
	}

	return;
};