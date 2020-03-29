const _api_url = 'https://api.coronatracker.com/v3/analytics/trend/country?countryCode=ma&startDate=2020-03-02&endDate=2022-05-01';

async function getDataChart() {
    const response = await fetch(_api_url);
    const data = await response.json();
    var labels = [];
    var confirmedValue = [];
    var total_deaths = [];
    var total_recovered = [];

    data.forEach(function(obj) {
        labels.push(new Date(obj['last_updated']).toLocaleDateString());
        confirmedValue.push(obj['total_confirmed']);
        total_deaths.push(obj['total_deaths']);
        total_recovered.push(obj['total_recovered']);


    });
    renderChart(confirmedValue, labels, total_deaths, total_recovered);
}

function renderChart(data, labels, total_deaths, total_recovered) {
    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                    label: 'الحالات المؤكدة',
                    data: data,
                    borderColor: 'rgba(10, 9, 1, 1)',
                    backgroundColor: 'rgba(10, 9, 1, 0.2)',
                },
                {
                    label: 'الوفايات',
                    data: total_deaths,
                    borderColor: 'rgba(255, 45, 0, 1)',
                    backgroundColor: 'rgba(255, 45, 0, 0.2)',
                },
                {
                    label: 'المتعافون',
                    data: total_recovered,
                    borderColor: 'rgba(0, 255, 4 , 1)',
                    backgroundColor: 'rgba(0, 255, 4 , 0.2)',
                }





            ]
        },
        options: {
            scales: {
                yAxes: [{
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                    },
                    ticks: {
                        beginAtZero: true,
                        callback: function(value, index, values) {
                            return value;
                        }
                    }
                }],

                xAxes: [{
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                    }
                }]



            }
        },
    });
}