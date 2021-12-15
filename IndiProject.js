let count = 0;

    const Super_Sectors = { "00":	'Total nonfarm', "05":	'Total private', "06":	'Goods-producing', "07":	'Service-providing', "08": 'Private service-providing',
      "10":	'Mining and logging', "20":	'Construction', "30":	'Manufacturing', "31":	'Durable Goods', "32":	'Nondurable Goods', "40":	'Trade, transportation, and utilities',
      "41":	'Wholesale trade', "42":	'Retail trade',   "43":	'Transportation and warehousing', "44": 'Utilities', "50":	'Information',"55":	'Financial activities',
      "60":	'Professional and business services', "65":	'Education and health services', "70":	'Leisure and hospitality', "80":	'Other services',
      "90":	'Government'
    }
    let supersectorKeys = Object.keys (Super_Sectors)
    const CHART_COLORS = {
      red: 'rgb(255, 101, 140)',
      orange: 'rgb(255, 139, 64)',
      yellow: 'rgb(255, 205, 86)',
      green: 'rgb(75, 192, 192)',
      blue: 'rgb(54, 162, 235)',
      purple: 'rgb(153, 102, 255)',
      grey: 'rgb(97, 97, 97)',
      lRed: 'rgb(255, 99, 9)',
      lOrange: 'rgb(255, 190, 9)',
      lYellow: 'rgb(255, 251, 128)',
      lGreen: 'rgb(211, 255, 128)',
      lBlue: 'rgb(150, 252, 255)',
      lPurple: 'rgb(199, 150, 255)',
      lGrey: 'rgb(201, 203, 207)',
      brRed: 'rgb(255, 0, 0)',
      brOrange: 'rgb(255, 155, 0)',
      brYellow: 'rgb(255, 230, 0)',
      brGreen: 'rgb(60, 255, 0)',
      brBlue: 'rgb(0, 0, 255)',
      brPurple: 'rgb(128, 0, 255)',
      black: 'rgb(0, 0, 0)',
      pink: 'rgb(255, 0, 183)'

    };
    let chart_color_keys = Object.keys (CHART_COLORS)

    const CHART_COLORS_50_Percent = {
      red: 'rgba(255, 101, 140, 0.5)',
      orange: 'rgba(255, 139, 64, 0.5)',
      yellow: 'rgba(255, 205, 86, 0.5)',
      green: 'rgba(75, 192, 192, 0.5)',
      blue: 'rgba(54, 162, 235, 0.5)',
      purple: 'rgba(153, 102, 255, 0.5)',
      grey: 'rgba(201, 203, 207, 0.5)',
      lRed: 'rgba(255, 99, 9, 0.5)',
      lOrange: 'rgba(255, 190, 9, 0.5)',
      lYellow: 'rgba(255, 251, 128, 0.5)',
      lGreen: 'rgba(211, 255, 128, 0.5)',
      lBlue: 'rgba(150, 252, 255, 0.5)',
      lPurple: 'rgba(199, 150, 255, 0.5)',
      lGrey: 'rgba(201, 203, 207, 0.5)',
      brRed: 'rgba(255, 0, 0, 0.5)',
      brOrange: 'rgba(255, 155, 0, 0.5)',
      brYellow: 'rgba(255, 230, 0, 0.5)',
      brGreen: 'rgba(60, 255, 0, 0.5)',
      brBlue: 'rgba(0, 0, 255, 0.5)',
      brPurple: 'rgba(128, 0, 255, 0.5)',
      black: 'rgba(0, 0, 0, 0.5)',
      pink: 'rgba(255, 0, 183, 0.5)'
    };

    const data = {
      labels: [],
      datasets: []
    }

    const config = {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Number of Employees in Thousands'
          }
        }
      }
    };

function responseReceivedHandler(){
  let gridline = {
    label: '',
    data: [],
    borderColor: CHART_COLORS.red,
    backgroundColor: CHART_COLORS_50_Percent.red,
    hidden: true
  };
  if(this.status == 200){
    console.log (this.response)
    let dataArray = this.response.Results.series[0].data;
    let seriesID = this.response.Results.series[0].seriesID
    let sectorCode = seriesID.substring (3,5)
    for (let i = dataArray.length - 1; i >= 0; i--) {
      gridline.data.push (dataArray[i].value)
      if (count == 0) {
      data.labels.push(dataArray[i].periodName + " " + dataArray[i].year)
      }
    }
    gridline.label = Super_Sectors[sectorCode]
    gridline.borderColor = CHART_COLORS[chart_color_keys[count]]
    gridline.backgroundColor = CHART_COLORS_50_Percent[chart_color_keys[count]]
    data.datasets.push(gridline)
    count++
    if (count == supersectorKeys.length) {
    const myChart = new Chart(
      document.getElementById('myChart'),
        config);
    }
  } else {
    console.log ("error");
  }
}

for (let i= 0; i<supersectorKeys.length; i++) {
let xhr = new XMLHttpRequest();
xhr.responseType = "json"
xhr.addEventListener("load", responseReceivedHandler);

let startQuery = "https://api.bls.gov/publicAPI/v2/timeseries/data/CEU"
let endQuery = "00000001?"
let apiKey= ""

xhr.open("GET", startQuery + supersectorKeys[i] + endQuery+"registrationkey="+apiKey);
xhr.send();

}
