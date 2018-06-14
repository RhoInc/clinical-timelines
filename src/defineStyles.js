export default function defineStyles() {
    //Define styles.
    const line = this.settings.synced.marks
        .find(mark => mark.type === 'line');
    const circle = this.settings.synced.marks
        .find(mark => mark.type === 'circle');
    const styles = [

        /***--------------------------------------------------------------------------------------\
          Global styles
        \--------------------------------------------------------------------------------------***/

            //general
            'html {' +
                '    overflow: -moz-scrollbars-vertical;' +
                '    overflow-y: scroll;' +
                '}',
            '#clinical-timelines {' +
                '    display: inline-block;' +
                '    width: 100%;' +
                '}',

            //hidden
            '#clinical-timelines .ct-hidden {' +
                '    display: none !important;' +
                '}',

            //buttons
            '#clinical-timelines .ct-button {' +
                '    display: inline-block;' +
                '    padding: 3px 5px !important;' +
                '    border: 2px solid black !important;' +
                '    border-radius: 4px !important;' +
                '    color: #333;' +
                '    background: #ccc;' +
                '    cursor: pointer !important;' +
                '}',
            '#clinical-timelines .ct-button:hover {' +
                '    color: #ccc;' +
                '    background: #333 !important;' +
                '}',

        /***--------------------------------------------------------------------------------------\
          Left and right columns
        \--------------------------------------------------------------------------------------***/

            '#clinical-timelines .ct-column {' +
                '    display: inline-block;' +
                '}',
            '#clinical-timelines #ct-left-column {' +
                '    width: 20%;' +
                '    float: left;' +
                '}',
            '#clinical-timelines #ct-right-column {' +
                '    width: 79%;' +
                '    float: right;' +
                '}',
            '#clinical-timelines .ct-column > * {' +
                '    width: 100%;' +
                '    vertical-align: top;' +
                '    display: inline-block;' +
                '    margin-bottom: 10px;' +
                '    border: 1px solid #eee;' +
                '}',
            '#clinical-timelines .ct-column > * > * {' +
                '    margin: 10px;' +
                '}',

        /***--------------------------------------------------------------------------------------\
          Left column elements
        \--------------------------------------------------------------------------------------***/

            '#clinical-timelines #ct-left-column > * {' +
                '}',

          //Details
            '#clinical-timelines #ct-left-column .ct-details {' +
                '    font-size: 90%;' +
                '    text-align: right;' +
                '}',
            '#clinical-timelines #ct-left-column .ct-details .ct-button {' +
                '    float: left;' +
                '    font-size: 110%;' +
                '    font-weight: bold;' +
                '    margin-bottom: 10px;' +
                '    margin-right: 10px;' +
                '}',
            '#clinical-timelines #ct-left-column .ct-details .ct-button a {' +
                '    color: blue;' +
                '    text-decoration: none;' +
                '}',
            '#clinical-timelines #ct-left-column .ct-details .ct-button:hover a {' +
                '    color: #ccc;' +
                '}',
            '#clinical-timelines #ct-left-column .ct-details .ct-stats,' +
            '#clinical-timelines #ct-left-column .ct-details .ct-characteristic span {' +
                '    font-weight: bold;' +
                '}',
            '#clinical-timelines #ct-left-column .ct-details .ct-stats.ct-sample {' +
                '    color: green;' +
                '}',
            '#clinical-timelines #ct-left-column .ct-details .ct-stats.ct-sample-inside-time-range {' +
                '    color: blue;' +
                '}',
            '#clinical-timelines #ct-left-column .ct-details .ct-stats.ct-sample-outside-time-range {' +
                '    color: red;' +
                '}',
            '#clinical-timelines #ct-left-column .ct-details .ct-info-icon {' +
                '    font-weight: bold;' +
                '    color: blue;' +
                '    cursor: help;' +
                '}',

          //Controls
            '#clinical-timelines #ct-left-column .wc-controls {' +
                '    margin-bottom: 0;' +
                '    clear: left;' +
                '}',
            '#clinical-timelines #ct-left-column .wc-controls .control-group {' +
                '    margin: 0 0 5px 0;' +
                '    display: block;' +
                '    float: right;' +
                '    clear: both;' +
                '    width: 100%;' +
                '}',
            '#clinical-timelines #ct-left-column .wc-controls .ct-horizontal-rule {' +
                '    width: 100%;' +
                '    display: inline-block;' +
                '    margin-bottom: 5px;' +
                '    font-size: 150%;' +
                '    border-bottom: 1px solid black;' +
                '}',
            '#clinical-timelines #ct-left-column .wc-controls .control-group.ct-ID {' +
                '    display: inline-block;' +
                '}',
            '#clinical-timelines #ct-left-column .wc-controls .control-group > * {' +
                '    display: inline-block;' +
                '    vertical-align: top;' +
                '    float: right;' +
                '}',
            '#clinical-timelines #ct-left-column .wc-controls .control-group .span-description {' +
                '    font-size: 90%;' +
                '}',
            '#clinical-timelines #ct-left-column .wc-controls .control-group .changer {' +
                '    margin-left: 5px;' +
                '    width: 50%;' +
                '    clear: right;' +
                '    box-sizing: border-box;' +
                '}',

          //Reference Tables
            '#clinical-timelines #ct-left-column .ct-reference-line-table-header {' +
                '    text-align: center;' +
                '    border-bottom: 1px solid black;' +
                '    padding-bottom: 5px;' +
                '}',
            '#clinical-timelines #ct-left-column .ct-reference-line-table-body table {' +
                '    width: 100%;' +
                '    display: table;' +
                '}',
            '#clinical-timelines #ct-left-column .ct-reference-line-table-body th,' +
            '#clinical-timelines #ct-left-column .ct-reference-line-table-body td {' +
                '    text-align: left;' +
                '}',
            '#clinical-timelines #ct-left-column .ct-higher-level {' +
                '    border-bottom: 1px dotted lightgray;' +
                '    font-weight: bold;' +
                '    font-size: 14px;' +
                '}',
            '#clinical-timelines #ct-left-column .ct-lower-level {' +
                '    font-size: 12px;' +
                '}',
            '#clinical-timelines #ct-left-column .ct-lower-level.ct-indent {' +
                '    padding-left: 5%;' +
                '}',

        /***--------------------------------------------------------------------------------------\
          Right column elements
        \--------------------------------------------------------------------------------------***/

            '#clinical-timelines #ct-right-column > * {' +
                '}',

          //Legend
            '#clinical-timelines #ct-right-column #ct-timelines .legend {' +
                '    display: flex !important;' +
                '    justify-content: center;' +
                '}',
            '#clinical-timelines #ct-right-column #ct-timelines .legend-title {' +
                '    border-radius: 4px;' +
                '    padding: 5px 7px 3px 4px;' +
                '    border: 2px solid white;' +
                '    margin-right: .25em !important;' +
                '}',
            '#clinical-timelines #ct-right-column #ct-timelines .legend-item {' +
                '    cursor: pointer;' +
                '    float: left;' +
                '    border-radius: 4px;' +
                '    padding: 4px 7px 3px 4px;' +
                '    border: 2px solid white;' +
                '    margin-right: .25em !important;' +
                '}',
            '#clinical-timelines #ct-right-column #ct-timelines .legend-item:not(.ct-highlighted) {' +
                '    border: none !important;' +
                '}',
            '#clinical-timelines #ct-right-column #ct-timelines .legend-item:not(.ct-selected) {' +
                '    background: white;' +
                '}',
            '#clinical-timelines #ct-right-column #ct-timelines .legend-color-block circle {' +
                '    cx: .55em !important;' +
                '    cy: .55em !important;' +
                '    r: .4em !important;' +
                '    stroke: black;' +
                '    stroke-width: 1;' +
                '}',

          //Y-axis
            '#clinical-timelines #ct-right-column #ct-timelines .wc-chart .wc-svg .y.axis .tick {' +
                '    cursor: pointer;' +
                '    fill: blue;' +
                '    text-decoration: none;' +
                '    font-weight: bolder;' +
                '}',
            '#clinical-timelines #ct-right-column #ct-timelines .wc-chart .wc-svg .y.axis .tick:hover {' +
                '    text-decoration: underline;' +
                '}',
            '#clinical-timelines #ct-right-column #ct-timelines .wc-chart .wc-svg .y.axis .tick rect.ct-stripe {' +
                '    stroke: #aaa;' +
                '    stroke-width: 1;' +
                '    fill: none;' +
                '}',
            '#clinical-timelines #ct-right-column #ct-timelines .wc-chart .wc-svg .y.axis .tick:nth-child(even) rect.ct-stripe {' +
                '    fill: #eee;' +
                '}',

          //Grouping
            '#clinical-timelines #ct-right-column #ct-timelines .wc-chart .wc-svg .ct-grouping .ct-boundary {' +
                '    stroke: black;' +
                '    stroke-width: 2;' +
                '}',
            '#clinical-timelines #ct-right-column #ct-timelines .wc-chart .wc-svg .ct-grouping .ct-annotation {' +
                '    font-size: 150%;' +
                '    font-weight: normal;' +
                '    text-anchor: start;' +
                '}',
            '#clinical-timelines #ct-right-column #ct-timelines .wc-chart .wc-svg .ct-grouping.ct-vertical .ct-annotation {' +
                '    writing-mode: tb-rl;' +
                '}',

          //Lines
            '#clinical-timelines path.wc-data-mark {' +
                `    stroke-width: ${line.attributes['stroke-width']};` +
                '    stroke-opacity: 1;' +
                '}',
            '#clinical-timelines path.wc-data-mark.ct-highlighted {' +
                `    stroke-width: ${line.attributes['stroke-width'] * 1.5};` +
                '}',
            '#clinical-timelines line.ct-highlight-overlay {' +
                `    stroke-width: ${line.attributes['stroke-width'] / 2};` +
                '    stroke-linecap: round;' +
                '}',

          //Circles
            '#clinical-timelines circle.wc-data-mark:not(.ct-highlighted) {' +
                '    stroke-width: 1;' +
                '    stroke: black;' +
                '    fill-opacity: 1;' +
                '}',
            '#clinical-timelines circle.wc-data-mark.ct-highlighted {' +
                '    stroke-opacity: 1;' +
                '    fill-opacity: 1;' +
                `    stroke-width: ${circle.attributes['stroke-width']};` +
                '}',

          //Symbols
            '#clinical-timelines .ct-custom-mark:not(.ct-highlighted) {' +
                '    stroke-width: 1;' +
                '    stroke: black;' +
                '    fill-opacity: 1;' +
                '}',
            '#clinical-timelines .ct-custom-mark.ct-highlighted {' +
                '    stroke-opacity: 1;' +
                '    fill-opacity: 1;' +
                `    stroke-width: ${circle.attributes['stroke-width']};` +
                '}',

          //Arrows
            '#clinical-timelines polygon.ct-ongoing-event {' +
                '}',
            '#clinical-timelines polygon.ct-ongoing-event.ct-highlighted {' +
                `    stroke-width: ${line.attributes['stroke-width'] / 3};` +
                '}',

          //Reference lines
            '#clinical-timelines #ct-right-column .wc-chart .wc-svg .ct-visible-reference-line {' +
                '    stroke: black;' +
                '    stroke-width: 1;' +
                '    stroke-dasharray: 2,2;' +
                '}',
            '#clinical-timelines #ct-right-column .wc-chart .wc-svg .ct-visible-reference-line.ct-hover {' +
                '    stroke-dasharray: none;' +
                '}',
            '#clinical-timelines #ct-right-column .wc-chart .wc-svg .ct-hover-line {' +
                '    cursor: pointer;' +
                '    stroke: black;' +
                '    stroke-width: 20;' +
                '    stroke-opacity: 0;' +
                '}',
            '#clinical-timelines #ct-right-column .wc-chart .wc-svg .ct-reference-line-text {' +
                '    font-weight: bold;' +
                '    font-size: 24px;' +
                '}',

          //ID timeline
            '#clinical-timelines #ct-right-column #ct-ID-timeline .wc-chart .wc-svg title {' +
                '    white-space: pre;' +
                '}',
            '#clinical-timelines #ct-right-column #ct-ID-timeline .wc-small-multiples .wc-chart {' +
                '    width: 100%;' +
                '    padding: 0;' +
                '    border-top: 1px solid black;' +
                '}',
            '#clinical-timelines #ct-right-column #ct-ID-timeline .wc-small-multiples .wc-chart > * {' +
                '    display: inline-block;' +
                '}',
            '#clinical-timelines #ct-right-column #ct-ID-timeline .wc-small-multiples .wc-chart .wc-svg {' +
                '    float: left;' +
                '    width: 75%;' +
                '}',
            '#clinical-timelines #ct-right-column #ct-ID-timeline .wc-small-multiples .wc-chart .wc-chart-title {' +
                '    float: right;' +
                '    text-align: left;' +
                '    font-size: 150%;' +
                '    font-weight: normal;' +
                '    width: 24%;' +
                '}',
            '#clinical-timelines #ct-right-column #ct-ID-timeline .wc-small-multiples .wc-chart .wc-svg .ct-time-range {' +
                '    opacity: .1;' +
                '}',

          //Listing
            '#clinical-timelines #ct-right-column #ct-listing .wc-chart.wc-table table {' +
                '    display: table;' +
                '    width: 100%;' +
                '}'
        ];

    //Attach styles to DOM.
    const style = this.document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = styles.join('\n');
    this.document.getElementsByTagName('head')[0].appendChild(style);
}
