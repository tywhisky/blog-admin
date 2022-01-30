import { Component, OnInit } from "@angular/core"
import { LoginService } from "../../services/login.service"

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  email: string = ""
  password: string = ""

  constructor(private service: LoginService) {}

  ngOnInit(): void {}

  onLogin(): void {
    this.service.login(this.email, this.password)
  }
}
