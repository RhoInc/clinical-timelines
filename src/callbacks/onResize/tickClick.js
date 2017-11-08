import drawParticipantTimeline from '../functions/drawParticipantTimeline';
import updateIDfilter from '../functions/updateIDfilter';
import enableDisableControls from '../functions/enableDisableControls';

export default function tickClick() {
    drawParticipantTimeline.call(this);
    enableDisableControls.call(this);
    updateIDfilter.call(this);

    //Highlight participant dropdown.
    this.controls.wrap
        .selectAll('.control-group')
        .filter(control => control.label === 'Participant')
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
