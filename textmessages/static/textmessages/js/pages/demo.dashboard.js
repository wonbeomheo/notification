!function(o) {
    "use strict";
    function e() {
        this.$body = o("body"),
        this.charts = []
    }
    e.prototype.initCharts = function() {
        window.Apex = {
            chart: {
                parentHeightOffset: 0,
                toolbar: {
                    show: !1
                }
            },
            grid: {
                padding: {
                    left: 0,
                    right: 0
                }
            },
            colors: ["#727cf5", "#0acf97", "#fa5c7c", "#ffbc00"]
        };
        var e = ["#727cf5", "#0acf97", "#fa5c7c", "#ffbc00"]
          , t = o("#revenue-chart").data("colors");
        t && (e = t.split(","));
        
        // Area Chart Start
        e = ["#727cf5", "#0acf97", "#fa5c7c", "#ffbc00"];
        (t = o('#sessions-overview').data("colors")) && (e = t.split(","));
        // generate random data
        var dateNum = $('.nav-link.active').attr('date-num');
        var randomData = [];
        var xLabels = [];
        for (let i=0; i<dateNum; i++) {
            randomData.push(Math.floor(Math.random()*50));
            xLabels.push((i+1)+' May');
        };
        var r = {
            chart: {
                height: 300,
                type: "area"
            },
            dataLabels: {
                enabled:false
            },
            series: [
                {
                    name: "Sessions",
                    data: randomData,
                }
            ],
            fill: {
                type: "gradient",
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.7,
                    opacityTo: 0.9,
                    stops: [0, 90, 100]
                }
            },
            xaxis: {
                categories: xLabels,
            }
        };
        new ApexCharts(document.querySelector("#sessions-overview"),r).render();
        // Area Chart End

        // Radar Chart Start
        e = ["#727cf5", "#0acf97", "#fa5c7c", "#ffbc00"];
        (t = o('#sessions-overview').data("colors")) && (e = t.split(","));
        // generate random data
        r = {
            chart: {
                height: 300,
                type: "radar"
            },
            dataLabels: {
                enabled:false
            },
            series: [
                {
                    name: "Sessions",
                    // Put data here
                    data: [40, 20, 35, 12, 80, 49],
                }
            ],
            fill: {
                    opacity: 0.5,
                    colors: ['#727cf5']
            },
            labels: ['item 1', 'item 2', 'item 3','item 4','item 5','item 6'],
            },
        new ApexCharts(document.querySelector("#sessions-browser"),r).render();

        // Radial Bar Chart Start
        e = ["#727cf5", "#0acf97", "#fa5c7c", "#ffbc00"];
        (t = o('#sessions-overview').data("colors")) && (e = t.split(","));
        // generate random data
        r = {
            chart: {
                height: 300,
                type: "radialBar",
            },
            series: [67, 84, 97, 51],
            plotOptions: {
                radialBar: {
                    dataLabels: {
                        total: {
                            show: true,
                            label: 'TOTAL',
                        }
                    }
                }
            },
            labels: ['TEAM A', 'TEAM B', 'TEAM C', 'TEAM D',],
            stroke: {
                lineCap: "round"
            }
        };
        new ApexCharts(document.querySelector("#radialbar"),r).render();
    }
    ,
    e.prototype.initMaps = function() {
        0 < o("#world-map-markers").length && o("#world-map-markers").vectorMap({
            map: "world_mill_en",
            normalizeFunction: "polynomial",
            hoverOpacity: .7,
            hoverColor: !1,
            regionStyle: {
                initial: {
                    fill: "#e3eaef"
                }
            },
            markerStyle: {
                initial: {
                    r: 9,
                    fill: "#727cf5",
                    "fill-opacity": .9,
                    stroke: "#fff",
                    "stroke-width": 7,
                    "stroke-opacity": .4
                },
                hover: {
                    stroke: "#fff",
                    "fill-opacity": 1,
                    "stroke-width": 1.5
                }
            },
            backgroundColor: "transparent",
            markers: [{
                latLng: [40.71, -74],
                name: "New York"
            }, {
                latLng: [37.77, -122.41],
                name: "San Francisco"
            }, {
                latLng: [-33.86, 151.2],
                name: "Sydney"
            }, {
                latLng: [1.3, 103.8],
                name: "Singapore"
            }],
            zoomOnScroll: !1
        });
    }
    ,
    e.prototype.init = function() {
        o("#dash-daterange").daterangepicker({
            singleDatePicker: !0
        }),
        this.initCharts(),
        this.initMaps()
    }
    ,
    o.Dashboard = new e,
    o.Dashboard.Constructor = e
}(window.jQuery),
function(t) {
    "use strict";
    t(document).ready(function(e) {
        t.Dashboard.init()
    })
}(window.jQuery);