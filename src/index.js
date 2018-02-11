//polyfills and utility functions
import './util/number-isinteger';
import './util/object-assign';
import './util/array-find';
import merge from './util/merge';
import clone from './util/clone';

//setup functions
import defineSettings from './defineSettings';
import defineStyles from './defineStyles';
import defineLayout from './defineLayout';
import recurse from './recurse';

//components
import controls from './controls';
import timelines from './timelines/index';
import IDtimeline from './IDtimeline/index';
import listing from './listing/index';

//initialization method
import init from './init';

export default function clinicalTimelines(element = 'body', settings = {}, dom) {
    const clinicalTimelines = {
        element: element,
        settings: {
            user: settings
        },
        containers: {},
        init: init,
        test: !!dom,
        document: dom
            ? dom.window.document
            : document
    };

    //Merge and sync settings.
    defineSettings.call(clinicalTimelines);

    //Define .css styles to avoid requiring a separate .css file.
    defineStyles.call(clinicalTimelines);

    //Define layout of HTML.
    defineLayout.call(clinicalTimelines);

    //Create controls.
    controls.call(clinicalTimelines);

    //Create timelines.
    timelines.call(clinicalTimelines);

    //Create ID timeline.
    IDtimeline.call(clinicalTimelines);

    //Create listing.
    listing.call(clinicalTimelines);

    //Recurse clinical timelines, ID timeline, and listing.
    recurse.call(clinicalTimelines);

    return clinicalTimelines;
}
