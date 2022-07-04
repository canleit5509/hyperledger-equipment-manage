<template>
  <div class="banner">
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="8000"
      controls
      indicators
      label-next="Next"
      label-prev="Previous"
      style="text-shadow: 1px 1px 2px #333"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <b-carousel-slide
        class="slide"
        v-for="banner in listBanner"
        :key="banner.id"
        :img-src="banner.campaign_image_url"
      >
        <template v-slot:img>
          <b-aspect aspect="40:3">
            <div class="image-center">
              <img
                :src="banner.campaign_image_url"
                :alt="banner.campaign_url"
                @click="clickBanner(banner.id, banner.campaign_url)"
              />
            </div>
          </b-aspect>
        </template>
      </b-carousel-slide>
    </b-carousel>
  </div>
</template>
<script>
import { mapGetters,mapActions } from "vuex";
export default {
  name: 'Banner',
  data() {
    return {
      slide: 0,
      sliding: null,
    };
  },
  computed: {
    ...mapGetters({
      listBanner: "CAMPAIGN/listBanner",
    }),
  },
  created() {
    this.getListBanner();
  },
  methods: {
    ...mapActions({
      clickCampaign: "CAMPAIGN/clickCampaign",
      getListBanner: "CAMPAIGN/getListBanner"
    }),
    clickBanner(id, url) {
      this.clickCampaign(id);
      window.open(url, "_blank");
    },
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/style/common.scss";
.banner {
  .carousel {
    background: #ABABAB;
    height: 15vh;
    width: 100%;
    .carousel-item {
      text-align: center;
      width: 100%;
      cursor: pointer;
      .image-center {
        margin: auto;
        height: 15vh;
        width: 70%;
        img {
          height: 15vh;
          width: 100%;
        }
      }
    }
  }
  ul {
    height: 100%;
    padding: 0;
    li {
      display: inline-block;
      width: 25%;
      height: 100%;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>