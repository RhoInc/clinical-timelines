export default function defineFilteredData() {
    //Redefine filtered data as it defaults to the final mark drawn, which might be filtered in
    //addition to the current filter selections.
    this.filtered_long_data = this.raw_data.filter(d => {
        let filtered = false;

        this.filters.forEach(di => {
            if (filtered === false && di.val !== 'All') {
                filtered =
                    di.val instanceof Array
                        ? di.val.indexOf(d[di.col]) === -1
                        : di.val !== d[di.col];
            }
        });

        return !filtered;
    });
    this.raw_data = this.filtered_long_data;

    //Define subset of original raw data.
    this.filtered_wide_data = this.wide_data.filter(d => {
        let filtered = false;

        this.filters.forEach(di => {
            if (filtered === false && di.val !== 'All') {
                filtered =
                    di.val instanceof Array
                        ? di.val.indexOf(d[di.col]) === -1
                        : di.val !== d[di.col];
            }
        });

        return !filtered;
    });
}
