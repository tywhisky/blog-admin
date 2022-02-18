import { Component, OnInit } from "@angular/core"
import { NzMessageService } from "ng-zorro-antd/message"
import { NzModalRef, NzModalService } from "ng-zorro-antd/modal"
import {
  ICreateLinkInput,
  ILink,
  LinkService,
} from "../../services/link.service"

@Component({
  selector: "app-links",
  templateUrl: "./links.component.html",
  styleUrls: ["./links.component.scss"],
})
export class LinksComponent implements OnInit {
  entries: Array<ILink> = []
  loading: boolean = true
  confirmModal?: NzModalRef
  linkInput: ICreateLinkInput = {
    description: "",
    order: 0,
    title: "",
    url: "",
  }

  constructor(
    private linkService: LinkService,
    private message: NzMessageService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.getData()
  }

  visible = false

  open(): void {
    this.visible = true
  }

  close(): void {
    this.visible = false
  }

  getData() {
    this.linkService.getLinks().subscribe({
      next: (result: any) => {
        this.entries = result.data.links.entries
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
          this.linkService.deleteLink(id).subscribe({
            next: (result: any) => {
              this.message.success("删除成功")
              this.modal.closeAll()
              that.getData()
            },
            error: (error: any) => {
              this.message.error(error)
            },
          })
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
        }).catch(() => console.log("Oops errors!")),
    })
  }

  onNew(): void {
    if (!this.linkInput.url) {
      this.message.error("请输入Url")
      return
    }
    this.loading = true
    this.linkService.createLink(this.linkInput).subscribe({
      next: () => {
        this.linkInput = { description: "", order: 0, title: "", url: "" }
        this.message.success("添加成功")
        this.getData()
        this.close()
      },
    })
  }
}
