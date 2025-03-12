export class SeasonsService {
  async GetAllSeasons() {
    let res
    let message
    try {
      res = await this.axioCall.get(`${process.env?.VUE_APP_G5V_API_URL || '/api'}/seasons`)
      message = res.data.seasons
    } catch (error) {
      message = error.response.data.message
    }
    return message
  }
  async GetSeasonRecentMatches(seasonid) {
    let res
    let message
    try {
      res = await this.axioCall.get(
        `${process.env?.VUE_APP_G5V_API_URL || '/api'}/seasons/${seasonid}`,
      )
      message = res.data.matches
    } catch (error) {
      message = error.response.data.message
    }
    return message
  }
  async GetMySeasons() {
    let res
    let message
    try {
      res = await this.axioCall.get(
        `${process.env?.VUE_APP_G5V_API_URL || '/api'}/seasons/myseasons`,
      )
      message = res.data.seasons
    } catch (error) {
      message = error.response.data.message
    }
    return message
  }
  async GetMyAvailableSeasons() {
    let res
    let message
    try {
      res = await this.axioCall.get(
        `${process.env?.VUE_APP_G5V_API_URL || '/api'}/seasons/myseasons/available`,
      )
      message = res.data.seasons
    } catch (error) {
      message = error.response.data.message
    }
    return message
  }
  async GetSeasonInfo(seasonid) {
    let res
    let message
    try {
      res = await this.axioCall.get(
        `${process.env?.VUE_APP_G5V_API_URL || '/api'}/seasons/${seasonid}`,
      )
      message = res.data.season
    } catch (error) {
      message = error.response.data.message
    }
    return message
  }
  async GetSeasonCVARs(seasonid) {
    let res
    let message
    try {
      res = await this.axioCall.get(
        `${process.env?.VUE_APP_G5V_API_URL || '/api'}/seasons/${seasonid}/cvar`,
      )
      message = res.data.cvars
    } catch (error) {
      message = error.response.data.message
    }
    return message
  }
  async DeleteSeason(seasonData) {
    let res
    let message
    try {
      res = await axios({
        method: 'delete',
        url: `${process.env?.VUE_APP_G5V_API_URL || '/api'}/seasons/`,
        data: seasonData,
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      message = res.data.message
    } catch (error) {
      message = error.response.data.message
    }
    return message
  }
  async InsertSeason(seasonInfo) {
    let res
    let message
    try {
      res = await this.axioCall.post(
        `${process.env?.VUE_APP_G5V_API_URL || '/api'}/seasons/`,
        seasonInfo,
      )
      message = res.data
    } catch (error) {
      message = error.response.data
    }
    return message
  }
  async UpdateSeasonInfo(seasonInfo) {
    let res
    let message
    try {
      res = await this.axioCall.put(
        `${process.env?.VUE_APP_G5V_API_URL || '/api'}/seasons/`,
        seasonInfo,
      )
      message = res.data
    } catch (error) {
      message = error.response.data
    }
    return message
  }
  async ImportSeason(challongeInfo) {
    let res
    let message
    try {
      res = await this.axioCall.post(
        `${process.env?.VUE_APP_G5V_API_URL || '/api'}/seasons/challonge`,
        challongeInfo,
      )
      message = res.data
    } catch (error) {
      message = error.response.data
    }
    return message
  }
}
