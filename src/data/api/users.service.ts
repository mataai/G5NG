export class UsersService {
  public static async IsLoggedIn() {
    const res = await fetch(`${process.env?.VUE_APP_G5V_API_URL || '/api'}/isLoggedIn`)
    if (res.data == false) {
      return {
        admin: false,
        steam_id: '',
        id: null,
        super_admin: false,
        name: '',
        small_image: '',
        medium_image: '',
        large_image: '',
      }
    }
    return res.data
  }
  public static async GetUserData(userid) {
    let res
    let message
    try {
      res = await fetch(`${process.env?.VUE_APP_G5V_API_URL || '/api'}/users/${userid}`)
      message = res.data.user
    } catch (err) {
      //console.log(err)
      message = {
        id: 0,
        steam_id: '',
        name: 'ERROR',
        admin: 0,
        super_admin: 0,
      }
    }
    return message
  }
  public static async GetUserMapList(userid) {
    let res
    let message
    try {
      res = await fetch(`${process.env?.VUE_APP_G5V_API_URL || '/api'}/maps/${userid}`)
      message = res.data.maplist
    } catch (err) {
      message = []
    }
    return message
  }
  public static async GetUserEnabledMapList(userid) {
    let res
    let message
    try {
      res = await fetch(`${process.env?.VUE_APP_G5V_API_URL || '/api'}/maps/${userid}/enabled`)
      message = res.data.maplist
    } catch (err) {
      message = []
    }
    return message
  }
  public static async UpdateUserMap(mapdata) {
    let res
    let message
    try {
      res = await this.axioCall.put(`${process.env?.VUE_APP_G5V_API_URL || '/api'}/maps/`, mapdata)
      message = res.data
    } catch (err) {
      message = []
    }
    return message
  }
  public static async DeleteUserMap(mapdata) {
    let res
    let message
    try {
      res = await axios({
        method: 'delete',
        url: `${process.env?.VUE_APP_G5V_API_URL || '/api'}/maps/`,
        data: mapdata,
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      message = res.data
    } catch (error) {
      message = error.response.data
    }
    return message
  }
  public static async InsertUserMapInfo(mapdata) {
    let res
    let message
    try {
      res = await this.axioCall.post(`${process.env?.VUE_APP_G5V_API_URL || '/api'}/maps/`, mapdata)
      message = res.data
    } catch (error) {
      message = error.response.data.message
    }
    return message
  }
  public static async GetUserRecentMatches(userid) {
    let res
    let message
    try {
      res = await fetch(`${process.env?.VUE_APP_G5V_API_URL || '/api'}/users/${userid}/recent`)
      message = res.data.matches
    } catch (error) {
      message = error.response.data.message
    }
    return message
  }
  public static async GetAllUsers() {
    let res
    let message
    try {
      res = await fetch(`${process.env?.VUE_APP_G5V_API_URL || '/api'}/users/`)
      message = res.data.users
    } catch (error) {
      message = error.response.data.message
    }
    return message
  }
  public static async UpdateUserInfo(userInfo) {
    let res
    let message
    try {
      res = await this.axioCall.put(
        `${process.env?.VUE_APP_G5V_API_URL || '/api'}/users/`,
        userInfo,
      )
      message = res.data
    } catch (error) {
      message = error.response.data
    }
    return message
  }
  public static async login(userinfo) {
    let message
    let res
    try {
      res = await this.axioCall.post(
        `${process.env?.VUE_APP_G5V_API_URL || '/api'}/login`,
        userinfo,
      )
      return res.data.message
    } catch (error) {
      message = error.response.data.message
    }
    return message
  }
  public static async register(userinfo) {
    let message
    let res
    try {
      res = await this.axioCall.post(
        `${process.env?.VUE_APP_G5V_API_URL || '/api'}/register`,
        userinfo,
      )
      return res.data.message
    } catch (error) {
      message = error.response.data.message
    }
    return message
  }

  public GetSteamURL(steamid) {
    return `https://steamcommunity.com/profiles/${steamid}`
  }
}
