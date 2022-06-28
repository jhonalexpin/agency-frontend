import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, retry, map } from 'rxjs';

import { Agency } from '../Models/agency';

@Injectable({
  providedIn: 'root'
})
export class AgencyService {

  private agencyUrl: string;

  constructor(private httpClient: HttpClient) { 
    this.agencyUrl = 'http://localhost:8081/agency'
  }

  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 404: {
        return `Not Found: ${error.message}`;
      }
      case 403: {
        return `Access Denied: ${error.message}`;
      }
      case 500: {
        return `Internal Server Error: ${error.message}`;
      }
      default: {
        return `Unknown Server Error: ${error.message}`;
      }
    }
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    throw new Error(errorMessage);
  }

  getAll(): Observable<Agency[]> {
    console.log('Calling')
    return this.httpClient.get<Agency[]>(this.agencyUrl + '/all')
    .pipe(
      map(data => {
        data.forEach(element => {
          for (const key in element) {
            console.log(key);
            Object.getPrototypeOf(element)
          }
        })
        return data;
      }),
      retry(2),
      catchError(error => {
        let errorMsg: string;
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
        } else {
          errorMsg = this.getServerErrorMessage(error);
        }
        throw new Error(errorMsg);
    }));
  }

  createAgency(agency: Agency) : Observable<Agency> {
    return this.httpClient.post<Agency>(this.agencyUrl, agency);
  }

  deleteAgency(agency: Agency) {
    return this.httpClient.delete<any>(this.agencyUrl);
  }

  updateAgency(agency: Agency): Observable<Agency>{
    return this.httpClient.patch<Agency>(this.agencyUrl, agency);
  }
}