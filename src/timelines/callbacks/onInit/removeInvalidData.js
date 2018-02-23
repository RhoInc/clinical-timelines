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
}
