export type TMeta = {
  total: number
  lastPage: number
  currentPage: number
  perPage: number
  prev: number | null,
  next: number | null
}
export type TPagination<T> = {
  data: T[],
  meta: TMeta
}