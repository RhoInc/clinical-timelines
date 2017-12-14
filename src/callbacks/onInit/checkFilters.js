import { set } from 'd3';

export default function checkFilters() {
    this.controls.config.inputs = this.controls.config.inputs.filter(input => {
        if (input.type !== 'subsetter') return true;
        else if (!this.raw_data[0].hasOwnProperty(input.value_col)) {
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
