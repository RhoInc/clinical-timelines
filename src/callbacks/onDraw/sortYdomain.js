import { nest, min, time, set } from 'd3';

export default function sortYdomain() {
    /**-------------------------------------------------------------------------------------------\
      Sort y-domain by the earliest event of each ID.
    \-------------------------------------------------------------------------------------------**/

    if (this.config.y.sort === 'earliest') {
        if (this.config.y.grouping) {
            //Sort IDs by grouping then earliest event start date if y-axis is grouped.
            const nestedData = nest()
                .key(d => d[this.config.y.grouping] + '|' + d[this.config.id_col])
                .rollup(d =>
                    min(
                        d,
                        di =>
                            this.config.time_scale === 'Study Day'
                                ? +di[this.config.stdy_col]
                                : time
                                      .format(this.config.date_format)
                                      .parse(di[this.config.stdt_col])
                    )
                )
                .entries(this.longDataInsideTimeRange)
                .sort((a, b) => {
                    const aGrouping = a.key.split('|')[0],
                        bGrouping = b.key.split('|')[0],
                        earliestEventSort =
                            a.values > b.values
                                ? -2
                                : a.values < b.values ? 2 : a.key > b.key ? -1 : 1;

                    return aGrouping > bGrouping
                        ? -1
                        : aGrouping < bGrouping ? 1 : earliestEventSort;
                }); // nest data by grouping and ID.

            //Capture list of IDs by grouping.
            nestedData.forEach(d => {
                const split = d.key.split('|');

                this.groupings
                    .filter(grouping => grouping.key === split[0])
                    .pop()
                    .IDs.push(split[1]);
            });

            //Set y-domain.
            this.y_dom = nestedData.map(d => d.key.split('|')[1]);
        } else {
            //Otherwise sort IDs by earliest event start date.
            this.y_dom = nest()
                .key(d => d[this.config.id_col])
                .rollup(d =>
                    min(
                        d,
                        di =>
                            this.config.time_scale === 'Study Day'
                                ? +di[this.config.stdy_col]
                                : time
                                      .format(this.config.date_format)
                                      .parse(di[this.config.stdt_col])
                    )
                )
                .entries(this.longDataInsideTimeRange)
                .sort((a, b) => {
                    const earliestEventSort =
                        a.values > b.values ? -2 : a.values < b.values ? 2 : a.key > b.key ? -1 : 1;

                    return earliestEventSort;
                })
                .map(d => d.key);
        }
    } else {
        /**-------------------------------------------------------------------------------------------\
      Sort y-domain alphanumerically.
    \-------------------------------------------------------------------------------------------**/

        if (this.config.y.grouping) {
            //Sort IDs by grouping then alphanumerically if y-axis is grouped.
            this.y_dom = set(this.longDataInsideTimeRange.map(d => d[this.config.id_col]))
                .values()
                .sort((a, b) => {
                    const aGrouping = this.raw_data.filter(d => d[this.config.id_col] === a)[0][
                            this.config.y.grouping
                        ],
                        bGrouping = this.raw_data.filter(d => d[this.config.id_col] === b)[0][
                            this.config.y.grouping
                        ],
                        alphanumericSort = a > b ? -1 : 1;

                    return aGrouping > bGrouping
                        ? -1
                        : aGrouping < bGrouping ? 1 : alphanumericSort;
                });

            this.y_dom.forEach(d => {
                this.groupings
                    .filter(
                        grouping =>
                            grouping.key ===
                            this.raw_data.filter(di => di[this.config.id_col] === d)[0][
                                this.config.y.grouping
                            ]
                    )
                    .pop()
                    .IDs.push(d);
            });
        } else {
            //Otherwise sort IDs alphanumerically.
            this.y_dom = this.populationDetails.sampleInsideTimeRange.sort((a, b) => {
                const alphanumericSort = a > b ? -1 : 1;

                return alphanumericSort;
            });
        }
    }
}
