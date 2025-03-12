export interface Season {
  id: number
  user_id: number
  name: string
  start_date: string
  end_date: string | null
  cvars: {
    map_pool: string
    map_sides: string
    maps_to_win: string
    min_players_to_ready: string
    min_spectators_to_ready: string
    players_per_team: string
    side_type: string
    skip_veto: string
    spectators: string
    wingman: string
  }
}
