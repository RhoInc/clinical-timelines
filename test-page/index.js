d3.csv(
    'https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/renderer-specific/adtimelines.csv',
    function(d) {
        return d;
    },
    function(data) {
        const instance = clinicalTimelines(
            '#container', // element
            {
            } // settings
        );
        instance.init(data);
    }
);
