import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as Highcharts from 'highcharts';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  closeResult: string = '';
  title = 'appBootstrap';
  url: string = '/assets/StateInfo.json';
  currentStudent:any;
  districtList :any=[];
  constutions :any =[];
  suveyForm!:FormGroup;
  studentArray = [ 
    { 'studNo' : 101 , 'studName' : "Satish" , 'fName':'John', 'class' : 10 , 'marks': 100, 'address' : "Dor no 1, some Street ,Hyderabad,Telangana Hyderabad and Hyderabad"},
    { 'studNo' : 102 , 'studName' : "Naresh" , 'fName':'Paul', 'class' : 9 , 'marks': 90, 'address' : " Dor no 2, abc Street , Vizag, AndhraPradesh   " },
    { 'studNo' : 103 , 'studName' : "suresh" , 'fName':'Smith', 'class' : 8 , 'marks': 80 , 'address' : "Dor no 3, xyz Street , UK"  },
   ];
  constructor(private modalService:NgbModal,private httpService : HttpClient,public fb: FormBuilder) { }

  ngOnInit(): void {
    this.suveyForm =  new FormGroup({
      'question':new FormControl(null,[Validators.required])
    });
    
    this.loadData();
    this.createChartColumn();
  }

  viewDetails(content:any,item:any){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.currentStudent = item;
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  private createChartColumn(): void {
    let date = new Date();
    const data: any[] = [];
    let colors = ['#00FF00','#FF00BF','#FF001B','#FG00C0','#FD0090']

    for (let i = 0; i < 5; i++) {
      date.setDate(new Date().getDate() + i);
      data.push({
        name: `${date.getDate()}/${date.getMonth() + 1}`,
        y: this.getRandomNumber(0, 1000),
        color: colors[i],
      });
    }

    const chart = Highcharts.chart(
      'chart-column' as any,
      {
        chart: {
          type: 'column',
        },
        title: {
          text: 'Survey Chart',
        },
        credits: {
          enabled: false,
        },
        legend: {
          enabled: true,
        },
        yAxis: {
          min: 0,
          title: undefined,
        },
        xAxis: {
          type: 'category',
        },
        tooltip: {
          headerFormat: `<div>Date: {point.key}</div>`,
          pointFormat: `<div>{series.name}: {point.y}</div>`,
          shared: true,
          useHTML: true,
        },
        plotOptions: {
          bar: {
            dataLabels: {
              enabled: true,
            },
          },
        },
        series: [
          {
            name: 'Amount',
            data,
          },
        ],
      } as any
    );

    // setInterval(() => {
    //   date.setDate(date.getDate() + 1);
    //   chart.series[0].addPoint(
    //     {
    //       name: `${date.getDate()}/${date.getMonth() + 1}`,
    //       y: this.getRandomNumber(0, 1000),
    //     },
    //     true,
    //     true
    //   );
    // }, 15000);
  }

  private getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  printPage(){
    window.print();
  }

  loadData(){
    this.httpService.get(this.url).subscribe((resp :any) =>{
      if(resp){
        this.districtList = resp.districtList;
        this.constutions = resp.constutions;
      }
    })
  }
}
