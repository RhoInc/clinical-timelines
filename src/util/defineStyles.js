export default function defineStyles() {
    const styles = [
            '#clinical-timelines .hidden {' + '    display: none !important;' + '}',
            '#clinical-timelines .wc-controls {' +
                '    border: 1px solid #eee;' +
                '    padding: 5px;' +
                '}',
            '#clinical-timelines .wc-controls .annotation {' +
                '    float: right;' +
                '    font-size: 16px;' +
                '}',
            '#clinical-timelines .wc-controls .annotation .stats,' +
                '#clinical-timelines .wc-controls .annotation #participant {' +
                '    font-weight: bold;' +
                '}',
            '#clinical-timelines .wc-controls .back-button button {' +
                '    padding: 0 5px;' +
                '    font-size: 14px;' +
                '}',
            '#clinical-timelines .wc-chart .wc-svg .y.axis .tick {' +
                '    cursor: pointer;' +
                '    fill: blue;' +
                '    text-decoration: underline;' +
                '}',
            '#clinical-timelines .wc-small-multiples .wc-chart {' +
                '    width: 100%;' +
                '    padding: 0;' +
                '    border-top: 1px solid black;' +
                '}',
            '#clinical-timelines .wc-small-multiples .wc-chart > * {' +
                '    display: inline-block;' +
                '}',
            '#clinical-timelines .wc-small-multiples .wc-chart .wc-svg {' +
                '    float: left;' +
                '    width: 75%;' +
                '}',
            '#clinical-timelines .wc-small-multiples .wc-chart .wc-chart-title {' +
                '    text-align: left;' +
                '    font-size: 21px;' +
                '    padding-left: 10px;' +
                '    width: 24%;' +
                '}',
            '#clinical-timelines .wc-small-multiples .wc-chart .wc-svg .y.axis .tick {' +
                '    cursor: default;' +
                '    fill: black;' +
                '    text-decoration: none;' +
                '}',
            '#clinical-timelines .wc-chart.wc-table {' +
                '    width: 100%;' +
                '}',
            '#clinical-timelines .wc-chart.wc-table table {' +
                '    display: table;' +
                '    width: 100%;' +
                '}',
        ],
        style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = styles.join('\n');

    document.getElementsByTagName('head')[0].appendChild(style);
}
