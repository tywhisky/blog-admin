import { Injectable } from "@angular/core"
import { Apollo } from "apollo-angular"
import gql from "graphql-tag"
import { IPageParams } from "./common"

export interface ICategory {
  id: string
  name: string
}

const categoriesQuery = gql`
  query ($pageParams: PageParams) {
    categories(pageParams: $pageParams) {
      entries {
        name
        id
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

const deleteCategoryMutation = gql`
  mutation ($id: ID!) {
    deleteCategory(id: $id) {
      id
    }
  }
`

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  constructor(private apollo: Apollo) {}

  getCategories(pageParams?: IPageParams) {
    return this.apollo.watchQuery({
      query: categoriesQuery,
      variables: {
        pageParams: pageParams,
      },
    }).valueChanges
  }

  deleteCategory(id: string) {
    return this.apollo.mutate({
      mutation: deleteCategoryMutation,
      variables: {
        id: id,
      },
    })
  }
}
