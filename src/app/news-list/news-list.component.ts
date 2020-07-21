import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import {environment} from '../../environments/environment'
import { Location } from "@angular/common";
import { Router } from '@angular/router';

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
   objectId : number;
   currentPage:number = 0;
   noDataFound: boolean = false;
   route: string;

   constructor(private commonService: CommonService, private router:Router, private location:Location) { 

    router.events.subscribe(val => {
      
      let pageCount = location.path().split('=');
      this.currentPage = parseInt(pageCount[1]);
      console.log(this.currentPage, pageCount, 'location path');
      
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

  getAllNews()
  {
    this.commonService.getData(this.apiUrl+`/v1/search?tags=front_page&page=${this.currentPage}`).subscribe((res) =>{
    console.log(res);
     if(res['hits'].length > 0)
     {
       this.newsData = res['hits'];

       console.log('News data is ', this.newsData);
       
     }
     else{
      this.router.navigate(['/'], { queryParams: {  page:this.currentPage } });
      console.log('No data found');
      this.noDataFound = true;
      
    }
    })
  }

 upVote(objectId)
  {
    const data = this.newsData.find(x => x.objectID === objectId);
    if (!data) {
      alert('Something bad happened');
      return;
    }

    data.points++;
    return;
  }

hideNews(id)
{
  const data = this.newsData.find(x => x.objectID === id);
  if (!data) {
    alert('Something bad happened');
    return;
  }
    this.objectId = data.objectID;

  
  return;
}

previousPage()
{
  this.noDataFound = false;
  this.currentPage--;
  this.commonService.getData(this.apiUrl+`/v1/search?tags=front_page&page=${this.currentPage}`).subscribe((res) =>{
    console.log(res);
     if(res['hits'].length > 0)
     {
       this.newsData = res['hits'];
       //this.router.navigate(['/v1/search']);
       this.router.navigate(['/'], { queryParams: {  page:this.currentPage } });
       console.log('News data is ', this.newsData);
       
     }
     else{
      this.router.navigate(['/'], { queryParams: {  page:this.currentPage } });
      console.log('No data found');
      this.noDataFound = true;
      
    }
    })
}

nextPage()
{
  this.noDataFound = false;
  this.currentPage++;
  this.commonService.getData(this.apiUrl+`/v1/search?tags=front_page&page=${this.currentPage}`).subscribe((res) =>{
    console.log(res);
     if(res['hits'].length > 0)
     {
       this.newsData = res['hits'];
       this.router.navigate(['/'], { queryParams: { page:this.currentPage } });

       console.log('News data is ', this.newsData);
       
     }
     else{
      this.router.navigate(['/'], { queryParams: {  page:this.currentPage } });
       console.log('No data found');
       this.noDataFound = true;
       
     }
    })

}

}
