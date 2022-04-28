import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService extends HttpService {
  protected get baseUrl(): string {
    return 'Notifications/';
  }
  addNotifications(data): Observable<any> {
    return this.http.post(this.serverUrl + this.baseUrl + 'AddNotifications', data);
  }
  addNotificationsForAllEmployees(data): Observable<any> {
    return this.http.post(this.serverUrl + this.baseUrl + 'AddNotificationsForAllEmployees', data);
  }

  getNotificationsByMessage(messageEn): Observable<any> {
    return this.http.post(this.serverUrl + this.baseUrl + 'GetNotificationsByMessage', messageEn);
  }
}
