import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  dataSource = new BehaviorSubject([]);
  chartData = this.dataSource.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  getData(url:string)
  {
    return this.http.get(url);
  }

  getPageData(url:string)
  {
    return this.http.get(url);
  }
}
