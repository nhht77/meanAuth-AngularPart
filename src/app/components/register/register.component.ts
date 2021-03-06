import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: any;

  constructor(
    private validateService: ValidateService,
    private FlashMessages: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    };

    // Required All Fields
    if (!this.validateService.validateRegister(user)) {
      this.FlashMessages.show('Please fill in all fields', {cssClass: 'alert-danger mt-3', timeout: 3000});
      return false;
    }

    // Required Valid Email
    if (!this.validateService.validateEmail(user.email)) {
      this.FlashMessages.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Register User
    this.authService.registerUser(user).subscribe(data => {
      if (data.success) {
        this.FlashMessages.show('Registration Success, now you can login', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/login']);
      } else {
        this.FlashMessages.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register']);
      }
    });
  }
}
