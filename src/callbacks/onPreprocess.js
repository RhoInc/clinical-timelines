import defineFilteredData from './onPreprocess/defineFilteredData';
import definePopulationDetails from './onPreprocess/definePopulationDetails';
import defineDataInsideTimeRange from './onPreprocess/defineDataInsideTimeRange';
import defineGroupingData from './onPreprocess/defineGroupingData';
import sortYdomain from './onPreprocess/sortYdomain';

export default function onPreprocess() {
    const context = this;

    //Set x-domain.
    this.config.x.domain = this.config.time_range;

    //Define filtered data irrespective of individual mark filtering.
    defineFilteredData.call(this);

    //Define population details data.
    definePopulationDetails.call(this);

    //Define data inside time range.
    defineDataInsideTimeRange.call(this);

    //Insert groupings into data to draw empty rows in which to draw groupings.
    if (this.config.y.grouping) defineGroupingData.call(this);
    else delete this.groupings;

    //Sort y-axis based on `Sort IDs` control selection.
    sortYdomain.call(this);
}
