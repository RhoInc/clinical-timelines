import { nest, select, max } from 'd3';

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
            delete lineDatum.values;
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
                .sort((a, b) => {
                    const x1diff = a.x1 - b.x1,
                        x2diff = b.x2 - a.x2;
                    return x1diff !== 0 ? x1diff : x2diff !== 0 ? x2diff : a.key < b.key ? -1 : 1;
                });

        if (overlapping.length) {
            //Declare offset and initial line's x-coordinates.
            console.log('- - - - -');
            console.log(participantDatum.key);
            console.table(overlapping);
            const overlappingLines = [];

            //For each overlapping line...
            overlapping.forEach((lineDatum, i) => {
                //Leave first line as is.
                if (i === 0)
                    overlappingLines.push({
                        x1: lineDatum.x1,
                        x2: lineDatum.x2,
                        offset: 0
                    });
                else if (i > 0) {
                    //Otherwise calculate overlap.
                    const nOverlapping = overlappingLines.length;
                    let line, position;

                    for (let j = 0; j < nOverlapping; j++) {
                        line = overlappingLines[j];

                        if (
                            (lineDatum.x1 <= line.x2 && lineDatum.x2 >= line.x2) ||
                            (lineDatum.x1 <= line.x1 && lineDatum.x2 >= line.x1) ||
                            (line.x2 <= lineDatum.x1 && line.x1 >= lineDatum.x1) ||
                            (line.x2 <= lineDatum.x2 && line.x1 >= lineDatum.x2)
                        ) {
                            overlappingLines.push({
                                x1: lineDatum.x1,
                                x2: lineDatum.x2,
                                offset:
                                    d3.max(
                                        overlappingLines,
                                        overlappingLine => overlappingLine.offset
                                    ) + 1
                            });
                        } else {
                            console.log(line);
                            console.log(lineDatum);
                        }
                    }

                    //console.log(lineDatum.key);
                    //console.log(offset);
                    ////Capture line via its class name and offset vertically.
                    //const className = `${lineDatum.key} line`,
                    //    g = select(document.getElementsByClassName(className)[0]),
                    //    line = g.select('path');
                    //g.attr('transform', `translate(0,${offset * +mark.attributes['stroke-width'] + 1})`);
                }
            });
        }
    });
}
