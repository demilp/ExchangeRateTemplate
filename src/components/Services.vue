<template>
  <div id="services">
    <slick ref="slick" :options="slickOptions" class="carousel">
      <div v-for="(service, index) in values" :key="index">
        <div class="service-container">
          <div class="dot">·</div>
          <span class="service">{{service}}</span>
        </div>
      </div>
    </slick>
  </div>
</template>

<script>
import Slick from "vue-slick";
export default {
  name: "Services",
  components: { Slick },
  props: ["values"],
  data: function() {
    return {
      slickOptions: {
        slidesToShow: 5,
        slidesToScroll: 5,
        vertical: true,
        autoplay: true,
        autoplaySpeed: 10000,
        prevArrow: false,
        nextArrow: false
      }
    };
  },
  watch: {
    values: function() {
      this.$refs.slick.destroy();
      this.$nextTick(function() {
        this.$refs.slick.create();
      });
    }
  }
};
</script>

<style scoped>
#services {
  height: 25vh;
  font-family: roman;
  font-size: 1.5vh;
  padding: 2vh 0;
  box-sizing: border-box;
  background-image: url("../../public/images/canvas_servicios.png");
  background-size: 100% 100%;
}
.carousel {
  overflow: hidden;
}
.service-container {
  margin: 1vh;
  display: flex;
  flex-direction: row;
}
.dot {
  font-size: 500%;
  vertical-align: middle;
  line-height: 1vh;
  display: table-cell;
}
</style>
