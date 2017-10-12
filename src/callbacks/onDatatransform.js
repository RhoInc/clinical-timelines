import { set, format } from 'd3';

export default function onDatatransform() {
    const context = this;

  //Update population details data.
    this.populationDetails.sample = set(this.filtered_data.map(d => d[this.config.id_col])).values();
    this.populationDetails.n = this.populationDetails.sample.length;
    this.populationDetails.rate = this.populationDetails.n/this.populationDetails.N;
    this.populationDetails.annotation
        .text(`${this.populationDetails.n} of ${this.populationDetails.N} ${this.config.unit}(s) displayed (${format('%')(this.populationDetails.rate)})`);
}
