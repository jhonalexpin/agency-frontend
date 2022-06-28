import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { Agency } from './Models/agency';
import { AgencyService } from './Services/agency.service';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { DataSource } from '@angular/cdk/collections';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Agency manager application';
  displayedColumns: string[] = ['name', 'country', 'countryCode', 'city', 'street', 'currency', 'contactPerson', 'actions'];
  agencies: Agency[];
  dataSource = new AgencyDataSource(this.agencyService);
  private REST_API_SERVER = "http://localhost:8081/agency/all";
  constructor(private agencyService: AgencyService, private httpClient: HttpClient) {
    this.agencies = []
  
  }


  ngOnInit(): void {
    console.log(this.agencies);
    this.getAgencies();
  }

  public sendGetRequest(){
    return this.httpClient.get(this.REST_API_SERVER);
  }

  getAgencies() {
    console.log('Get agencies');
    this.agencyService.getAll().subscribe(data => {
      console.log(data);
      
      this.agencies = data;
    })
  }


}

export class AgencyDataSource extends DataSource<any> {
  constructor(private agencyService: AgencyService) {
    super();
  }
  connect(): Observable<Agency[]> {
    return this.agencyService.getAll();
  }
  disconnect() {}
}
