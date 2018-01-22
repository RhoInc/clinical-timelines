export default function defineDataInsideTimeRange() {
    this.longDataInsideTimeRange = this.filtered_long_data.filter(
        d => this.populationDetails.sampleInsideTimeRange.indexOf(d[this.config.id_col]) > -1
    );
    this.raw_data = this.longDataInsideTimeRange;
    this.wideDataInsideTimeRange = this.filtered_wide_data.filter(
        d => this.populationDetails.sampleInsideTimeRange.indexOf(d[this.config.id_col]) > -1
    );
}
