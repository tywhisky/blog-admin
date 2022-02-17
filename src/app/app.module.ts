import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"

import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { NZ_I18N } from "ng-zorro-antd/i18n"
import { zh_CN } from "ng-zorro-antd/i18n"
import { registerLocaleData } from "@angular/common"
import zh from "@angular/common/locales/zh"
import { FormsModule } from "@angular/forms"
import { HttpClientModule } from "@angular/common/http"
import { APOLLO_OPTIONS } from "apollo-angular"
import { HttpLink } from "apollo-angular/http"
import { DefaultOptions, InMemoryCache } from "@apollo/client/core"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { IconsProviderModule } from "./icons-provider.module"
import { NzLayoutModule } from "ng-zorro-antd/layout"
import { NzMenuModule } from "ng-zorro-antd/menu"
import { NzMessageService } from "ng-zorro-antd/message"
import { LayoutComponent } from "./pages/layout/layout.component"
import { LoginComponent } from "./pages/login/login.component"
import { AddArticleModule } from "./pages/add-article/add-article.module"
import { AddArticleComponent } from "./pages/add-article/add-article.component"
import { MyInputComponent } from "./components/my-input/my-input.component"
import { LMarkdownEditorModule } from "ngx-markdown-editor"
import { NzSelectModule } from "ng-zorro-antd/select"
import { CategoriesComponent } from "./pages/categories/categories.component"
import { NzInputModule } from "ng-zorro-antd/input"
import { NzTableModule } from "ng-zorro-antd/table"
import { NzDividerModule } from "ng-zorro-antd/divider"
import { NzModalModule } from "ng-zorro-antd/modal"
import { NzButtonModule } from "ng-zorro-antd/button"

registerLocaleData(zh)

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "network-only",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "network-only",
    errorPolicy: "all",
  },
}

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LoginComponent,
    AddArticleComponent,
    MyInputComponent,
    CategoriesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    AddArticleModule,
    LMarkdownEditorModule,
    NzSelectModule,
    NzInputModule,
    NzButtonModule,
    NzTableModule,
    NzDividerModule,
    NzModalModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    { provide: NzMessageService },
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: "/api/graphiql",
          }),
          defaultOptions: defaultOptions,
        }
      },
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
