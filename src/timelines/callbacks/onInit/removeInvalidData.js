//Remove records with missing key variables.
export default function removeInvalidData() {
    this.initial_data = this.raw_data.filter(
        d => !/^\s*$/.test(d[this.config.id_col]) && !/^\s*$/.test(d[this.config.event_col])
    );

    //Warn user of removed records.
    if (this.initial_data.length < this.raw_data.length)
        console.warn(
            `${this.raw_data.length -
                this.initial_data
                    .length} records have been removed due to missing identifiers or event types.`
        );

    //Check which time scales are present in the data.
    this.anyDates = this.initial_data.some(
        d => d.hasOwnProperty(this.config.stdt_col) && d[this.config.stdt_col] !== ''
    );
    this.anyDays = this.initial_data.some(
        d => d.hasOwnProperty(this.config.stdy_col) && d[this.config.stdy_col] !== ''
    );
}
