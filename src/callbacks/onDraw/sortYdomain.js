import { nest, min, set } from 'd3';

export default function sortYdomain() {
    //Redefine filtered data as it defaults to the final mark drawn, which might be filtered in
    //addition to the current filter selections.
    const filtered_data = this.raw_data.filter(d => {
        let filtered = false;

        this.filters.forEach(di => {
            if (
                filtered === false &&
                di.val !== 'All' &&
                d[this.config.event_col] !== 'Grouping'
            ) {
                filtered =
                    di.val instanceof Array
                        ? di.val.indexOf(d[di.col]) === -1
                        : di.val !== d[di.col];
            }
        });

        return !filtered;
    });

    //Sort y-domain by the earliest event of each ID.
    if (this.config.y.sort === 'earliest') {
        //Sort IDs by grouping then earliest event start date if y-axis is grouped.
        if (this.config.y.grouping) {
            //Nest data by grouping and ID.
            const nestedData = nest()
                .key(d => d[this.config.y.grouping] + '|' + d[this.config.id_col])
                .rollup(d => min(d, di => +di[this.config.stdy_col]))
                .entries(filtered_data)
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
                });

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
            //Set y-domain.
            this.y_dom = nest()
                .key(d => d[this.config.id_col])
                .rollup(d => min(d, di => +di[this.config.stdy_col]))
                .entries(filtered_data)
                .sort((a, b) => {
                    const earliestEventSort =
                        a.values > b.values ? -2 : a.values < b.values ? 2 : a.key > b.key ? -1 : 1;

                    return earliestEventSort;
                })
                .map(d => d.key);
        }
    } else {
        //Sort y-domain alphanumerically.
        //Sort IDs by grouping then alphanumerically if y-axis is grouped.
        if (this.config.y.grouping) {
            this.y_dom = set(filtered_data.map(d => d[this.config.id_col]))
                .values()
                .sort((a, b) => {
                    const aGrouping = this.raw_data.filter(d => d[this.config.id_col] === a)[0][
                            this.config.y.grouping
                        ],
                        bGrouping = this.raw_data.filter(d => d[this.config.id_col] === b)[0][
                            this.config.y.grouping
                        ],
                        alphanumericSort = a > b ? -1 : 1;

                    return aGrouping > bGrouping ? -1 : aGrouping < bGrouping ? 1 : alphanumericSort;
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
            //Set y-domain.
            this.y_dom = this.y_dom.sort((a, b) => {
                const alphanumericSort = a > b ? -1 : 1;

                return alphanumericSort;
            });
        }
    }
}
