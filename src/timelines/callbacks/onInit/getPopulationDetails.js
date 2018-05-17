import { set } from 'd3';

//Capture and count all IDs in data.
export default function getPopulationDetails() {
    this.populationDetails = {
        population: set(this.raw_data.map(d => d[this.config.id_col])).values()
    };
    this.populationDetails.N = this.populationDetails.population.length;
    this.IDdetails = {};
}
