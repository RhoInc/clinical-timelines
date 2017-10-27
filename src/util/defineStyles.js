export default function defineStyles() {
    const styles = [
            '#clinical-timelines .hidden {' + '    display: none !important;' + '}',
            '#clinical-timelines .wc-controls {' +
                '    border: 1px solid #eee;' +
                '    padding: 5px;' +
                '    margin-bottom: 0;' +
                '    display: inline-block;' +
                '    width: 100%;' +
                '}',
            '#clinical-timelines .wc-controls .control-group {' +
                '    float: right;' +
                '    margin-bottom: 0;' +
                '}',
            '#clinical-timelines .wc-controls .annotation {' +
                '    float: left;' +
                '    font-size: 16px;' +
                '}',
            '#clinical-timelines .wc-controls .annotation .stats,' +
            '#clinical-timelines .wc-controls .annotation #participant,' +
            '#clinical-timelines .wc-controls .annotation .characteristic span {' +
                '    font-weight: bold;' +
                '}',
            '#clinical-timelines .wc-controls .back-button button {' +
                '    padding: 0 5px;' +
                '    font-size: 14px;' +
                '    float: left;' +
                '    clear: left;' +
                '    margin-top: 5px;' +
                '}',
            '#clinical-timelines > .wc-chart .legend {' +
                '    display: flex !important;' +
                '    justify-content: center;' +
                '}',
            '#clinical-timelines .wc-chart .legend .legend-item {' +
                '    cursor: pointer;' +
                '    float: left;' +
                '    border-radius: 4px;' +
                '    padding: 3px 7px 3px 4px;' +
                '    border: 2px solid white;' +
                '    margin-right: .25em !important;' +
                '}',
            '#clinical-timelines .wc-chart .legend .legend-item:hover {' +
                '    border: 2px solid black;' +
                '}',
            '#clinical-timelines .wc-chart .legend .legend-item.selected {' +
                '    background: lightgray;' +
                '}',
            '#clinical-timelines .wc-chart .legend .legend-item.highlighted {' +
                '    border: 2px solid black;' +
                '    cursor: pointer;' +
                '    border-radius: 4px;' +
                '    padding: 5px;' +
                '}',
            '#clinical-timelines > .wc-chart .wc-svg .y.axis .tick {' +
                '    cursor: pointer;' +
                '    fill: blue;' +
                '    text-decoration: underline;' +
                '}',
            '#clinical-timelines .wc-chart .wc-svg .wc-data-mark.highlighted {' +
                '    stroke: black;' +
                '    stroke-width: 3px;' +
                '}',
            '#clinical-timelines .wc-chart .wc-svg .visible-reference-line {' +
                '    stroke: black;' +
                '    stroke-width: 2px;' +
                '    stroke-dasharray: 2,2;' +
                '}',
            '#clinical-timelines .wc-chart .wc-svg .visible-reference-line.hover {' +
                '    stroke-dasharray: none;' +
                '}',
            '#clinical-timelines .wc-chart .wc-svg .invisible-reference-line {' +
                '    stroke: black;' +
                '    stroke-width: 20px;' +
                '    stroke-opacity: 0;' +
                '}',
            '#clinical-timelines .wc-chart .wc-svg .reference-line-label-box {' +
                '    fill: white;' +
                '    stroke: black;' +
                '    stroke-width: black;' +
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
                '    float: right;' +
                '    text-align: left;' +
                '    font-size: 21px;' +
                '    padding-left: 10px;' +
                '    width: 24%;' +
                '}',
            '#clinical-timelines .wc-chart.wc-table {' + '    width: 100%;' + '}',
            '#clinical-timelines .wc-chart.wc-table table {' +
                '    display: table;' +
                '    width: 100%;' +
                '}'
        ],
        style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = styles.join('\n');

    document.getElementsByTagName('head')[0].appendChild(style);
}
