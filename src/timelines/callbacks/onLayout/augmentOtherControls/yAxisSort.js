import { select as d3select } from 'd3';

export default function yAxisSort(select, d) {
    const sort = d3select(select)
        .select('option:checked')
        .text();

    //Update grouping settings.
    if (sort === 'By Earliest Event') this.config.y.sort = 'earliest';
    else if (sort === 'Alphanumerically') this.config.y.sort = 'alphabetical-descending';

    //Redraw.
    this.draw();
}
