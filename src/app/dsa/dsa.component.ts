import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/authService';
import { Route, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

interface Data {
  topicName: string;
  topicArticleLink: string;
  topicProblemLink: string;
  topicChecked: boolean;
}

interface basicData {
  Article: string,
  Difficulty: string,
  Practice: any,
  Video: string
}
interface svg{
  gfgPath:string,
  youtubePath:string,
  leetPath:string,
}
@Component({
  selector: 'app-dsa',
  templateUrl: './dsa.component.html',
  styleUrls: ['./dsa.component.css']
})
export class DsaComponent implements OnInit {
  constructor(private http: HttpClient,
    private auth: AuthService,
    private route: Router,
    private afAuth: AngularFireAuth
  ) { }
  dataWant: any;
  dataFetch: any;
  easywant : any;
  easyFetch : any;
  arraywant : any;
  arrayfetch : any;
  labelForBasicData: any;
  labelForEasySorting : any;
  labelForAdvanceSorting : any;
  labelForEasyArrayProblems : any;
  labelForMediumArrayProblems : any;
  labelForHardArrayProblems : any;
  labelForSTLData: any;
  labelForPatternData: any;
  labelForRec_ProbData: any;
  labelForMath_ProbData: any;
  labelForHash_ProbData: any;
  ngOnInit(): void {
   this.afAuth.authState.subscribe(user =>{
    if(!user){
      alert('Sign in to continue');
      this.route.navigate(['/home']);
    }
    if(user){
     user.getIdToken().then( token => {
      console.log(user);
      const url = `https://edunavigator-dc324-default-rtdb.firebaseio.com/.json?auth=${token}`;
      this.http.get(url).subscribe(
        (response) => {
          this.dataFetch = Object.values(response);
          console.log(this.dataFetch);
          this.easywant = Object.values(this.dataFetch[0]);
          this.arraywant = Object.values(this.dataFetch[2]);
          this.labelForEasyArrayProblems = Object.keys(this.arraywant[0]);
          this.labelForMediumArrayProblems = Object.keys(this.arraywant[2]);
          this.labelForHardArrayProblems = Object.keys(this.arraywant[1]);
          this.easyArrayProb = Object.values(this.arraywant[0]);
          this.mediumArrayProb = Object.values(this.arraywant[2]);
          this.hardArrayProb = Object.values(this.arraywant[1]);
          this.labelForEasySorting = Object.keys(this.easywant[0]);
          this.labelForAdvanceSorting = Object.keys(this.easywant[1]);
          this.easySorting = Object.values(this.easywant[0]);
          this.advanceSorting = Object.values(this.easywant[0]);
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
          this.recData = Object.values(this.basicData[2]);
          this.mathData = Object.values(this.basicData[1]);
          this.hashData = Object.values(this.basicData[0]);
          this.basicData = Object.values(this.basicData[5]);
        }
      );
     })
    }
   })
  }

content: string | null = null;
basicData: basicData[] = [];
stlData: basicData[] = [];
hashData: basicData[] = [];
patternData: basicData[] = [];
recData: basicData[] = [];
mathData: basicData[] = [];
easySorting : basicData[] = [];
advanceSorting : basicData[] = [];
easyArrayProb : basicData[] = [];
mediumArrayProb : basicData[] = [];
hardArrayProb : basicData[] = [];

toggleContent(section: string) {
  this.content = this.content === section ? null : section;
}


}
