import offsetCircles from './offsetOverlappingMarks/offsetCircles';
import offsetLines from './offsetOverlappingMarks/offsetLines';

export default function offsetOverlappingMarks() {
    this.config.marks.forEach((mark, i) => {
        const markData = this.marks[i].data;

        //Identify marks which represent ongoing events.
        if (
            this.config.ongo_col &&
            this.raw_data.length &&
            this.raw_data[0].hasOwnProperty(this.config.ongo_col)
        )
            markData.forEach(d => {
                d.ongoing =
                    mark.type === 'line'
                        ? d.values[0].values.raw[0][this.config.ongo_col]
                        : d.values.raw[0][this.config.ongo_col];
            });

        //Attach offset value to each mark datum.
        if (
            this.config.offset_col &&
            this.raw_data.length &&
            this.raw_data[0].hasOwnProperty(this.config.offset_col)
        )
            markData.forEach(d => {
                d.offset =
                    mark.type === 'line'
                        ? d.values[0].values.raw[0][this.config.offset_col]
                        : d.values.raw[0][this.config.offset_col];
            });

        if (mark.type === 'line') offsetLines.call(this, mark, markData);
        else if (mark.type === 'circle') offsetCircles.call(this, mark, markData);
    });
}
