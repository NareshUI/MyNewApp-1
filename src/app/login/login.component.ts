import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showToast :boolean = false;
  showDanger:boolean = false;
  constructor( private fb:FormBuilder,private router : Router,private sharedService:SharedService) { 
    this.loginForm =  this.fb.group({
      userName:['',Validators.required],
      password:['',Validators.required]
    });
    
  }

  ngOnInit(): void {
   
  }

  login(){
    if(this.loginForm.valid){
      this.sharedService.loadData().subscribe(res =>{
        if(res){
          this.sharedService.infoData = res;
          if(res.hasOwnProperty('loginInfo')){
            let logObj = res.loginInfo.length > 0 ? res.loginInfo.find((x: { userId: any; }) => x.userId == this.loginForm.controls['userName'].value) : undefined;
            if(logObj){
              if(this.loginForm.controls['userName'].value == logObj.userId && this.loginForm.controls['password'].value == logObj.password){
                sessionStorage.setItem('logged',"true");
                this.showToast= true;
                setTimeout(() => {
                  this.router.navigate(['/Dashboard']);
                },1200);
              }else{
                sessionStorage.removeItem('logged');
                this.showDanger = true;
              }
            }else{
              sessionStorage.removeItem('logged');
                this.showDanger = true;
            }
          }
        }
      });
    }
  }

  closeToast(){
    this.showDanger = false;
    this.loginForm.reset();
  }

}
