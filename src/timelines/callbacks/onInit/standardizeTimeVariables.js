import { time } from 'd3';

//Standardize invalid date and day values.
export default function standardizeTimeVariables() {
    this.initial_data.forEach((d, i) => {
        const has_stdt = d.hasOwnProperty(this.config.stdt_col),
            has_endt = d.hasOwnProperty(this.config.endt_col),
            has_stdy = d.hasOwnProperty(this.config.stdy_col),
            has_endy = d.hasOwnProperty(this.config.endy_col);

        //Set to an empty string invalid date and day values.
        if (has_stdt) {
            if (!time.format(this.config.date_format).parse(d[this.config.stdt_col]))
                d[this.config.stdt_col] = '';
        }
        if (has_endt) {
            if (!time.format(this.config.date_format).parse(d[this.config.endt_col]))
                d[this.config.endt_col] = d[this.config.stdt_col];
        }
        if (has_stdy) {
            if (!/^ *\d+ *$/.test(d[this.config.stdy_col])) d[this.config.stdy_col] = '';
        }
        if (has_endy) {
            if (!/^ *\d+ *$/.test(d[this.config.endy_col]))
                d[this.config.endy_col] = d[this.config.stdy_col];
        }

        //Concatenate date and day values for listing.
        d.stdtdy =
            has_stdt && has_stdy && d[this.config.stdy_col] !== ''
                ? d[this.config.stdt_col] + ' (' + d[this.config.stdy_col] + ')'
                : d[this.config.stdt_col] || d[this.config.stdy_col];
        d.endtdy =
            has_endt && has_endy && d[this.config.endy_col] !== ''
                ? d[this.config.endt_col] + ' (' + d[this.config.endy_col] + ')'
                : d[this.config.endt_col] || d[this.config.endy_col];
    });
}
