import './util/object-assign';
import defaults from './defaults/index';
import charts from './charts/index';
import listing from './listing/index';
import { createControls, createChart, createTable } from 'webcharts';

export default function clinicalTimelines(element, settings) {
    const
        mergedSettings = Object.assign({}, defaults.settings, settings),
        syncedSettings = defaults.syncSettings(mergedSettings),
        syncedControls = syncControls(defaults.controls, syncedSettings),
        controls = createControls(element, { location: 'top', inputs: syncedControls }),
        populationChart = createChart(element, syncedSettings.populationSettings, controls),
        participantChart = createChart(element, syncedSettings.participantSettings),
        listing = createTable(element, syncedSettings.listingSettings);

    populationChart.participantChart = participantChart;
    populationChart.participantChart.listing = listing;

    return populationChart;
}
