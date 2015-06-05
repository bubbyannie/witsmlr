# witsmlr

## install
```shell
npm install witsmlr
```

## usage
```javascript
var witsmlr = require('witsmlr');

witsmlr('./logs/123.xml')
    .then(function(output) {
        // save the results
    })
    .catch(function(err) {
        // handle the error
    });
```

## sample output
```javascript
{
    nameWell: 'DemoWell2',
    nameWellbore: 'Wellbore3',
    nameLog: 'Lagmud',

    uidWell: 'Well123',
    uidWellbore: '6KFSJ18',
    uidLog: '183KKJH14',
    uidSource: 'Server1',

    logHeader: {
        serviceCompany: 'ServiceCompany',
        runNumber: 10,
        creationDate: '2007-02-16T10:40:55.0000000+01:00',
        indexType: 'Depth',
        startIndex: 2954,
        endIndex: 5841,
        direction: 'Increasing',
        indexCurve: 'Depth',
        stepIncrement: 0,
        indexUnits: 'm',
        uomNamingSystem: 'RP66'
    },

    logData: {
        Depth: {
            unit: 'm',
            startIndex: 2954,
            endIndex: 5481,
            curveDescription: 'The mnemonic of the index curve',
            sensorOffset: 0,
            traceState: 'Raw',
            typeLogData: 'Double',

            data: [2954, 2954, 2959]
        }
    }
}
```

## running tests
```shell
npm install -g gulp

npm install -g mocha

npm install

npm test
```