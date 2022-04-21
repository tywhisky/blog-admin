import { Component, OnInit } from "@angular/core"
import { NzMessageService } from "ng-zorro-antd/message"
import { NzModalRef, NzModalService } from "ng-zorro-antd/modal"

import {
  SystemService,
  ISystemInfo
} from "../../services/system.service"

@Component({
  selector: "app-system",
  templateUrl: "./system.component.html",
  styleUrls: ["./system.component.scss"],
})
export class SystemComponent implements OnInit {
  loading: boolean = true
  confirmModal?: NzModalRef
  systemInfo: ISystemInfo = {
    favicon: "",
    footAbout: "",
    footCopyRight: "",
    footFiling: "",
    footPoweredBy: "",
    footPoweredByUrl: "",
    siteDesc: "",
    siteLogi: "",
    siteName: "",
  }

  constructor(
    private systemService: SystemService,
    private message: NzMessageService
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
    this.systemService.getSystem().subscribe({
      next: (result: any) => {
        this.systemInfo.favicon = result.data.systemInfo.favicon || ""
        this.systemInfo.footAbout = result.data.systemInfo.footAbout || ""
        this.systemInfo.footCopyRight = result.data.systemInfo.footCopyRight || ""
        this.systemInfo.footFiling = result.data.systemInfo.footFiling || ""
        this.systemInfo.footPoweredBy = result.data.systemInfo.footPoweredBy || ""
        this.systemInfo.footPoweredByUrl = result.data.systemInfo.footPoweredByUrl || ""
        this.systemInfo.siteDesc = result.data.systemInfo.siteDesc || ""
        this.systemInfo.siteLogi = result.data.systemInfo.siteLogi || ""
        this.systemInfo.siteName = result.data.systemInfo.siteName || ""
        this.loading = false
      },
    })
  }

  onUpdate(): boolean {
    if(
      !this.systemInfo.favicon || 
      !this.systemInfo.footAbout ||
      !this.systemInfo.footCopyRight ||
      !this.systemInfo.footFiling ||
      !this.systemInfo.footPoweredBy ||
      !this.systemInfo.footPoweredByUrl ||
      !this.systemInfo.siteDesc ||
      !this.systemInfo.siteLogi ||
      !this.systemInfo.siteName
    ){
      this.message.error("不能为空")
      return false
    }
    this.loading = true
    this.systemService.updateSystemInfo(this.systemInfo).subscribe({
      next: (result: any) => {
        this.message.success("添加成功")
        this.getData()
        this.close()
      },
    })
    return true
  }
}
