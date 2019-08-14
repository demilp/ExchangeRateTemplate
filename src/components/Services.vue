<template>
  <div id="services">
    <slick ref="slick" :options="slickOptions" class="carousel">
      <div v-for="(service, index) in values" :key="index" class="carousel-item">
        <span class="service">{{service}}</span>
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
        speed: 1200,
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
.carousel-item{
  margin: 1vh 0;
}
.service::before {
  content: "";
  border-radius: 50%;
  margin: 0 1.3vh;
  background: white;
  width: 1vh;
  height: 1vh;
  display: inline-block;
}
.dot {
  font-size: 500%;
  vertical-align: middle;
  line-height: 1vh;
  display: table-cell;
}
</style>
