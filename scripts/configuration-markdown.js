var schema = require('../settings-schema'),
    properties = schema.properties,
    markdown = [],
    fs = require('fs');

//Build configuration markdown array.
Object.keys(properties).forEach(property => {
    var setting = properties[property];
    markdown.push(`## settings.${property}`);
    markdown.push(`\`${setting.type}\``);
    markdown.push(``);
    markdown.push(`${setting.description}`);
    markdown.push(``);

  //Primitive types
    if (['object', 'array'].indexOf(setting.type) === -1)
        markdown.push(`**default:** ${
            setting.default
                ? ('`"' + setting.default + '"`')
                : 'none'}`);
  //Arrays
    else if (setting.type === 'array') {
      //of primitive types
        if (setting.type === 'array' && ['object', 'array'].indexOf(setting.items.type) === -1)
            markdown.push(`**default:** ${
                setting.default
                    ? ('`"' + setting.default + '"`')
                    : 'none'}`);
      //of objects
        else if (setting.items.type === 'object') {

            if (setting.default) {
                markdown.push(`**default:**`);
                markdown.push(`\`\`\``);
                markdown.push(`${JSON.stringify(setting.default, null, 2)}`);
                markdown.push(`\`\`\``);
                markdown.push(``);
            } else
                markdown.push(`**default:** none`);

            var subProperties = setting.items.properties;
            Object.keys(subProperties).forEach(subProperty => {
                var subSetting = subProperties[subProperty];
                markdown.push(`### settings.${property}.${subProperty}`);
                markdown.push(`\`${subSetting.type}\``);
                markdown.push(``);
                markdown.push(`${subSetting.title}`);
                markdown.push(``);
            });

            markdown.push(``);
        }
    }

    markdown.push(``);
    markdown.push(``);
    markdown.push(``);
});

fs.writeFile('./configuration.md', markdown.join('\n'), 'utf8');
