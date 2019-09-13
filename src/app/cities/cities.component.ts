import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { UserService } from '../services/userservices.component';
import { MatTableDataSource, MatSort, MatTable } from '@angular/material';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit, OnDestroy {

  isLoading = false;
  localKey: string;
  Emails = ['abc@gmail.com', 'xyz@yahoo.com', 'john.doe.com', '#nitinnema', 'ghi@outlook.com',
  'imwithoutat', 'def@hotmail.com', 'tcs@tcs.com'];
  FilteredEmails = [];
  char: string;

  constructor(public userService: UserService) {}
  private subscription: Subscription = new Subscription();

  displayedColumns: string[] = ['city'];
  dataSource: MatTableDataSource<any>;
  dataSourceEmail = new MatTableDataSource<any>();
  displayedColumnsEmail: string[] = ['email'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('table', {static: true}) table: MatTable<any>;

  applyFilter(filterValue: string) {
    this.isLoading = !this.isLoading;
    if (filterValue === '') {
      this.dataSource.data = [];
      this.isLoading = !this.isLoading;
    }
    const filterString = filterValue.trim().toLowerCase();
    if (filterString.length >= 3) {
      // Searching for a key in LocalStorage
      for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) === filterString) {
          this.localKey = filterString;
          // console.log(this.localKey, 'localKey');
          break;
        }
      }
      // When find key just retrieving data from localStorage
      if (this.localKey === filterString) {
        const localData = JSON.parse(localStorage.getItem(this.localKey));
        this.dataSource = new MatTableDataSource(localData);
        this.isLoading = !this.isLoading;
        console.log(this.dataSource.data, 'from LocalStorage');
      } else {
        // Adding subscription
        this.subscription.add(
          this.userService.getCities().subscribe(res => {
            this.dataSource = new MatTableDataSource(res);
            this.dataSource.filter = filterValue.trim().toLowerCase();
            const filteredData = this.dataSource.filteredData;
            localStorage.setItem(filterString, JSON.stringify(filteredData));
            this.isLoading = !this.isLoading;
            console.log(filteredData, 'from API');
          })
        );
        if (localStorage.length === 10) {
          localStorage.clear();
        }
      }
    }
  }

  emailFunction(str: any) {
    if (str === '') {
      this.dataSourceEmail.data = [];
    }
    this.char = str.charAt(str.length - 1);
    if (this.char === '@') {
      for (const email of this.Emails) {
        if (email.includes(this.char)) {
          this.FilteredEmails.push(email.substr(email.indexOf(this.char) + 1, email.length));
        } else {
          this.FilteredEmails.push(email);
        }
      }
      this.dataSourceEmail.data = this.FilteredEmails;
      // onsole.log(this.FilteredEmails, 'filteredEmails');
      this.FilteredEmails = [];
    }
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    // unsubscribing the subscription
    this.subscription.unsubscribe();
  }

  // drag and drop
  dropTable(event: CdkDragDrop<any[]>) {
    const prevIndex = this.dataSourceEmail.data.findIndex((d) => d === event.item.data);
    moveItemInArray(this.dataSourceEmail.data, prevIndex, event.currentIndex);
    this.table.renderRows();
  }

}
