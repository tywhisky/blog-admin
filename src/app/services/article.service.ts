import { Injectable } from "@angular/core"
import { Apollo } from "apollo-angular"
import gql from "graphql-tag"
import { IPageParams } from "./common"

const articlesQuery = gql`
  query ($pageParams: PageParams) {
    articles(pageParams: $pageParams) {
      entries {
        category {
          id
          name
        }
        clicks
        cover
        status
        title
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

@Injectable({
  providedIn: "root",
})
export class ArticleService {
  constructor(private apollo: Apollo) {}

  getArticles(pageParams?: IPageParams) {
    return this.apollo.watchQuery({
      query: articlesQuery,
      variables: {
        pageParams: pageParams,
      },
    }).valueChanges
  }
}
