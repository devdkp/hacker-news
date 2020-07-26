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
  allData: Array<string>;
  chartData = []
  


  constructor(private commonService: CommonService, private router: Router, private _rout: ActivatedRoute, private location: Location) {

    this._rout.queryParams
      .subscribe(params => {
        this.currentPage = params.page || 0;
      });
  }

  ngOnInit() {

    let hiddenData = JSON.parse(localStorage.getItem('hiddenNews'));
    
    if( hiddenData && hiddenData.length > 0)
    {
      this.newsData = hiddenData;
      this.setNewsData(this.newsData);
      this.setChartData(this.newsData);
    }
    else{
      this.getAllNews();
     // this.setChartData(newsData);
    }
  }

    getAllNews() {
      
     this.commonService.getData(this.apiUrl + `/v1/search?tags=front_page&page=${this.currentPage}`).subscribe((res) => {
      console.log(res);
      if (res['hits'].length > 0) {
        this.setNewsData(res['hits']);
       localStorage.setItem('newsData', JSON.stringify(res['hits']));

     if(JSON.parse(localStorage.getItem('newsData')).length > 0)
      this.setStorage()
       
      }
      else {
        this.router.navigate(['/'], { queryParams: { page: this.currentPage } });
        console.log('No data found');
        this.noDataFound = true;

      }
    })
  }

 setStorage()
  {
    
    let newsData = JSON.parse(localStorage.getItem('newsData'));
    // alert(newsData)
     this.setChartData(newsData);
  }

   setChartData(data)
  {

    this.chartData = [];
    for(let i=0; i<data.length; i++)
     {
      
     this.chartData.push({y:data[i]['points'], x:parseInt(data[i]['objectID'])});
      }
     if(this.chartData.length > 0)
     {
      this.commonService.dataSource.next(this.chartData);
      // alert();
     // alert(this.chartData)
      console.log(this.chartData, 'after upvote');
      
     }
     
 
  }

  upVote(objectId) {
    const data = this.newsData.find(x => x.objectID === objectId);
    if (!data) {
      alert('Something bad happened');
      return;
    }

    data.points++;
    localStorage.setItem(objectId, data.points);
    this.setChartData(data);
  // this.commonService.dataSource.next(this.chartData);

  // this.setNewsData(data);
  }

  hideNews(id) {
      this.newsData = this.newsData.filter(x => x.objectID !== id);
      localStorage.setItem('hiddenNews', JSON.stringify(this.newsData));
      localStorage.setItem('newsData', JSON.stringify(this.newsData));
      this.getAfterHide()
 }
  
  getAfterHide()
  {
   // let remain = localStorage.getItem('hiddenNews');
   let remain = localStorage.getItem('newsData');
    this.newsData = JSON.parse(remain);
    this.setChartData(this.newsData);
    
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
      if (res['hits'].length > 0) {
        //this.noDataFound = true;
        this.setNewsData(res['hits']);
        this.router.navigate(['/'], { queryParams: { page: this.currentPage } });
        console.log('News data is ', this.newsData);
      }
      else{
        this.router.navigate(['/'], { queryParams: { page: this.currentPage } });
        console.log('No data found');
        this.noDataFound = true;
      }

     // this.newsData = res['hits'];
      //this.setNewsData(res['hits']);
     // this.currentPage ? this.router.navigate(['/'], { queryParams: { page: this.currentPage } }) : this.router.navigate(['/']);

      //console.log('News data is ', this.newsData);

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