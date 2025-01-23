// Select all the SVG elements
const svgs = document.querySelectorAll('.c-radiohapines__svg');

// Add event listeners to handle clicks
svgs.forEach((svg) => {
  svg.addEventListener('click', () => {
    // Remove the active class from all SVGs
    svgs.forEach((item) => item.classList.remove('c-radiohapines__svg--active'));

    // Add the active class to the clicked SVG
    svg.classList.add('c-radiohapines__svg--active');
  });
});

const charts = document.querySelectorAll('.js-barchartendhartslag');

// Loop door alle gevonden elementen en initialiseer de grafieken
charts.forEach(chartElement => {
  // Initialiseer een ECharts instantie voor dit element
  const chartInstance = echarts.init(chartElement);

  // Definieer de opties voor de grafiek
  const options = {
    title: {
      text: '',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: ['1', '3', '5', '7', '9', '11', '13'] // Voorbeeld labels
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Hartslag',
        type: 'line',
        data: [80, 85, 88, 90, 85, 78, 82], // Voorbeeld gegevens
        smooth: true,
        lineStyle: {
          color: '#FF5733'
        }
      }
    ]
  };

  // Stel de opties in voor de grafiek
  chartInstance.setOption(options);

  // Zorg ervoor dat de grafiek opnieuw wordt geschaald bij venstergrootteveranderingen
  window.addEventListener('resize', () => {
    chartInstance.resize();
  });
});
const chartElement = document.querySelector('.js-barchartendhartslagm');

// Initialiseer ECharts
const chartInstance = echarts.init(chartElement);

// Stel de opties in voor twee lijnen
const options = {
  title: {
    text: 'Grafiek met Twee Lijnen',
    left: 'center'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['persoon 1', 'persoon 2'], // Namen van de lijnen
    top: '10%'
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['1', '3', '5', '7', '9', '11', '13'] // X-as labels
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'persoon 1',
      type: 'line',
      data: [2, 4, 6, 8, 10, 12, 14], // Gegevens voor lijn 1
      lineStyle: {
        color: '#FF5733'
      },
      smooth: true
    },
    {
      name: 'persoon 2',
      type: 'line',
      data: [3, 5, 7, 9, 11, 13, 15], // Gegevens voor lijn 2
      lineStyle: {
        color: '#33FF57'
      },
      smooth: true
    }
  ]
};

// Stel de opties in
chartInstance.setOption(options);

// Zorg ervoor dat de grafiek responsief is
window.addEventListener('resize', () => {
  chartInstance.resize();
});

