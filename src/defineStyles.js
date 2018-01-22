export default function defineStyles() {
    const
        styles = [

        /***--------------------------------------------------------------------------------------\
          Global styles
        \--------------------------------------------------------------------------------------***/

            'html {' +
                '    overflow: -moz-scrollbars-vertical;' +
                '    overflow-y: scroll;' +
                '}',
            '#clinical-timelines {' +
                '    display: inline-block;' +
                '    width: 100%;' +
                '}',
            '#clinical-timelines .ct-hidden {' +
                '    display: none !important;' +
                '}',
            '#clinical-timelines .ct-button {' +
                '    cursor: pointer !important;' +
                '    border-radius: 4px !important;' +
                '    padding: 5px !important;' +
                '}',
            '#clinical-timelines .ct-button.ct-highlighted {' +
                '    border: 2px solid black !important;' +
                '}',
            '#clinical-timelines .ct-button.ct-selected {' +
                '    background: lightgray;' +
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

          //Annotations
            '#clinical-timelines #ct-left-column .ct-annotation {' +
                '    font-size: 90%;' +
                '    text-align: right;' +
                '}',
            '#clinical-timelines #ct-left-column .ct-annotation .ct-stats,' +
            '#clinical-timelines #ct-left-column .ct-annotation .ct-characteristic span {' +
                '    font-weight: bold;' +
                '}',
            '#clinical-timelines #ct-left-column .ct-annotation .ct-stats.ct-sample {' +
                '    color: green;' +
                '}',
            '#clinical-timelines #ct-left-column .ct-annotation .ct-stats.ct-sample-inside-time-range {' +
                '    color: blue;' +
                '}',
            '#clinical-timelines #ct-left-column .ct-annotation .ct-stats.ct-sample-outside-time-range {' +
                '    color: red;' +
                '}',
            '#clinical-timelines #ct-left-column .ct-annotation .ct-info-icon {' +
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
            '#clinical-timelines #ct-left-column #ct-ID-details #ct-back-button {' +
                '    display: inline-block;' +
                '    float: left;' +
                '}',
            '#clinical-timelines #ct-left-column #ct-ID-details #ct-back-button button {' +
                '    padding: 0 5px;' +
                '    font-size: 110%;' +
                '}',


          //Reference Tables
            '#clinical-timelines #ct-left-column .ct-reference-line-header {' +
                '    text-align: center;' +
                '    border-bottom: 1px solid black;' +
                '    padding-bottom: 5px;' +
                '}',
            '#clinical-timelines #ct-left-column .ct-reference-line-table {' +
                '    width: 100%;' +
                '    display: table;' +
                '}',
            '#clinical-timelines #ct-left-column .ct-reference-line-table th,' +
            '#clinical-timelines #ct-left-column .ct-reference-line-table td {' +
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
            '#clinical-timelines #ct-right-column #ct-timelines .wc-chart .legend {' +
                '    display: flex !important;' +
                '    justify-content: center;' +
                '}',
            '#clinical-timelines #ct-right-column #ct-timelines .wc-chart .legend .legend-title {' +
                '    border-radius: 4px;' +
                '    padding: 5px 7px 3px 4px;' +
                '    border: 2px solid white;' +
                '    margin-right: .25em !important;' +
                '}',
            '#clinical-timelines #ct-right-column #ct-timelines .wc-chart .legend .legend-item {' +
                '    cursor: pointer;' +
                '    float: left;' +
                '    border-radius: 4px;' +
                '    padding: 4px 7px 3px 4px;' +
                '    border: 2px solid white;' +
                '    margin-right: .25em !important;' +
                '}',
            '#clinical-timelines #ct-right-column #ct-timelines .wc-chart .legend .legend-item .legend-color-block circle {' +
                '    cx: .55em !important;' +
                '    cy: .55em !important;' +
                '    r: .4em !important;' +
                '}',
            '#clinical-timelines #ct-right-column #ct-timelines .wc-chart .legend .legend-item:hover {' +
                '    border: 2px solid black;' +
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
                '    stroke-width: 6;' +
                '    stroke-opacity: 1;' +
                '}',
            '#clinical-timelines path.wc-data-mark.ct-highlighted {' +
                '    stroke-width: 9;' +
                '}',
            '#clinical-timelines line.ct-highlight-overlay {' +
                '    clip-path: url(#1);' +
                '    stroke-width: 3;' +
                '    stroke-linecap: round;' +
                '}',

          //Circles
            '#clinical-timelines circle.wc-data-mark {' +
                '    stroke-width: 0;' +
                '    fill-opacity: 1;' +
                '}',
            '#clinical-timelines circle.wc-data-mark.ct-highlighted {' +
                '    stroke-opacity: 1;' +
                '    stroke-width: 3;' +
                '}',

          //Arrows
            '#clinical-timelines polygon.ct-ongoing-event {' +
                '    clip-path: url(#1);' +
                '}',
            '#clinical-timelines polygon.ct-ongoing-event.ct-highlighted {' +
                '    stroke-width: 3;' +
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
            '#clinical-timelines #ct-right-column .wc-chart .wc-svg .ct-invisible-reference-line {' +
                '    cursor: pointer;' +
                '    stroke: black;' +
                '    stroke-width: 20;' +
                '    stroke-opacity: 0;' +
                '}',
            '#clinical-timelines #ct-right-column .wc-chart .wc-svg .reference-line-text {' +
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
        ],
        style = this.test
            ? this.dom.window.document.createElement('style')
            : document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = styles.join('\n');

    if (this.test)
        this.dom.window.document.getElementsByTagName('head')[0].appendChild(style);
    else
        document.getElementsByTagName('head')[0].appendChild(style);
}
