import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { environment } from '../../environments/environment'
import { Location } from "@angular/common";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {

  apiUrl = environment.API_URL;
  newsData = [];
  voteCount = 0;
  data: any;
  objectId: number;
  currentPage: number = 0;
  noDataFound: boolean = false;
  route: string;
  hideId = [];

  constructor(private commonService: CommonService, private router: Router, private _rout: ActivatedRoute, private location: Location) {

    this._rout.queryParams
      .subscribe(params => {
        this.currentPage = params.page || 0;
      });
  }

  ngOnInit() {

    this.getAllNews();
    this.data = {
      labels: ['0', '250', '500', '750', '1000'],
      datasets: [
        // {
        //     label: 'First Dataset',
        //     data: [65, 59, 80, 81, 56, 55, 40]
        // },
        {
          label: 'Vote',
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    }
  }

  getAllNews() {
    this.commonService.getData(this.apiUrl + `/v1/search?tags=front_page&page=${this.currentPage}`).subscribe((res) => {
      console.log(res);
      if (res['hits'].length > 0) {
        this.setNewsData(res['hits']);
        console.log('News data is ', this.newsData);

      }
      else {
        this.router.navigate(['/'], { queryParams: { page: this.currentPage } });
        console.log('No data found');
        this.noDataFound = true;

      }
    })
  }

  upVote(objectId) {
    const data = this.newsData.find(x => x.objectID === objectId);
    if (!data) {
      alert('Something bad happened');
      return;
    }

    data.points++;
    localStorage.setItem(objectId, data.points);
  }

  hideNews(id) {
        this.newsData = this.newsData.filter(x => x.objectID !== id);
      // this.hideId(id);
      const arr = this.newsData.find(x => x.objectID === id);
      console.log(arr);
      
       localStorage.setItem(id, arr.objectID);

       
  }
  
  getAfterHide(objectId)
  {
    this.newsData = this.newsData.filter(x => x.objectID !== objectId);
  }

  previousPage() {
    this.noDataFound = false;
    this.currentPage--;
    this.commonService.getData(this.apiUrl + `/v1/search?tags=front_page&page=${this.currentPage}`).subscribe((res) => {
      console.log(res);
      if (res['hits'].length > 0) {
       // this.newsData = res['hits'];
       this.setNewsData(res['hits']);
        this.router.navigate(['/'], { queryParams: { page: this.currentPage } });
        console.log('News data is ', this.newsData);

      }
      else {
        this.router.navigate(['/'], { queryParams: { page: this.currentPage } });
        console.log('No data found');
        this.noDataFound = true;

      }
    })
  }

  nextPage() {
    this.noDataFound = false;
    this.currentPage++;
    this.commonService.getData(this.apiUrl + `/v1/search?tags=front_page&page=${this.currentPage}`).subscribe((res) => {
      console.log(res);
      if (res['hits'].length < 20) {
        this.noDataFound = true;
      }

     // this.newsData = res['hits'];
      this.setNewsData(res['hits']);
      this.currentPage ? this.router.navigate(['/'], { queryParams: { page: this.currentPage } }) : this.router.navigate(['/']);

      console.log('News data is ', this.newsData);

    })


  }

  setNewsData(newsData: any[]) {
    for (let i of newsData) {
      const dataFromStorage = localStorage.getItem(i.objectID);

      if (dataFromStorage) {
        i.points = Number(dataFromStorage);
      }
    }
    this.newsData= newsData;
  }


}