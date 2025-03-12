import type { IAddUserToMatch, ICreateMatch, Match } from '../models/match'

let process: any

export class MatchesService {
  public static async GetMatchData(matchid: number): Promise<Match> {
    let message = await fetch(`${process.env?.VUE_APP_G5V_API_URL || '/api'}/matches/${matchid}`)
      .then((response) => response.json() as Promise<{ match: Match }>)
      .then((x) => x.match)
    return message
  }
  // public async GetEventMatchData(matchid: number) {
  //   let retVal
  //   try {
  //     retVal = this.$sse
  //       .create({
  //         url: `${process.env?.VUE_APP_G5V_API_URL || '/api'}/matches/${matchid}/stream`,
  //         format: 'json',
  //         withCredentials: true,
  //         polyfill: true,
  //       })
  //       .on('error', (err) => console.error('Failed to parse or lost connection:', err))
  //   } catch (error) {
  //     retVal = error.response.data.message
  //   }
  //   return retVal
  // }
  public static async GetRecentMatches(teamid: number) {
    let message = await fetch(
      `${process.env?.VUE_APP_G5V_API_URL || '/api'}/teams/${teamid}/recent`,
    )
      .then((data) => data.json())
      .then((body) => body.matches as Match[])
    return message
  }
  public static async GetMatchResult(team: number, match: number) {
    return await fetch(
      `${process.env?.VUE_APP_G5V_API_URL || '/api'}/teams/${team}/result/${match}`,
    )
      .then((data) => data.json())
      .then((body) => body.matches as Match[])
  }
  public static GetAllMatches() {
    return fetch(`${process.env?.VUE_APP_G5V_API_URL || '/api'}/matches`)
      .then((data) => data.json())
      .then((body) => body.matches as Match[])
  }
  public static GetLimitMatches(limit: number) {
    return fetch(`${process.env?.VUE_APP_G5V_API_URL || '/api'}/matches/limit/${limit}`)
      .then((data) => data.json())
      .then((body) => body.matches as Match[])
  }
  public static GetPagedMatches(offset: number, limit: number) {
    return fetch(`${process.env?.VUE_APP_G5V_API_URL || '/api'}/matches/page/${offset}&${limit}`)
      .then((data) => data.json())
      .then((body) => body.matches as Match[])
  }
  public static async GetMyMatches() {
    return fetch(`${process.env?.VUE_APP_G5V_API_URL || '/api'}/matches/mymatches`)
      .then((data) => data.json())
      .then((body) => body.matches as Match[])
  }
  public static async InsertMatch(matchInfo: ICreateMatch) {
    return fetch(`${process.env?.VUE_APP_G5V_API_URL || '/api'}/matches/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(matchInfo),
    }).then((data) => data.json())
  }
  public static async UpdateMatchInfo(matchInfo) {
    return fetch(`${process.env?.VUE_APP_G5V_API_URL || '/api'}/matches/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(matchInfo),
    })
  }

  public static PauseMatch(matchid: number) {
    return fetch(`${process.env?.VUE_APP_G5V_API_URL || '/api'}/matches/${matchid}/pause`)
  }
  public static UnpauseMatch(matchid: number) {
    return fetch(`${process.env?.VUE_APP_G5V_API_URL || '/api'}/matches/${matchid}/unpause`)
  }
  public static async GetMatchBackups(matchid: number) {
    return fetch(`${process.env?.VUE_APP_G5V_API_URL || '/api'}/matches/${matchid}/backup`)
  }
  public static async CancelMatch(matchid: number) {
    return fetch(`${process.env?.VUE_APP_G5V_API_URL || '/api'}/matches/${matchid}/cancel`)
  }
  public static async AddUserToSpectator(matchid: number, matchObject: IAddUserToMatch) {
    return fetch(`${process.env?.VUE_APP_G5V_API_URL || '/api'}/matches/${matchid}/addspec`, {
      method: 'PUT',
      body: JSON.stringify(matchObject),
    })
  }

  public static async AddUserToTeam(matchid: number, matchObject: IAddUserToMatch) {
    return fetch(`${process.env?.VUE_APP_G5V_API_URL || '/api'}/matches/${matchid}/adduser`, {
      method: 'put',
      body: JSON.stringify(matchObject),
    })
  }
  public static async ForfeitMatch(matchid: number, winner: number) {
    return fetch(
      `${process.env?.VUE_APP_G5V_API_URL || '/api'}/matches/${matchid}/forfeit/${winner}`,
    )
  }
  public static async SendRconCommandToMatch(matchid: number, rconBody) {
    return fetch(`${process.env?.VUE_APP_G5V_API_URL || '/api'}/matches/${matchid}/rcon/`, {
      method: 'put',
      body: rconBody,
    })
  }
  public static async GetRemoteBackups(matchid: number) {
    return fetch(`${process.env?.VUE_APP_G5V_API_URL || '/api'}/matches/${matchid}/backup/remote`)
  }
  public static async RestoreFromBackup(matchid: number, backupBody) {
    return fetch(`${process.env?.VUE_APP_G5V_API_URL || '/api'}/matches/${matchid}/backup/`, {
      method: 'post',
      body: backupBody,
    })
  }
  public static async RestoreFromRemoteBackup(matchid: number, backupBody) {
    return fetch(`${process.env?.VUE_APP_G5V_API_URL || '/api'}/matches/${matchid}/backup/remote`, {
      method: 'post',
      body: backupBody,
    })
  }
  public static async RestartCurrentMatch(matchid: number) {
    return fetch(`${process.env?.VUE_APP_G5V_API_URL || '/api'}/matches/${matchid}/restart/`)
  }

  // public static async GetVetoesOfMatch(matchid: number) {
  //   let res
  //   let vetoMessage = ''
  //   let vetoSideMessage
  //   let combinedVetoInfo = []
  //   try {
  //     res = await fetch(`${process.env?.VUE_APP_G5V_API_URL || '/api'}/vetoes/${matchid}`)
  //     vetoMessage = res.data.vetoes
  //     try {
  //       res = await fetch(`${process.env?.VUE_APP_G5V_API_URL || '/api'}/vetosides/${matchid}`)
  //       vetoSideMessage = res.data.vetoes
  //     } catch (ignored) {
  //       // ignore errors
  //     }
  //     vetoMessage.forEach((vetoData) => {
  //       if (vetoSideMessage) {
  //         let combinedFind = vetoSideMessage.find((vetoSideChoice) => {
  //           return (
  //             vetoData['id'] === vetoSideChoice['veto_id'] &&
  //             vetoData['map'] === vetoSideChoice['map']
  //           )
  //         })
  //         combinedFind
  //           ? combinedVetoInfo.push({
  //               id: vetoData.id,
  //               match_id: vetoData.match_id,
  //               team_name: vetoData.team_name,
  //               map: vetoData.map,
  //               pick_or_veto: vetoData.pick_or_veto,
  //               team_name_side: combinedFind.team_name,
  //               side: combinedFind.side,
  //             })
  //           : combinedVetoInfo.push({
  //               id: vetoData.id,
  //               match_id: vetoData.match_id,
  //               team_name: vetoData.team_name,
  //               map: vetoData.map,
  //               pick_or_veto: vetoData.pick_or_veto,
  //             })
  //       } else {
  //         combinedVetoInfo.push({
  //           id: vetoData.id,
  //           match_id: vetoData.match_id,
  //           team_name: vetoData.team_name,
  //           map: vetoData.map,
  //           pick_or_veto: vetoData.pick_or_veto,
  //         })
  //       }
  //     })
  //     return combinedVetoInfo
  //   } catch (error) {
  //     combinedVetoInfo = error.response.data.message
  //   }
  //   return combinedVetoInfo
  // }

  // public static async GetStreamedVetoesOfMatch(matchid: number) {
  //   let combinedVetoInfo
  //   try {
  //     combinedVetoInfo = await this.$sse
  //       .create({
  //         url: `${process.env?.VUE_APP_G5V_API_URL || '/api'}/vetoes/${matchid}/stream`,
  //         format: 'json',
  //         withCredentials: true,
  //         polyfill: true,
  //       })
  //       .on('error', (err) => console.error('Failed to parse or lost connection:', err))
  //   } catch (error) {
  //     combinedVetoInfo = error.response.data.message
  //   }
  //   return combinedVetoInfo
  // }

  // public static async GetStreamedVetoSidesOfMatch(matchid: number) {
  //   let retVal
  //   try {
  //     retVal = await this.$sse.create({
  //       url: `${process.env?.VUE_APP_G5V_API_URL || '/api'}/vetosides/${matchid}/stream`,
  //       format: 'json',
  //       withCredentials: true,
  //       polyfill: true,
  //     })
  //   } catch (error) {
  //     retVal = error.response.data.message
  //   }
  //   return retVal
  // }
}
