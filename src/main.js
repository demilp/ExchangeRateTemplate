import Vue from "vue";
import App from "./App.vue";
import Promise from "bluebird";

window.Promise = Promise;

Vue.config.productionTip = false;

const spreadsheetId =
  process.env.NODE_ENV === "production"
    ? document.getElementById("spreadsheet").innerText
    : "14zZsI7WzjhWjYY20o4A7h2k8NNa8tIlKYvnA7cu3Zqk";
console.log(spreadsheetId);
const dexTokenUrl =
  process.env.NODE_ENV === "production"
    ? document.getElementById("googleApi").innerText
    : "http://server.dexmanager.com/DexFrontEnd/api/external/v1/GetToken/4a55ae58-5c52-4fd8-a3c7-75128b30418e";
console.log(dexTokenUrl);
const refreshTime =
  parseInt(
    process.env.NODE_ENV === "production"
      ? document.getElementById("refreshTime").innerText
      : "1"
  ) *
  1000 *
  60;
console.log(refreshTime);
const background =
  process.env.NODE_ENV === "production"
    ? document.getElementById("background").innerText
    : "bg.jpg";
console.log(background);

global.log = function(message) {
  let l = {
    type: "log",
    content: { tag: "[Cotizador]", message: message },
    origin: "DexTemplate"
  };
  console.log(l);
  window.parent.postMessage(l, "*");
};
let props = {
  spreadsheetId,
  dexTokenUrl,
  refreshTime,
  background
};

new Vue({
  render: createElement => {
    const context = {
      props: { ...props }
    };
    return createElement(App, context);
  }
  //render: h => h(App)
}).$mount("#app");
