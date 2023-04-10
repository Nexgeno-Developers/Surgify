import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'surgify-ui';
  isAdmin = false;

  constructor(public userService: UserService,
    private router: Router) {
    this.getUserProfile();
  }

  getUserProfile() {
    this.userService.getMyProfile().subscribe({
      next: (profile: any) => {
        if (profile && profile['isAdmin']) {
          this.isAdmin = profile['isAdmin'];
          this.router.navigate(['/admin-page']);
        }
      },
      error: (error) => {

      }
    });
  }
}
