import jsdom from 'jsdom';
import clinicalTimelines from '../../src/index';
import expect from 'expect';
import { select } from 'd3';

describe('Interactivity: view change', () => {
    const
        { JSDOM } = jsdom,
        settings = {details_config: {exportable: false}},
        data = require('../data/ADTIMELINES.json');
    let dom,
        container,
        CT;

    before(() => {
        dom = new JSDOM('<!DOCTYPE html><body><div></div></body>');
        container = dom.window.document.querySelector('div');
        CT = clinicalTimelines(container, settings, dom);
        CT.init(data);
    });

    beforeEach(() => {
        const
            IDs = [...dom.window.document.querySelectorAll('#ct-controls .ct-ID option')]
                .filter(d => d.value !== 'All'),
            index = Math.round(Math.random()*IDs.length),
            ID = IDs.find((d,i) => i === index);
            console.log(dom.window.document.querySelectorAll('#ct-controls .ct-ID option:selected'));
            ID.selected = true;
            console.log(dom.window.document.querySelectorAll('#ct-controls .ct-ID option:selected'));
    });

    afterEach(() => {
    });

    describe('User toggles view from timelines to ID timeline.', () => {

        it('hides the timelines', () => {
            const
                timelines = dom.window.document
                    .querySelector('#ct-timelines .wc-chart .wc-svg');
            console.log(timelines.classList);
            //expect(CT.hasOwnProperty('data') && CT.data.raw === data).toBeTruthy();
        });

    });
});
