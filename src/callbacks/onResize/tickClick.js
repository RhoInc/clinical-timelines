import drawIDtimeline from '../functions/drawIDtimeline';
import updateIDfilter from '../functions/updateIDfilter';
import enableDisableControls from '../functions/enableDisableControls';

export default function tickClick() {
    drawIDtimeline.call(this);
    enableDisableControls.call(this);
    updateIDfilter.call(this);

    //Highlight ID dropdown.
    this.controls.wrap
        .selectAll('.control-group')
        .filter(control => control.value_col === this.config.id_col)
        .style({
            'font-weight': 'bold'
        })
        .transition()
        .delay(500)
        .style({
            'font-weight': 'normal'
        })
        .select('select')
        .node()
        .focus();
}
