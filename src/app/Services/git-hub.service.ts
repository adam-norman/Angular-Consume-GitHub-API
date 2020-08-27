import { HubRepo } from './../Models/HubRepo';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GitHubService {

  constructor(private http: HttpClient) { }
  getDataFromGitHub(page = 1): any{
    if (!(page >= 1)){
      page = 1;
    }
    const fromDate = this.getCreateDate();
    const ApiUrl = 'https://api.github.com/search/repositories?q=created:>' + fromDate + '&sort=stars&order=desc&page=' + page.toString();
    return this.http.get(ApiUrl);
  }

  private getCreateDate(): string {
    const createDate = new Date();
    createDate.setDate(createDate.getDate() - 30);
    const cDay = ('00' + createDate.getDay()).substr(-2 );
    const cMonth = ('00' + createDate.getMonth()).substr(-2 );
    const cYear = createDate.getFullYear().toString();
    return  cYear + '-' + cMonth + '-' + cDay;
  }
}
