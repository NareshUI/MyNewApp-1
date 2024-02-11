import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  constructor(private httpService:HttpClient) { }

  ngOnInit(): void {
    this.suveyForm =  new FormGroup({
      'question':new FormControl(null,[Validators.required])
    });
    this.loadData();
  }

  questionChange(eve:any){
    this.answersList = [];
    if(eve.target.selectedIndex > 0){
      this.answersList = this.questionsList[eve.target.selectedIndex].data;
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



}
