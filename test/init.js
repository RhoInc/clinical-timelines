import jsdom from 'jsdom';
import clinicalTimelines from '../src/index';
import expect from 'expect';

describe('clinical-timelines initialization', () => {
    const
        { JSDOM } = jsdom,
        settings = {details_config: {exportable: false}},
        data = require('./ADTIMELINES.json');
    let dom,
        container,
        CT;

    before(() => {
        dom = new JSDOM('<!DOCTYPE html><body><div></div></body>');
        container = dom.window.document.querySelector('div');
    });

    beforeEach(() => {
        CT = clinicalTimelines(container, settings, true);
        CT.init(data);
    });

    afterEach(() => {
        container.children[0].remove();
        CT = null;
    });

    describe('User passes data to clinicalTimelines.', () => {

            it('attaches the data to the clinicalTimelines object', () => {
                expect(CT.hasOwnProperty('data')).toBeTruthy();
            });

    });
});
