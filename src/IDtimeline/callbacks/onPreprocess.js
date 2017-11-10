export default function onPreprocess() {
    const context = this;

    //Set x-domain to the x-domain of the clinical timelines.
    this.config.x.domain = this.parent.clinicalTimelines.x_dom;
}
