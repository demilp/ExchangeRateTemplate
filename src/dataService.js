import SpreadsheetClient from "./spreadsheetClient";

export default class DataService {
  constructor(spreadsheetId, tokenUrl) {
    this.client = new SpreadsheetClient(spreadsheetId, tokenUrl);
  }
  get() {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.client.get("Cotizaciones"),
        this.client.get("Servicios")
      ])
        .spread((quotations, services) => {
          quotations = quotations.map(currency => {
            return {
              code: currency[0],
              symbol: currency[1],
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
}
