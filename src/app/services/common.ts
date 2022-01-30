export interface IPageParams {
    page: number
    pageSize: number
}

export interface IPageInfo extends IPageParams {
    totalEntries: number
    totalPages: number
}