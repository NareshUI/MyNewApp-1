import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-admin-board',
  templateUrl: './admin-board.component.html',
  styleUrls: ['./admin-board.component.css']
})
export class AdminBoardComponent implements OnInit {

  currentStudent:any;
  districtList :any=[];
  constutions :any =[];
  questionsList : any =[];
  parlimentList: any;
  suveyForm!:FormGroup;
  answersList : any = [];
  showLoader:boolean= true;
  closeResult : string ="";
  result: any;
  selectedParliment: any;
  mandals: any=[];
  Configuration: any;
  selectedState: any;
  stateList: any;
  selectedConstution: any;
  selectedDist: any;

  constructor(private httpService:HttpClient,private modalService:NgbModal,private router:Router, private sharedService:SharedService) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('logged') === "true"){
      this.suveyForm =  new FormGroup({
        'question':new FormControl(null,[Validators.required]),
        'answer':new FormControl(null,[Validators.required]),
        'value':new FormControl(null,[Validators.required])
      });
      this.loadData();
    }else{
      this.router.navigate(['/login']);
    }
  }

  questionChange(eve:any){
    this.answersList = [];
    if(eve.target.selectedIndex > 0){
      this.answersList = this.questionsList[eve.target.selectedIndex-1].data;
    }
  }

  parlimentChange(event:any){
    this.constutions = [];
    this.mandals = [];
    this.selectedParliment = event.target.value;
    this.constutions = this.Configuration.constutions.filter((c:any) => c.parlimentNo === this.selectedParliment && c.state === this.selectedState);
  }

  stateChange(event:any){
    this.parlimentList = [];
    this.selectedState = event.target.value;
    this.parlimentList = this.Configuration.parlimentList.filter((p:any) => p.state === this.selectedState);
  }

  loadData(){
      if(this.sharedService.infoData){
        this.Configuration = this.sharedService.infoData;
        this.questionsList = this.Configuration.questionsList;
        this.stateList = this.Configuration.statesList;
        this.districtList = this.Configuration.districtList;
        this.parlimentList = this.Configuration.parlimentList;
        this.constutions = this.Configuration.constutions;
      }else{
         let url = this.sharedService.url;
        this.httpService.get(url).subscribe((resp :any) =>{
          if(resp){
            this.Configuration = this.sharedService.infoData = resp;
            this.questionsList = this.Configuration.questionsList;
            this.stateList = this.Configuration.statesList;
            this.districtList = this.Configuration.districtList;
            this.parlimentList = this.Configuration.parlimentList;
            this.constutions = this.Configuration.constutions; 
            this.showLoader= false;
          }
        })
      }
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
      
      return this.selectedDist ? this.selectedDist : this.selectedDist.districtValue ="";
    }
  }else{
    this.selectedDist.districtValue =""
    this.mandals =[]
  }
}

  saveData(modalId:any){
    if(this.suveyForm.valid){
      let qIndx:number;
      let ansIndx :number = this.answersList.indexOf(this.suveyForm.controls['answer'].value);
      let questionObj = this.questionsList.find((x: { questionValue: any; }) => x.questionValue == this.suveyForm.controls['question'].value);
      if(questionObj){
        qIndx = questionObj.id;
      }
      let obj = localStorage.getItem('chartData');
      if(obj){
        let dataArray = JSON.parse(obj);
        dataArray.forEach((element: any) => {
          if(element.QId == qIndx){
            element.value[ansIndx] = this.suveyForm.controls['value'].value;
          }
        });
        localStorage.setItem('chartData',JSON.stringify(dataArray));
      }
      this.viewDetails(modalId,'Data saved succesfully');
    }
  }

  viewDetails(content:any,item:any){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.result = item;
  }
  private getDismissReason(reason: any): string {
    this.suveyForm.reset();
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  redirection(){
    this.router.navigate(['/Dashboard']);
  }

}
