import { Component, OnInit } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { AuthService } from '../services/authService';
import { Router } from '@angular/router';
import { LoginSService } from '../shared/login-s.service';
import { AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit,AfterViewChecked  {

  @ViewChild('chatMessages') private chatMessagesContainer!: ElementRef;

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    if (this.chatMessagesContainer) {
      this.chatMessagesContainer.nativeElement.scrollTop = this.chatMessagesContainer.nativeElement.scrollHeight;
    }
  }
  socket!: Socket;
  messages: { user: string, text: string }[] = [];
  msg: string = '';
  username: string = '';
  room: string = 'main';
  loading: boolean = true;
  users: string[] = [];  // New
  subscription:any

  constructor(private auth: AuthService, private route: Router , private service : LoginSService) {}

 async ngOnInit() {
    this.subscription = this.auth.isLoggedIn$.subscribe(async (isLoggedIn) => {
      if (!isLoggedIn) {
        alert('Please sign in to access the chat room');
        this.route.navigate(['/home']);
        this.subscription.unsubscribe();
        return;
      }

      const token = localStorage.getItem('EduNavToken');
      if (!token) {
        alert('Token not found. Please sign in again.');
        this.route.navigate(['/home']);
        this.subscription.unsubscribe();
        return;
      }

      await this.service.decodeToken(token).subscribe({
        next: (res) => {
          console.log('Decoded token:', res); // <- add this
          this.username = res.data.username || 'Anonymous';
          this.initSocket();
          this.loading = false;
          console.log(this.username);
        },
        error: (err) => {
          console.error('Token decode failed', err);
          alert('Session expired. Please sign in again.');
          this.route.navigate(['/home']);
          this.subscription.unsubscribe();
        }
      });
    });
  }

  initSocket(): void {
    this.socket = io('http://localhost:3000');
  
    this.socket.on('connect', () => {
      this.socket.emit('joinRoom', { username: this.username, room: this.room });
    });
  
    this.socket.on('message', (message) => {
      this.messages.push(message);
    });
  
    this.socket.on('roomUsers', ({ users }) => {
      this.users = users.map((user: any) => user.username);
    });
    
  }
  

  sendMessage(): void {
    if (!this.msg.trim()) return;
    this.socket.emit('chatMessage', {
      room: this.room,
      user: this.username,
      text: this.msg
    });
    this.msg = '';
  }

  leaveRoom(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
    this.route.navigate(['/home']);
  }
  
}
