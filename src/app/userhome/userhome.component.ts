import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/userservices.component';
import { MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';
import { AuthorizationService } from '../services/authorization.service';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})

export class UserHomeComponent implements OnInit, OnDestroy {

    firstname: string;
    isLoading = false;

    constructor(public route: ActivatedRoute, public userService: UserService, public auth: AuthorizationService) { }

    // Creating subscription to see the subscribe
    private subscription: Subscription = new Subscription();

    displayedColumns: string[] = ['name', 'email', 'phone', 'car', 'delete', 'update'];
    dataSource: MatTableDataSource<any>;

    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    ngOnInit() {
      this.route.queryParams.subscribe(params => {
          this.firstname = params.firstname;
      });

      this.isLoading = !this.isLoading;
      // Adding to subscription
      this.subscription.add(
        this.userService.getUser().subscribe((data) => {
          this.dataSource = new MatTableDataSource(data.users);
          this.isLoading = !this.isLoading;
          // console.log(data.users, 'asd');
        })
      );

    }

    onDelete(id) {
      // console.log(id, 'id fetched');
      // Adding to subscription
      this.subscription.add(
        this.userService.deleteUser(id).subscribe(data => {
          const updatedData = this.dataSource.data.filter(users => users._id !== id );
          this.dataSource = new MatTableDataSource(updatedData);
          // console.log(updatedData, 'Updated Data');
        })
      );
    }

    ngOnDestroy() {
      this.subscription.unsubscribe();
    }

}
