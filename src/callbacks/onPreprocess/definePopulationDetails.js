import { set, time, format } from 'd3';

export default function definePopulationDetails() {
    //Define sample given current filters.
    this.populationDetails.sample = set(this.filtered_wide_data.map(d => d[this.config.id_col]))
        .values()
        .map(ID => {
            const IDobject = {
                ID: ID,
                data: this.filtered_wide_data.filter(d => ID === d[this.config.id_col])
            };

            IDobject.dataInsideTimeRange = IDobject.data.filter(d => {
                const st =
                        this.config.time_scale === 'Study Day'
                            ? +d[this.config.stdy_col]
                            : time.format(this.config.date_format).parse(d[this.config.stdt_col]),
                    en =
                        this.config.time_scale === 'Study Day'
                            ? +d[this.config.endy_col]
                            : time.format(this.config.date_format).parse(d[this.config.endt_col]),
                    stInsideTimeRange =
                        this.config.x.domain[0] <= st && st <= this.config.x.domain[1], // start is within the time range
                    enInsideTimeRange =
                        this.config.x.domain[0] <= en && en <= this.config.x.domain[1]; // end is within the time range

                return stInsideTimeRange || enInsideTimeRange;
            });

            return IDobject;
        });
    this.populationDetails.n = this.populationDetails.sample.length;
    this.populationDetails.rate = this.populationDetails.n / this.populationDetails.N;

    //Define sample given current filters of IDs with an event inside the current time range.
    this.populationDetails.sampleInsideTimeRange = this.populationDetails.sample
        .filter(d => d.dataInsideTimeRange.length)
        .map(d => d.ID);
    this.populationDetails.nInsideTimeRange = this.populationDetails.sampleInsideTimeRange.length;
    this.populationDetails.rateInsideTimeRange =
        this.populationDetails.nInsideTimeRange / this.populationDetails.N;

    //Define sample given current filters of IDs without an event inside the current time range.
    this.populationDetails.sampleOutsideTimeRange = this.populationDetails.sample
        .filter(d => !d.dataInsideTimeRange.length)
        .map(d => d.ID);
    this.populationDetails.nOutsideTimeRange = this.populationDetails.sampleOutsideTimeRange.length;
    this.populationDetails.rateOutsideTimeRange =
        this.populationDetails.nOutsideTimeRange / this.populationDetails.N;

    //Update population details.
    this.populationDetails.wrap.html(
        `<span class = 'stats'>${this.populationDetails.n}</span> of <span class = 'stats'>${this
            .populationDetails.N}</span> ${this.populationDetails.N > 1
            ? this.config.id_unitPlural
            : this.config.id_unit} (<span class = 'stats'>${format('%')(
            this.populationDetails.rate
        )}</span>)` +
            (this.populationDetails.nOutsideTimeRange
                ? `<br><span class = 'stats'>${this.populationDetails
                      .nOutsideTimeRange}</span> ${this.populationDetails.nOutsideTimeRange > 1
                      ? this.config.id_unitPlural
                      : this.config.id_unit} (<span class = 'stats'>${format('%')(
                      this.populationDetails.rateOutsideTimeRange
                  )}</span>) have no events in current time range`
                : ``)
    );
}
