import { Component, OnInit } from "@angular/core"
import { MdEditorOption, UploadResult } from "ngx-markdown-editor"
import { DomSanitizer } from "@angular/platform-browser"
import { CategoryService, ICategory } from "../../services/category.service"

interface ICreateArticleInput {
  title: string
  cover?: string
  categoryId: string
  body: string
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
    private categoryService: CategoryService
  ) {
    this.preRender = this.preRender.bind(this)
    this.postRender = this.postRender.bind(this)
  }

  ngOnInit() {
    this.getCategories()
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(
      (result: any) => {
        this.categories = result.data.categories.entries
      },
      (_) => {}
    )
  }

  onSave() {
    console.log(this.createArticleInput)
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
