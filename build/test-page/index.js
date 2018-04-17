//Load local build if in local environment.
if (window.origin !== 'https://rhoinc.github.io') {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '../clinicalTimelines.js';
    head.appendChild(script);
}

d3.csv(
    'https://rawgit.com/RhoInc/viz-library/master/data/safetyData/ADTIMELINES.csv',
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
