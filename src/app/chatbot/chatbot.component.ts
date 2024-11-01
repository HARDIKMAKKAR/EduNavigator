import { Component } from '@angular/core';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
})
export class ChatbotComponent implements AfterViewInit, OnDestroy {
  
  private scriptLoaded: boolean = false;

  ngAfterViewInit() {
    this.loadRasaChatScript();
  }

  ngOnDestroy() {
    if (this.scriptLoaded) {
      // Optionally, you could remove the script here if you want to clean up
      const script = document.querySelector(`script[src="https://unpkg.com/@rasahq/rasa-chat"]`);
      if (script) {
        document.body.removeChild(script);
      }
    }
  }

  private loadRasaChatScript() {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@rasahq/rasa-chat';
    script.type = 'application/javascript';
    script.async = true;

    script.onload = () => {
      this.scriptLoaded = true; // Mark the script as loaded
      if ((window as any).RasaChat && (window as any).RasaChat.default) {
        (window as any).RasaChat.default.init({
          selector: '#rasa-chat-widget',
          socketUrl: 'http://0.0.0.0:5005',
        });
      } else {
        console.error('RasaChat is not defined');
      }
    };

    script.onerror = () => {
      console.error('Failed to load Rasa chat widget script');
    };

    document.body.appendChild(script);
  }
}
