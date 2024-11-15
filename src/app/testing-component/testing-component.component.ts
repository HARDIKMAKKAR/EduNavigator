import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { JdoodleService } from './joodle.service';

@Component({
  selector: 'app-testing-component',
  templateUrl: './testing-component.component.html',
  styleUrl: './testing-component.component.css'
})
export class TestingComponentComponent {
  embedKey = '22f3da5fceabecdd'; // Your JDoodle embed key

  constructor(private jdoodleService: JdoodleService) {}

  ngAfterViewInit(): void {
    // Prepare additional configuration if necessary (you can adjust based on JDoodle's API)
    const config = {
      language: 'java',   // Example: Java programming language for JDoodle
      theme: 'light',     // Example: Set a theme if JDoodle supports it
    };

    // Call the JDoodle service to initialize the embed
    this.jdoodleService.initEmbed(this.embedKey, config).subscribe({
      next: (response) => {
        console.log('JDoodle Embed Initialized:', response);
        // You can handle the response here, like displaying the embed iframe or additional info
      },
      error: (error) => {
        console.error('Error initializing JDoodle embed:', error);
      },
    });
  }
  
}
