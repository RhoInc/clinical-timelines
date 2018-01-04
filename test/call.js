import jsdom from 'jsdom';
import clinicalTimelines from '../src/index';
import expect from 'expect';

describe('clinical-timelines object creation', () => {
    const
        { JSDOM } = jsdom,
        settings = {details_config: {exportable: false}};
    let dom, container, CT;

    before(() => {
        dom = new JSDOM('<!DOCTYPE html><body><div></div></body>');
        container = dom.window.document.querySelector('div');
    });

    beforeEach(() => {
        CT = clinicalTimelines(container, settings, dom);
    });

    afterEach(() => {
        container.children[0].remove();
        CT = null;
    });

    describe('User calls clinicalTimelines().', () => {

        /***--------------------------------------------------------------------------------------\
          clinicalTimelines object
        \--------------------------------------------------------------------------------------***/

            it('returns a clinicalTimelines object with a given set of properties', () => {
                const
                    properties = [
                        'element',
                        'settings',
                        'containers',
                        'init',
                        'controls',
                        'timelines',
                        'IDtimeline',
                        'listing',
                        'test'
                    ];
                expect(Object.keys(CT).sort()).toEqual(properties.sort());
            });

          //timelines object
            it('  - contains an object representing the timelines that references the clinicalTimelines, ID timeline, and listing objects', () => {
                const
                    properties = [
                      //clinicalTimelines properties
                        'clinicalTimelines',
                        'IDtimeline',
                        'listing',

                      //webcharts properties
                        'config',
                        'controls',
                        'div',
                        'events',
                        'filters',
                        'id',
                        'marks',
                        'on',
                        'raw_data',
                        'wrap'
                    ];
                expect(Object.keys(CT.timelines).sort()).toEqual(properties.sort());
            });

          //ID timeline object
            it('  - contains an object representing the ID timeline that references the clinicalTimelines, timelines, and listing objects', () => {
                const
                    properties = [
                      //clinicalTimelines properties
                        'clinicalTimelines',
                        'timelines',
                        'listing',

                      //webcharts properties
                        'config',
                        'controls',
                        'div',
                        'events',
                        'filters',
                        'id',
                        'marks',
                        'on',
                        'raw_data',
                        'wrap'
                    ];
                expect(Object.keys(CT.IDtimeline).sort()).toEqual(properties.sort());
            });

          //listing object
            it('  - contains an object representing the listing that references the clinicalTimelines, timelines, and ID timeline objects', () => {
                const
                    properties = [
                      //clinicalTimelines properties
                        'clinicalTimelines',
                        'timelines',
                        'IDtimeline',

                      //webcharts properties
                        'config',
                        'controls',
                        'div',
                        'events',
                        'filters',
                        'on',
                        'required_cols',
                        'wrap'
                    ];
                expect(Object.keys(CT.listing).sort()).toEqual(properties.sort());
            });

        /***--------------------------------------------------------------------------------------\
          html
        \--------------------------------------------------------------------------------------***/

          //top level
            it('contains a top-level div with an ID of "clinical-timelines"', () => {
                expect(dom.window.document.querySelector('#clinical-timelines')).toBeTruthy();
            });

              //left column
                it('  - contains a div representing the left column', () => {
                    expect(dom.window.document.querySelector('#clinical-timelines #ct-left-column')).toBeTruthy();
                });

                  //details
                    it('    - contains a div in which to print population and ID details', () => {
                        expect(dom.window.document.querySelector('#clinical-timelines #ct-left-column #ct-details')).toBeTruthy();
                    });

                      //population details
                        it('      - contains a div in which to print population details', () => {
                            expect(dom.window.document.querySelector('#clinical-timelines #ct-left-column #ct-details #ct-population-details')).toBeTruthy();
                        });

                      //ID details
                        it('      - contains a div in which to print ID details', () => {
                            expect(dom.window.document.querySelector('#clinical-timelines #ct-left-column #ct-details #ct-ID-details')).toBeTruthy();
                        });

                  //controls
                    it('    - contains a div in which to place the controls', () => {
                        expect(dom.window.document.querySelector('#clinical-timelines #ct-left-column #ct-controls')).toBeTruthy();
                    });

              //right column
                it('  - contains a div representing the right column', () => {
                    expect(dom.window.document.querySelector('#clinical-timelines #ct-right-column')).toBeTruthy();
                });

                  //timelines
                    it('    - contains a div in which to draw the timelines', () => {
                        expect(dom.window.document.querySelector('#clinical-timelines #ct-right-column #ct-timelines')).toBeTruthy();
                    });

                  //ID timeline
                    it('    - contains a div in which to draw the ID timeline', () => {
                        expect(dom.window.document.querySelector('#clinical-timelines #ct-right-column #ct-ID-timeline')).toBeTruthy();
                    });
                    it('      and initially hides the ID timeline by assigning it a class of "ct-hidden"', () => {
                        expect(dom.window.document.querySelector('#clinical-timelines #ct-right-column #ct-ID-timeline').className.indexOf('ct-hidden')).toBeGreaterThan(-1);
                    });

                  //listing
                    it('    - contains a div in which to print the listing', () => {
                        expect(dom.window.document.querySelector('#clinical-timelines #ct-right-column #ct-listing')).toBeTruthy();
                    });
                    it('      and initially hides the listing by assigning it a class of "ct-hidden"', () => {
                        expect(dom.window.document.querySelector('#clinical-timelines #ct-right-column #ct-listing').className.indexOf('ct-hidden')).toBeGreaterThan(-1);
                    });

    });
});
