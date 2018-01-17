import { set, time } from 'd3';
import updatePopulationDetails from './definePopulationDetails/updatePopulationDetails';

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
                const
                    st = this.config.time_function(d[this.config.st_col]),
                    en = this.config.time_function(d[this.config.en_col]),
                    stInsideTimeRange =
                        this.config.x.domain[0] <= st && st <= this.config.x.domain[1], // start is within the time range
                    enInsideTimeRange =
                        this.config.x.domain[0] <= en && en <= this.config.x.domain[1], // end is within the time range
                    surroundingTimeRange =
                        this.config.x.domain[0] > st && en > this.config.x.domain[1]; // start is prior to time range and end is after time range

                return stInsideTimeRange || enInsideTimeRange || surroundingTimeRange;
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
        this.populationDetails.nInsideTimeRange / this.populationDetails.n;

    //Define sample given current filters of IDs without an event inside the current time range.
    this.populationDetails.sampleOutsideTimeRange = this.populationDetails.sample
        .filter(d => !d.dataInsideTimeRange.length)
        .map(d => d.ID);
    this.populationDetails.nOutsideTimeRange = this.populationDetails.sampleOutsideTimeRange.length;
    this.populationDetails.rateOutsideTimeRange =
        this.populationDetails.nOutsideTimeRange / this.populationDetails.n;

    //Update population details.
    updatePopulationDetails.call(this);
}
