function Hide_overlay(){
  $("#EvenWachten").hide();
}

$.ajax({
  url: "innozaam.monitoring.nu:8080/api/energy",
  type: "POST",
  dataType: "json",
  data: {type: "Dagwaardes"},
  success: function(result){

    //waardes ophalen en omzetten van strings naar getallen

    // Delta T verwarmen
    var verwarmen = parseFloat(result["Verwarmen_energie"]);


    // Delta T koelen
    var koelen = parseFloat(result["Koelen_energie"]);

    // Delta T koelen
    var tapwater_energie = parseFloat(result["Tapwater_energie"]);


    // Kilmaat energie
    var klimaat = parseFloat(koelen + verwarmen);
    var klimaat_tapwater = parseFloat(klimaat + tapwater_energie);


    tapwater_energie = tapwater_energie.toFixed(2);
    klimaat = klimaat.toFixed(2);
    klimaat_tapwater = klimaat_tapwater.toFixed(2);
    // Zonnenpanelen
    var pv1 = parseFloat(result["PV1"]) / 100;
    var pv2 = parseFloat(result["PV2"]) / 100;

    //warmtepomp
    var wp = parseFloat(result["wp_elektra"]) / 100;

    //Boiler
    var boiler = parseFloat(result["boiler_electa"]) / 100;

    // totaal
    var Totaal = (wp + boiler) - (pv1 + pv2);

    pv1 = pv1.toFixed(2);
    pv2 = pv2.toFixed(2);
    wp = wp.toFixed(2);
    boiler = boiler.toFixed(2);
    Totaal = Totaal.toFixed(2);

    //Gecirculeerd Water155
    var wp_water = result["wp_water"];
    var tapwater_water = result["tapwater_water"];
    var verwarming_water = result["verwarming_water"];
    var zonneboiler_water = result["zonneboiler_water"];


    $("#klimaat_DW").html(klimaat + " KwH");
    $("#tapwater_DW").html(tapwater_energie + " KWH");
    $("#totaal_DW").html(klimaat_tapwater + " KWH");
    $("#Zonnepanelen1").html(pv1 + " KwH");
    $("#Zonnepanelen2").html(pv2 + " KwH");
    $("#Warmtepomp_kWh").html(wp + " KwH");
    $("#Boiler").html(boiler + " KwH");
    $("#kWh_Totaal").html(Totaal + " KwH");
    $("#Warmtepomp_L").html(wp_water + " L");
    $("#Tapwater_L").html(tapwater_water + " L");
    $("#Verwarming_L").html(verwarming_water + " L");
    $("#Zonneboiler_L").html(zonneboiler_water + " L");

    Hide_overlay();

    // Charts
    var netwerk = $("#netwerk");
    var pv1 = $("#PV1");
    var pv2 = $("#PV2");
    var wp = $("#wp");
    var boiler = $("#boiler");
    var besturing = $("#besturing");


    var netwerkChart = new Chart(netwerk, {
      type: 'bar',
      data: {
          labels: Object.keys(result["grafiekNetwerk"]).map(x=>new Date(x).toLocaleDateString()),
          datasets: [{
              data: Object.values(result["grafiekNetwerk"]),
              label: 'kWh Totaal',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255,99,132,1)',
              borderWidth: 1
          }]
      },
      options: {
          legend: {
            display: true
          },
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }],
              xAxes: [{
                  type: 'category',
              }]

          }
      }
  });

  var pv1Chart = new Chart(pv1, {
    type: 'bar',
    data: {
        labels: Object.keys(result["grafiekPV1"]).map(x=>new Date(x).toLocaleDateString()),
        datasets: [{
            data: Object.values(result["grafiekPV1"]),
            label: 'kWh PV1',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1
        }]
    },
    options: {
        legend: {
          display: true
        },
        scales: {
            yAxes: [{
                label: 'kWh',
                ticks: {
                    beginAtZero:true
                }
            }],
            xAxes: [{
                type: 'category',
            }]

        }
    }
});

var pv2Chart = new Chart(pv2, {
  type: 'bar',
  data: {
      labels: Object.keys(result["grafiekPV2"]).map(x=>new Date(x).toLocaleDateString()),
      datasets: [{
          data: Object.values(result["grafiekPV2"]),
          label: 'kWh PV2',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1
      }]
  },
  options: {
      legend: {
        display: true
      },
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero:true
              }
          }],
          xAxes: [{
              type: 'category',
          }]

      }
  }
});

var wpChart = new Chart(wp, {
  type: 'bar',
  data: {
      labels: Object.keys(result["grafiekWP"]).map(x=>new Date(x).toLocaleDateString()),
      datasets: [{
          data: Object.values(result["grafiekWP"]),
          label: 'kWh Warmtepomp',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1
      }]
  },
  options: {
      legend: {
        display: true
      },
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero:true
              }
          }],
          xAxes: [{
              type: 'category',
          }]

      }
  }
});

var boilerChart = new Chart(boiler, {
  type: 'bar',
  data: {
      labels: Object.keys(result["grafiekBoiler"]).map(x=>new Date(x).toLocaleDateString()),
      datasets: [{
          data: Object.values(result["grafiekBoiler"]),
          label: 'kWh Boiler',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1
      }]
  },
  options: {
      legend: {
        display: true
      },
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero:true
              }
          }],
          xAxes: [{
              type: 'category',
          }]

      }
  }
});

var besturingChart = new Chart(besturing, {
  type: 'bar',
  data: {
      labels: Object.keys(result["grafiekBesturing"]).map(x=>new Date(x).toLocaleDateString()),
      datasets: [{
          label: "kwH Besturing",
          data: Object.values(result["grafiekBesturing"]),
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1
      }]
  },
  options: {
      legend: {
        display: true
      },
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero:true
              }
          }],
          xAxes: [{
              type: 'category'
          }]

      }
  }
});

  },
  error: function(result){
    console.log("Could not get json from API!");
    console.log(result);
  }
})
