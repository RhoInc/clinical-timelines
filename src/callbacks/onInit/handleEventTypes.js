import { set } from 'd3';

export default function handleEventTypes() {
    this.allEventTypes = set(this.raw_data.map(d => d[this.config.event_col]))
        .values()
        .sort();
    this.currentEventTypes = this.config.event_types || this.allEventTypes;
    this.config.color_dom =
        this.currentEventTypes !== 'All'
            ? this.currentEventTypes.concat(
                  this.allEventTypes
                      .filter(eventType => this.currentEventTypes.indexOf(eventType) === -1)
                      .sort()
              )
            : this.allEventTypes;
    this.config.legend.order = this.config.color_dom;
}
