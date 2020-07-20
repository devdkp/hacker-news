import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import {PaginatorModule} from 'primeng/paginator';
import {ChartModule} from 'primeng/chart';
import { AppComponent } from './app.component';
import { NewsListComponent } from './news-list/news-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NewsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PaginatorModule,
    ChartModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
