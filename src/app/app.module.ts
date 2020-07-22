import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import {PaginatorModule} from 'primeng/paginator';
import {ChartModule} from 'primeng/chart';
import { AppComponent } from './app.component';
import { NewsListComponent } from './news-list/news-list.component';
import { GetDomainPipe } from './get-domain.pipe';
import { DateAgoPipe } from './date-ago.pipe';
import { LineChartComponent } from './line-chart/line-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    NewsListComponent,
    GetDomainPipe,
    DateAgoPipe,
    LineChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PaginatorModule,
    ChartModule,
   
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
