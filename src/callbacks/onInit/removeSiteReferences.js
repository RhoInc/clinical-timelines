export default function removeSiteReferences() {
    if (!this.raw_data[0].hasOwnProperty(this.config.site_col)) {
        this.config.id_characteristics = this.config.id_characteristics.filter(
            id_characteristic => id_characteristic.value_col !== this.config.site_col
        );
        this.listing.config.cols = this.listing.config.cols.filter(
            col => col !== this.config.site_col
        );
        this.listing.config.headers = this.listing.config.headers.filter(
            header => header !== 'Site'
        );
    }
}
