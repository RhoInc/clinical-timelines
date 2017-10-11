import { set } from 'd3';
import lengthenRaw from './util/lengthenRaw';

export default function onInit() {
    //Count total number of IDs for population count.
    this.populationCount = set(this.raw_data.map(d => d[this.config.id_col])).values().length;

    //Remove non-AE records.
    this.superRaw = this.raw_data.filter(d => /[^\s]/.test(d[this.config.term_col]));

    //Set empty settings.color_by values to 'N/A'.
    this.superRaw.forEach(
        d =>
            (d[this.config.color_by] = /[^\s]/.test(d[this.config.color_by])
                ? d[this.config.color_by]
                : 'N/A')
    );

    //Append unspecified settings.color_by values to settings.legend.order and define a shade of
    //gray for each.
    const color_by_values = set(this.superRaw.map(d => d[this.config.color_by])).values();
    color_by_values.forEach((color_by_value, i) => {
        if (this.config.legend.order.indexOf(color_by_value) === -1) {
            this.config.legend.order.push(color_by_value);
            this.chart2.config.legend.order.push(color_by_value);
        }
    });

    //Derived data manipulation
    this.raw_data = lengthenRaw(this.superRaw, [this.config.stdy_col, this.config.endy_col]);
    this.raw_data.forEach(d => {
        d.wc_value = d.wc_value ? +d.wc_value : NaN;
    });

    // Remove filters for variables with 0 or 1 levels
    var chart = this;

    this.controls.config.inputs = this.controls.config.inputs.filter(function(d) {
        if (d.type != 'subsetter') {
            return true;
        } else {
            var levels = set(chart.raw_data.map(f => f[d.value_col])).values();
            if (levels.length < 2) {
                console.warn(
                    d.value_col + ' filter not shown since the variable has less than 2 levels'
                );
            }
            return levels.length >= 2;
        }
    });

    //Create div for back button and participant ID title.
    this.chart2.wrap
        .insert('div', ':first-child')
        .attr('id', 'backButton')
        .insert('button', '.legend')
        .html('&#8592; Back')
        .style('cursor', 'pointer')
        .on('click', () => {
            this.wrap.style('display', 'block');
            this.table.draw([]);
            this.chart2.wrap.style('display', 'none');
            this.chart2.wrap.select('.id-title').remove();
            this.controls.wrap.style('display', 'block');
        });
}
