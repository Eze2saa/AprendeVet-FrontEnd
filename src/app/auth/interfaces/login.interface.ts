import { User } from "./user.interface"

export interface Login {
  nombre: string,
  email: string
}


export interface LoginResponse {
  user: User,
  token: string
}