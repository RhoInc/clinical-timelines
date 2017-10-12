import { set, format } from 'd3';

export default function onDatatransform() {
    const context = this;

  //Update sample and population data.
    this.sample_population.sample = set(this.filtered_data.map(d => d[this.config.id_col])).values();
    this.sample_population.n = this.sample_population.sample.length;
    this.sample_population.rate = this.sample_population.n/this.sample_population.N;
    this.sample_population.annotation
        .text(`${this.sample_population.n} of ${this.sample_population.N} ${this.config.unit}(s) displayed (${format('%')(this.sample_population.rate)})`);
}
