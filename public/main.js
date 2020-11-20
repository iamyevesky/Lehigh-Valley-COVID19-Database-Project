//Called when a county is selected in graph 1
function countySelector() {
  graphData();
}

//Determine which graph to show
function graphData() {

  //Centers description
  document.getElementById("desc").style.position = "relative";
    document.getElementById("desc").style.left = "25%";
   document.getElementById("desc").style.right = "50%";

  //Grab input data from HTML
  let graphChoosen = document.getElementById('selectedGraph');
  let typeChoosen = graphChoosen.value;
  let county = document.getElementById('selectCounty');
  let countyChoosen;

  //Determine if county selector should be shown based on input
  if (graphChoosen.value == 1 || graphChoosen.value == 3) {
    county.style.visibility = 'visible';
    countyChoosen = county.value;
  } else {
    county.style.visibility = 'hidden';
  }

  //Determine which graph should be shown based on input
  if (typeChoosen == 1) {
    if (countyChoosen == 1) {
      //Fetch data
      fetch('http://139.147.9.198/county/Carbon',{
	method: 'GET'
	}).then(response => response.json()).then(data => {graph1([data[0].cases], [data[0].deaths], 'Carbon County'); });
      var newDesc = "Displays the total recorded COVID-19 cases and deaths in Carbon County";
      document.querySelector("#desc").innerHTML = newDesc;
} else if (countyChoosen == 2) {
      
 	fetch('http://139.147.9.198/county/Lehigh',{
        	method: 'GET'
        	}).then(response => response.json()).then(data => {graph1([data[0].cases], [data[0].deaths], 'Lehigh County'); });
        var newDesc = "Displays the total recorded COVID-19 cases and deaths in Lehigh County";
      document.querySelector("#desc").innerHTML = newDesc; 
    } else if (countyChoosen == 3) {
       fetch('http://139.147.9.198/county/Northampton',{
        method: 'GET'
        }).then(response => response.json()).then(data => {graph1([data[0].cases], [data[0].deaths], 'Northampton County'); });
      var newDesc = "Displays the total recorded COVID-19 cases and deaths in Northampton County";
      document.querySelector("#desc").innerHTML = newDesc;
    } else if (countyChoosen == 4) {
       fetch('http://139.147.9.198/county/Warren',{
        method: 'GET'
        }).then(response => response.json()).then(data => {graph1([data[0].cases], [data[0].deaths], 'Warren County'); });
       var newDesc = "Displays the total recorded COVID-19 cases and deaths in Warren County";
      document.querySelector("#desc").innerHTML = newDesc;
    }
  }
  else if (typeChoosen == 2) {
    let urls = [
      'http://139.147.9.198/county/Carbon',
      'http://139.147.9.198/county/Lehigh',
      'http://139.147.9.198/county/Northampton',
      'http://139.147.9.198/county/Warren',
      'http://139.147.9.198/allcountycases'
    ];

    let requests = urls.map(url => fetch(url));

    Promise.all(requests)
      .then(function(responses) {
        return Promise.all(responses.map(function (response) {
          return response.json();
        }));}).then(function(data) {
        let cTmp = data[0];
        let cPop = cTmp[0].population / 1000;
        let cData = [];
        let lTmp = data[1];
        let lPop = lTmp[0].population / 1000;
        let lData = [];
        let nTmp = data[2];
        let nPop = nTmp[0].population / 1000;
        let nData = [];
        let wTmp = data[3];
        let wPop = wTmp[0].population / 1000;
        let wData = [];
        let allTmp = data[4];
        let allPop = cPop + lPop + nPop + wPop;
        let allData = [];

        cData.push([new Date(cTmp[cTmp.length - 1].dateofrecording).getTime(), cTmp[cTmp.length - 1].cases / cPop]);
        for(var i = cTmp.length - 1; i > 0; i--) {
          var date = cTmp[i].dateofrecording;
          var cases = cTmp[i - 1].cases - cTmp[i].cases;
          cases = cases / cPop;
          cData.push([new Date(date).getTime(), cases]);
        }
        lData.push([new Date(lTmp[lTmp.length - 1].dateofrecording).getTime(), lTmp[lTmp.length - 1].cases / lPop]);
        for(var i = lTmp.length - 1; i > 0; i--) {
          var date = lTmp[i].dateofrecording;
          var cases = lTmp[i - 1].cases - lTmp[i].cases;
          cases = cases / lPop;
          lData.push([new Date(date).getTime(), cases]);
        }
        nData.push([new Date(nTmp[nTmp.length - 1].dateofrecording).getTime(), nTmp[nTmp.length - 1].cases / nPop]);
        for(var i = nTmp.length - 1; i > 0; i--) {
          var date = nTmp[i].dateofrecording;
          var cases = nTmp[i - 1].cases - nTmp[i].cases;
          cases = cases / nPop;
          nData.push([new Date(date).getTime(), cases]);
        }
        wData.push([new Date(wTmp[wTmp.length - 1].dateofrecording).getTime(), wTmp[wTmp.length - 1].cases / wPop]);
        for(var i = wTmp.length - 1; i > 0; i--) {
          var date = wTmp[i].dateofrecording;
          var cases = wTmp[i - 1].cases - wTmp[i].cases;
          cases = cases / wPop;
          wData.push([new Date(date).getTime(), cases]);
        }
        allData.push([new Date(allTmp[allTmp.length - 1].dateofrecording).getTime(), allTmp[allTmp.length - 1].sum / allPop]);
        for(var i = allTmp.length - 1; i > 0; i--) {
          var date = allTmp[i].dateofrecording;
          var cases = allTmp[i - 1].sum - allTmp[i].sum;
          cases = cases / allPop;
          allData.push([new Date(date).getTime(), cases]);
        }
       graph2(cData, lData, nData, wData, allData);
       var newDesc = "Displays the incidence of cases (new daily cases per 1000 people in the county) since March";
      document.querySelector("#desc").innerHTML = newDesc;
       });
  }
  else if (typeChoosen == 3) {
    if(countyChoosen == 1) {  
       fetch('http://139.147.9.198/county/Carbon',{
        method: 'GET'
        }).then(response => response.json()).then(data => {graph3([data[0].cases], ['Carbon County']); });
       var newDesc = "Displays the total recorded COVID-19 cases in Carbon County. No 4 year colleges or universities are located in Carbon County.";
      document.querySelector("#desc").innerHTML = newDesc;
    } else if(countyChoosen == 2) {
	Promise.all([
		fetch('http://139.147.9.198/collegeagg/Muhlenberg'),
fetch('http://139.147.9.198/collegeagg/Cedar Crest'),
fetch('http://139.147.9.198/collegeagg/Pennsylvania State'),
fetch('http://139.147.9.198/collegeagg/DeSales'),
		fetch('http://139.147.9.198/county/Lehigh')]).then(function (responses){
						return Promise.all(responses.map(function (response){
							return response.json();
		}));}).then(function (data){
			graph3([data[0][0].cases, data[1][0].cases, data[2][0].cases, data[3][0].cases, data[4][0].cases], ['Muhlenberg College', 'Cedar Crest College', 'Penn State Lehigh Valley', 'DeSales Unversity', 'Lehigh County']);
		});
       //var colleges = ['Muhlenberg College', 'DeSales University', 'Cedar Crest College', ['Pennsylvania State University', 'Lehigh Valley'], 'Lehigh County'];
       //graph3([10, 20, 30, 40, 120], colleges);
       var newDesc = "Displays the total recorded COVID-19 cases for colleges and universities in Lehigh County";
      document.querySelector("#desc").innerHTML = newDesc;
    } else if(countyChoosen == 3) {
        Promise.all([
                fetch('http://139.147.9.198/collegeagg/Lafayette'),
fetch('http://139.147.9.198/collegeagg/Lehigh'),
fetch('http://139.147.9.198/collegeagg/Moravian'),
                fetch('http://139.147.9.198/county/Northampton')]).then(function (responses){
                                                return Promise.all(responses.map(function (response){
                                                        return response.json();
                }));}).then(function (data){
                        graph3([data[0][0].cases, data[1][0].cases, data[2][0].cases, data[3][0].cases], ['Lafayete College', 'Lehigh University', 'Moravian College', 'Northampton County'])});
                var newDesc = "Displays the total recorded COVID-19 cases for colleges and universities in Northampton County";
      document.querySelector("#desc").innerHTML = newDesc;
    } else if(countyChoosen == 4) {
       fetch('http://139.147.9.198/county/Warren',{
        method: 'GET'
        }).then(response => response.json()).then(data => {graph3([data[0].cases], ['Warren County']); });
       var newDesc = "Displays the total recorded COVID-19 cases in Warren County. No 4 year colleges or universities are located in Warren County";
      document.querySelector("#desc").innerHTML = newDesc;
    }
  }
  else if (typeChoosen == 4) {
    Promise.all([
	fetch('http://139.147.9.198/collegeagg/Lafayette'),
	fetch('http://139.147.9.198/collegeagg/Lehigh'),
	fetch('http://139.147.9.198/collegeagg/Moravian'),
	fetch('http://139.147.9.198/collegeagg/DeSales'),
	fetch('http://139.147.9.198/collegeagg/Pennsylvania State'),
	fetch('http://139.147.9.198/collegeagg/Muhlenberg'),
	fetch('http://139.147.9.198/collegeagg/Cedar Crest'),
	fetch('http://139.147.9.198/allcountycases')]).then(function(responses){
		return Promise.all(responses.map(function(response){
			return response.json();
	}));}).then(function(data){
                let laf = data[0];
                let lafData = [];
                let leh = data[1];
                let lehData = [];
                let mor = data[2];
                let morData = [];
                let des = data[3];
                let desData = [];
                let pen = data[4];
                let penData = [];
                let muh = data[5];
                let muhData = [];
                let ced = data[6];
                let cedData = [];
                let all = data[7];
                let allData = [];

                for(var i = 0; i < laf.length; i++) {
                   var date = laf[i].dateofrecording;
                   var cases = laf[i].cases;
                   lafData.push([new Date(date).getTime(), cases]);
                 }
                for(var i = 0; i < leh.length; i++) {
                   var date = leh[i].dateofrecording;
                   var cases = leh[i].cases;
                   lehData.push([new Date(date).getTime(), cases]);
                 }
                 for(var i = 0; i < mor.length; i++) {
                   var date = mor[i].dateofrecording;
                   var cases = mor[i].cases;
                   morData.push([new Date(date).getTime(), cases]);
                 }
                 for(var i = 0; i < des.length; i++) {
                   var date = des[i].dateofrecording;
                   var cases = des[i].cases;
                   desData.push([new Date(date).getTime(), cases]);
                 }
                 for(var i = 0; i < pen.length; i++) {
                   var date = pen[i].dateofrecording;
                   var cases = pen[i].cases;
                   penData.push([new Date(date).getTime(), cases]);
                 }
                 for(var i = 0; i < muh.length; i++) {
                   var date = muh[i].dateofrecording;
                   var cases = muh[i].cases;
                   muhData.push([new Date(date).getTime(), cases]);
                 }
                 for(var i = 0; i < ced.length; i++) {
                   var date = ced[i].dateofrecording;
                   var cases = ced[i].cases;
                   cedData.push([new Date(date).getTime(), cases]);
                 }
                 for(var i = 0; i < all.length; i++) {
                   var date = all[i].dateofrecording;
                   var cases = all[i].sum;
                   allData.push([new Date(date).getTime(), cases]);
                 }
		graph4(lafData, lehData, morData, desData, penData, muhData, cedData, allData);
	});
        var newDesc = "Displays the aggregated COVID-19 cases for colleges in the Lehigh Valley and the Lehigh Valley itself";
      document.querySelector("#desc").innerHTML = newDesc;
  }
  else {
    
  }

}

