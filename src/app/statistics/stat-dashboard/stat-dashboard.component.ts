import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stat-dashboard',
  templateUrl: './stat-dashboard.component.html',
  styleUrls: ['./stat-dashboard.component.scss']
})
export class StatDashboardComponent  {


  // data goes here
  public single = [
    {
      "name": "Lidle",
      "value": 1940000
    },
    {
      "name": "Carrefour",
      "value": 3000000
    },
    {
      "name": "Util",
      "value": 6200000
    },
    {
      "name": "Spar",
      "value": 8700000
    },
    {
      "name": "Monoprix",
      "value": 5700000
    },
    {
      "name": "Casino",
      "value": 3200000
    }
  ];

  public multi = [
    {
      "name": "Lidle",
      "series": [
        {
          "name": "2010",
          "value": 7300000
        },
        {
          "name": "2011",
          "value": 8940000
        }
      ]
    },

    {
      "name": "Carrefour",
      "series": [
        {
          "name": "2010",
          "value": 7870000
        },
        {
          "name": "2011",
          "value": 8270000
        }
      ]
    },

    {
      "name": "Util",
      "series": [
        {
          "name": "2010",
          "value": 35000000
        },
        {
          "name": "2011",
          "value": 4800000
        }
      ]
    },
    {
      "name": "Spar",
      "series": [
        {
          "name": "2010",
          "value": 1000002
        },
        {
          "name": "2011",
          "value": 6800000
        }
      ]
    },
    {
      "name": "Monoprix",
      "series": [
        {
          "name": "2010",
          "value": 1000002
        },
        {
          "name": "2011",
          "value": 7800000
        }
      ]
    },
    {
      "name": "Casino",
      "series": [
        {
          "name": "2010",
          "value": 2000002
        },
        {
          "name": "2011",
          "value": 25800000
        }
      ]
    }
  ];


  view: any[] = [700, 400];

  // options for the chart
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Number';
  showYAxisLabel = true;
  yAxisLabel = 'Value';
  timeline = true;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#3361FF', '#FF8A33' , '#F5110A' ]
  };

  // line, area
  autoScale = true;

  //pie
  showLabels = true;
  explodeSlices = false;
  doughnut = false;

}
