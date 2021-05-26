import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestOptions } from './requestoption';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpclientserviceService {

  constructor(
    private http: HttpClient,
    //private loaderService: LoaderService
  ) { }

  request(method: string, url: string, body?: any, params?: HttpParams | {[param: string]: string | string[]}, header?: HttpHeaders)
  : Observable<any> {
    const headers = header ? header : new HttpHeaders({
      'content-type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin':'*'
    });
    const options: RequestOptions = {
      body: body,
      headers: headers,
      params: params
    };
    //this.showLoader();
    return this.http.request(method, url, options)
    .pipe(
      catchError(this.handleError),
      finalize(() => {
        //this.hideLoader();
      })
    );
  }

  imageUplaodRequest(url: string, body: any) : Observable<any> {
    //this.showLoader();
    return this.http.post(url, body)
    .pipe(
      catchError(this.handleError),
      finalize(() => {
        //this.hideLoader();
      })
    );

  }

  putImageUplaodRequest(url: string, body: any) : Observable<any> {
    //this.showLoader();
    return this.http.put(url, body)
    .pipe(
      catchError(this.handleError),
      finalize(() => {
        //this.hideLoader();
      })
    );

  }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  get(url: string, header?: HttpHeaders, params?: HttpParams | {[param: string]: string | string[]}): Observable<any> {
    return this.request('GET', url, null, params, header);
  }

  post(url: string, body: any | null, header?: HttpHeaders, params?: HttpParams | {[param: string]: string | string[]}): Observable<any> {
    return this.request('POST', url, body, params, header);
  }

  postImage(url:string, formData: FormData): Observable<any> {

    return this.imageUplaodRequest(url, formData);
  }


  put(url: string, body: any | null, header?: HttpHeaders, params?: HttpParams | {[param: string]: string | string[]}): Observable<any> {
    return this.request('PUT', url, body, params, header)
  }

  putImage(url:string, formData: FormData): Observable<any> {

    return this.putImageUplaodRequest(url, formData);
  }

  delete(url: string, body: any | null, header?: HttpHeaders, params?: HttpParams | {[param: string]: string | string[]}): Observable<any> {
    return this.request('DELETE', url, body, params, header)
  }

  // showLoader() {
  //   this.loaderService.showLoader();
  // }

  // hideLoader() {
  //   this.loaderService.hideLoader();
  // }
}
