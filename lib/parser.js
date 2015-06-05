var Q = require('q'),
	XmlStream = require('xml-stream'),
	assign = require('object-assign'),
	defaultJSON = require('./default');

module.exports = function(stream) {
	var deferred = Q.defer();
	var xml = new XmlStream(stream);

	var log = defaultJSON;
	var mapping = {};

	xml.on('startElement: log', function(item) {
		assign(log, item.$);
	});

	xml.on('endElement: nameWell', function(item) {
		log.nameWell = item.$text;
	});

	xml.on('endElement: nameWellbore', function(item) {
		log.nameWellbore = item.$text;
	});

	xml.on('endElement: nameLog', function(item) {
		log.nameLog = item.$text;
	});

	xml.on('endElement: commonData', function(item) {
		assign(log.commonData, item);
	});

	xml.on('endElement: logHeader', function(item) {
		log.logHeader = {
			serviceCompany: item.serviceCompany,
			runNumber: item.runNumber,
			creationDate: item.creationDate,
			indexType: item.indexType,
			startIndex: item.startIndex,
			endIndex: item.endIndex,
			direction: item.direction,
			indexCurve: item.indexCurve,
			stepIncrement: item.stepIncrement,
			indexUnits: item.indexUnits,
			nullValue: item.nullValue,
			uomNamingSystem: item.uomNamingSystem
		};
	});

	xml.on('endElement: logHeader > logCurveInfo', function(item) {
		var index = item.columnIndex - 1;
		var mnemonic = item.mnemonic;
		var entry = { data: [] };

		mapping[index] = log.logData[mnemonic] = assign(entry, item);

		if(entry.nullValue) {
			entry.nullValue = parseFloat(entry.nullValue);
		}
	});

	xml.on('endElement: logData > data', function(item) {
		item.$text.split(',').map(function(token) {
			return parseFloat(token);
		}).forEach(function(value, index) {
			var entry = mapping[index];

			if(value === entry.nullValue) {
				entry.data.push(null);
			} else {
				entry.data.push(value);
			}
		});
	});

	xml.on('end', function() {
		deferred.resolve(log);
	});

	return deferred.promise;
};