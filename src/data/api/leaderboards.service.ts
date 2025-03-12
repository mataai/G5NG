export class LeaderboardsService {
  async GetTotalPlayerLeaderboard() {
    let res
    let message
    try {
      res = await this.axioCall.get(
        `${process.env?.VUE_APP_G5V_API_URL || '/api'}/leaderboard/players`,
      )
      return res.data.leaderboard
    } catch (error) {
      message = error.response.data.message
    }
    return message
  }
  async GetTeamLeaderboard() {
    let res
    let message
    try {
      res = await this.axioCall.get(`${process.env?.VUE_APP_G5V_API_URL || '/api'}/leaderboard`)
      return res.data.leaderboard
    } catch (error) {
      message = error.response.data.message
    }
    return message
  }
  async GetSeasonPlayerLeaderboard(seasonid) {
    let res
    let message
    try {
      res = await this.axioCall.get(
        `${process.env?.VUE_APP_G5V_API_URL || '/api'}/leaderboard/players/${seasonid}`,
      )
      return res.data.leaderboard
    } catch (error) {
      message = error.response.data.message
    }
    return message
  }
  async GetSeasonTeamLeaderboard(seasonid) {
    let res
    let message
    try {
      res = await this.axioCall.get(
        `${process.env?.VUE_APP_G5V_API_URL || '/api'}/leaderboard/${seasonid}`,
      )
      return res.data.leaderboard
    } catch (error) {
      message = error.response.data.message
    }
    return message
  }
}
