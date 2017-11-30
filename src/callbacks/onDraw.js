import sortYdomain from './onDraw/sortYdomain';

export default function onDraw() {
    const context = this;

    //Sort y-axis based on `Sort IDs` control selection.
    sortYdomain.call(this);

    //Clear grouping elements.
    this.svg.selectAll('.grouping').remove();

    //Add right margin for vertical y-axis grouping.
    if (this.config.grouping_direction === 'vertical') {
        if (this.config.y.grouping) this.config.margin.right = 40;
        else delete this.config.margin.right;
    }

    //Update top x-axis.
    this.svg.select('g.x-top.axis text.axis-title.top').text(this.config.time_scale);
}
