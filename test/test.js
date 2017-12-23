import jsdom from 'jsdom';
import clinicalTimelines from '../src/index';
import expect from 'expect';

describe('clinical-timelines object creation. ', () => {
    const
        { JSDOM } = jsdom,
        settings = {details_config: {exportable: false}};
    let dom, container, CT;

    before(() => {
        dom = new JSDOM('<!DOCTYPE html><body><div></div></body>');
        container = dom.window.document.querySelector('div');
    });

    beforeEach(() => {
        CT = clinicalTimelines(container, settings, true);
    });

    afterEach(() => {
        container.children[0].remove();
        CT = null;
    });

    describe('User calls clinicalTimelines().', () => {

      //return object
        it('clinical-timelines returns a clinicalTimelines object with a given set of properties.', () => {
            const
                properties = [
                  //clinical-timelines properties
                    'IDtimeline',
                    'initialSettings',
                    'listing',
                    'leftSide',
                    'rightSide',
                    'test',
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
            expect(Object.keys(CT).sort()).toEqual(properties.sort());
        });

      //clinical-timelines element
        it('clinicalTimelines contains a top-level div with an ID of "clinical-timelines".', () => {
            expect(dom.window.document.querySelector('#clinical-timelines')).toBeTruthy();
        });

          //left-side element
            it('clinicalTimelines contains a div representing the left side of the page.', () => {
                expect(dom.window.document.querySelector('#clinical-timelines #left-side')).toBeTruthy();
            });

              //population-details annotation element
                //it('clinicalTimelines contains a div in which to print population details.', () => {
                //    expect(dom.window.document.querySelector('#clinical-timelines #left-side .population-details')).toBeTruthy();
                //});

              //ID-details annotation element
                //it('clinicalTimelines contains a div in which to print ID details.', () => {
                //    expect(dom.window.document.querySelector('#clinical-timelines #left-side .ID-details')).toBeTruthy();
                //});

              //controls element
                it('clinicalTimelines contains a div in which to place the controls.', () => {
                    expect(dom.window.document.querySelector('#clinical-timelines #left-side .wc-controls')).toBeTruthy();
                });

          //right-side element
            it('clinicalTimelines contains a div representing the right side of the page.', () => {
                expect(dom.window.document.querySelector('#clinical-timelines #right-side')).toBeTruthy();
            });

              //clinical timelines element
                it('clinicalTimelines contains a div in which to draw the clinical timelines.', () => {
                    expect(dom.window.document.querySelector('#clinical-timelines #right-side .wc-chart')).toBeTruthy();
                });

              //ID timeline element
                it('clinicalTimelines contains a div in which to draw the ID timeline.', () => {
                    expect(dom.window.document.querySelector('#clinical-timelines #right-side .wc-small-multiples')).toBeTruthy();
                });

              //listing element
                it('clinicalTimelines contains a div in which to print the listing.', () => {
                    expect(dom.window.document.querySelector('#clinical-timelines #right-side .wc-table')).toBeTruthy();
                });
    });
});
