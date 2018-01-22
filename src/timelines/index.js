import { createChart } from 'webcharts';
import callbacks from './callbacks/index';

export default function timelines() {
    //Create timelines.
    this.timelines = createChart(
        this.containers.timelines.node(),
        this.settings.synced,
        this.controls
    );

    for (const callback in callbacks)
        this.timelines.on(callback.substring(2).toLowerCase(), callbacks[callback]);

    this.timelines.clinicalTimelines = this;
}
