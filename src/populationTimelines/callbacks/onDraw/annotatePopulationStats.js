import { set, format } from 'd3';

export default function annotatePopulationStats() {
    const
        filtered_data = this.raw_data
            .filter(d => {
                let filtered = d[chart.config.seq_col] === '';

                this.filters.forEach(di => {
                    if (filtered === false && di.val !== 'All')
                        filtered = Object.prototype.toString.call(di.val) === '[object Array]'
                            ? di.val.indexOf(d[di.col]) === -1
                            : di.val !== d[di.col];
                });

                return !filtered;
            });

    this.populationStats.nParticipants = this.y_dom.length;
    this.populationStats.rate = this.populationStats.nParticipants / this.populationStats.Nparticipants;

    this.populationStats.annotation
        .text(`${this.populationStats.nParticipants} of ${this.populationStats.Nparticipants} displayed (${format('%')(this.populationStats.rate)})`);
}
