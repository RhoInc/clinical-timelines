import { nest, select } from 'd3';

export default function offsetCircles(mark, markData) {
    //Nest data by study day and filter on any nested object with more than one datum.
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

    //For each study day with more than one event...
    overlapping.forEach(d => {
        const x = d.key.split('|')[0], // study day
            y = d.key.split('|')[1]; // ID

        //For each overlapping point...
        d.values.keys.forEach((di, i) => {
            //Capture point via its class name and offset vertically.
            const className = `${di} point`,
                g = select(document.getElementsByClassName(className)[0]),
                point = g.select('circle');
            g.attr('transform', `translate(0,${i * +mark.radius * 2})`);
        });
    });
}
