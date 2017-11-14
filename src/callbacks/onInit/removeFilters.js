import { set } from 'd3';

export default function removeFilters() {
    this.controls.config.inputs = this.controls.config.inputs.filter(input => {
        if (input.type !== 'subsetter') {
            //Set values of Event Type highlighting control to event types present in the data.
            if (input.description === 'Event highlighting') input.values = this.config.color_dom;
            else if (input.description === 'Y-axis grouping')
                input.values = this.config.groupings.map(grouping => grouping.value_col);

            return true;
        } else if (!this.raw_data[0].hasOwnProperty(input.value_col)) {
            console.warn(input.value_col + ' filter removed because the variable does not exist.');

            return false;
        } else {
            const levels = set(this.raw_data.map(d => d[input.value_col])).values();

            if (levels.length < 2) {
                console.warn(
                    input.value_col + ' filter removed because the variable has only one level.'
                );
            }

            return levels.length > 1;
        }
    });
}
