import axios from "axios";
export default class SpreadsheetClient {
  constructor(spreadsheetId, tokenUrl) {
    this.tokenUrl = tokenUrl;
    this.spreadsheetId = spreadsheetId;
    this.token = "";
  }

  get(worksheet) {
    let prom = Promise.resolve();
    if (this.token === "") prom = this.refreshAccessToken();
    return prom.then(() => {
      var url = `https://sheets.googleapis.com/v4/spreadsheets/${
        this.spreadsheetId
      }/values/${worksheet}`;
      return axios
        .get(url, { headers: { Authorization: "Bearer " + this.token } })
        .then(response => {
          return response.data.values.slice(1);
        });
    }).bind(this);
  }

  refreshAccessToken() {
    return axios.get(this.tokenUrl).then(response => {
      this.token = response.data.Token;
      let exp = new Date(response.data.Expiration);
      setTimeout(this.refreshAccessToken, exp - new Date());
    });
  }
}
