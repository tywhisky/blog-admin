import { NgModule } from "@angular/core"

import { ArticlesRoutingModule } from "./articles-routing.module"

import { ArticlesComponent } from "./articles.component"
import { NzTableModule } from "ng-zorro-antd/table"
import { NzDividerModule } from "ng-zorro-antd/divider"
import { CommonModule } from "@angular/common"
import { NzImageModule } from "ng-zorro-antd/image"

@NgModule({
  imports: [
    ArticlesRoutingModule,
    NzTableModule,
    NzDividerModule,
    CommonModule,
    NzImageModule,
  ],
  declarations: [ArticlesComponent],
  exports: [ArticlesComponent],
})
export class ArticlesModule {}
