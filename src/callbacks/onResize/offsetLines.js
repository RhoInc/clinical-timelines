import { nest, select } from 'd3';

export default function offsetLines(mark, markData) {
    //Nest data by study day and filter on any nested object with more than one datum.
    const participantData = nest()
        .key(d => d.values[0].values.raw[0][this.config.id_col])
        .key(d => d.key)
        .rollup(d => {
            //Expose start and end point of line.
            return {
                x1: +d[0].values[0].key,
                x2: +d[0].values[1].key
            };
        })
        .entries(markData.filter(d => d.values.length > 1));

    //For each participant...
    participantData.forEach(participantDatum => {
        const lineData = participantDatum.values;

        //Attach line x-coordinates to line object.
        lineData.forEach(lineDatum => {
            lineDatum.x1 = lineDatum.values.x1;
            lineDatum.x2 = lineDatum.values.x2;
        });

        //Capture all line x-coordinates in an array.
        const lineCoordinates = lineData.map(di => [di.x1, di.x2]),
            overlapping = lineData
                .filter(lineDatum => {
                    const overlap = lineCoordinates.filter(
                        lineCoordinate =>
                            (lineCoordinate[0] <= lineDatum.x1 &&
                                lineCoordinate[1] >= lineDatum.x1) ||
                            (lineDatum.x1 <= lineCoordinate[0] &&
                                lineDatum.x2 >= lineCoordinate[0]) ||
                            (lineCoordinate[0] <= lineDatum.x2 &&
                                lineCoordinate[1] >= lineDatum.x2) ||
                            (lineDatum.x1 <= lineCoordinate[1] && lineDatum.x2 >= lineCoordinate[1])
                    );

                    return overlap.length > 1;
                })
                .sort((a, b) => a.x1 - b.x1 + (a.x2 - b.x2));

        //For each overlapping line...
        overlapping.forEach((lineDatum, i) => {
            let nOverlapping = 0,
                x1,
                x2,
                previousLineDatum;

            //Leave first line where it is.
            if (i === 0) {
                x1 = lineDatum.x1;
                x2 = lineDatum.x2;
            } else if (i > 0) {
                previousLineDatum = overlapping[i - 1];
                if (
                    (x2 <= lineDatum.x1 && x1 >= lineDatum.x1) ||
                    (lineDatum.x1 <= x2 && lineDatum.x2 >= x2) ||
                    (x2 <= lineDatum.x2 && x1 >= lineDatum.x2) ||
                    (lineDatum.x1 <= x1 && lineDatum.x2 >= x1)
                ) {
                    console.log('+1');
                    nOverlapping += 1;
                } else {
                    nOverlapping -= 1;
                }
            }
        });
    });
}
