export default function IDdetails() {
    //Add ID characteristics.
    this.clinicalTimelines.containers.IDdetails.selectAll('div.ct-characteristic.ct-ID-detail')
        .data(this.config.id_characteristics)
        .enter()
        .append('div')
        .classed('ct-characteristic ct-ID-detail', true)
        .html(d => `${d.label}: <span id = '${d.value_col}'></span>`);

    //Add ID characteristics.
    if (Array.isArray(this.config.id_urls) && this.config.id_urls.length) {
        this.clinicalTimelines.containers.IDdetails.selectAll('div.ct-characteristic.ct-ID-URL')
            .data(this.config.id_urls)
            .enter()
            .append('div')
            .classed('ct-characteristic ct-ID-URL', true)
            .html(d => `<span id = '${d.value_col}'><a>${d.label}</a></span>`);
    }
}
