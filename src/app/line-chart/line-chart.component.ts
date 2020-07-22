import { Component, OnInit, Input, AfterContentInit, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';
import * as CanvasJS from '../../assets/canvasjs.min';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  chartArr = [];

  constructor(private commonService:CommonService) { 

    this.commonService.chartData.subscribe((res) =>{
      console.log(res, 'response from chat');
      this.chartArr.push(res);
      
    })
  }


  ngOnInit() {
   
    this.feelChartData();
    }

   
    feelChartData()
    {

      console.log(this.chartArr.length, 'Chart array in chart feed');
      

var chart = new CanvasJS.Chart("chartContainer", {
	animationEnabled: true,
	theme: "light2",
	title:{
		text: "Vote Chart"
	},
	axisY:{
		includeZero: false
  },
  axisX:{
    includeZero: true
  },
	data: [{        
		type: "line",
      	indexLabelFontSize: 16,
		dataPoints: [
			{ y: 450, x:23915521 },
			{ y: 414, x:23915522},
			{ y: 520, x:23915523 },
			{ y: 460, x:23915524 },
			{ y: 450, x:23915525 },
			{ y: 500, x:23915526 },
			{ y: 480, x:23915527 },
			{ y: 480, x:23915528 },
			{ y: 410 , x:23915529 },
			{ y: 500, x:23915530 },
			{ y: 480, x:23915531 },
			{ y: 510, x:23915532 }
    ]
    
    //dataPoints: this.chartArr
	}]
});
chart.render();

}


}
