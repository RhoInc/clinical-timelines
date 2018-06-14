import { nest, select, time, min, max } from 'd3';

export default function offsetLines(mark, markData) {
    const context = this;

    if (
        this.config.offset_col &&
        this.raw_data.length &&
        this.raw_data[0].hasOwnProperty(this.config.offset_col)
    ) {
        this.svg.selectAll('g.line').each(function(d) {
            select(this).attr(
                'transform',
                `translate(0,${d.offset * context.config.mark_thickness * 2})`
            );
        });
    } else {
        //Nest data by time interval and filter on any nested object with more than one datum.
        const IDdata = nest()
            .key(d => d.values[0].values.raw[0][this.config.id_col])
            .key(d => d.key)
            .rollup(d => {
                //Expose start and end point of line.
                return this.config.time_scale === 'day'
                    ? {
                          x1: +d[0].values[0].key,
                          x2: +d[0].values[1].key
                      }
                    : {
                          x1: new Date(d[0].values[0].key),
                          x2: new Date(d[0].values[1].key)
                      };
            })
            .entries(markData.filter(d => d.values.length > 1));

        //For each ID...
        IDdata.forEach(IDdatum => {
            const lineData = IDdatum.values;

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
                                (lineDatum.x1 <= lineCoordinate[1] &&
                                    lineDatum.x2 >= lineCoordinate[1])
                        );

                        return overlap.length > 1;
                    })
                    .sort((a, b) => {
                        const x1diff = a.x1 - b.x1,
                            x2diff = b.x2 - a.x2;
                        return x1diff !== 0
                            ? x1diff
                            : x2diff !== 0
                                ? x2diff
                                : a.key < b.key
                                    ? -1
                                    : 1;
                    });

            if (overlappingLines.length) {
                let currentlyOverlappingLines = [];

                //For each overlapping line...
                overlappingLines.forEach((currentLine, i) => {
                    if (i === 0) {
                        currentLine.offset = 0;
                        currentlyOverlappingLines.push(currentLine);
                    } else {
                        currentlyOverlappingLines.forEach(d => {
                            const currLapsPrevX1 = currentLine.x1 <= d.x1 && currentLine.x2 >= d.x1,
                                currLapsPrevX2 = currentLine.x1 <= d.x2 && currentLine.x2 >= d.x2,
                                currLapsPrev = currentLine.x1 <= d.x1 && currentLine.x2 >= d.x2,
                                prevLapsCurrX1 = d.x1 <= currentLine.x1 && d.x2 >= currentLine.x1,
                                prevLapsCurrX2 = d.x1 <= currentLine.x2 && d.x2 >= currentLine.x2,
                                prevLapsCurr = d.x1 <= currentLine.x1 && d.x2 >= currentLine.x2;

                            d.overlapping =
                                currLapsPrevX1 ||
                                currLapsPrevX2 ||
                                currLapsPrev ||
                                prevLapsCurrX1 ||
                                prevLapsCurrX2 ||
                                prevLapsCurr;
                        });
                        const nOverlapping = currentlyOverlappingLines.filter(d => d.overlapping)
                            .length;

                        //if no lines are currently overlapping reset currently overlapping lines
                        if (nOverlapping === 0) {
                            currentLine.offset = 0;
                            currentlyOverlappingLines = [currentLine];
                        } else if (nOverlapping === currentlyOverlappingLines.length) {
                            //else if all lines are currently overlapping increase offset and add current line to currently overlapping lines
                            currentLine.offset = max(currentlyOverlappingLines, d => d.offset) + 1;
                            currentlyOverlappingLines.push(currentLine);
                        } else {
                            //otherwise replace non-overlapping line with the smallest offset with current line
                            currentlyOverlappingLines.forEach((d, i) => {
                                d.index = i;
                            });
                            const minOffset = min(
                                    currentlyOverlappingLines.filter(d => !d.overlapping),
                                    d => d.offset
                                ),
                                minIndex = currentlyOverlappingLines.filter(
                                    d => d.offset === minOffset
                                )[0].index;
                            currentLine.offset = minOffset;
                            currentlyOverlappingLines.splice(minIndex, 1, currentLine);
                        }
                    }

                    //Offset lines vertically.
                    const className = `${currentLine.key} line`;
                    const g = select(
                        this.clinicalTimelines.document.getElementsByClassName(className)[0]
                    );
                    g.attr(
                        'transform',
                        currentLine.offset > 0
                            ? `translate(0,${currentLine.offset * this.config.mark_thickness * 2})`
                            : 'translate(0,0)'
                    );
                });
            }
        });
    }
}
