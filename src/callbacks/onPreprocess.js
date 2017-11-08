import groupingData from './onPreprocess/groupingData';

export default function onPreprocess() {
    const context = this;

    //Insert groupings into data to draw empty rows in which to draw groupings.
    this.raw_data = this.raw_data.filter(d => d[this.config.event_col] !== 'Grouping');
    if (this.config.y.grouping)
        groupingData.call(this);
    else {
        delete this.groupings;
        this.config.range_band = this.initialSettings.range_band;
    }
}
