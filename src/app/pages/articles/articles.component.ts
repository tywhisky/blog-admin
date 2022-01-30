import { Component, OnInit } from "@angular/core"
import {ArticleService} from "../../services/article.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {IPageInfo} from "../../services/common";

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
    page: 1,
    pageSize: 10
  } as IPageInfo

  constructor(
      private service: ArticleService,
      private message: NzMessageService
  ) {}

  getData() {
    this.service.getArticles().subscribe((result: any) => {
      this.entries = result.data.articles.entries
      this.pageInfo = result.data.articles.pageInfo
    },(error) => {this.message.error(error)})
  }

  ngOnInit() {
    this.getData()
  }
}
