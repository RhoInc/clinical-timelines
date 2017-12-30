import { createTable } from 'webcharts';
import callbacks from './callbacks/index';

export default function listing() {
    this.listing = createTable(this.containers.listing.node(), this.settings.listing);

    for (const callback in callbacks)
        this.listing.on(callback.substring(2).toLowerCase(), callbacks[callback]);

    this.listing.clinicalTimelines = this;
}
