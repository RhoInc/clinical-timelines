import { nest, time } from 'd3';
import csv from './exportData/csv';
import xlsx from './exportData/xlsx';

export default function exportData() {
    //Filter data on events overlapping current time range.
    let data = this.timelines.wideDataInsideTimeRange.filter(d => {
            const st = this.timelines.config.time_function(d[this.timelines.config.st_col]),
                en = this.timelines.config.time_function(d[this.timelines.config.en_col]),
                stInsideTimeRange =
                    this.timelines.config.x.domain[0] <= st &&
                    st <= this.timelines.config.x.domain[1], // start is within the time range
                enInsideTimeRange =
                    this.timelines.config.x.domain[0] <= en &&
                    en <= this.timelines.config.x.domain[1], // end is within the time range
                surroundingTimeRange =
                    this.timelines.config.x.domain[0] > st &&
                    en > this.timelines.config.x.domain[1]; // start is prior to time range and end is after time range

            return stInsideTimeRange || enInsideTimeRange || surroundingTimeRange;
        }),
        columns,
        headers;

    //If specified, transpose data to one record per ID per sequence number.
    if (this.settings.transpose_data) {
        const nested = nest()
                .key(d => d[this.settings.id_col] + '|' + d[this.settings.seq_col])
                //.rollup(d => console.log(d))
                .entries(data),
            transposed = [];
        nested.forEach(d => {
            const datum = {},
                keys = d.key.split('|');
            datum[this.settings.id_col] = keys[0];
            datum[this.settings.seq_col] = keys[1];

            d.values.forEach(di => {
                //ID characteristics
                this.settings.id_characteristics.forEach(id_characteristic => {
                    datum[id_characteristic.label] = di[id_characteristic.value_col];
                });

                //Event characteristics
                datum[`${di[this.settings.event_col]} Start`] = di.stdtdy;
                datum[`${di[this.settings.event_col]} End`] = di.endtdy;
            });

            transposed.push(datum);
        });
        data = transposed;
        columns = this.settings.id_characteristics
            .map(id_characteristic => id_characteristic.label)
            .concat([this.settings.seq_col])
            .concat(
                this.timelines.currentEventTypes
                    .concat(this.timelines.currentEventTypes)
                    .sort()
                    .map((eventType, i) => eventType + (i % 2 ? ' End' : ' Start'))
            );
        headers = columns;
    } else {
        //Otherwise export one record per ID per event.
        const variables = this.settings.id_characteristics.concat(
            this.settings.details.filter(
                detail =>
                    this.settings.id_characteristics
                        .map(id_characteristic => id_characteristic.value_col)
                        .indexOf(detail.value_col) < 0
            )
        );
        columns = variables.map(variable => variable.value_col);
        headers = variables.map(variable => variable.label);
    }

    if (typeof XLSX === 'undefined') csv.call(this, data, headers, columns);
    else xlsx.call(this, data, headers, columns);
}
