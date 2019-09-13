import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/userservices.component';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-user-home',
    templateUrl: './adduser.component.html',
    styleUrls: ['./adduser.component.css']
})

export class AddUserComponent implements OnInit, OnDestroy {

    firstname: string;
    profileForm: FormGroup;
    userId: string;
    editmode = false;
    userDetail: any = {};

    constructor(private route: ActivatedRoute, private snackBar: MatSnackBar, private userService: UserService, private router: Router) {}

    private subscription: Subscription = new Subscription();

    ngOnInit() {
        this.profileForm = new FormGroup({
            name : new FormControl(null, Validators.required),
            phone: new FormControl(null, Validators.required),
            email : new FormControl(null, [Validators.required, Validators.email]),
            car : new FormControl(null, Validators.required)
        });

        this.route.paramMap.subscribe((paramMap) => {
            if (paramMap.has('userId')) {
                this.editmode = true;
                this.userId = paramMap.get('userId');

                // Adding to subscription
                this.subscription.add(
                    this.userService.getSingleUser(this.userId).subscribe(data => {
                        this.userDetail = data.user;
                        // console.log(this.userId, 'data fetched');
                        this.profileForm = new FormGroup({
                            name : new FormControl(this.userDetail.name, Validators.required),
                            phone: new FormControl(this.userDetail.phone, Validators.required),
                            email : new FormControl(this.userDetail.email, [Validators.required, Validators.email]),
                            car : new FormControl(this.userDetail.car, Validators.required)
                        });
                    })
                );
            } else {
                this.editmode = false;
                this.userId = null;
                // console.log('fresh');
            }
        });

    }

    onSave() {
        const pFrom = {
            name: this.profileForm.value.name,
            phone: this.profileForm.value.phone,
            email: this.profileForm.value.email,
            car: this.profileForm.value.car
        };
        if (this.editmode === false) {
            // Adding to subscription
            this.subscription.add(
                this.userService.saveUser(pFrom).subscribe(data => {
                    this.router.navigate(['/welcome']);
                    // console.log('create');
                })
            );
        } else {
            // Adding to subscription
            this.subscription.add(
                this.userService.updateUser(this.userId, pFrom).subscribe(data => {
                    // console.log(data, 'data');
                    this.router.navigate(['/welcome']);
                    // console.log('edit');
                })
            );
        }

    }

    onReset() {
        this.profileForm.reset();
    }

    openSnackBar() {
        this.snackBar.open('Data Saved Successfully', 'OK', {
            duration: 2000,
          });
    }

    ngOnDestroy() {
        // unsubscribing the subscription
        this.subscription.unsubscribe();
    }


}
