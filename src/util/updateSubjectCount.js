/*------------------------------------------------------------------------------------------------\
  Annotate number of participants based on current filters, number of participants in all, and
  the corresponding percentage.

  Inputs:

    chart - a webcharts chart object
    id_unit - a text string to label the units in the annotation (default = 'participants')
    selector - css selector for the annotation
\------------------------------------------------------------------------------------------------*/

import { set, format, select } from 'd3';

export default function updateSubjectCount(chart, selector, id_unit) {
    //count the number of unique ids in the current chart and calculate the percentage
    const filtered_data = chart.raw_data.filter(d => {
        let filtered = d[chart.config.seq_col] === '';
        chart.filters.forEach(di => {
            if (filtered === false && di.val !== 'All')
                filtered =
                    Object.prototype.toString.call(di.val) === '[object Array]'
                        ? di.val.indexOf(d[di.col]) === -1
                        : di.val !== d[di.col];
        });
        return !filtered;
    });
    const currentObs = set(filtered_data.map(d => d[chart.config.id_col])).values().length;

    const percentage = format('0.1%')(currentObs / chart.populationCount);

    //clear the annotation
    let annotation = select(selector);
    annotation.selectAll('*').remove();

    //update the annotation
    const units = id_unit ? ' ' + id_unit : ' participant(s)';
    annotation.text(
        currentObs + ' of ' + chart.populationCount + units + ' shown (' + percentage + ')'
    );
}
