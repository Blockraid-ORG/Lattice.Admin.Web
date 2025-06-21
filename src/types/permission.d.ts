export type TResponsePermission = {
  id: string
  name: string
  code: string
  path: string
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
}