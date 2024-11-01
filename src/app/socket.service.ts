import { Injectable, OnDestroy } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService implements OnDestroy {
  private socket: Socket;
  private sessionPersistence: boolean = true; 

  constructor() {
    this.socket = io('http://0.0.0.0:5005');
    this.setupListeners();
  }

  private setupListeners() {
    this.socket.on('user_uttered', (data) => {
      console.log('User message received:', data);
    });

    this.socket.on('bot_uttered', (data) => {
      console.log('Bot message received:', data);
    });

    this.socket.on('connect_error', (error) => {
      console.error('Connection Error:', error);
    });
  }

  public listen(eventName: string): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      });
    });
  }

  public emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }

  public disconnect() {
    this.socket.disconnect();
  }

  public isConnected(): boolean {
    return this.socket.connected;
  }

  public setSessionPersistence(persistence: boolean) {
    this.sessionPersistence = persistence;
  }

  public isSessionPersistent(): boolean {
    return this.sessionPersistence;
  }

  ngOnDestroy() {
    this.disconnect();
  }
}
