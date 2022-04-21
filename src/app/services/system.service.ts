import { Injectable } from "@angular/core"
import { Apollo } from "apollo-angular"
import gql from "graphql-tag"

export interface ISystemInfo {
  favicon: string
  footAbout: string
  footCopyRight: string
  footFiling: string
  footPoweredBy: string
  footPoweredByUrl: string
  siteDesc: string
  siteLogi: string
  siteName: string
}

const systemInfoQuery = gql`
  query {
    systemInfo {
      favicon
      footAbout
      footCopyRight
      footFiling
      footPoweredBy
      footPoweredByUrl
      siteDesc
      siteLogi
      siteName
    }
  }
`

const updateSystemInfoMutation = gql`
  mutation ($systemInfo: SystemInfoInput) {
    updateSystemInfo(systemInfo: $systemInfo) {
      favicon
      footAbout
      footCopyRight
      footFiling
      footPoweredBy
      footPoweredByUrl
      siteDesc
      siteLogi
      siteName
    }
  }
`

@Injectable({
  providedIn: "root",
})
export class SystemService {
  constructor(private apollo: Apollo) {}

  getSystem() {
    return this.apollo.watchQuery({
      query: systemInfoQuery,
    }).valueChanges
  }

  updateSystemInfo(systemInfo: ISystemInfo) {
    return this.apollo.mutate({
      mutation: updateSystemInfoMutation,
      variables: {
        systemInfo: systemInfo,
      },
    })
  }
}
