const https = require('https');
const fs = require('fs');
const d3 = require('d3');

https
    .get('https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/renderer-specific/adtimelines.csv', (resp) => {
        let csv = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            csv += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            const json = d3.csv.parse(csv);
            fs.writeFileSync('./test/adtimelines.json', JSON.stringify(json, null, 4), 'utf8');
        });
    })
    .on('error', (err) => {
        console.log('Error: ' + err.message);
    });
