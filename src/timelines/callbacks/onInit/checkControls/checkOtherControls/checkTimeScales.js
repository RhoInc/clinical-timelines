import syncTimeScaleSettings from '../../../../../defaults/syncSettings/syncTimeScaleSettings';

export default function checkTimeScales() {
    this.controls.config.inputs = this.controls.config.inputs.filter(input => {
        if (input.description !== 'X-axis scale') return true;
        else {
            if (!this.anyDates && !this.anyDays) {
                const errorText = `The data either contain neither ${this.config.stdt_col} nor ${
                    this.config.stdy_col
                } or both ${this.config.stdt_col} and ${
                    this.config.stdy_col
                } contain no valid values.  Please update the settings object to match the variables in the data or clean the data.`;
                this.wrap
                    .append('div')
                    .style('color', 'red')
                    .html(errorText);
                throw new Error(errorText);
            } else if (!this.anyDates && this.config.time_scale === 'Date') {
                console.warn(
                    `The data either do not contain a variable named ${this.config.stdt_col} or ${
                        this.config.stdt_col
                    } contains no valid values.  Please update the settings object to match the variable in the data or clean the data.`
                );
                this.config.time_scale = 'Day';
                syncTimeScaleSettings(this.config);
                this.IDtimeline.config.time_scale = 'Day';
                syncTimeScaleSettings(this.IDtimeline.config);
            } else if (!this.anyDays && this.config.time_scale === 'Day') {
                console.warn(
                    `The data either do not contain a variable named ${this.config.stdy_col} or ${
                        this.config.stdy_col
                    } contains no valid values.  Please update the settings object to match the variable in the data or clean the data.`
                );
                this.config.time_scale = 'Date';
                syncTimeScaleSettings(this.config);
                this.IDtimeline.config.time_scale = 'Date';
                syncTimeScaleSettings(this.IDtimeline.config);
            }

            return this.anyDates && this.anyDays;
        }
    });
}
