import { Component, OnInit } from "@angular/core"
import { NzModalService } from "ng-zorro-antd/modal"
import { Router } from "@angular/router"
import Cookies from "universal-cookie/es6"

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"],
})
export class LayoutComponent implements OnInit {
  isCollapsed = false

  constructor(private modal: NzModalService, private router: Router) {}

  ngOnInit(): void {}

  onLogout(): void {
    this.modal.confirm({
      nzTitle: "<i>Do you Want to log out?</i>",
      nzContent: "<b>Will be clean all personal info in your browser</b>",
      nzOnOk: () => {
        new Cookies().remove("guardian_default_token")
        this.router.navigateByUrl("/login")
      },
    })
  }
}
