//Remove invalid time data.
export default function cleanData() {
    this.wide_data = this.initial_data.filter(d => d[this.config.st_col] !== '');

    //Warn user of removed records.
    if (this.wide_data.length < this.initial_data.length) {
        if (this.config.time_scale === 'Date')
            console.warn(
                `${this.initial_data.length -
                    this.wide_data
                        .length} records have been removed due to missing or invalid date variable values that do not match settings.date_format (${
                    this.config.date_format
                })`
            );
        else if (this.config.time_scale === 'Day')
            console.warn(
                `${this.initial_data.length -
                    this.wide_data
                        .length} records have been removed due to missing or invalid day variable values.`
            );
    }
}
