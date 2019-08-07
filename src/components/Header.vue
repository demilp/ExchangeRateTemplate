<template>
  <div id="header">
    <img class="logo" src="images/Up_logo.png" />
    <div class="datetime">
      <span class="time">{{time}}</span>
      <span class="date">{{date}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data: function() {
    return {};
  },
  computed: {
    time: function() {
      let t = new Date().toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true
      });
      return t.replace(" ", "");
    },
    date: function() {
      let days = [
        "LUNES",
        "MARTES",
        "MIERCOLES",
        "JUEVES",
        "VIERNES",
        "SABADO",
        "DOMINGO"
      ];
      let months = [
        "ENERO",
        "FEBRERO",
        "MARZO",
        "ABRIL",
        "MAYO",
        "JUNIO",
        "JULIO",
        "AGOSTO",
        "SEPTIEMBRE",
        "OCTUBRE",
        "NOVIEMBRE",
        "DICIEMBRE"
      ];
      let d = new Date();
      let s = `${days[d.getDay()]} ${d.getMonth()} ${
        months[d.getMonth()]
      } ${d.getFullYear()}`;
      return s.toUpperCase();
    }
  }
};
</script>

<style scoped>
#header {
  background-color: #0000009e;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.logo {
  display: block;
  width: auto;
  height: 100%;
 
}
.datetime {
  color: white;
  height: 100%;
  display: flex;
  margin: 1.5vw 2vw 1.5vw 0;
  flex-direction: column;
  font-size: 2.5vw;
  align-items: flex-end;
}
.time {
  font-size: 400%;
  margin: 0 0 -2.5vw 0;
}
</style>
