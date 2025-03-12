interface AuthName {
  [key: string]: {
    name: string
    captain: number
    coach: number
  }
}

export interface Team {
  owner: string
  id: number
  user_id: number
  name: string
  flag: string | null
  logo: string | null
  tag: string
  public_team: number
  auth_name: AuthName | null
}
