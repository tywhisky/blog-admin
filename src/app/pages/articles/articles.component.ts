import { Component, OnInit } from "@angular/core"
import { ArticleService } from "../../services/article.service"
import { NzMessageService } from "ng-zorro-antd/message"
import { IPageInfo, IPageParams } from "../../services/common"
import { NzTableQueryParams } from "ng-zorro-antd/table"
import { NzModalRef, NzModalService } from "ng-zorro-antd/modal"

interface Article {
  id: string
  title: string
  clicks: number
  cover: string
  status: string
  category: {
    name: string
    id: string
  }
}

@Component({
  selector: "app-articles",
  templateUrl: "./articles.component.html",
  styleUrls: ["./articles.component.scss"],
})
export class ArticlesComponent implements OnInit {
  entries: Article[] = []
  pageInfo = {
    pageNumber: 1,
    pageSize: 10,
    totalPages: 0,
    totalEntries: 0,
  } as IPageInfo
  loading: boolean = true
  confirmModal?: NzModalRef

  constructor(
    private service: ArticleService,
    private message: NzMessageService,
    private modal: NzModalService
  ) {}

  getData(pageParams?: IPageParams) {
    this.service.getArticles(pageParams).subscribe({
      next: (result: any) => {
        this.entries = result.data.articles.entries
        this.pageInfo = result.data.articles.pageInfo
        this.loading = false
      },
      error: (error) => {
        this.message.error(error)
        this.loading = false
      },
    })
  }

  onPageChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex } = params
    const pageParams: IPageParams = {
      page: pageIndex,
      pageSize: pageSize,
    }
    this.getData(pageParams)
  }

  onDelete(id: string): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: "确认删除这篇文章吗?",
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          const that = this
          this.service.deleteArticle(id).subscribe({
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

  ngOnInit() {
    this.getData({
      page: 1,
      pageSize: 10,
    })
  }
}
