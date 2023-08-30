trafficCharts();

institutioChart();

hightCheckPoint();

function trafficCharts(){


var ctx = document.getElementById("trafficCharts").getContext("2d");
var myChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: [
      "January",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Augst",
      "Sepetembar",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Statistics",
        data: [428, 354, 425, 528, 450, 632, 429,424,523,243,643,724],
        borderWidth: 2,
        backgroundColor: "#455aba",//"rgba(71,65,98,.9)",  //"rgba(255,164,38,.9)", 
        borderColor: "transparent",
        borderWidth: 2.5,
        pointBackgroundColor: "#ffffff",
        pointRadius: 4,
      },
    //   {
    //     label: "Statistics",
    //     data: [468, 387, 401, 574, 498, 568, 452,425, 528, 450, 632, 429],
    //     borderWidth: 2,
    //     backgroundColor: "rgba(71,65,98,.9)",
    //     borderColor: "transparent",
    //     borderWidth: 0,
    //     pointBackgroundColor: "#999",
    //     pointRadius: 4,
    //   },
    ],
  },
  options: {
    legend: {
      display: false,
    },
    scales: {
      yAxes: [
        {
          gridLines: {
            drawBorder: false,
            color: "#f2f2f2",
          },
          ticks: {
            beginAtZero: true,
            stepSize: 150,
            fontColor: "#9aa0ac", // Font Color
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            fontColor: "#9aa0ac", // Font Color
          },
        },
      ],
    },
  },
});

}



function institutioChart() {
    var options = {
        chart: {
            height: 350,
            type: 'line',
            shadow: {
                enabled: false,
                color: '#bbb',
                top: 3,
                left: 2,
                blur: 3,
                opacity: 1
            },
        },
        stroke: {
            width: 7,
            curve: 'smooth'
        },
        series: [{
            name: 'Likes',
            data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5]
        }],
        xaxis: {
            type: 'datetime',
            categories: ['1/11/2000', '2/11/2000', '3/11/2000', '4/11/2000', '5/11/2000', '6/11/2000', '7/11/2000', '8/11/2000', '9/11/2000', '10/11/2000', '11/11/2000', '12/11/2000', '1/11/2001', '2/11/2001', '3/11/2001', '4/11/2001', '5/11/2001', '6/11/2001'],
            labels: {
                style: {
                    colors: '#9aa0ac',
                }
            }
        },
        title: {
            text: 'Social Media',
            align: 'left',
            style: {
                fontSize: "16px",
                color: '#666'
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                gradientToColors: ['#FDD835'],
                shadeIntensity: 1,
                type: 'horizontal',
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 100, 100, 100]
            },
        },
        markers: {
            size: 4,
            opacity: 0.9,
            colors: ["#FFA41B"],
            strokeColor: "#fff",
            strokeWidth: 2,

            hover: {
                size: 7,
            }
        },
        yaxis: {
            min: -10,
            max: 40,
            title: {
                text: 'Engagement',
            },
            labels: {
                style: {
                    color: '#9aa0ac',
                }
            }
        }
    }

    var chart = new ApexCharts(
        document.querySelector("#institutioChart"),
        options
    );

    chart.render();
}

function hightCheckPoint() {
    var options = {
        chart: {
            height: 250,
            type: 'line',
            zoom: {
                enabled: true
            },
            toolbar: {
                show: false
            },

        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            width: [5, 7, 5],
            curve: 'straight',
            dashArray: [0, 8, 5]
        },
        series: [{
            name: "Option 1",
            data: [1, 10, 2, 24, 33, 26, 21, 20]
        }
        ],
        legend: {
            show: false,
        },
        markers: {
            size: 0,

            hover: {
                sizeOffset: 6
            }
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug'
            ],
            labels: {
                style: {
                    colors: "#9aa0ac"
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    color: "#9aa0ac"
                }
            }
        },
        tooltip: {

        },
        grid: {
            borderColor: '#f1f1f1',
        }
    }

    var chart = new ApexCharts(
        document.querySelector("#hightCheckPoint"),
        options
    );

    chart.render();
}