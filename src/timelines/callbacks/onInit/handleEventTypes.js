import { set } from 'd3';

export default function handleEventTypes() {
    this.allEventTypes = set(this.initial_data.map(d => d[this.config.event_col]))
        .values()
        .sort();
    this.currentEventTypes = this.config.event_types || this.allEventTypes;
    this.controls.config.inputs.find(
        input => input.description === 'Event Type'
    ).start = this.currentEventTypes;
    this.config.color_dom = this.currentEventTypes.concat(
        this.allEventTypes
            .filter(eventType => this.currentEventTypes.indexOf(eventType) === -1)
            .sort()
    );
    this.config.legend.order = this.config.color_dom;
}
