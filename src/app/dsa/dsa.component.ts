import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/authService';
import { Route, Router } from '@angular/router';

interface Data {
  topicName : string;
  topicArticleLink : string;
  topicProblemLink : string;
  topicChecked : boolean;
}

interface basicData{
  Article : string,
  Difficulty : string,
  Practice : any,
  Video : string
}
@Component({
  selector: 'app-dsa',
  templateUrl: './dsa.component.html',
  styleUrls: ['./dsa.component.css']
})
export class DsaComponent  implements OnInit{
  constructor(private http : HttpClient , 
    private auth : AuthService,
    private route : Router
  ){}
  dataWant : any;
  dataFetch  :any;
  labelForBasicData : any;
  labelForSTLData : any;
  labelForPatternData  :any;
  labelForRec_ProbData: any;
  labelForMath_ProbData : any;
  labelForHash_ProbData  : any;
  ngOnInit(): void {  
    if(!!this.auth.user$){
      alert('Sign In to continue');
      this.route.navigate(['/home']);
    }
    const url = 'https://edunavigator-dc324-default-rtdb.firebaseio.com/.json';
    this.http.get(url).subscribe(
      (response) => {
       this.dataFetch =  Object.values(response);
       this.dataWant = this.dataFetch[1];
       this.basicData = Object.values(this.dataWant);
       console.log(this.basicData);
       this.labelForRec_ProbData = Object.keys(this.basicData[2]);
       this.labelForMath_ProbData = Object.keys(this.basicData[1]);
       this.labelForHash_ProbData = Object.keys(this.basicData[0]);
       this.labelForPatternData = Object.keys(this.basicData[3]);
       this.labelForBasicData = Object.keys(this.basicData[5]);
       this.labelForSTLData = Object.keys(this.basicData[4]);
       this.patternData = Object.values(this.basicData[3]);
       this.stlData = Object.values(this.basicData[4]);
       this.recData  = Object.values(this.basicData[2]);
       this.mathData  = Object.values(this.basicData[1]);
       this.hashData  = Object.values(this.basicData[0]);
       this.basicData = Object.values(this.basicData[5]); 
      }
    );
  }
  content: string | null = null;
  basicData : basicData[] = [];
  stlData : basicData[] = [];
  hashData : basicData[] = [];
  patternData : basicData[] = [];
  recData  : basicData[] = [];
  mathData : basicData[] = [];
  
  
  toggleContent(section: string) {
    this.content = this.content === section ? null : section;
  }
}
