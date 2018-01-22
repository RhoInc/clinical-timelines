import jsdom from 'jsdom';
import clinicalTimelines from '../src/index';
import expect from 'expect';
import { select } from 'd3';

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
        CT = clinicalTimelines(container, settings, dom);
        CT.init(data);
    });

    afterEach(() => {
        container.children[0].remove();
        CT = null;
    });

    describe('User passes data to clinicalTimelines.', () => {

        it('attaches the data to the clinicalTimelines object', () => {
            expect(CT.hasOwnProperty('data') && CT.data.raw === data).toBeTruthy();
        });

        it('updates the population details', () => {
            const
                nodeList = dom.window.document
                    .querySelectorAll('#ct-population-details .ct-stats'),
                nodes = Array.from(nodeList);
            expect(nodes.filter(node => node.firstChild.nodeValue).length).toEqual(3);
        });

        it('populates the controls', () => {
            const
                nodeList = dom.window.document
                    .querySelectorAll('#ct-controls .subsetter, #ct-controls .dropdown, #ct-controls .ct-time-range');
            expect(nodeList.length).toEqual(9);
        });

        it('draws the legend and the chart', () => {
            const
                node = dom.window.document
                    .querySelector('#ct-timelines .wc-chart'),
                legend = node.querySelector('.legend'),
                SVG = node.querySelector('.wc-svg');
            expect(legend && SVG).toBeTruthy();
        });

    });
});
