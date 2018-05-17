import { min, max, time, set } from 'd3';
import clone from '../../../util/clone';

export default function defineGroupingData() {
    if (this.config.y.grouping) {
        //Capture each grouping and corresponding array of IDs.
        this.groupings = set(this.longDataInsideTimeRange.map(d => d[this.config.y.grouping]))
            .values()
            .sort()
            .map((d, i) => {
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

                    if (this.config.time_scale === 'date') {
                        groupingStart.wc_value = this.full_date_range[0];
                        groupingEnd.wc_value = this.full_date_range[0];
                    } else {
                        groupingStart.wc_value = this.full_day_range[0];
                        groupingEnd.wc_value = this.full_day_range[0];
                    }

                    //Push two start and two end data to raw_data to create space to annotate grouping.
                    const groupingStart1 = clone(groupingStart),
                        groupingStart2 = clone(groupingStart),
                        groupingEnd1 = clone(groupingEnd),
                        groupingEnd2 = clone(groupingEnd);

                    //Placeholder row in which to print grouping.
                    groupingStart1[this.config.id_col] = `-g${i}-`;
                    this.raw_data.push(groupingStart1);
                    this.longDataInsideTimeRange.push(groupingStart1);

                    groupingEnd1[this.config.id_col] = `-g${i}-`;
                    this.raw_data.push(groupingEnd1);
                    this.longDataInsideTimeRange.push(groupingEnd1);
                }

                return groupingObject;
            });
    } else delete this.groupings;
}
