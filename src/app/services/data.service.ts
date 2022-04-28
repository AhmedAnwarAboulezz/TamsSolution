import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Subject, BehaviorSubject } from 'rxjs';
import { AlertService } from './AlertService';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient,
    private alertService: AlertService
  ) { }

  // Observable event sources
  private EventFire = new Subject();
  private appData = new BehaviorSubject(null);
  private printEvent = new BehaviorSubject(null);
  private OrganizationsData = new BehaviorSubject(null);
  private currentLang = new BehaviorSubject(null);

  EventFire$ = this.EventFire.asObservable();
  appData$ = this.appData.asObservable();
  printEvent$ = this.printEvent.asObservable();
  OrganizationsData$ = this.OrganizationsData.asObservable();
  currentLang$ = this.currentLang.asObservable();

  PrintEvent(Data: any) {
    this.printEvent.next(Data);
  }

  Organizations(Data: any) {
    this.OrganizationsData.next(Data);
  }

  CurrentLang(lang: any) {
    this.currentLang.next(lang);
  }

  getList(url: string): Observable<any[]> {
    return this.http.get<any[]>(url)
      .pipe(
        // you can add the 'any' name here beside the getAll for more detailed error
        catchError(this.handleError())
      );
  }

  get(url: string): Observable<any> {
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError())
      );
  }

  post(url: string, item: any): Observable<any> {
    return this.http.post<any>(url, item, httpOptions)
      .pipe(
        catchError(this.handleError())
      );
  }

  postList(url: string, items: any[]): Observable<any> {
    return this.http.post<any>(url, items, httpOptions)
      .pipe(
        catchError(this.handleError())
      );
  }

  put(url: string, item: any): Observable<any> {
    return this.http.put<any>(url, item, httpOptions)
      .pipe(
        catchError(this.handleError())
      );
  }

  delete(url: string): Observable<any> {
    return this.http.delete<any>(url)
      .pipe(
        catchError(this.handleError())
      );
  }

  postFormData(url: string, item: any): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({ reportProgress: 'true', observe: 'events' })
    };
    return this.http.post<any>(url, item, httpOption)
      .pipe(
        catchError(this.handleError())
      );
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError() {
    return (error: any): Observable<any> => {

      
      let message = this.getErrorMessage(error);
      if (message) {
        this.alertService.showError(message);
      
      }
      return throwError(message);
    };
  }

  getErrorMessage(error): string {
    let message = '';

    if (error.status === 400) {

      let errors: Array<any> = error.error.errors;

      if (errors instanceof Object) {
        Object.keys(errors).forEach((key) => {
          message += errors[key][0] + '\n';
        });
      } else if (typeof error.error === 'string') {
        // the error is validation error BadRequest('error message')
        message = error.error;
      } else {
        message = 'Bad Request';
      }

    } else if (error.status === 500) {
      message = 'Unexpected error happened.';
    }

    return message;
  }
}
