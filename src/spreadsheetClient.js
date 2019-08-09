import axios from "axios";
export default class SpreadsheetClient {
  constructor(spreadsheetId, tokenUrl) {
    this.tokenUrl = tokenUrl;
    this.spreadsheetId = spreadsheetId;
    this.token = "";
  }
  //https://sheets.googleapis.com/v4/spreadsheets/14zZsI7WzjhWjYY20o4A7h2k8NNa8tIlKYvnA7cu3Zqk/values:batchGet?ranges=Cotizaciones&ranges=Servicios
  get_(worksheet) {
    let prom = Promise.resolve();
    if (this.token === "") prom = this.refreshAccessToken();
    return prom
      .then(() => {
        var url = `https://sheets.googleapis.com/v4/spreadsheets/${
          this.spreadsheetId
        }/values/${worksheet}`;
        return axios
          .get(url, { headers: { Authorization: "Bearer " + this.token } })
          .then(response => {
            return response.data.values.slice(1);
          });
      })
      .bind(this);
  }
  get(worksheets) {
    let prom = Promise.resolve();
    if (this.token === "") prom = this.refreshAccessToken();
    return prom
      .then(() => {
        var url =
          `https://sheets.googleapis.com/v4/spreadsheets/${
            this.spreadsheetId
          }/values:batchGet?` + worksheets.map(ws => "ranges=" + ws).join("&");
        return axios
          .get(url, { headers: { Authorization: "Bearer " + this.token } })
          .then(response => {
            return response.data.valueRanges;
          });
      })
      .bind(this);
  }
  refreshAccessToken() {
    return axios.get(this.tokenUrl).then(response => {      
      this.token = response.data.Token;
      console.log(this.token);      
      let exp = new Date(response.data.Expiration);
      setTimeout(()=>{this.refreshAccessToken()}, exp - new Date());
    });
  }
}
