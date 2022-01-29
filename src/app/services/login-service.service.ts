import { Injectable } from "@angular/core"
import { Apollo } from "apollo-angular"
import gql from "graphql-tag"
import { NzMessageService } from "ng-zorro-antd/message"
import { Router } from "@angular/router"

const loginMutation = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

@Injectable({
  providedIn: "root",
})
export class LoginServiceService {
  constructor(
    private apollo: Apollo,
    private message: NzMessageService,
    private router: Router
  ) {}

  login(email: string, password: string) {
    const loading = this.message.loading("Action in progress..", {
      nzDuration: 0,
    }).messageId
    this.apollo
      .mutate({
        mutation: loginMutation,
        variables: {
          email: email,
          password: password,
        },
      })
      .subscribe(
        (result: any) => {
          sessionStorage.setItem("token", result?.data?.login.token)
          this.message.remove(loading)
          this.router.navigateByUrl("/")
        },
        (error) => {
          this.message.remove(loading)
          this.message.error(error)
        }
      )
  }
}
