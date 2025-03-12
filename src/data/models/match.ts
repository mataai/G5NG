export interface IMatch {
  id: number
  user_id: number
  server_id: number | null
  team1_id: number
  team2_id: number
  winner: number
  team1_score: number
  team2_score: number
  team1_series_score: number | null
  team2_series_score: number | null
  team1_string: string
  team2_string: string
  cancelled: number
  forfeit: number
  start_time: string
  end_time: string
  max_maps: number
  title: string
  skip_veto: number
  private_match: number
  enforce_teams: number
  min_player_ready: number
  season_id: number
  is_pug: number
  owner: string
  team1_mapscore: number
  team2_mapscore: number
}

export class Match {
  public id: number
  public user_id: number
  public server_id: number | null
  public team1_id: number
  public team2_id: number
  public winner: number
  public team1_score: number
  public team2_score: number
  public team1_series_score: number | null
  public team2_series_score: number | null
  public team1_string: string
  public team2_string: string
  public cancelled: boolean
  public forfeit: boolean
  public start_time: Date
  public end_time: Date
  public max_maps: number
  public title: string
  public skip_veto: boolean
  public private_match: boolean
  public enforce_teams: boolean
  public min_player_ready: number
  public season_id: number
  public is_pug: boolean
  public owner: string
  public team1_mapscore: number
  public team2_mapscore: number

  constructor(data: IMatch) {
    this.id = data.id
    this.user_id = data.user_id
    this.server_id = data.server_id
    this.team1_id = data.team1_id
    this.team2_id = data.team2_id
    this.winner = data.winner
    this.team1_score = data.team1_score
    this.team2_score = data.team2_score
    this.team1_series_score = data.team1_series_score
    this.team2_series_score = data.team2_series_score
    this.team1_string = data.team1_string
    this.team2_string = data.team2_string
    this.cancelled = !!data.cancelled
    this.forfeit = !!data.forfeit
    this.start_time = new Date(data.start_time)
    this.end_time = new Date(data.end_time)
    this.max_maps = data.max_maps
    this.title = data.title
    this.skip_veto = !!data.skip_veto
    this.private_match = !!data.private_match
    this.enforce_teams = !!data.enforce_teams
    this.min_player_ready = data.min_player_ready
    this.season_id = data.season_id
    this.is_pug = !!data.is_pug
    this.owner = data.owner
    this.team1_mapscore = data.team1_mapscore
    this.team2_mapscore = data.team2_mapscore
  }

  public get isLive(): boolean {
    return this.start_time < new Date() && !this.end_time && !this.cancelled
  }

  public get team1Score(): number {
    return this.team1_score
  }
  public get team2Score(): number {
    return this.team2_score
  }

  public get match_status(): string {
    if (
      this.end_time == null &&
      (!this.cancelled || this.cancelled == null) &&
      this.start_time != null
    ) {
      return `Live, ${this.team1Score}:${this.team2Score} vs ${this.team2_string}`
    } else if (this.team1Score < this.team2Score) {
      return `Lost, ${this.team1Score}:${this.team2Score} vs ${this.team2_string}`
    } else if (this.team1Score > this.team2Score) {
      return `Won, ${this.team1Score}:${this.team2Score} vs ${this.team2_string}`
    } else if (this.cancelled) {
      return 'Cancelled'
    } else if (this.team1Score == this.team2Score && !this.forfeit) {
      return `Tied, ${this.team1Score}:${this.team2Score} vs ${this.team2_string}`
    } else if (this.winner == this.team1_id) {
      return `Forfeit win vs ${this.team2_string}`
    } else if (this.winner == this.team2_id) {
      return `Forfeit loss vs ${this.team2_string}`
    }
    return ''
  }
}

export interface ICreateMatch {
  server_id: number
  team1_id: number
  team2_id: number
  season_id: number
  start_time: string
  max_maps: number
  side_type: string
  veto_mappool: string
  match_cvars: Record<string, any>
  veto_first: string
  skip_veto: boolean
  wingman: boolean
  spectator_auths: string | null
  min_players_to_ready: number
  players_per_team: number
  min_spectators_to_ready: number
  map_sides: string
}
export interface IAddUserToTeam {
  id: number // Match id
  auth_name: Record<
    string, // User id
    {
      name: string
      captain: number
      coach: number
    }
  >
}

export interface IAddUserToMatch {
  steam_id: string
  nickname: string
  team_id: number
}
