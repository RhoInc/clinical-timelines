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
            overlappingLines = lineData
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

        if (overlappingLines.length) {
            console.log('- - - - -');
            console.log(participantDatum.key);
            let currentlyOverlappingLines = [];

            //For each overlapping line...
            overlappingLines.forEach((currentLine, i) => {
                //Leave first line as is.
                if (i === 0) {
                    currentLine.offset = 0;
                    currentlyOverlappingLines.push(currentLine);
                } else if (i > 0) {
                    //Otherwise calculate overlap.
                    let previousLine;
                    const nOverlapping = currentlyOverlappingLines.length;

                    for (let j = 0; j < nOverlapping; j++) {
                        previousLine = currentlyOverlappingLines[j];

                        const
                            currLapsPrevX1 = (currentLine.x1 <= previousLine.x1 && currentLine.x2 >= previousLine.x1),
                            currLapsPrevX2 = (currentLine.x1 <= previousLine.x2 && currentLine.x2 >= previousLine.x2),
                            currLapsPrev = (currentLine.x1 <= previousLine.x1 && currentLine.x2 >= previousLine.x2),

                            prevLapsCurrX1 = (previousLine.x1 <= currentLine.x1 && previousLine.x2 >= currentLine.x1),
                            prevLapsCurrX2 = (previousLine.x1 <= currentLine.x2 && previousLine.x2 >= currentLine.x2),
                            prevLapsCurr = (previousLine.x1 <= currentLine.x1 && previousLine.x2 >= currentLine.x2);

                        if (currLapsPrevX1 || currLapsPrevX2 || currLapsPrev ||
                            prevLapsCurrX1 || prevLapsCurrX2 || prevLapsCurr) {
                            console.log('if');
                            currentLine.offset = max(
                                currentlyOverlappingLines,
                                lineDatum => lineDatum.offset
                            ) + 1;
                            currentlyOverlappingLines.push(currentLine);
                            console.log(currentlyOverlappingLines.map(d => d.offset));
                            break;
                        } else {
                            console.log('else');
                            currentLine.offset = previousLine.offset;
                            currentlyOverlappingLines = currentlyOverlappingLines.splice(j,1,currentLine);
                            console.log(currentlyOverlappingLines.map(d => d.offset));
                            break;
                        }
                    }

                    //Capture line via its class name and offset vertically.
                    const
                        className = `${currentLine.key} line`,
                        g = select(document.getElementsByClassName(className)[0]),
                        line = g.select('path');
                        g.attr('transform', `translate(0,${currentLine.offset * +mark.attributes['stroke-width']*2})`);
                }
            });
            console.table(overlappingLines);
        }
    });
}
