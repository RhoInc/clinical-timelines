import checkTimeScales from './checkOtherControls/checkTimeScales';
import updateTimeRangeControls from './checkOtherControls/updateTimeRangeControls';

export default function checkOtherControls() {
    this.controls.config.inputs.filter(input => input.type !== 'subsetter').forEach(input => {
        //Set values of Event Type highlighting control to event types present in the data.
        if (input.description === 'Event highlighting')
            input.values = this.config.color_dom.slice();
        else if (input.description === 'Y-axis grouping')
            input.values = this.config.groupings.map(grouping => grouping.label);

        return true;
    });

    checkTimeScales.call(this);
    updateTimeRangeControls.call(this);
}
