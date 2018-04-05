import { min, max, time } from 'd3';

export default function onInit() {
    this.clinicalTimelines = this.parent.clinicalTimelines;
    this.config.color_dom = this.parent.timelines.config.color_dom;
    this.config.legend.order = this.parent.timelines.config.legend.order;
    this.config.x.domain = null;
}
