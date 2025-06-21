export type TOptionList = {
  value: string
  label: string
  logo?: string
}
export type TFormActionType = "create" | "update"
type TFormSubmitProps<T> = {
  mode: TFormActionType
  data: T
}