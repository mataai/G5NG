export class API {
  private static axioCall = axios.create({
    headers: {
      'Content-Type': 'application/json',
    }
    withCredentials: true,
  })
  private static languageAlert: false
    public ChangeLanguage (lang) {
      localStorage.setItem('language', lang)
      this.$i18n.locale = lang
    }
    // BEGIN SERVER CALLS
   
    // END SERVER CALLS
    // BEGIN SEASON CALLS
    
    // END SEASON CALLS
    // BEGIN PLAYER STATS
    async GetUserPlayerStats(steamid) {
      let res
      let message
      try {
        res = await this.axioCall.get(
          `${process.env?.VUE_APP_G5V_API_URL || '/api'}/playerstats/${steamid}`,
        )
        message = res.data.playerstats
      } catch (error) {
        message = error.response.data.message
      }
      return message
    }
    async GetAllPlayers() {
      let res
      let message
      try {
        res = await this.axioCall.get(
          `${process.env?.VUE_APP_G5V_API_URL || '/api'}/playerstats/unique`,
        )
        message = res.data.count
      } catch (error) {
        message = error.response.data.message
      }
      return message
    }
    async GetPlayerStats(matchid) {
      let res
      let message
      try {
        res = await this.axioCall.get(
          `${process.env?.VUE_APP_G5V_API_URL || '/api'}/playerstats/match/${matchid}`,
        )
        message = res.data.playerstats
      } catch (error) {
        message = error.response.data.message
      }
      return message
    }
    async GetEventPlayerStats(matchid) {
      return this.$sse
        .create({
          url: `${process.env?.VUE_APP_G5V_API_URL || '/api'}/playerstats/match/${matchid}/stream`,
          format: 'json',
          withCredentials: true,
          polyfill: true,
        })
        .on('error', (err) => console.error('Failed to parse or lost connection:', err))
    }
    async GetPlayerStatRecentMatches(steamid) {
      let res
      let message
      try {
        res = await this.axioCall.get(
          `${process.env?.VUE_APP_G5V_API_URL || '/api'}/playerstats/${steamid}/recent`,
        )
        message = res.data.matches
      } catch (error) {
        message = error.response.data.message
      }
      console.log(message)
      return message
    }
    // END PLAYER STATS

    public get_logo_or_flag_link(team1, team2) {
      // get_logo_or_flag_link(team1)
      if (team1.logo && team2.logo) {
        return {
                    // team1: get_logo_link(team1),
                    // team2: get_logo_link(team2)
                    }
                } else {
                    return {
                    team1: this.get_flag_link(team1),
                    team2: this.get_flag_link(team2),
                    }
      }
    }
    public get_loser(matchdata) {
      // returns loser's teamname
      if (matchdata.team1_score > matchdata.team2_score) {
        return matchdata.team1_name
      } else if (matchdata.team1_score < matchdata.team2_score) {
        return matchdata.team2_name
      } else {
        return ''
      }
    }
    public get_flag_link(team) {
      if (team.flag == null || team.flag === '') {
        return `/img/_unknown.png`
      }
      return `/img/valve_flags/${team.flag.toLowerCase()}.png`
    }

    public GetKDR(playerstat) {
      if (playerstat.deaths === 0) {
        return playerstat.kills
      }
      return (playerstat.kills / playerstat.deaths).toFixed(2)
    }
    public GetHSP(playerstat) {
      if (playerstat.kills === 0) {
        return playerstat.kills
      }
      return ((playerstat.headshot_kills / playerstat.kills) * 100).toFixed(2)
    }
    public GetADR(playerstat) {
      if (playerstat.roundsplayed === 0) {
        return 0.0
      }
      return (playerstat.damage / playerstat.roundsplayed).toFixed(2)
    }
    public GetFPR(playerstat) {
      if (playerstat.roundsplayed === 0) {
        return 0.0
      }
      return (playerstat.kills / playerstat.roundsplayed).toFixed(2)
    }
    public AdminToolsAvailable(match) {
      if (
        (this.user.id === match.user_id || this.IsAnyAdmin(this.user)) &&
        (match.end_time == null || match.end_time == '') &&
        (match.cancelled == 0 || match.cancelled == null) &&
        (match.forfeit == 0 || match.forfeit == null)
      )
        return true
      return false
    }
    public IsAnyAdmin(user) {
      let adminCheck = user.admin + user.super_admin
      if (adminCheck > 0) {
        return true
      } else {
        return false
      }
    }
   public GetScoreSymbol(score1, score2) {
      if (score1 > score2) return '>'
      else if (score1 < score2) return '<'
      else return '=='
    }
    public GetFlags() {
      return [
        'AE',
        'AR',
        'AT',
        'AU',
        'BD',
        'BE',
        'BG',
        'BR',
        'BY',
        'CA',
        'CC',
        'CH',
        'CL',
        'CN',
        'CZ',
        'DE',
        'DK',
        'DZ',
        'EE',
        'ES',
        'EU',
        'FI',
        'FR',
        'GB',
        'GP',
        'GR',
        'HK',
        'HR',
        'HU',
        'ID',
        'IE',
        'IL',
        'IN',
        'IR',
        'IS',
        'IT',
        'JP',
        'KR',
        'KZ',
        'LT',
        'LU',
        'LV',
        'LY',
        'MK',
        'MO',
        'MX',
        'MY',
        'NL',
        'NO',
        'NZ',
        'PE',
        'PH',
        'PK',
        'PL',
        'PT',
        'RE',
        'RO',
        'RS',
        'RU',
        'SA',
        'SE',
        'SG',
        'SI',
        'SK',
        'SQ',
        'TH',
        'TR',
        'TW',
        'UA',
        'US',
        'VE',
        'VN',
        'ZA',
      ]
    }
    public GetRating (
      kills = 0,
      roundsplayed = 0,
      deaths = 0,
      k1 = 0,
      k2 = 0,
      k3 = 0,
      k4 = 0,
      k5 = 0,
    ) {
      try {
        let AverageKPR = 0.679
        let AverageSPR = 0.317
        let AverageRMK = 1.277
        let KillRating = roundsplayed === 0 ? 0 : kills / roundsplayed / AverageKPR
        let SurvivalRating =
          roundsplayed === 0 ? 0 : (roundsplayed - deaths) / roundsplayed / AverageSPR
        let killcount = k1 + 4 * k2 + 9 * k3 + 16 * k4 + 25 * k5
        let RoundsWithMultipleKillsRating =
          roundsplayed === 0 ? 0 : killcount / roundsplayed / AverageRMK
        let rating = (KillRating + 0.7 * SurvivalRating + RoundsWithMultipleKillsRating) / 2.7

        return rating.toFixed(2)
      } catch (err) {
        console.log('HELPER GetRating Failed -- ' + err)
        return 0
      }
    }
  }
}
