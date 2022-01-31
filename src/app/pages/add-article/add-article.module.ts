import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"

import { AddArticleRoutingModule } from "./add-article-routing.module"
import { NzInputModule } from "ng-zorro-antd/input"

@NgModule({
  declarations: [],
  imports: [CommonModule, AddArticleRoutingModule, NzInputModule],
})
export class AddArticleModule {}
