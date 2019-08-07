//require('@babel/register');
require('babel-register');
const fs = require('fs');
const pkg = require('../package');

//settings schema
const schema = require('../settings-schema');
const properties = schema.properties;
const expectedSettings = Object.keys(properties);

//renderer settings
const settings = require('../src/configuration/rendererSettings.js').default();
const actualSettings = Object.keys(settings);

//differences
const missingExpectedSettings = actualSettings
    .filter(setting => expectedSettings.indexOf(setting) < 0);
if (missingExpectedSettings.length > 0) {
    console.log('\x1b[31m%s\x1b[0m', 'These settings are missing from the settings schema:\n');
    console.log('\x1b[31m%s\x1b[0m', `${JSON.stringify(missingExpectedSettings, null, 4)}\n`);
}
const missingActualSettings = expectedSettings
    .filter(setting => actualSettings.indexOf(setting) < 0);
if (missingActualSettings.length > 0) {
    console.log('\x1b[31m%s\x1b[0m', 'These settings are missing from the renderer settings:\n');
    console.log('\x1b[31m%s\x1b[0m', `${JSON.stringify(missingActualSettings, null, 4)}\n`);
}
