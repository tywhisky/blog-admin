import { Component, OnInit } from "@angular/core"

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
  listOfData: Article[] = [
    {
      title: "哈哈",
      clicks: 132,
      cover:
        "http://tva2.sinaimg.cn/mw600/008hBrJIgy1gytsmtrporj30fa0jfjtz.jpg",
      status: "PENDING",
      category: {
        name: "技术",
        id: "1",
      },
    },
    {
      title: "哈哈",
      clicks: 132,
      cover:
        "http://tva2.sinaimg.cn/mw600/008hBrJIgy1gytsmtrporj30fa0jfjtz.jpg",
      status: "PENDING",
      category: {
        name: "技术",
        id: "1",
      },
    },
  ]

  constructor() {}

  ngOnInit() {}
}
