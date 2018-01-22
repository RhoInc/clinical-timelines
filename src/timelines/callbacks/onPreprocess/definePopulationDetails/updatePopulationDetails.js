import { format } from 'd3';

export default function updatePopulationDetails() {
    this.clinicalTimelines.containers.popCurrentFilters
        .html(`<span class = 'ct-stats ct-sample'>${
                this.populationDetails.n
            }</span> of <span class = 'ct-stats'>${this.populationDetails.N}</span> ${
                this.populationDetails.N > 1 ? this.config.id_unitPlural : this.config.id_unit
            } (<span class = 'ct-stats'>${format('%')(
                this.populationDetails.rate
            )}</span>) <span class = 'ct-info-icon' title = 'These ${
                this.config.id_unitPlural
            } have data that meet the current filter criteria.'>&#9432;</span>`
        );
    this.clinicalTimelines.containers.popInsideTimeRange
        .html(
            this.populationDetails.nInsideTimeRange < this.populationDetails.n
                ? `<span class = 'ct-stats ct-sample-inside-time-range'>${
                      this.populationDetails.nInsideTimeRange
                  }</span> of <span class = 'ct-stats ct-sample'>${
                      this.populationDetails.n
                  }</span> displayed (<span class = 'ct-stats'>${format('%')(
                      this.populationDetails.rateInsideTimeRange
                  )}</span>) <span class = 'ct-info-icon' title = 'These ${
                      this.config.id_unitPlural
                  } have events that occur in the current time range.'>&#9432;</span>`
                : ``
        );
    this.clinicalTimelines.containers.popOutsideTimeRange
        .html(
            this.populationDetails.nOutsideTimeRange
                ? `<span class = 'ct-stats ct-sample-outside-time-range'>${
                    this.populationDetails.nOutsideTimeRange
                }</span> of <span class = 'ct-stats ct-sample'>${
                    this.populationDetails.n
                }</span> hidden (<span class = 'ct-stats'>${format('%')(
                    this.populationDetails.rateOutsideTimeRange
                )}</span>) <span class = 'ct-info-icon' title = 'These ${
                    this.config.id_unitPlural
                } do not have events that occur in the current time range.'>&#9432;</span>`
                : ``
            );
}
