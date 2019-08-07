//require('@babel/register');
require('babel-register');
const fs = require('fs');
const pkg = require('../package');
const schema = require('../settings-schema');
const data = require('../test/adtimelines.json');

//Create markdown array, one item per line.
const markdown = [
    schema['data-guidelines'],
    '',
    '## Data structure',
    schema['data-structure'],
    '',
    '## Data specification',
    'required and optional variables:',
    '',
    '| Setting | Default | Data Type | Description | Required? |',
    '|:--------|:--------|:----------|:------------|:---------:|',
];

//Add variable table to markdown array.
const properties = schema.properties;
const settings = Object.keys(properties);
const dataMappings = settings
    .filter(setting => properties[setting]['data-mapping'])
    .map(setting => {
        const property = properties[setting];
        property.setting = setting;

        return property;
    });
dataMappings.forEach(variable => {
    if (['string', 'number'].indexOf(variable.type) > -1)
        markdown.push(
            `|\`${
                variable.setting}\`|${
                    variable.default ? `_${variable.default}_` : ''
                }|**${
                variable['data-type']}**|${
                variable.description.replace(/name of variable that (captures )?/, '')}|${
                variable.required ? '**Yes**' : ''
            }|`
        );
    else if (variable.type === 'array') {
        if (variable.defaults)
            variable.defaults.forEach((item,i) => {
                markdown.push(
                    `|\`${
                        variable.setting}[${i}]\`|_${
                        item}_|**${
                        variable['data-type']}**|${
                        variable.descriptions[item]}|${
                        variable.required ? '**Yes**' : ''
                    }|`
                )
            });
        else
            markdown.push(
                `|\`${
                    variable.setting}[]\`||**${
                    variable['data-type']}**|${
                    variable.description}|${
                    variable.required ? '**Yes**' : ''
                }|`
            );
    } else
        console.warn(`This wiki can't handle ${variable.type}s! Get outta here!`);
});

//Create markdown table with test data.
markdown.push('');
markdown.push('## Example data');
markdown.push('the first few records of the [test dataset](https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/renderer-specific/adtimelines.csv):');
markdown.push('');
const order = dataMappings.map(dataMapping => dataMapping.default);
const variables = Object.keys(data[0])
    .filter(variable => dataMappings.map(dataMapping => dataMapping.default).indexOf(variable) > -1)
    .sort((a,b) => {
        const aPos = dataMappings.map(dataMapping => dataMapping.default).indexOf(a);
        const bPos = dataMappings.map(dataMapping => dataMapping.default).indexOf(b);
        const diff = aPos > -1 && bPos > -1 ? aPos - bPos : 0;
        return diff ? diff : aPos > -1 ? -1 : bPos > -1 ? 1 : 0;
    });
const headers = `| ${variables.join(' | ')} |`;
markdown.push(headers);
const columns = `|:${variables.map(variable => '-'.repeat(variable.length)).join('-|:')}-|`;
markdown.push(columns);
const body = data.slice(0,3)
    .map(d => `|${variables.map(variable => d[variable]).join('|')}|`)
    .forEach(row => markdown.push(row));

/*------------------------------------------------------------------------------------------------\
  Configuration markdown
\------------------------------------------------------------------------------------------------*/

    fs.writeFile(
        './scripts/data-guidelines-wiki.md',
        markdown.join('\n'),
        (err) => {
            if (err)
                console.log(err);
            console.log('The data guidelines wiki markdown file was built!');
        });
