import { Component, OnInit } from "@angular/core"
import { MdEditorOption, UploadResult } from "ngx-markdown-editor"
import { DomSanitizer } from "@angular/platform-browser"
import { CategoryService, ICategory } from "../../services/category.service"
import {
  ArticleService,
  IUpdateArticleInput,
} from "../../services/article.service"
import { ActivatedRoute, Router } from "@angular/router"

@Component({
  selector: "app-edit-article",
  templateUrl: "./edit-article.component.html",
  styleUrls: ["./edit-article.component.scss"],
})
export class EditArticleComponent implements OnInit {
  articleId: string | null = ""
  updateArticleInput: IUpdateArticleInput = {
    title: "",
    cover: "",
    categoryId: "",
    body: "",
  }
  categories: Array<ICategory> = []
  selectedValue = null

  public options: MdEditorOption = {
    showPreviewPanel: false,
    enablePreviewContentClick: false,
    resizable: true,
    markedjsOpt: {
      sanitize: true,
    },
  }
  public mode: string = "editor"

  constructor(
    private _domSanitizer: DomSanitizer,
    private categoryService: CategoryService,
    private articleService: ArticleService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.preRender = this.preRender.bind(this)
    this.postRender = this.postRender.bind(this)
  }

  ngOnInit() {
    this.articleId = this.activeRoute.snapshot.queryParams["id"]
    this.getCategories()
    this.getArticle()
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(
      (result: any) => {
        this.categories = result.data.categories.entries
      },
      (_) => {}
    )
  }

  getArticle() {
    this.articleService.getArticle(this.articleId).subscribe({
      next: (result: any) => {
        let article = result.data.article
        this.updateArticleInput.cover = article.cover
        this.updateArticleInput.body = article.body
        this.updateArticleInput.title = article.title
        this.updateArticleInput.clicks = article.clicks
        this.updateArticleInput.status = article.status
        if (result.data.article.category) {
          this.updateArticleInput.categoryId = result.data.article.category.id
        }
      },
    })
  }

  onSave() {
    console.log(this.updateArticleInput)
    this.articleService
      .updateArticle(this.articleId, this.updateArticleInput)
      .subscribe((result: any) => {
        this.router.navigateByUrl("/articles")
      })
  }

  // doUpload(files: Array<File>): Promise<Array<UploadResult>> {
  //   console.log(files);
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       let result: Array<UploadResult> = [];
  //       for (let file of files) {
  //         result.push({
  //           name: file.name,
  //           url: `https://avatars3.githubusercontent.com/${file.name}`,
  //           isImg: file.type.indexOf('image') !== -1
  //         })
  //       }
  //       resolve(result);
  //     }, 3000);
  //   });
  // }

  onEditorLoaded(editor: MdEditorOption) {
    // editor.setOption('showLineNumbers', false);
    // setTimeout(() => {
    //   editor.setOption('showLineNumbers', true);
    // }, 2000);
  }

  preRender(mdContent: string) {
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve(mdContent);
    //   }, 4000);
    // })
    return mdContent
  }

  postRender(html: HTMLElement) {
    // return '<h1>Test</h1>';
    return html
  }

  onPreviewDomChanged(dom: HTMLElement) {
    // console.log(dom);
    // console.log(dom.innerHTML)
  }
}
