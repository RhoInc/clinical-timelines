import { select } from 'd3';

export default function addURLs() {
    this.svg.selectAll('.ct-url').remove();

    if (Array.isArray(this.config.id_urls) && this.config.id_urls.length) {
        const context = this;
        const ticks = this.svg.selectAll('.y.axis .tick');

        ticks.each(function(d, i) {
            const tick = select(this);

            context.config.id_urls.forEach((id_url, j) => {
                const url = context.initial_data.find(di => di[context.config.id_col] === d)[
                    id_url.value_col
                ];
                const link = tick
                    .append('text')
                    .classed('ct-url', true)
                    .classed('ct-hidden', !url)
                    .attr({
                        dx: -20,
                        dy: 15 * (j + 1) + 5,
                        fill: 'blue',
                        cursor: 'pointer',
                        'font-size': '12px'
                    })
                    .text(id_url.text)
                    .on('click', () => {
                        window.open(url);
                    });
                link.append('title').text('Open ' + id_url.label);
            });
        });
    }
}
