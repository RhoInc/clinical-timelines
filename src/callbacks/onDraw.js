import sortYdomain from './onDraw/sortYdomain';

export default function onDraw() {
    const context = this;

    //Sort y-axis based on `Sort IDs` control selection.
    sortYdomain.call(this);

    //Add left margin for y-axis grouping.
    this.svg.selectAll('.grouping').remove();
    if (this.config.y.grouping && this.config.grouping_direction === 'vertical')
        this.config.margin.right = 40;
    else delete this.config.margin.right;
}
