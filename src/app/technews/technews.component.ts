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
    this.http.get<techNews>('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=bab7872758af450a8a533180eb307044').subscribe(res =>{
      console.log(res);
      this.articles = res.articles;
    })
  }
  articles : Article[] = [];
  
}