//Display graph 1
function graph1(cases, deaths, county) {
  var options = {
    series: [{
      name: 'Cases',
      data: cases
    }, {
      name: 'Deaths',
      data: deaths
    }],
    chart: {
      type: "bar",
      height: 500,
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    title: {
      text: 'Cases and Deaths by County',
      align: 'center',
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
    xaxis: {
      type: "category",
      categories: [county]
    }
  };

  //Remove any existing graph before rendering
  document.getElementById("chart1").remove();
  var createDiv = document.createElement("div");
  createDiv.id = "chart1";
  document.getElementById("chart").appendChild(createDiv);
  var chart2 = new ApexCharts(document.querySelector("#chart1"), options);
  chart2.render();
}

//Show graph 2
function graph2(cData, lData, nData, wData, allData) {
  var options = {
    series: [{
      name: 'Carbon',
      data: cData
    },
    {
      name: 'Lehigh',
      data: lData,
    },
    {
      name: 'Northampton',
      data: nData
    },
    {
      name: 'Warren',
      data: wData
    },
    {
      name: 'Lehigh Valley Overall',
      data: allData
    }],
    chart: {
      type: "line",
      height: 350,
      zoom: {
        enabled: true
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    title: {
      text: 'Incidence of Cases',
      align: 'center'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
    xaxis: {
      type: 'datetime'
    }
  };

  //Remove any existing graph before rendering
  document.getElementById("chart1").remove();
  var createDiv = document.createElement("div");
  createDiv.id = "chart1";
  document.getElementById("chart").appendChild(createDiv);
  var chart2 = new ApexCharts(document.querySelector("#chart1"), options);
  chart2.render();
}

//Show graph 3
function graph3(casesData, colleges) {
  var options = {
    series: [
      {
        name: 'Cases',
        data: casesData
      }
    ],
    chart: {
      type: "bar",
      height: 500,
      zoom: {
        enabled: true
      }
    },
    dataLabels: {
	enabled: false
},
    title: {
      text: 'Cases at each college in a county and total cases in the county',
      align: 'center'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
    xaxis: {
      type: "category",
      categories: colleges,
      tickPlacement: "on"
    },
   yaxis:{
	logarithmic: true
}
  };

  //Remove any existing graph before rendering
  document.getElementById("chart1").remove();
  var createDiv = document.createElement("div");
  createDiv.id = "chart1";
  document.getElementById("chart").appendChild(createDiv);
  var chart2 = new ApexCharts(document.querySelector("#chart1"), options);
  chart2.render();
}

//Show graph 4
function graph4(laf, leh, mor, des, penn, muh, cc, all) {
        var options = {
          series: [{
           name: 'Lafayette College',
           data: laf
          },
          {
           name: 'Lehigh University',
           data: leh
          },
          {
           name: 'DeSales University',
           data: des
          },
          {
           name: 'Pennsylvania State University Lehigh Valley',
           data: penn
          },
          {
           name: 'Muhlenberg College',
           data: muh
          },
          {
           name: 'Cedar Crest College',
           data: cc
          },
          {
           name: 'Lehigh Valley Overall',
           data: all
          }
        ],
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: true
          }
        },
	yaxis:{
	logarithmic: true
},
        xaxis: {
         type: 'datetime'
        },
        title: {
          text: 'Daily Aggregated Cases in each College and the Lehigh Valley'
        }
        };
  
  document.getElementById("chart1").remove();
  var createDiv = document.createElement("div");
  createDiv.id = "chart1";
  document.getElementById("chart").appendChild(createDiv);
  var chart1 = new ApexCharts(document.querySelector("#chart1"), options);
  chart1.render();
}