import { Pagination } from './Models/Pagination';
import { Component } from '@angular/core';
import { setTheme } from 'ngx-bootstrap/utils';
import { HubRepo } from './Models/HubRepo';
import { GitHubService } from './Services/git-hub.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Front-end-Coding-Challenge';
  // ** Component Variables **/
  reposList: HubRepo[]; // list of repos to be displayed
  page = 1; // api page parameter
  showPagination = false; // hide pagination until repos list is filled
  totalRecords: string; // number of All pages
  reposPerPage = 30;
  config: Pagination;
  isLoading = false;


  constructor(private repo: GitHubService) {
    setTheme('bs4'); // bootstrap 4 theme
    this.config = {
      currentPage: 1,
      itemsPerPage: 30,
      totalItems: 0
    };
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void {
    this.loadGitHubReposData(1);
  }

  loadGitHubReposData(page: number): void {
    this.repo.getDataFromGitHub(page).subscribe((res) => {
      if (res) {
        this.fillReposList(res);
      }
    });
  }


  fillReposList(res: any): void {
    if (res && res.items) {
      this.reposList = res.items;
      this.showPagination = true;
      this.config.itemsPerPage = this.reposList.length;
      this.config.totalItems = res.total_count;
      this.isLoading = false;
    }
  }
  pageChange(pageNumber: number): void {
    this.config.currentPage = pageNumber;
    this.loadGitHubReposData(pageNumber);
    this.isLoading = true;
  }
}
