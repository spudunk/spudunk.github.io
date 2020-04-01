
var api_token = "";
var chart
// disable asychronous behavior
// $.ajaxSetup({
//   async: false
// });


function setToken(){
  api_token = $("#tokenInput").val();
  console.log("token set  " + api_token)
};


function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
};

function fillSelectors() {

};

function loadChart() {
  console.log("dader sucks-s-full-EEEEE goottenn");

};

// Get Real Time Market Data
function getRealtimeMarketData(symbol, api_token=api_token, output="json") {
  const url = "https://api.worldtradingdata.com/api/v1/history";
  var data = {
    "symbol": symbol,
    "api_token": api_token,
    "output": output
  };

  $.ajax({
    url: url,
    data: data,
    // dataType: dataType
    success: function(){
      console.log("api request successful, loading chart");
      var ctx = document.getElementById('myChart').getContext('2d');

    }
  });
};

function prices($) {
  p = [];
  for (var price in stocks.responseJSON.history) {
    p.push(stocks.responseJSON.history[price].high);
  };
  return (p)
};


function buildChart(){



  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
      labels: labels,
      datasets: [{
        label: 'DOW Jones Industrial HIGH Historical Prices dader',
        borderColor: '#0000ff',
        backgroundColor: "#0000ff",
        borderWidth: 2,
        data: prices(stocks),
        fill: false,
        pointRadius: 0
      },
      {
        label: 'Iron Mountain Historical',
        borderColor: '#0000ff',
        backgroundColor: "#0000ff",
        borderWidth: 2,
        data: prices(),
        fill: false,
        pointRadius: 0
      },



    ]
  },

  // Configuration options go here
  options: {
    responsive: true,
    title: {
      display: true,
      text: "Stock Market Dashboard",
    },
    tooltips: {
      mode: 'index',
      intersect: false,
    },
    hover: {
      mode: 'nearest',
      intersect: true
    },
    scales: {
      xAxes: [{
        display: true,
        scaleLabel: {
          display: false,
          labelString: ''
        }
      }],
      yAxes: [{
        display: true,
        scaleLabel: {
          display: false,
          labelString: ''
        }
      }]
    }
  }  // close options
});  // close var chart

}


// Get the input field
var input = document.getElementById("myInput");

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("myBtn").click();
  }
});
