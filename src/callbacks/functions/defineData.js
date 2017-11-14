import lengthenRaw from './lengthenRaw';
import { merge } from 'd3';

export default function defineData() {
    const singleDayEvents = this.wide_data
            .filter(
                d =>
                    d[this.config.stdy_col] === d[this.config.endy_col] ||
                    d[this.config.stdt_col] === d[this.config.endt_col]
            )
            .map(d => {
                d.wc_category = this.config.time_scale === 'Study Day' ? 'DY' : 'DT';
                d.wc_value =
                    this.config.time_scale === 'Study Day'
                        ? d[this.config.stdy_col]
                        : d[this.config.stdt_col];
                return d;
            }),
        multiDayEvents = lengthenRaw(
            this.wide_data.filter(
                d =>
                    d[this.config.stdy_col] !== d[this.config.endy_col] ||
                    d[this.config.stdt_col] !== d[this.config.endt_col]
            ),
            this.config.time_scale === 'Study Day'
                ? [this.config.stdy_col, this.config.endy_col]
                : [this.config.stdt_col, this.config.endt_col]
        );
    this.raw_data = merge([singleDayEvents, multiDayEvents]);
}
