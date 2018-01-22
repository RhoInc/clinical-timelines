import { min, max, time } from 'd3';

export default function onInit() {
    this.config.color_dom = this.parent.timelines.config.color_dom;
    this.config.legend.order = this.parent.timelines.config.legend.order;
    this.config.x.domain = null;
    this.config.marks.forEach(mark => {
        mark.attributes['clip-path'] = `url(#${this.id})`;
    });
}
