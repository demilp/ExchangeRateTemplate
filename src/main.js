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
  (parseFloat(
    process.env.NODE_ENV === "production"
      ? document.getElementById("refreshTime").innerText
      : "1"
  )||1) *
  1000 *
  60;
console.log(refreshTime);
const backgroundImage =
  process.env.NODE_ENV === "production"
    ? document.getElementById("backgroundImage").innerText
    : "images/bg.jpg";
console.log(backgroundImage);

const backgroundVideo =
  process.env.NODE_ENV === "production"
    ? document.getElementById("backgroundVideo").innerText
    : "";
console.log(backgroundVideo);

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
  backgroundImage,
  backgroundVideo
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
