import { Component, OnInit } from "@angular/core"
import { CategoryService, ICategory } from "../../services/category.service"
import { NzMessageService } from "ng-zorro-antd/message"
import { NzModalRef, NzModalService } from "ng-zorro-antd/modal"
import { Message } from "@angular/compiler/src/i18n/i18n_ast"

@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.scss"],
})
export class CategoriesComponent implements OnInit {
  entries: Array<ICategory> = []
  loading: boolean = true
  confirmModal?: NzModalRef
  categoryInput: string = ""

  constructor(
    private categoriesService: CategoryService,
    private message: NzMessageService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.categoriesService.getCategories().subscribe({
      next: (result: any) => {
        this.entries = result.data.categories.entries
        this.loading = false
      },
    })
  }

  onDelete(id: string): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: "确认删除?",
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          const that = this
          this.categoriesService.deleteCategory(id).subscribe({
            next: (result: any) => {
              this.message.success("删除成功")
              this.modal.closeAll()
              that.getData()
            },
            error: (error) => {
              this.message.error(error)
            },
          })
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
        }).catch(() => console.log("Oops errors!")),
    })
  }

  onNew(): void {
    if (!this.categoryInput) {
      this.message.error("请输入分类")
      return
    }
    this.loading = true
    this.categoriesService.createCategory(this.categoryInput).subscribe({
      next: () => {
        this.categoryInput = ""
        this.message.success("添加成功")
        this.getData()
      },
    })
  }
}
