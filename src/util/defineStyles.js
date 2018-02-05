export default function defineStyles() {
    const styles = [

        /***--------------------------------------------------------------------------------------\
          Global styles
        \--------------------------------------------------------------------------------------***/

            '#clinical-timelines {' +
                '    display: inline-block;' +
                '    width: 100%;' +
                '}',
            '#clinical-timelines .hidden {' +
                '    display: none !important;' +
                '}',
            '#clinical-timelines .ct-button {' +
                '    cursor: pointer !important;' +
                '    border-radius: 4px !important;' +
                '    padding: 5px !important;' +
                '}',
            '#clinical-timelines .ct-button.highlighted {' +
                '    border: 2px solid black !important;' +
                '}',
            '#clinical-timelines .ct-button.selected {' +
                '    background: lightgray;' +
                '}',

        /***--------------------------------------------------------------------------------------\
          Left and right side containers
        \--------------------------------------------------------------------------------------***/

            '#clinical-timelines > * {' +
                '    display: inline-block;' +
                '}',
            '#clinical-timelines > #left-side {' +
                '    width: 22%;' +
                '    float: left;' +
                '}',
            '#clinical-timelines > #right-side {' +
                '    width: 75%;' +
                '    float: right;' +
                '}',
            '#clinical-timelines > * > * {' +
                '    width: 100%;' +
                '    vertical-align: top;' +
                '    display: inline-block;' +
                '    margin-bottom: 10px;' +
                '}',

        /***--------------------------------------------------------------------------------------\
          Left side container elements
        \--------------------------------------------------------------------------------------***/

            '#clinical-timelines > #left-side > * {' +
                '    border: 1px solid #eee;' +
                '    padding: 10px;' +
                '}',

          //Annotations
            '#clinical-timelines > #left-side > .annotation {' +
                '    font-size: 90%;' +
                '    text-align: right;' +
                '}',
            '#clinical-timelines > #left-side > .annotation .ct-stats,' +
            '#clinical-timelines > #left-side > .annotation #ID,' +
            '#clinical-timelines > #left-side > .annotation .characteristic span {' +
                '    font-weight: bold;' +
                '}',
            '#clinical-timelines > #left-side > .annotation .ct-stats.sample {' +
                '    color: green;' +
                '}',
            '#clinical-timelines > #left-side > .annotation .ct-stats.sample-inside-time-range {' +
                '    color: blue;' +
                '}',
            '#clinical-timelines > #left-side > .annotation .ct-stats.sample-outside-time-range {' +
                '    color: red;' +
                '}',
            '#clinical-timelines > #left-side > .annotation .ct-info-icon {' +
                '    font-weight: bold;' +
                '    color: blue;' +
                '    cursor: help;' +
                '}',

          //Controls
            '#clinical-timelines > #left-side > .wc-controls {' +
                '    clear: left;' +
                '}',
            '#clinical-timelines > #left-side > .wc-controls .control-group {' +
                '    margin: 0 0 5px 0;' +
                '    display: block;' +
                '    float: right;' +
                '    clear: both;' +
                '    width: 100%;' +
                '}',
            '#clinical-timelines > #left-side > .wc-controls .horizontal-rule {' +
                '    width: 100%;' +
                '    display: inline-block;' +
                '    margin-bottom: 5px;' +
                '    font-size: 150%;' +
                '    border-bottom: 1px solid black;' +
                '}',
            '#clinical-timelines > #left-side > .wc-controls .control-group.ID {' +
                '    display: inline-block;' +
                '}',
            '#clinical-timelines > #left-side > .wc-controls .control-group > * {' +
                '    display: inline-block;' +
                '    vertical-align: top;' +
                '    float: right;' +
                '}',
            '#clinical-timelines > #left-side > .wc-controls .control-group .span-description {' +
                '    font-size: 90%;' +
                '}',
            '#clinical-timelines > #left-side > .wc-controls .control-group .changer {' +
                '    margin-left: 5px;' +
                '    width: 50%;' +
                '    clear: right;' +
                '    box-sizing: border-box;' +
                '}',
            '#clinical-timelines > #left-side > .ID-details .back-button {' +
                '    display: inline-block;' +
                '    float: left;' +
                '}',
            '#clinical-timelines > #left-side > .ID-details .back-button button {' +
                '    padding: 0 5px;' +
                '    font-size: 110%;' +
                '}',


          //Reference Tables
            '#clinical-timelines > #left-side .ct-reference-line-header {' +
                '    text-align: center;' +
                '    border-bottom: 1px solid black;' +
                '    padding-bottom: 5px;' +
                '}',
            '#clinical-timelines > #left-side .ct-reference-line-table {' +
                '    width: 100%;' +
                '    display: table;' +
                '}',
            '#clinical-timelines > #left-side .ct-reference-line-table th,' +
            '#clinical-timelines > #left-side .ct-reference-line-table td {' +
                '    text-align: left;' +
                '}',
            '#clinical-timelines > #left-side .ct-higher-level {' +
                '    border-bottom: 1px dotted lightgray;' +
                '    font-weight: bold;' +
                '    font-size: 14px;' +
                '}',
            '#clinical-timelines > #left-side .ct-lower-level {' +
                '    font-size: 12px;' +
                '}',
            '#clinical-timelines > #left-side .ct-lower-level.ct-indent {' +
                '    padding-left: 5%;' +
                '}',

        /***--------------------------------------------------------------------------------------\
          Right side container elements
        \--------------------------------------------------------------------------------------***/

            '#clinical-timelines > #right-side > * {' +
                '}',

          //Legend
            '#clinical-timelines > #right-side > .wc-chart .legend {' +
                '    display: flex !important;' +
                '    justify-content: center;' +
                '}',
            '#clinical-timelines > #right-side > .wc-chart .legend .legend-title {' +
                '    border-radius: 4px;' +
                '    padding: 5px 7px 3px 4px;' +
                '    border: 2px solid white;' +
                '    margin-right: .25em !important;' +
                '}',
            '#clinical-timelines > #right-side > .wc-chart .legend .legend-item {' +
                '    cursor: pointer;' +
                '    float: left;' +
                '    border-radius: 4px;' +
                '    padding: 4px 7px 3px 4px;' +
                '    border: 2px solid white;' +
                '    margin-right: .25em !important;' +
                '}',
            '#clinical-timelines > #right-side > .wc-chart .legend .legend-item .legend-color-block circle {' +
                '    cx: .55em !important;' +
                '    cy: .55em !important;' +
                '    r: .4em !important;' +
                '}',
            '#clinical-timelines > #right-side > .wc-chart .legend .legend-item:hover {' +
                '    border: 2px solid black;' +
                '}',

          //Y-axis
            '#clinical-timelines > #right-side > .wc-chart .wc-svg .y.axis .tick {' +
                '    cursor: pointer;' +
                '    fill: blue;' +
                '    text-decoration: none;' +
                '    font-weight: bolder;' +
                '}',
            '#clinical-timelines > #right-side > .wc-chart .wc-svg .y.axis .tick:hover {' +
                '    text-decoration: underline;' +
                '}',
            '#clinical-timelines > #right-side > .wc-chart .wc-svg .y.axis .tick rect.ct-stripe {' +
                '    stroke: #aaa;' +
                '    stroke-width: 1;' +
                '    fill: none;' +
                '}',
            '#clinical-timelines > #right-side > .wc-chart .wc-svg .y.axis .tick:nth-child(even) rect.ct-stripe {' +
                '    fill: #eee;' +
                '}',

          //Grouping
            '#clinical-timelines > #right-side > .wc-chart .wc-svg .grouping .boundary {' +
                '    stroke: black;' +
                '    stroke-width: 2;' +
                '}',
            '#clinical-timelines > #right-side > .wc-chart .wc-svg .grouping .annotation {' +
                '    font-size: 150%;' +
                '    font-weight: normal;' +
                '    text-anchor: start;' +
                '}',
            '#clinical-timelines > #right-side > .wc-chart .wc-svg .grouping.vertical .annotation {' +
                '    writing-mode: tb-rl;' +
                '}',

          //Lines
            '#clinical-timelines path.wc-data-mark {' +
                '    stroke-width: 4;' +
                '    stroke-opacity: 1;' +
                '}',
            '#clinical-timelines path.wc-data-mark.highlighted {' +
                '    stroke-width: 7;' +
                '}',
            '#clinical-timelines line.highlight-overlay {' +
                '    stroke-width: 2;' +
                '    stroke-linecap: round;' +
                '}',

          //Circles
            '#clinical-timelines circle.wc-data-mark {' +
                '    stroke-width: 0;' +
                '    fill-opacity: 1;' +
                '}',
            '#clinical-timelines circle.wc-data-mark.highlighted {' +
                '    stroke-opacity: 1;' +
                '    stroke-width: 2;' +
                '}',

          //Arrows
            '#clinical-timelines polygon.ongoing-event {' +
                '}',
            '#clinical-timelines polygon.ongoing-event.highlighted {' +
                '    stroke-width: 2;' +
                '}',

          //Reference lines
            '#clinical-timelines .wc-chart .wc-svg title {' +
                '    white-space: pre;' +
                '}',
            '#clinical-timelines > #right-side .wc-chart .wc-svg .visible-reference-line {' +
                '    stroke: black;' +
                '    stroke-width: 2;' +
                '    stroke-dasharray: 2,2;' +
                '}',
            '#clinical-timelines > #right-side .wc-chart .wc-svg .visible-reference-line.hover {' +
                '    stroke-dasharray: none;' +
                '}',
            '#clinical-timelines > #right-side .wc-chart .wc-svg .invisible-reference-line {' +
                '    stroke: black;' +
                '    stroke-width: 20;' +
                '    stroke-opacity: 0;' +
                '}',
            '#clinical-timelines > #right-side .wc-chart .wc-svg .reference-line-label-box {' +
                '    fill: white;' +
                '    stroke: black;' +
                '    stroke-width: black;' +
                '}',

          //ID timeline
            '#clinical-timelines > #right-side > .wc-small-multiples .wc-chart {' +
                '    width: 100%;' +
                '    padding: 0;' +
                '    border-top: 1px solid black;' +
                '}',
            '#clinical-timelines > #right-side > .wc-small-multiples .wc-chart > * {' +
                '    display: inline-block;' +
                '}',
            '#clinical-timelines > #right-side > .wc-small-multiples .wc-chart .wc-svg {' +
                '    float: left;' +
                '    width: 75%;' +
                '}',
            '#clinical-timelines > #right-side > .wc-small-multiples .wc-chart .wc-chart-title {' +
                '    float: right;' +
                '    text-align: left;' +
                '    font-size: 150%;' +
                '    font-weight: normal;' +
                '    padding-left: 10px;' +
                '    width: 24%;' +
                '}',
            '#clinical-timelines > #right-side > .wc-small-multiples .wc-chart .wc-svg .time-range {' +
                '    opacity: .1;' +
                '}',

          //Listing
            '#clinical-timelines > #right-side > .wc-chart.wc-table table {' +
                '    display: table;' +
                '    width: 100%;' +
                '}'
        ],
        style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = styles.join('\n');

    document.getElementsByTagName('head')[0].appendChild(style);
}
