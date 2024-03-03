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
    // let obj = localStorage.getItem('chartData');
    // if(obj){

    // }else{
    //   this.arr = [
    //     {
    //       'QId': 1,
    //       'value':[150,60,85,79]
    //     },
    //     {
    //       'QId': 2,
    //       'value':[50,75,65,90]
    //     },
    //     {
    //       'QId': 3,
    //       'value':[75,68,73,89,62]
    //     },
    //     {
    //       'QId': 4,
    //       'value':[70,79,64,82]
    //     },
    //     {
    //       'QId': 5,
    //       'value':[82,75,61,76]
    //     },
    //     {
    //       'QId': 6,
    //       'value':[70,66,79,99]
    //     },
    //     {
    //       'QId': 7,
    //       'value':[66,55,72,85]
    //     },
    //     {
    //       'QId': 8,
    //       'value':[54,72,35,75]
    //     },
    //     {
    //       'QId': 9,
    //       'value':[45,62,89,69]
    //     },
    //     {
    //       'QId': 10,
    //       'value':[40,62,49,69]
    //     },
    //     {
    //       'QId': 11,
    //       'value':[52,46,59,49]
    //     },
    //     {
    //       'QId': 12,
    //       'value':[65,52,29,49]
    //     }
    //   ];
    //   localStorage.setItem('chartData',JSON.stringify(this.arr));
    // }
    
  }
  
}
