import { Component, OnInit } from '@angular/core';
import { Validators,FormGroup,FormControl} from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{

  formBorderStyle = ""

  error = ""

  constructor(private authService:AuthService,private router:Router){}

  authForm = new FormGroup({
    email : new FormControl("",Validators.email),
    password : new FormControl("",[
      Validators.minLength(4),
    ]),
  })

  submit() {
      this.formBorderStyle = "";
      if(!this.authForm.valid){
        this.formBorderStyle = "1px red solid";
        this.error = "Email/jelszó nem található!"
        return;
      }
      
      this.authService.login(this.authForm.value.email as string,this.authForm.value.password as string).then(res => {
          console.log(res);
          this.router.navigateByUrl("/");
      }).catch(error =>{
        console.log(this.error);
        this.error = "Email/jelszó nem található!"
      })
  }

}
