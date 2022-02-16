import { Component, OnInit } from "@angular/core"
import { MdEditorOption, UploadResult } from "ngx-markdown-editor"
import { DomSanitizer } from "@angular/platform-browser"

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

  constructor(private _domSanitizer: DomSanitizer) {
    this.preRender = this.preRender.bind(this)
    this.postRender = this.postRender.bind(this)
  }

  ngOnInit() {}

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
    console.log(`ACE Editor Ins: `, editor)
    // editor.setOption('showLineNumbers', false);

    // setTimeout(() => {
    //   editor.setOption('showLineNumbers', true);
    // }, 2000);
  }

  preRender(mdContent: string) {
    console.log(`preRender fired`)
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve(mdContent);
    //   }, 4000);
    // })
    return mdContent
  }

  postRender(html: HTMLElement) {
    console.log(`postRender fired`)
    // return '<h1>Test</h1>';
    return html
  }

  onPreviewDomChanged(dom: HTMLElement) {
    console.log(`onPreviewDomChanged fired`)
    // console.log(dom);
    // console.log(dom.innerHTML)
  }
}
