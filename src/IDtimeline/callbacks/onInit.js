import { min, max, time } from 'd3';

export default function onInit() {
    const context = this;

    //Sync color domain of multiples with color domain of clinical timelines.
    this.config.x.domain = [
        min(
            this.parent.clinicalTimelines.raw_data,
            d =>
                this.config.time_scale === 'Study Day'
                    ? +d[this.config.stdy_col]
                    : time.format(this.config.date_format).parse(d[this.config.stdt_col])
        ),
        max(
            this.parent.clinicalTimelines.raw_data,
            d =>
                this.config.time_scale === 'Study Day'
                    ? +d[this.config.endy_col]
                    : time.format(this.config.date_format).parse(d[this.config.endt_col])
        )
    ];
    this.config.color_dom = this.parent.clinicalTimelines.config.color_dom;
    this.config.legend.order = this.parent.clinicalTimelines.config.legend.order;
}
