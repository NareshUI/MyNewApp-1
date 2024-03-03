import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  url: string = '/assets/StateInfo.json';
  infoData : any;
  uri = environment.uri;
  constructor(private httpService:HttpClient) { }

  loadData() : Observable<any>{
    return this.httpService.get(this.url);
      
  }
  getChaerData(payLoad : any) : Observable<any>{
    return this.httpService.post(this.uri+'/state/get',payLoad);
  }
  savePollData(payLoad : any) : Observable<any>{
    return this.httpService.post(this.uri+'/state/create',payLoad);
  }
}
