import updateText from './addText/updateText';

export default function addText(reference_line) {
    reference_line.text = reference_line.g.append('text').classed('reference-line-text', true);
    updateText.call(this, reference_line);
}
