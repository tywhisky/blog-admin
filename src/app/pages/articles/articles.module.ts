import { NgModule } from "@angular/core"

import { ArticlesRoutingModule } from "./articles-routing.module"

import {ArticlesComponent} from "./articles.component"

@NgModule({
  imports: [ArticlesRoutingModule],
  declarations: [ArticlesComponent],
  exports: [ArticlesComponent],
})
export class ArticlesModule {}
