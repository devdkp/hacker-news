import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import {environment} from '../../environments/environment'

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
   hiddenObject = [];

  constructor(private commonService: CommonService) { }

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
    this.commonService.getData(this.apiUrl+'/v1/search?tags=front_page').subscribe((res) =>{
    console.log(res);
     if(res['hits'].length > 0)
     {
       this.newsData = res['hits'];

       console.log('News data is ', this.newsData);
       
     }
    })
  }

 async upVote(event)
  {
    let points = event;
    console.log(points);
    return
    points++;
    await this.commonService.dataSource.next(points);
    
    this.subscribeVote();
  }

  subscribeVote()
  {
    this.commonService.currentVoteCount.subscribe((vote) =>{
      this.voteCount = vote;
    })
  }

  paginate(event) {
    //event.first = Index of the first record
    //event.rows = Number of rows to display in new page
    //event.page = Index of the new page
    //event.pageCount = Total number of pages
}

// update(event: Event) {
//   this.data = 
// }

hideNews(id)
{
  // console.log(id);
  this.hiddenObject.push(id);

  console.log(this.hiddenObject);
  

}

}
