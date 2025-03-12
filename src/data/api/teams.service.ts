export class TeamsService {
  async GetTeamData(teamid: string) {
    let res
    let message
    try {
      res = await fetch(`${process.env?.VUE_APP_G5V_API_URL || '/api'}/teams/${teamid}`)
      message = res.data.team
    } catch (err) {}
    return message
  }
  async GetTeamName(teamid: string) {
    let res
    let message
    try {
      res = await fetch(`${process.env?.VUE_APP_G5V_API_URL || '/api'}/teams/${teamid}/basic`)
    } catch (err) {
      message = {
        id: 0,
        user_id: 0,
        name: 'NON EXISTANT TEAM',
        tag: '',
        flag: '',
        logo: '',
        auth_name: {},
        public_team: false,
      }
    }
    return message
  }
  async GetBasicTeamInfo(teamid) {
    let res
    let message
    try {
      res = await fetch(`${process.env?.VUE_APP_G5V_API_URL || '/api'}/teams/${teamid}/basic`)
      message = res.data.team
    } catch (err) {
      message = {
        id: 0,
        user_id: 0,
        name: 'NON EXISTANT TEAM',
        tag: '',
        flag: '',
        logo: '',
        auth_name: {},
        public_team: false,
      }
    }
    return message
  }
  async GetAllTeams() {
    let res
    let message
    try {
      res = await fetch(`${process.env?.VUE_APP_G5V_API_URL || '/api'}/teams`)
      message = res.data.teams
    } catch (error) {
      message = error.response.data.message
    }
    return message
  }
  async GetMyTeams() {
    let res
    let message
    try {
      res = await fetch(`${process.env?.VUE_APP_G5V_API_URL || '/api'}/teams/myteams`)
      message = res.data.teams
    } catch (error) {
      message = error.response.data.message
    }
    return message
  }
  async GetTeamRecentMatches(teamid) {
    let res
    let message
    try {
      res = await fetch(`${process.env?.VUE_APP_G5V_API_URL || '/api'}/teams/${teamid}/recent`)
      message = res.data.matches
    } catch (error) {
      message = error.response.data.message
    }
    return message
  }
  async InsertTeamInfo(teamInfo) {
    let res
    let message
    try {
      res = await this.axioCall.post(
        `${process.env?.VUE_APP_G5V_API_URL || '/api'}/teams/`,
        teamInfo,
      )
      message = res.data
    } catch (error) {
      message = error.response.data.message
    }
    return message
  }
  async UpdateTeamInfo(teamInfo) {
    let res
    let message
    try {
      res = await this.axioCall.put(
        `${process.env?.VUE_APP_G5V_API_URL || '/api'}/teams/`,
        teamInfo,
      )
      message = res.data
    } catch (error) {
      message = error.response.data
    }
    return message
  }
  async DeleteFromTeam(member) {
    let res
    let message
    try {
      res = await axios({
        method: 'delete',
        url: `${process.env?.VUE_APP_G5V_API_URL || '/api'}/teams/`,
        data: member,
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      message = res.data
    } catch (error) {
      message = error.response.data
    }
    return message
  }
  async ImportChallongeTeams(tournamentInfo) {
    let res
    let message
    try {
      res = await this.axioCall.post(
        `${process.env?.VUE_APP_G5V_API_URL || '/api'}/teams/challonge`,
        tournamentInfo,
      )
      message = res.data
    } catch (error) {
      message = error.response.data.message
    }
    return message
  }
}
