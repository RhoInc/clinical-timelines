export default function onResize() {
    const context = this;

    //Sync legend and mark colors.
    syncColors(this);
}
