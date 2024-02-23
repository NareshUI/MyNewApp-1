import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  url: string = '/assets/StateInfo.json';
  infoData : any;
  constructor(private httpService:HttpClient) { }

  loadData() : Observable<any>{
    return this.httpService.get(this.url);
      
  }
}
