import { Component } from '@angular/core';
import { FormGroup,FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { UserInfoService } from '../../../shared/services/user-info.service';
import { User } from '../../../shared/models/User';

@Component({
  selector: 'app-regist',
  templateUrl: './regist.component.html',
  styleUrl: './regist.component.css'
})
export class RegistComponent {

    formBorderStyle = ""

    error = ""

    constructor(private authService:AuthService,private router:Router,private userService : UserInfoService){}

    authForm = new FormGroup({
      email : new FormControl("",Validators.email),
      firstName : new FormControl("",Validators.required),
      lastName : new FormControl("",Validators.required),
      password : new FormControl(""),
      passwordAgain : new FormControl(""),
      phoneNumber : new FormControl("",Validators.pattern("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"))
    })
  
    submit() {
      this.formBorderStyle = "";
      this.error = "";
        if(!this.authForm.valid || this.authForm.value.password !== this.authForm.value.passwordAgain){
          this.formBorderStyle = "1px red solid";
          this.error = "Nem megfelelő email cím vagy telefonaszám!";
          return;
        }

      this.authService.signup(this.authForm.value.email as string,this.authForm.value.password as string).then(res => {
        console.log(res);

        let user : User = {
          email : this.authForm.value.email as string,
          firstName : this.authForm.value.firstName as string,
          lastName : this.authForm.value.lastName as string,
          phoneNumber : this.authForm.value.phoneNumber as string,
        }
  
        this.userService.save(user);

        this.router.navigateByUrl("/");
      }).catch(err => {
        var errorCode = err.code;
        console.log(errorCode)
        if(errorCode == "auth/weak-password"){
          this.error = "Túl gyenge jelszó!";
        }
        if(errorCode == "auth/email-already-in-use"){
          this.error = "Ez az email cím foglalt!";
        }
        this.formBorderStyle = "1px red solid";
      })
    }
}
