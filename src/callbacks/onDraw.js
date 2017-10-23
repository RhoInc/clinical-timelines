import sortYdomain from './onDraw/sortYdomain';

export default function onDraw() {
    const context = this;

    //Sort y-axis based on `Sort IDs` control selection.
    sortYdomain.call(this);
}
