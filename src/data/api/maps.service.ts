export class MapsService {
  async GetAllMapStats() {
    let res
    let message
    try {
      res = await this.axioCall.get(`${process.env?.VUE_APP_G5V_API_URL || '/api'}/mapstats/`)
      message = res.data.mapstats
    } catch (error) {
      message = error.response.data.message
    }
    return message
  }
  async GetSingleMapStat(matchid, mapnumber) {
    let res
    let message
    try {
      res = await this.axioCall.get(
        `${process.env?.VUE_APP_G5V_API_URL || '/api'}/mapstats/${matchid}/${mapnumber}`,
      )
      message = res.data.mapstat
    } catch (error) {
      message = error.response.data.message
    }
    return message
  }
  async GetMapStats(matchid) {
    let res
    let message
    try {
      res = await this.axioCall.get(
        `${process.env?.VUE_APP_G5V_API_URL || '/api'}/mapstats/${matchid}`,
      )
      message = res.data.mapstats
    } catch (error) {
      message = error.response.data.message
    }
    return message
  }
  async GetEventMapStats(matchid) {
    return this.$sse
      .create({
        url: `${process.env?.VUE_APP_G5V_API_URL || '/api'}/mapstats/${matchid}/stream`,
        format: 'json',
        withCredentials: true,
        polyfill: true,
      })
      .on('error', (err) => console.error('Failed to parse or lost connection:', err))
  }
}
