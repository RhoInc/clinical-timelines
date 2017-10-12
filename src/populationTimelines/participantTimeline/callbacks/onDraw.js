export default function onDraw() {
    const context = this;

    //Sync x-axis domain of second chart with that of the original chart.
    this.x_dom = context.x_dom;
}
