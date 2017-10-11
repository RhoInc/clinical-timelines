import updateSubjectCount from './util/updateSubjectCount';
import { nest, min, set, descending } from 'd3';

export default function onDraw() {
    //Annotate number of selected participants out of total participants.
    updateSubjectCount(this, '.annote', 'subject ID(s)');

    //Sort y-axis based on `Sort IDs` control selection.
    const yAxisSort = this.controls.wrap
        .selectAll('.control-group')
        .filter(d => d.option && d.option === 'y.sort')
        .select('option:checked')
        .text();

    if (yAxisSort === 'earliest') {
        //Redefine filtered data as it defaults to the final mark drawn, which might be filtered in
        //addition to the current filter selections.
        const filtered_data = this.raw_data.filter(d => {
            let filtered = d[this.config.seq_col] === '';
            this.filters.forEach(di => {
                if (filtered === false && di.val !== 'All')
                    filtered =
                        Object.prototype.toString.call(di.val) === '[object Array]'
                            ? di.val.indexOf(d[di.col]) === -1
                            : di.val !== d[di.col];
            });
            return !filtered;
        });

        //Capture all subject IDs with adverse events with a start day.
        const withStartDay = nest()
            .key(d => d[this.config.id_col])
            .rollup(d => min(d, di => +di[this.config.stdy_col]))
            .entries(
                filtered_data.filter(
                    d =>
                        !isNaN(parseFloat(d[this.config.stdy_col])) &&
                        isFinite(d[this.config.stdy_col])
                )
            )
            .sort(
                (a, b) =>
                    a.values > b.values ? -2 : a.values < b.values ? 2 : a.key > b.key ? -1 : 1
            )
            .map(d => d.key);

        //Capture all subject IDs with adverse events without a start day.
        const withoutStartDay = set(
            filtered_data
                .filter(
                    d =>
                        +d[this.config.seq_col] > 0 &&
                        (isNaN(parseFloat(d[this.config.stdy_col])) ||
                            !isFinite(d[this.config.stdy_col])) &&
                        withStartDay.indexOf(d[this.config.id_col]) === -1
                )
                .map(d => d[this.config.id_col])
        ).values();
        this.y_dom = withStartDay.concat(withoutStartDay);
    } else this.y_dom = this.y_dom.sort(descending);
}
