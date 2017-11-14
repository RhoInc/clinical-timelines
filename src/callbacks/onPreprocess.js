import defineFilteredData from './onPreprocess/defineFilteredData';
import definePopulationDetails from './onPreprocess/definePopulationDetails';
import defineDataInsideTimeRange from './onPreprocess/defineDataInsideTimeRange';
import defineGroupingData from './onPreprocess/defineGroupingData';

export default function onPreprocess() {
    const context = this;

    //Set x-domain.
    this.config.x.domain =
        this.config.time_scale === 'Study Day'
            ? this.config.study_day_range
            : this.config.date_range;

    //Reset raw data array.
    this.raw_data = this.long_data;

    //Define filtered data irrespective of individual mark filtering.
    defineFilteredData.call(this);

    //Define population details data.
    definePopulationDetails.call(this);

    //Define data inside time range.
    defineDataInsideTimeRange.call(this);

    //Insert groupings into data to draw empty rows in which to draw groupings.
    if (this.config.y.grouping) defineGroupingData.call(this);
    else {
        delete this.groupings;
        this.config.range_band = this.initialSettings.range_band;
    }
}
