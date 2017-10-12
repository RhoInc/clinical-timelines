export default function defineStyles() {
    const styles = [
        '.wc-chart.hidden {' +
        '    display: none !important;' +
        '}',
        '.wc-chart .legend .sample-population {' +
        '    float: right;' +
        '}',
        '.wc-chart .wc-svg .y.axis .tick {' +
        '    cursor: pointer;' +
        '}'
        ],
        style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = styles.join('\n');

    document.getElementsByTagName('head')[0].appendChild(style);
}
