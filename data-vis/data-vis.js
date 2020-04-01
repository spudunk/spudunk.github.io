
function historic() {
  s = $.ajax({
    type: 'GET',
    url: "https://api.worldtradingdata.com/api/v1/history",
    dataType: 'json',
    data: {
      "symbol": $("#symbol").val(),
      "api_token": $("#token").val(),
      "output": "json"
    },
    success: function(res) {
      console.log("success!")
      var j = res;
      console.log(j);

      function chartData() {
        p = [];
        for (var price in j.history) {
          p.push(j.history[price].high);
        };
        return (p);
      };

      function chartLabels() {
        p = [];
        for (var label in Object.keys(j.history)) {
          console.log(label)
          p.push(moment(String(label), "YYYY-MM-DD"));
        };
        return (p);
      }

      var ctx = $("#myChart")[0];
      var myChart = new Chart(ctx, {
        type: 'line',

        data: {
          labels: chartLabels(),
          datasets: [{
            label: res.name,
            borderColor: '#0000ff',
            backgroundColor: "#0000ff",
            borderWidth: 2,
            data: chartData(),
            fill: false,
            pointRadius: 0
          }] // end datasets
        }, // end data

        // data: {
        //   datasets: chartData2
        // },

        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }],
            xAxes: [{
              type: 'time',
              time: {
                unit: 'year'
              },
              ticks: {
                reverse: true
              }
            }]
          }
        }
      }) // end chart

    } // end success callback function
  }) // end ajax()

}
