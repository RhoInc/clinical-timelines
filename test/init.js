import init from './testFunctions/init';
import settingsObjects from './settingsObjects/index';

for (const settingsObject of settingsObjects)
    init(settingsObject);
