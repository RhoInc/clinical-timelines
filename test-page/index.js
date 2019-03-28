d3.csv(
    'https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/renderer-specific/adtimelines.csv',
    function(d) {
        return d;
    },
    function(error,data) {
        if (error)
            console.log(error);

        var settings = {};
        var instance = clinicalTimelines(
            '#container',
            settings
        );
        instance.init(data);
    }
);
