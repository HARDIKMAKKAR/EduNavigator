import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JdoodleService {
  private embedApiUrl = 'https://www.jdoodle.com/api/embed/initEmbed'; // JDoodle API endpoint

  constructor(private http: HttpClient) {}

  /**
   * Initializes the JDoodle embed with the required key and configuration.
   * @param embedKey - 22f3da5fceabecdd
   * @param config - Additional configuration options if required.
   * @returns Observable<any>
   */
  initEmbed(embedKey: string, config: any): Observable<any> {
    // Prepare the request payload (add more fields if needed)
    const payload = {
      embedKey: embedKey,     // Embed Key
      config: config || {},   // Additional configuration (optional)
    };

    // Send POST request to JDoodle API
    return this.http.post<any>(this.embedApiUrl, payload);
  }
}
