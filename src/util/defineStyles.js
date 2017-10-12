export default function defineStyles() {
    const styles = [
            '#clinical-timelines .hidden {' +
            '    display: none !important;' +
            '}',
            '#clinical-timelines .wc-controls {' +
            '    border: 1px solid #eee;' +
            '    padding: 5px;' +
            '}',
            '#clinical-timelines .wc-controls .population-details {' +
            '    float: right;' +
            '}',
            '#clinical-timelines .wc-controls .population-details .stats {' +
            '    font-weight: bold;' +
            '}',
            '#clinical-timelines .wc-controls .participant-details {' +
            '    display: block;' +
            '}',
            '#clinical-timelines .wc-controls .participant-details > * {' +
            '    display: inline-block;' +
            '    font-size: 16px;' +
            '}',
            '#clinical-timelines .wc-controls .participant-details .back-button button {' +
            '    padding: 0 5px;' +
            '    font-size: 14px;' +
            '}',
            '#clinical-timelines .wc-controls .participant-details #participant {' +
            '    font-weight: bold;' +
            '}',
            '#clinical-timelines .wc-controls .participant-details .back-button {' +
            '    margin-right: 10px;' +
            '}',
            '#clinical-timelines .wc-chart .wc-svg .y.axis .tick {' +
            '    cursor: pointer;' +
            '    fill: blue;' +
            '    text-decoration: underline;' +
            '}',
            '#clinical-timelines .wc-small-multiples .wc-chart {' +
            '    width: 100%;' +
            '    padding: 0;' +
            '}',
            '#clinical-timelines .wc-small-multiples .wc-chart .wc-chart-title {' +
            '    text-align: left;' +
            '    font-size: 21px;' +
            '    padding-bottom: 5px;' +
            '}',
            '#clinical-timelines .wc-small-multiples .wc-chart .wc-svg .y.axis .tick {' +
            '    cursor: default;' +
            '    fill: black;' +
            '    text-decoration: none;' +
            '}'
        ],
        style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = styles.join('\n');

    document.getElementsByTagName('head')[0].appendChild(style);
}
