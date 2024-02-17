import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MyNewApp';
  arr:any = [];
    constructor(){
    }

  
  ngOnInit(): void {
    let obj = localStorage.getItem('chartData');
    if(obj){

    }else{
      this.arr = [
        {
          'QId': 1,
          'value':[150,60,85,79],
          'colors': ['#00FF00','#FF00BF','#FF001B','#FG00C0']
        },
        {
          'QId': 2,
          'value':[50,75,65,90,69],
          'colors': ['#00FF00','#FF00BF','#FF001B','#FG00C0','#FD0090']
        },
        {
          'QId': 3,
          'value':[75,68,73,89,69],
          'colors': ['#00FF00','#FF00BF','#FF001B','#FD0090']
        },
        {
          'QId': 4,
          'value':[70,79,64,82],
          'colors': ['#00FF00','#FF00BF','#FF001B','#FG00C0']
        },
        {
          'QId': 5,
          'value':[82,75,61,76,64],
          'colors': ['#00FF00','#FF00BF','#FF001B','#FA0090']
        },
        {
          'QId': 6,
          'value':[81,70,66,79,99],
          'colors': ['#00FF01','#FB00BF','#FF001B','#FC0090']
        },
      ];
      localStorage.setItem('chartData',JSON.stringify(this.arr));
    }
    
  }
  
}
