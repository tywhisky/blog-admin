import { NgModule } from "@angular/core"
import { Routes, RouterModule } from "@angular/router"

import { LayoutComponent } from "./pages/layout/layout.component"
import { LoginComponent } from "./pages/login/login.component"

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "articles",
        loadChildren: () =>
          import("./pages/articles/articles.module").then(
            (m) => m.ArticlesModule
          ),
      },
    ],
  },
  {
    path: "login",
    component: LoginComponent,
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
