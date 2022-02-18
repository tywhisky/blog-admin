import { Injectable } from "@angular/core"
import { Apollo } from "apollo-angular"
import gql from "graphql-tag"
import { IPageParams } from "./common"

export interface ICreateArticleInput {
  title: string
  cover?: string
  categoryId: string
  body: string
}

export interface IUpdateArticleInput {
  title?: string
  cover?: string
  categoryId?: string
  body?: string
  clicks?: number
  status?: "PENDING" | "ONLINE" | "OFFLINE"
}

const articlesQuery = gql`
  query ($pageParams: PageParams) {
    articles(pageParams: $pageParams) {
      entries {
        id
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

const articleQuery = gql`
  query ($id: ID!) {
    article(id: $id) {
      id
      category {
        id
        name
      }
      clicks
      cover
      status
      title
      body
    }
  }
`

const deleteArticleMutation = gql`
  mutation ($id: ID!) {
    deleteArticle(id: $id) {
      id
    }
  }
`

const createArticleMutation = gql`
  mutation ($article: CreateArticleInput!) {
    createArticle(article: $article) {
      id
    }
  }
`
const updateArticleMutation = gql`
  mutation ($id: ID!, $article: UpdateArticleInput!) {
    updateArticle(id: $id, article: $article) {
      id
    }
  }
`

@Injectable({
  providedIn: "root",
})
export class ArticleService {
  constructor(private apollo: Apollo) {}

  getArticle(id: string | null | undefined) {
    return this.apollo.watchQuery({
      query: articleQuery,
      variables: {
        id: id,
      },
    }).valueChanges
  }

  getArticles(pageParams?: IPageParams) {
    return this.apollo.watchQuery({
      query: articlesQuery,
      variables: {
        pageParams: pageParams,
      },
    }).valueChanges
  }

  deleteArticle(id: string) {
    return this.apollo.mutate({
      mutation: deleteArticleMutation,
      variables: {
        id: id,
      },
    })
  }

  createArticle(article: ICreateArticleInput) {
    return this.apollo.mutate({
      mutation: createArticleMutation,
      variables: {
        article: article,
      },
    })
  }

  updateArticle(id: string | null | undefined, article: IUpdateArticleInput) {
    return this.apollo.mutate({
      mutation: updateArticleMutation,
      variables: {
        id: id,
        article: article,
      },
    })
  }
}
