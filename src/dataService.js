import SpreadsheetClient from "./spreadsheetClient";

export default class DataService {
  constructor(spreadsheetId, tokenUrl) {
    this.client = new SpreadsheetClient(spreadsheetId, tokenUrl);
  }
  get_() {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.client.get("Cotizaciones"),
        this.client.get("Servicios")
      ])
        .spread((quotations, services) => {
          quotations = quotations.map(currency => {
            return {
              code: currency[0],
              currency: currency[1],
              buy: currency[2],
              sell: currency[3]
            };
          });
          services = services.map(service => service[0]);
          resolve({ quotations, services });
        })
        .catch(reject);
    });
  }
  get() {
    return new Promise((resolve, reject) => {
      this.client.get(["Cotizaciones", "Servicios"]).then(response => {
        let ranges = response.map(range => {
          return {
            worksheet: range.range.substring(0, range.range.indexOf("!")),
            values: range.values
          };
        });
        let quotations = ranges
          .find(e => e.worksheet === "Cotizaciones")
          .values.slice(1)
          .filter(d => d[2] && d[3]);
        let services = ranges
          .find(e => e.worksheet === "Servicios")
          .values.slice(1);
        quotations = quotations.map(currency => {
          return {
            code: currency[0],
            coin: currency[1],
            buy: currency[2],
            sell: currency[3]
          };
        });
        services = services.map(service => service[0]);
        resolve({ quotations, services });
      });
    });
  }
}
