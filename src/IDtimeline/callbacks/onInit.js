export default function onInit() {
    const context = this;

    //Sync color domain of multiples with color domain of clinical timelines.
    this.config.color_dom = this.parent.clinicalTimelines.config.color_dom;
    this.config.legend.order = this.parent.clinicalTimelines.config.legend.order;
}
