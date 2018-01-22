import { time, select } from 'd3';

export default function exportData() {
    const
        data = this.wideDataInsideTimeRange
            .filter(d => {
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
            }),
        variables = this.clinicalTimelines.settings.id_characteristics
            .concat(this.clinicalTimelines.settings.details
                .filter(detail => this.clinicalTimelines.settings.id_characteristics
                    .map(id_characteristic => id_characteristic.value_col)
                    .indexOf(detail.value_col) < 0
                )
            ),
        columns = variables.map(variable => variable.value_col),
        headers = variables.map(variable => variable.label),
        CSVarray = [];

    //Add headers and rows to CSV array.
    data.forEach((d, i) => {
        //Add headers to CSV array.
        if (i === 0)
            CSVarray.push(
                headers.map(header => `"${header.replace(/"/g, '""')}"`)
            );

        //add rows to CSV array
        const
            row = columns.map(col => {
                let value = d[col];

                if (typeof value === 'string') value = value.replace(/"/g, '""');

                return `"${value}"`;
            });

        CSVarray.push(row);
    });

    //transform CSV array into CSV string
    const
        CSV = new Blob([CSVarray.join('\n')], { type: 'text/csv;charset=utf-8;' }),
        fileName = `ClinicalTimelinesData_${time.format('%Y-%m-%dT%H-%M-%S')(new Date())}.csv`,
        link = this.clinicalTimelines.containers.exportButton;

    if (navigator.msSaveBlob) {
        // IE 10+
        link.style({
            cursor: 'pointer',
            'text-decoration': 'underline',
            color: 'blue'
        });
        link.on('click', () => {
            navigator.msSaveBlob(CSV, fileName);
        });
    } else {
        // Browsers that support HTML5 download attribute
        if (link.node().download !== undefined) {
            var url = URL.createObjectURL(CSV);
            link.node().setAttribute('href', url);
            link.node().setAttribute('download', fileName);
        }
    }
}
