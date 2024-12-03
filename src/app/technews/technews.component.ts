import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Article, techNews } from './techNews.Model';

@Component({
  selector: 'app-technews',
  templateUrl: './technews.component.html',
  styleUrl: './technews.component.css'
})
export class TechnewsComponent implements OnInit {
  constructor(private http : HttpClient){}
  ngOnInit(): void {
    this.http.get<techNews>('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=ca2e397cd3354be2bbfb624d49bb43c7').subscribe(res =>{
      console.log(res);
      this.articles = res.articles;
    })
  }
  articles : Article[] = [];
  
}
