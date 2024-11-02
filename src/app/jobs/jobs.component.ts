import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
})
export class JobsComponent implements OnInit {
  constructor(private http : HttpClient){}
  url = 'https://indeed-indeed.p.rapidapi.com/apisearch?v=2&format=json&q=java&l=austin%2C%20tx&radius=25';
   
  ngOnInit(): void {
    const headers = new HttpHeaders()
    .set('x-rapidapi-key', '2fa6964e63msh528a0ab0765bc30p1b6436jsn95e8319b3076')
    .set('x-rapidapi-key', 'indeed-indeed.p.rapidapi.com');
    this.http.get(this.url, {headers}).subscribe(response => {
      console.log(response);
    });
  }
  
}
