import { extent, set } from 'd3';
import clone from '../../util/clone';

export default function groupingData() {
    //Calculate x-domain.
    const xDomain = [
        d3.min(this.raw_data, d => Math.min(d[this.config.stdy_col], d[this.config.endy_col])),
        d3.max(this.raw_data, d => Math.max(d[this.config.stdy_col], d[this.config.endy_col]))
    ];

    //Capture each grouping and corresponding array of IDs.
    this.groupings = set(this.raw_data.map(d => d[this.config.y.grouping]))
        .values()
        .map(d => {
            const groupingObject = {
                key: d,
                IDs: []
            };

            if (this.config.grouping_direction === 'horizontal') {
                //Define datum for each grouping that looks like actual data.
                for (const variable in this.raw_data[0]) {
                    if (
                        [
                            this.config.id_col,
                            this.config.event_col,
                            this.config.seq_col,
                            this.config.y.grouping
                        ].indexOf(variable) === -1
                    )
                        groupingObject[variable] = '';
                    else if (variable === this.config.id_col)
                        groupingObject[this.config.id_col] = d;
                    else if (variable === this.config.event_col)
                        groupingObject[this.config.event_col] = 'Grouping';
                    else if (variable === this.config.seq_col)
                        groupingObject[this.config.seq_col] = '1';
                    else if (variable === this.config.y.grouping)
                        groupingObject[this.config.y.grouping] = d;
                }

                //Define both a start and end datum.
                const groupingStart = clone(groupingObject),
                    groupingEnd = clone(groupingObject);

                groupingStart.wc_value = xDomain[0];
                groupingEnd.wc_value = xDomain[0];

                //Push two start and two end data to raw_data to create space to annotate grouping.
                const groupingStart1 = clone(groupingStart),
                    groupingStart2 = clone(groupingStart),
                    groupingEnd1 = clone(groupingEnd),
                    groupingEnd2 = clone(groupingEnd);

                groupingStart1[this.config.id_col] = '--' + d;
                this.raw_data.push(groupingStart1);
                groupingStart2[this.config.id_col] = '-' + d;
                this.raw_data.push(groupingStart2);
                groupingEnd1[this.config.id_col] = '--' + d;
                this.raw_data.push(groupingEnd1);
                groupingEnd2[this.config.id_col] = '-' + d;
                this.raw_data.push(groupingEnd2);
            }

            return groupingObject;
        });

    //range_band hack
    if (this.config.grouping_direction === 'horizontal')
        this.config.range_band =
            this.initialSettings.range_band +
            this.groupings.length *
                2 /
                set(this.wide_data.map(d => d[this.config.id_col])).values().length *
                this.initialSettings.range_band;
}
