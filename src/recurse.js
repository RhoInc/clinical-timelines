export default function recurse() {
    this.timelines.IDtimeline = this.IDtimeline;
    this.timelines.listing = this.listing;
    this.timelines.settings = this.settings;
    this.IDtimeline.timelines = this.timelines;
    this.IDtimeline.listing = this.listing;
    this.IDtimeline.settings = this.settings;
    this.listing.timelines = this.timelines;
    this.listing.IDtimeline = this.IDtimeline;
    this.listing.settings = this.settings;
}
