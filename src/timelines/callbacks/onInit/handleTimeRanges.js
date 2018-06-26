import defineFullTimeRanges from './handleTimeRanges/defineFullTimeRanges';
import defineInitialTimeRanges from './handleTimeRanges/defineInitialTimeRanges';
import syncTimeRanges from './handleTimeRanges/syncTimeRanges';

//Update time range data and settings.
export default function handleTimeRanges() {
    //Calculate extent of each time scale.
    defineFullTimeRanges.call(this);

    //Set initial range of each time scale.
    defineInitialTimeRanges.call(this);

    //Sync time range variables given initial time scale.
    syncTimeRanges.call(this);
}
