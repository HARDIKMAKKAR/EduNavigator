import { Component, OnInit } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AuthService } from '../services/authService';
import { Observable } from 'rxjs';
interface post{
  postId : string,
  username : string,
  postTitle : string,
  postContent : string,
  postDate : Date,
  postLikes : string,
  postComments : string,
  userId : string
}
@Component({
  selector: 'app-discuss',
  templateUrl: './discuss.component.html',
  styleUrl: './discuss.component.css'
})
export class DiscussComponent implements OnInit{
  constructor(private firestore : AngularFirestore,
    private auth : AngularFireAuth
    
  ){}
  userId : any;
 posts : any[] = [];
 ngOnInit(): void {
  this.getuid();
   
  this.postdata();
//  this.getPosts().subscribe((data) =>{
//   this.posts = data;
//   console.log('inside subscirbe' , this.posts);
//  });
  
 }
 private getuid(){
  this.auth.authState.subscribe(user=>{
    if(user){
      console.log('user found');
      this.userId = user.uid;
      console.log(this.userId);
    }
    else{
      console.log('user not found');
      this.userId = 0;
    }
  });
 }

  private postdata(){
    
   this.firestore.collection('posts').add({
    postId : '3',
    username : 'Hardik Makkar',
    postTitle : 'Test Post',
    postContent : 'Just A test!!',
    postDate : new Date(),
    postLikes : '1',
    postComments : '1',
    userId  : this.userId
   }).then(()=>{
    console.log('Data Added successfully')
   }).catch(() =>{
    console.log('Error');
   })

  }
//  private getPosts(): Observable<any[]> {
//   return this.firestore.collection('posts').valueChanges();
// }
}
