import { set } from 'd3';
import syncColors from './util/syncColors';
import addHighlightLegendItem from './util/addHighlightLegendItem';

export default function onResize() {
    let context = this;

    //Sync legend and mark colors.
    syncColors(this);

    //Add highlight adverse event legend item.
    if (this.config.highlight) addHighlightLegendItem(this);

    //Draw second x-axis at top of chart.
    let x2Axis = svg
        .axis()
        .scale(this.x)
        .orient('top')
        .tickFormat(this.xAxis.tickFormat())
        .innerTickSize(this.xAxis.innerTickSize())
        .outerTickSize(this.xAxis.outerTickSize())
        .ticks(this.xAxis.ticks()[0]);
    let g_x2_axis = this.svg.select('g.x2.axis').attr('class', 'x2 axis linear');
    g_x2_axis.call(x2Axis);
    g_x2_axis
        .select('text.axis-title.top')
        .attr('transform', 'translate(' + this.raw_width / 2 + ',-' + this.config.margin.top + ')');
    g_x2_axis.select('.domain').attr({
        fill: 'none',
        stroke: '#ccc',
        'shape-rendering': 'crispEdges'
    });
    g_x2_axis.selectAll('.tick line').attr('stroke', '#eee');

    //Draw second chart when y-axis tick label is clicked.
    this.svg
        .select('.y.axis')
        .selectAll('.tick')
        .style('cursor', 'pointer')
        .on('click', d => {
            let csv2 = this.raw_data.filter(di => di[this.config.id_col] === d);
            this.chart2.wrap.style('display', 'block');
            this.chart2.draw(csv2);
            this.chart2.wrap
                .select('#backButton')
                .append('strong')
                .attr('class', 'id-title')
                .style('margin-left', '1%')
                .text('Participant: ' + d);

            //Sort listing by sequence.
            const seq_col = context.config.seq_col;
            let tableData = this.superRaw
                .filter(di => di[this.config.id_col] === d)
                .sort((a, b) => (+a[seq_col] < b[seq_col] ? -1 : 1));

            //Define listing columns.
            this.table.config.cols = set(
                this.config.details.map(detail => detail.value_col)
            ).values();
            this.table.config.headers = set(
                this.config.details.map(detail => detail.label)
            ).values();
            this.table.draw(tableData);
            this.table.wrap.selectAll('th,td').style({
                'text-align': 'left',
                'padding-right': '10px'
            });

            //Hide timelines.
            this.wrap.style('display', 'none');
            this.controls.wrap.style('display', 'none');
        });

    /**-------------------------------------------------------------------------------------------\
      Second chart callbacks.
    \-------------------------------------------------------------------------------------------**/

    this.chart2.on('datatransform', function() {
        //Define color scale.
        this.config.color_dom = context.colorScale.domain();
    });

    this.chart2.on('draw', function() {
        //Sync x-axis domain of second chart with that of the original chart.
        this.x_dom = context.x_dom;
    });

    this.chart2.on('resize', function() {
        //Sync legend and mark colors.
        syncColors(this);

        //Add highlight adverse event legend item.
        if (this.config.highlight) addHighlightLegendItem(this);
    });
}
