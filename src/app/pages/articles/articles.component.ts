import { Component, OnInit } from "@angular/core"
import { ArticleService } from "../../services/article.service"
import { NzMessageService } from "ng-zorro-antd/message"
import { IPageInfo, IPageParams } from "../../services/common"
import { NzTableQueryParams } from "ng-zorro-antd/table"

interface Article {
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

  constructor(
    private service: ArticleService,
    private message: NzMessageService
  ) {}

  getData(pageParams?: IPageParams) {
    this.service.getArticles(pageParams).subscribe(
      (result: any) => {
        this.entries = result.data.articles.entries
        this.pageInfo = result.data.articles.pageInfo
        this.loading = false
      },
      (error) => {
        this.message.error(error)
        this.loading = false
      }
    )
  }

  onPageChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex } = params
    const pageParams: IPageParams = {
      page: pageIndex,
      pageSize: pageSize,
    }
    this.getData(pageParams)
  }

  ngOnInit() {
    this.getData()
  }
}
