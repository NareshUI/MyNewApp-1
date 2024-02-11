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
  today: string = "";
  questionsList: any =[];
  parlimentList: any;
  selectedDistrict: any;
  selectedParliment: any;
  chart : any;
  constructor(private modalService:NgbModal,private httpService : HttpClient,public fb: FormBuilder) { }

  ngOnInit(): void {
    this.today = new Date().toISOString().split('T')[0];
    this.suveyForm =  new FormGroup({
      'question':new FormControl(null,[Validators.required])
    });
    
    this.loadData();
   
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

  questionChange(eve:any){
    if(this.chart){
      this.chart.destroy();
    }
    if(eve.target.selectedIndex > 0){
      let data = this.questionsList[eve.target.selectedIndex].data;
      this.createChartColumn(data);
    }
  }

  private createChartColumn(seriesdata:any): void {
    let date = new Date();
    const data: any[] = [];
    let colors = ['#00FF00','#FF00BF','#FF001B','#FG00C0','#FD0090']

    for (let i = 0; i < seriesdata.length; i++) {
      date.setDate(new Date().getDate() + i);
      data.push({
        name: seriesdata[i],
        y: this.getRandomNumber(0, 1000),
        color: colors[i],
      });
    }

    this.chart = Highcharts.chart(
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
            pointWidth: 15,
            dataLabels: {
              enabled: true,
            },
          },
        },
        series: [
          {
            name: 'Poll Survey',
            data,
          },
        ],
      } as any
    );
  }

  private getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  resetForm(){
    if(this.chart){
      this.chart.destroy();
    }
    this.suveyForm.reset();
  }

  printPage(){
    window.print();
  }

  loadData(){
    this.httpService.get(this.url).subscribe((resp :any) =>{
      if(resp){
        this.questionsList = resp.questionsList;
        this.districtList = resp.districtList;
        this.parlimentList = resp.parlimentList;
        this.constutions = resp.constutions;
      }
    })
  }
  districtChange(event:any){
    this.selectedDistrict = event.target.value;
    this.parlimentList = this.parlimentList.filter((p:any) => p.districtNo === this.selectedDistrict);

  }
  parlimentChange(event:any){
    // debugger
    this.selectedParliment = event.target.value;
    this.constutions = this.constutions.filter((c:any) => c.parlimentNo === this.selectedParliment);

  }
}
