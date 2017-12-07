export default function addDataDrivenTooltips() {
    if (this.raw_data[0].hasOwnProperty(this.config.tooltip_col)) {
        this.config.marks.forEach(mark => {
            mark.tooltip = `${mark.tooltip}\n[${this.config.tooltip_col}]`;
        });
        this.config.IDtimelineSettings.marks.forEach(mark => {
            mark.tooltip = `${mark.tooltip}\n[${this.config.tooltip_col}]`;
        });
    }
}
