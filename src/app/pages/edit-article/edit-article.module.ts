import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"

import { EditArticleRoutingModule } from "./edit-article-routing.module"
import { NzInputModule } from "ng-zorro-antd/input"

@NgModule({
  declarations: [],
  imports: [CommonModule, EditArticleRoutingModule, NzInputModule],
})
export class EditArticleModule {}
