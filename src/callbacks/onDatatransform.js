import { set, format } from 'd3';

export default function onDatatransform() {
    const context = this;

    //Update population details data.
    this.populationDetails.sample = set(
        this.filtered_data.map(d => d[this.config.id_col])
    ).values();
    this.populationDetails.n = this.populationDetails.sample.length;
    this.populationDetails.rate = this.populationDetails.n / this.populationDetails.N;
    this.populationDetails.wrap.html(
        `<span class = 'stats'>${this.populationDetails.n}</span> of <span class = 'stats'>${
            this.populationDetails.N
        }</span> ${this.config.id_unit}(s) (<span class = 'stats'>${format('%')(
            this.populationDetails.rate
        )}</span>)`
    );
}
