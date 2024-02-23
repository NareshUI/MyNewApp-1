import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  constructor(private httpService:HttpClient,private modalService:NgbModal,private router:Router) { }

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
    this.answersList = [];debugger;
    if(eve.target.selectedIndex > 0){
      this.answersList = this.questionsList[eve.target.selectedIndex-1].data;
    }
  }

  loadData(){
    let url: string = '/assets/StateInfo.json';
    this.httpService.get(url).subscribe((resp :any) =>{
      if(resp){
        this.questionsList = resp.questionsList;
        this.districtList = resp.districtList;
        this.parlimentList = resp.parlimentList;
        this.constutions = resp.constutions;
        this.showLoader = false;
      }
    })
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
