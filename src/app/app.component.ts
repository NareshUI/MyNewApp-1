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
          'value':[150,60,85,79]
        },
        {
          'QId': 2,
          'value':[50,75,65,90]
        },
        {
          'QId': 3,
          'value':[75,68,73,89,62]
        },
        {
          'QId': 4,
          'value':[70,79,64,82]
        },
        {
          'QId': 5,
          'value':[82,75,61,76]
        },
        {
          'QId': 6,
          'value':[70,66,79,99]
        },
      ];
      localStorage.setItem('chartData',JSON.stringify(this.arr));
    }
    
  }
  
}
