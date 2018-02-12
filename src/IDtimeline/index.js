import { createChart, multiply } from 'webcharts';
import callbacks from './callbacks/index';

export default function IDtimeline() {
    this.IDtimeline = createChart(this.containers.IDtimeline.node(), this.settings.IDtimeline);

    for (const callback in callbacks)
        this.IDtimeline.on(callback.substring(2).toLowerCase(), callbacks[callback]);

    this.IDtimeline.clinicalTimelines = this;
}
