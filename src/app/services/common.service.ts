import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  dataSource = new BehaviorSubject(null);
  currentVoteCount = this.dataSource.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  getData(url:string)
  {
    return this.http.get(url);
  }
}
