import { nest, select } from 'd3';

export default function offsetCircles(mark, markData) {
    const context = this;

    if (this.raw_data.length && this.raw_data[0].hasOwnProperty(this.config.offset_col)) {
        this.svg.selectAll('g.point').each(function(d) {
            select(this).attr(
                'transform',
                `translate(0,${d.offset * context.config.mark_thickness * 2})`
            );
        });
    } else {
        //Nest data by timepoint and filter on any nested object with more than one datum.
        const overlapping = nest()
            .key(d => d.total + '|' + d.values.raw[0][this.config.id_col])
            .rollup(d => {
                return {
                    n: d.length,
                    keys: d.map(di => di.key)
                };
            })
            .entries(markData)
            .filter(d => d.values.n > 1);

        //For each timepoint with more than one event...
        overlapping.forEach(d => {
            const x = d.key.split('|')[0], // timepoint
                y = d.key.split('|')[1]; // ID

            //For each overlapping point...
            d.values.keys.forEach((di, i) => {
                //Capture point via its class name and offset vertically.
                const className = `${di} point`;
                const g = select(
                    this.clinicalTimelines.document.getElementsByClassName(className)[0]
                );
                const point = g.select('circle');
                g.attr('transform', `translate(0,${i * this.config.mark_thickness * 2})`);
            });
        });
    }
}
