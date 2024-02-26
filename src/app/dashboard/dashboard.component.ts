import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as Highcharts from 'highcharts';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';


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
  arr:any=[];
  showLoader:boolean= true;
  stateList: any;
  selectedState: any;
  currentQIndex: any =0;
  selectedConstution: any;
  selectedDist: any;
  Configuration: any;
  mandals:any =[];
  showConstution : boolean= false;
  showDistAndMandals : boolean= false;
  DisplayErrors :any =[];
  constructor(private modalService:NgbModal,private router : Router,public fb: FormBuilder,private sharedService : SharedService) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('logged') === "true"){

      let data=localStorage.getItem('chartData');
      if(data){
        this.arr=JSON.parse(data)
      }
      this.today = new Date().toISOString().split('T')[0];
      this.suveyForm =  new FormGroup({
        'question':new FormControl(null,[Validators.required])
      });

      this.loadData();

    }else{
      this.router.navigate(['/login']);
    }
    
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
    this.currentQIndex = eve.target.selectedIndex;
  }

  searchData(){
    if(this.currentQIndex > 0){
      let data = this.questionsList.find((x: { id: any; }) => x.id == this.currentQIndex);
      let obj = this.arr.find((x: { QId: any; }) => x.QId == this.currentQIndex);
      if(obj && data){
        this.createChartColumn(data.data,obj.value,data.colors);
      }
    }else{
      //this.DisplayErrors.push("Please Select Question");
      alert("Please Select Question");
    }
  }

  private createChartColumn(seriesdata:any,values:any,colors:any): void {
    const data: any[] = [];
    // let colors = ['#00FF00','#FF00BF','#FF001B','#FG00C0','#FD0090'];
    // let values = [80,70,65,73,69];

    for (let i = 0; i < seriesdata.length; i++) {
      data.push({
        name: seriesdata[i],
        data: [values[i]],
        color: colors[i],
      });
    }
    //let xAxisLabels = seriesdata.toString().replaceAll(',','&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');

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
        xAxis: {
          type: 'category',
            categories: " "
        },
        yAxis: {
          min: 0,
          title: "",
          lineWidth: 1,
          showLastLabel: true,
        },
        plotOptions: {
          column: {
            groupPadding: 0.15,
          },
          tooltip: {
            headerFormat: `<div>Value: {point.key}</div>`,
            pointFormat: `<div>{series.name}: {point.y}</div>`,
            shared: true,
            useHTML: true,
          },
          series:{
            pointWidth: values.length > 4 ? 60 : 80,
            dataLabels: {
              enabled: true,
              format: `{point.y:.1f} %`,
              valueDecimals: 1,
            },
          }
        },
        series: data,
      } as any
    );
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
    if(this.sharedService.infoData){
      this.Configuration = this.sharedService.infoData;
      this.questionsList = this.Configuration.questionsList;
      this.stateList = this.Configuration.statesList;
       this.districtList = this.Configuration.districtList;
      // this.parlimentList = this.Configuration.parlimentList;
      // this.constutions = this.Configuration.constutions;
      this.showLoader= false;
    }else{
      this.showLoader= true;
      this.sharedService.loadData().subscribe((resp :any) =>{
        if(resp){
          this.Configuration = this.sharedService.infoData = resp;
          this.questionsList = this.Configuration.questionsList;
          this.stateList = this.Configuration.statesList;
           this.districtList = this.Configuration.districtList;
          // this.parlimentList = this.Configuration.parlimentList;
          // this.constutions = this.Configuration.constutions; 
          this.showLoader= false;
        }
      })
    }
   }
  stateChange(event:any){
    this.parlimentList = [];
    this.selectedState = event.target.value;
    this.parlimentList = this.Configuration.parlimentList.filter((p:any) => p.state=== this.selectedState);
  }
  parlimentChange(event:any){
    this.constutions = [];
    this.mandals = [];
    this.selectedParliment = event.target.value;
    this.constutions = this.Configuration.constutions.filter((c:any) => c.parlimentNo === this.selectedParliment && c.state === this.selectedState);
  }
  constutionsChange(event:any){
    this.selectedConstution = event.target.value;
    let constutionObj = this.constutions.find((x: { constutionNo: any; }) => x.constutionNo == this.selectedConstution);
    if(constutionObj){
      this.mandals = constutionObj.mandals;
      this.selectedDist = {};
      this.selectedDist = this.districtList.find((x: {
        parlimentNo: any; state: any; }) => x.state == this.selectedState && x.parlimentNo == this.selectedParliment);
      if(this.selectedDist.constutionNo.includes(this.selectedConstution)){
        return this.selectedDist;
      }
    }else{
      this.selectedDist.districtValue =""
      this.mandals =[]
    }
  }

  logout(){
    sessionStorage.removeItem('logged');
    this.router.navigate(['/login'])
  }

  displayConstution(e:any){
    if(e.target.checked){
      this.showConstution = true;
    }else{
      this.showConstution = false;
    }
  }
  displayDistMandal(eve:any){
    if(eve.target.checked){
     this.showDistAndMandals = true;
    }else{
      this.showDistAndMandals = false;
    }
  }

  closeToast(){

  }
}
