import offsetLines from './offsetMarks/offsetLines';
import offsetCircles from './offsetMarks/offsetCircles';

export default function offsetMarks() {
    this.config.marks.forEach((mark, i) => {
        const markData = this.marks[i].data;
        if (mark.type === 'line') {
            //Identify marks which represent ongoing events.
            if (this.config.ongo_col)
                markData.forEach(d => {
                    d.ongoing = d.values[0].values.raw[0][this.config.ongo_col];
                });
            offsetLines.call(this, mark, markData);
        } else if (mark.type === 'circle') {
            offsetCircles.call(this, mark, markData);
        }
    });
}
