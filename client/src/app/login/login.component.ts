import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  role?: string;

  constructor(
    private authService: AuthService,
    private userStorage: StorageService
  ) {}

  ngOnInit(): void {
    if (this.userStorage.getToken()) {
      this.isLoggedIn = true;
      this.role = this.userStorage.getUser().role;
    }
  }

  onSubmit(): void {
    const { username } = this.form;

    this.authService.login(username).subscribe({
      next: (res: any) => {
        this.userStorage.saveToken(res.data.access_token);
        this.userStorage.saveUser(res.data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.role = this.userStorage.getUser().role;
        this.reloadPage();
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      },
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
