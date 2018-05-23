import jsdom from 'jsdom';
import clinicalTimelines from '../../src/index';
import expect from 'expect';
import { select } from 'd3';

export default function init(settingsObject) {
    describe('clinical-timelines initialization', () => {
        const
            { JSDOM } = jsdom,
            data = require('../data/ADTIMELINES.json');
        let dom,
            container,
            CT;

        before(() => {
            console.log(`    ${settingsObject.description}: ${JSON.stringify(settingsObject.settings())}`);
            console.log('    ---');
            dom = new JSDOM('<!DOCTYPE html><body><div></div></body>');
            container = dom.window.document.querySelector('div');
            CT = clinicalTimelines(container, settingsObject.settings(), dom);
            CT.init(data);
        });

        beforeEach(() => {
        });

        afterEach(() => {
        });

        describe('User passes data to clinicalTimelines.', () => {

            it('attaches the data to the clinicalTimelines object', () => {
                expect(CT.hasOwnProperty('data') && CT.data.raw === data).toBeTruthy();
            });

            /***--------------------------------------------------------------------------------------\
              Details
            \--------------------------------------------------------------------------------------***/

                it('updates the population details', () => {
                    const
                        nodeList = dom.window.document
                            .querySelectorAll('#ct-population-details .ct-stats'),
                        nodes = Array.from(nodeList);
                    expect(nodes.filter(node => node.firstChild.nodeValue).length).toEqual(3);
                });

                it('updates the ID details', () => {
                    const
                        nodeList = dom.window.document
                            .querySelectorAll('#ct-ID-details .ct-characteristic'),
                        nodes = Array.from(nodeList);
                    expect(nodes.filter(node => node.firstChild.nodeValue).length).toEqual(CT.settings.synced.id_characteristics.length);
                });

            /***--------------------------------------------------------------------------------------\
              Controls
            \--------------------------------------------------------------------------------------***/

                it('adds an ID view dropdown', () => {
                    const
                        nodeList = dom.window.document
                            .querySelectorAll('#ct-controls .ct-ID');
                    expect(nodeList.length).toEqual(1);
                });

                it('adds an event highlighting dropdown', () => {
                    const
                        nodeList = dom.window.document
                            .querySelectorAll('#ct-controls #control-event_highlighted');
                    expect(nodeList.length).toEqual(1);
                });

                it('adds an x-axis scale dropdown', () => {
                    const
                        nodeList = dom.window.document
                            .querySelectorAll('#ct-controls #control-time_scale');
                    if (CT.settings.stdt_col && CT.settings.stdy_col)
                        expect(nodeList.length).toEqual(1);
                    else
                        expect(nodeList.length).toEqual(0);
                });

                it('adds x-axis time range controls', () => {
                    const
                        nodeList = dom.window.document
                            .querySelectorAll('#ct-controls .ct-time-range');
                    expect(nodeList.length).toEqual(2);
                });

                it('adds a y-axis sort dropdown', () => {
                    const
                        nodeList = dom.window.document
                            .querySelectorAll('#ct-controls #control-y-sort');
                    expect(nodeList.length).toEqual(1);
                });

                it('adds a y-axis grouping dropdown', () => {
                    const
                        nodeList = dom.window.document
                            .querySelectorAll('#ct-controls #control-y-groupingLabel');
                    if (Array.isArray(CT.settings.groupings) && CT.settings.groupings.length)
                        expect(nodeList.length).toEqual(1);
                    else
                        expect(nodeList.length).toEqual(0);
                });

            /***--------------------------------------------------------------------------------------\
              Filters
            \--------------------------------------------------------------------------------------***/

                it('adds ongoing, event type, and user-specified filters', () => {
                    const
                        nodeList = dom.window.document
                            .querySelectorAll('#ct-controls .ct-filter');
                    expect(nodeList.length).toEqual(CT.settings.synced.filters.length);
                });

            /***--------------------------------------------------------------------------------------\
              Timelines
            \--------------------------------------------------------------------------------------***/

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
}
