import { min, max, time } from 'd3';

export default function onInit() {
    const context = this;

    this.config.color_dom = this.parent.clinicalTimelines.config.color_dom;
    this.config.legend.order = this.parent.clinicalTimelines.config.legend.order;
    this.config.x.domain = null;
}
