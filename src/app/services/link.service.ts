import { Injectable } from "@angular/core"
import { Apollo } from "apollo-angular"
import gql from "graphql-tag"
import { IPageParams } from "./common"

export interface ILink {
  id: string
  description: string
  order: number
  title: string
  url: string
}

export interface ICreateLinkInput {
  description: string
  order: number
  title: string
  url: string
}

const linksQuery = gql`
  query ($pageParams: PageParams) {
    links(pageParams: $pageParams) {
      entries {
        id
        order
        title
        url
        description
      }
      pageInfo {
        pageNumber
        pageSize
        totalEntries
        totalPages
      }
    }
  }
`

const deleteLinkMutation = gql`
  mutation ($id: ID!) {
    deleteLink(id: $id) {
      id
    }
  }
`

const createLinkMutation = gql`
  mutation ($link: CreateLinkInput!) {
    createLink(link: $link) {
      id
    }
  }
`

@Injectable({
  providedIn: "root",
})
export class LinkService {
  constructor(private apollo: Apollo) {}

  getLinks(pageParams?: IPageParams) {
    return this.apollo.watchQuery({
      query: linksQuery,
      variables: {
        pageParams: pageParams,
      },
    }).valueChanges
  }

  deleteLink(id: string) {
    return this.apollo.mutate({
      mutation: deleteLinkMutation,
      variables: {
        id: id,
      },
    })
  }

  createLink(link: ICreateLinkInput) {
    return this.apollo.mutate({
      mutation: createLinkMutation,
      variables: {
        link: link,
      },
    })
  }
}
