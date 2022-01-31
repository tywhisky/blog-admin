import { Component, OnInit } from "@angular/core"

interface ICreateArticleInput {
  title: String
  cover?: String
  categoryId: String
  body: String
}

@Component({
  selector: "app-add-article",
  templateUrl: "./add-article.component.html",
  styleUrls: ["./add-article.component.scss"],
})
export class AddArticleComponent implements OnInit {
  createArticleInput: ICreateArticleInput = {
    title: "",
    cover: "",
    categoryId: "",
    body: "",
  }

  constructor() {}

  ngOnInit(): void {}
}
