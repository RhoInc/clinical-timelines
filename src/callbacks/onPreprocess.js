import groupingData from './onPreprocess/groupingData';

export default function onPreprocess() {
    const context = this;

    //Remove groupings from data.
    this.raw_data = this.raw_data
        .filter(d => d[this.config.event_col] !== 'Grouping');

    //Define true filtered data, disregarding individual mark filtering.
    this.true_filtered_data = this.raw_data
        .filter(d => {
            let filtered = false;

            this.filters.forEach(di => {
                if (filtered === false && di.val !== 'All') {
                    filtered =
                        di.val instanceof Array
                            ? di.val.indexOf(d[di.col]) === -1
                            : di.val !== d[di.col];
                }
            });

            return !filtered;
        });
    console.log(this.raw_data.length);
    console.log(this.true_filtered_data.length);

    //Insert groupings into data to draw empty rows in which to draw groupings.
    if (this.config.y.grouping)
        groupingData.call(this);
    else {
        delete this.groupings;
        this.config.range_band = this.initialSettings.range_band;
    }
}
