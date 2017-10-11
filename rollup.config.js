import babel from 'rollup-plugin-babel';

export default {
    name: 'clinicalTimelines',
    input: './src/index.js',
    output:
        {file: './build/clinicalTimelines.js',
        format: 'umd'
    },
    globals: {
        d3: 'd3',
        webcharts: 'webcharts'
    },
    external: ['d3', 'webcharts'],
    plugins: [
        babel({
            exclude: 'node_modules/**',
            presets: [
                ['env',
                {'modules': false}
                ]
            ],
            plugins: [
                'external-helpers'
            ],
            babelrc: false
        })
    ]
}
