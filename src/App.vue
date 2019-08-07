<template>
  <div id="app" :style="{ 'background-image': 'url(' + background + ')' }">
    <Header />
    <Quotations :values="quotations" />
    <Services :values="services" />
    <img src="images/base_dex.jpg" class="footer" />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Quotations from "./components/Quotations.vue";
import Services from "./components/Services.vue";
import DataService from "./dataService.js";
import { isEqual } from "lodash";

export default {
  name: "app",
  components: {
    Header,
    Quotations,
    Services
  },
  props: ["spreadsheetId", "dexTokenUrl", "refreshTime", "background"],
  data: function() {
    return {
      service: new DataService(this.spreadsheetId, this.dexTokenUrl),
      services: [],
      quotations: []
    };
  },
  beforeMount() {
    this.refresh();
    setInterval(this.refresh, this.refreshTime);
  },
  methods: {
    refresh: function() {
      this.service
        .get()
        .then(r => {
          if (!isEqual(this.quotations, r.quotations)) {
            this.quotations = r.quotations;
          }
          if (!isEqual(this.services, r.services)) {
            this.services = r.services;
          }
        })
        .catch(e => {
          global.log(e);
        })
        .bind(this);
    }
  }
};
</script>

<style>
#app {
  background-size: auto 100%;
  display: flex;
  flex-direction: column;
  font-family: thin;
  color: white;
  overflow: hidden;
}
html,
body,
#app {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
}
.footer {
  width: 100%;
  height: auto;
  position: absolute;
  bottom: 0;
}
@font-face {
  font-family: "light";
  src: url("./assets/fonts/HelveticaNeueLTCom-Lt.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: "roman";
  src: url("./assets/fonts/HelveticaNeueLTCom-Roman.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: "thin";
  src: url("./assets/fonts/HelveticaNeueLTCom-ThCn.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: "oblique";
  src: url("./assets/fonts/HelveticaNeueLTCom-ThCnO.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}
</style>
