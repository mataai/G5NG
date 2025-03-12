export class ServersService {
  async GetServerData(serverid) {
    let res
    let message
    try {
      res = await this.axioCall.get(
        `${process.env?.VUE_APP_G5V_API_URL || '/api'}/servers/${serverid}`,
      )
      message = res.data.server
    } catch (err) {
      //console.log(err)
      message = {
        id: 0,
        in_use: 0,
        ip_string: '',
        port: 0,
        rcon_password: null,
        display_name: 'ERROR RETREIVING SERVER',
        public_server: 0,
        name: 'ERROR',
      }
    }
    return message
  }
  async GetAllServers() {
    let res
    let message
    try {
      res = await this.axioCall.get(`${process.env?.VUE_APP_G5V_API_URL || '/api'}/servers`)
      return res.data.servers
    } catch (error) {
      message = error.response.data.message
    }
    return message
  }
  async GetPublicServerCount() {
    let res
    let message
    try {
      res = await this.axioCall.get(
        `${process.env?.VUE_APP_G5V_API_URL || '/api'}/servers/publiccount`,
      )
      return res.data.servers
    } catch (error) {
      message = error.response.data.message
    }
    return message
  }
  async GetMyServers() {
    let res
    let message
    try {
      res = await this.axioCall.get(
        `${process.env?.VUE_APP_G5V_API_URL || '/api'}/servers/myservers`,
      )
      return res.data.servers
    } catch (error) {
      message = error.response.data.message
    }
    return message
  }
  async DeleteServer(serverData) {
    let res
    let message
    try {
      res = await axios({
        method: 'delete',
        url: `${process.env?.VUE_APP_G5V_API_URL || '/api'}/servers/`,
        data: serverData,
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      message = res.data.message
    } catch (error) {
      message = error.response.data.message
    }
    return message
  }
  async GetAllAvailableServers() {
    let res
    let message
    try {
      res = await this.axioCall.get(
        `${process.env?.VUE_APP_G5V_API_URL || '/api'}/servers/available`,
      )
      return res.data.servers
    } catch (error) {
      message = error.response.data.message
    }
    return message
  }
  async InsertServer(serverInfo) {
    let res
    let message
    try {
      res = await this.axioCall.post(
        `${process.env?.VUE_APP_G5V_API_URL || '/api'}/servers/`,
        serverInfo,
      )
      message = res.data.message
    } catch (error) {
      message = error.response.data.message
    }
    return message
  }
  async GetServerStatus(serverId) {
    let res
    let message
    try {
      res = await this.axioCall.get(
        `${process.env?.VUE_APP_G5V_API_URL || '/api'}/servers/${serverId}/status`,
      )
      message = res.data.message
    } catch (error) {
      message = error.response.data.message
    }
    return message
  }
  async UpdateServer(serverInfo) {
    let res
    let message
    try {
      res = await this.axioCall.put(
        `${process.env?.VUE_APP_G5V_API_URL || '/api'}/servers/`,
        serverInfo,
      )
      message = res.data.message
    } catch (error) {
      message = error.response.data.message
    }
    return message
  }
}
