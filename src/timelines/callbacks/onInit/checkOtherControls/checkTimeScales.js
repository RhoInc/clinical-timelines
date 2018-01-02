import syncTimeScaleSettings from '../../../../defaults/syncSettings/syncTimeScaleSettings';

export default function checkTimeScales() {
    this.controls.config.inputs = this.controls.config.inputs.filter(input => {
        if (input.description !== 'X-axis scale') return true;
        else {
            const anyDates = this.initial_data.some(d => d.hasOwnProperty(this.config.stdt_col)),
                anyDays = this.initial_data.some(d => d.hasOwnProperty(this.config.stdy_col));

            if (!anyDates && !anyDays) {
                const errorText = `The data contain neither ${this.config.stdt_col} nor ${
                    this.config.stdy_col
                }.  Please update the settings object to match the variables in the data.`;
                this.wrap
                    .append('div')
                    .style('color', 'red')
                    .html(errorText);
                throw new Error(errorText);
            } else if (!anyDates && this.config.time_scale === 'date') {
                this.config.time_scale = 'day';
                syncTimeScaleSettings(this.config);
                this.IDtimeline.config.time_scale = 'day';
                syncTimeScaleSettings(this.IDtimeline.config);
            } else if (!anyDays && this.config.time_scale === 'day') {
                this.config.time_scale = 'date';
                syncTimeScaleSettings(this.config);
                this.IDtimeline.config.time_scale = 'date';
                syncTimeScaleSettings(this.IDtimeline.config);
            }

            return anyDates && anyDays;
        }
    });
}
