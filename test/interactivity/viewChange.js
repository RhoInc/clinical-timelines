import jsdom from 'jsdom';
import clinicalTimelines from '../../src/index';
import IDchange from '../../src/timelines/callbacks/onLayout/augmentFilters/IDchange';
import expect from 'expect';
import { select } from 'd3';

describe('Interactivity: view change', () => {
    const
        { JSDOM } = jsdom,
        settings = {details_config: {exportable: false}},
        data = require('../data/ADTIMELINES.json');
    let dom,
        container,
        CT,
        IDselect,
        IDoptions,
        allOption,
        timelinesSVG,
        IDtimeline,
        listing,
        IDs,
        index,
        ID;

    before(() => {
        dom = new JSDOM('<!DOCTYPE html><body><div></div></body>');
        container = dom.window.document.querySelector('div');
        CT = clinicalTimelines(container, settings, dom);
        CT.init(data);
        IDselect = dom.window.document.querySelector('#ct-controls .ct-ID .changer');
        IDoptions = [...IDselect.querySelectorAll('option')];
        allOption = IDoptions.find(d => d.value === 'All');

      //Select the timelines SVG, the ID timeline container, and the listing container nodes.
        timelinesSVG = dom.window.document.querySelector('div#ct-timelines .wc-chart .wc-svg');
        IDtimeline = dom.window.document.querySelector('div#ct-ID-timeline');
        listing = dom.window.document.querySelector('div#ct-listing');
    });

    beforeEach(() => {
      //Randomly select an ID from the dropdown.
        IDs = IDoptions.filter(d => d.value !== 'All');
        index = Math.round(Math.random()*IDs.length);
        ID = IDs.find((d,i) => i === index);

      //Set the selected index of the dropdown,
      //the selected boolean of the option to true,
      //and call IDchange(), passing the dropdown as an argument.
        IDselect.selectedIndex = index + 1;
        ID.selected = true;
        IDchange.call(CT.timelines, IDselect);
    });

    afterEach(() => {
      //Reset the ID dropdown.
        ID.selected = false;
        allOption.selected = true;
        IDselect.selectedIndex = 0;
        IDchange.call(CT.timelines, IDselect);
    });

    describe('User toggles view from timelines to ID timeline.', () => {

        //it('hides the timelines', () => {
        //    expect(timelinesSVG.classList.contains('ct-hidden')).toEqual(true);
        //});

        it('unhides the ID timeline', () => {
            expect(IDtimeline.classList.contains('ct-hidden')).toEqual(false);
        });

        it('unhides the listing', () => {
            expect(listing.classList.contains('ct-hidden')).toEqual(false);
        });

    });
});
