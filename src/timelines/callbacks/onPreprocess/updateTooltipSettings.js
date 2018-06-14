//If a tooltip variable is specified and exists, attach it to each mark's existing tooltip specification.
export default function updateTooltipSettings() {
    if (this.raw_data[0].hasOwnProperty(this.config.tooltip_col)) {
        this.config.marks.forEach(mark => {
            mark.tooltip = `${mark.tooltip}\n[${this.config.tooltip_col}]`;
        });
        this.clinicalTimelines.settings.IDtimeline.marks.forEach(mark => {
            mark.tooltip = `${mark.tooltip}\n[${this.config.tooltip_col}]`;
        });
    }
}
