<template>
  <div id="quotations">
    <div class="content">
      <div class="header">
        <span></span>
        <span>COMPRA</span>
        <span>VENTA</span>
      </div>
      <slick ref="slick" :options="slickOptions" class="carousel">
        <div v-for="(value, index) in values" :key="index" class="currency-container">
          <div>
            <div class="currency">
              <div class="symbol">
                <div><img :src="codeToImage(value.code)" /></div>
                
                <div class="coin">
                  <span class="code">{{value.code}}</span>
                  <span class="name">{{value.coin}}</span>
                </div>
              </div>
              <div class="value">${{value.buy}}</div>
              <div class="value">${{value.sell}}</div>
            </div>
            <div class="separator">
              <img src="images/line.png" alt />
            </div>
          </div>
        </div>
      </slick>
    </div>
  </div>
</template>

<script>
import Slick from "vue-slick";
export default {
  name: "Quotations",
  components: { Slick },
  data: function() {
    return {
      slickOptions: {
        slidesToShow: 3,
        slidesToScroll: 3,
        vertical: true,
        autoplay: true,
        autoplaySpeed: 1000000,
        speed: 600,
        prevArrow: false,
        nextArrow: false
      }
    };
  },
  props: ["values"],
  watch: {
    values: function() {
      this.$refs.slick.destroy();
      this.$nextTick(function() {
        this.$refs.slick.create();
      });
    }
  },
  methods: {
    codeToImage: function(code) {
      switch (code) {
        case "USD":
          return "images/icons/dolar.png";
        case "EUR":
          return "images/icons/euro.png";
        case "GBP":
          return "images/icons/libra.png";
        case "BRL":
          return "images/icons/real.png";
        case "CLP":
          return "images/icons/chilenos.png";
        case "UYU":
          return "images/icons/uruguayos.png";
        default:
          return "images/icons/dolar.png";
      }
    }
  }
};
</script>

<style scoped>
#quotations {
  height: 40vh;
  margin: 5vh 0 0 0;
  padding: 5vh 0;
  background-image: url("../../public/images/canvas_cotizaciones.png");
  background-size: 100% 100%;
}
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 0 3vw;
  margin-bottom: 1.2vh;
  font-size: 3.75vh;
}
.header span {
  width: 33%;
  text-align: center;
}
.carousel {
  overflow: hidden;
  padding-top: 10px;
  margin-bottom: -10px;
}
.currency {
  display: flex;
  flex-direction: row;
  margin: 2.2vh 0;
}

.currency-container > div {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.symbol {
  display: flex;
  flex-direction: row;
  margin: 0 1.1vw;
}

.symbol img {
  height: 100%;
  width: auto;
}
.coin {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 3.5vh;
  text-align: left;
  white-space: nowrap;
  margin-left: 1vh;
}

.coin > .code {
  font-size: 125%;
}
.coin > .name {
  font-size: 40%;
}
.separator {
  display: block;
  margin: 0 0 0 25%;
  width: 70%;
}
.separator > img {
  width: 100%;
}
.currency > div {
  width: 33%;
  text-align: center;
}
.value {
  font-family: roman;
  font-size: 3.75vh;
  vertical-align: middle;
}
</style>
