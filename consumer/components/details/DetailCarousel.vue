<template>
  <b-card v-if="campaign" class="detail-carousel">
    <div>
      <b-carousel v-if="campaign.detail" controls indicators>
        <b-carousel-slide v-if="playVideo">
          <template #img>
            <iframe
              width="100%"
              height="480px"
              :src="`//www.youtube.com/embed/${videoId}`"
              frameborder="0"
              allowfullscreen
            ></iframe>
          </template>
        </b-carousel-slide>

        <b-carousel-slide>
          <template #img>
            <img
              class="d-block img-fluid w-100"
              width="1024"
              height="480"
              :src="imageSource(campaign.visual.mainImage.id)"
              alt="image slot"
            />
          </template>
        </b-carousel-slide>

        <b-carousel-slide
          v-for="(item, imageIndex) in campaign.visual.subImage"
          :key="imageIndex"
        >
          <template #img>
            <img
              class="d-block img-fluid w-100"
              width="1024"
              height="480"
              :src="imageSource(item.id)"
              alt="image slot"
            />
          </template>
        </b-carousel-slide>
      </b-carousel>
      <b-card-text class="d-none d-lg-block mt-2">
        {{ campaign.detail.summary }}
      </b-card-text>
    </div>
  </b-card>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("campaign");

export default {
  props: {
    large: Boolean,
  },

  data() {
    return {
      playVideo: false,
      videoId: "",
    };
  },

  computed: {
    ...mapState(["campaign"]),
  },

  mounted() {
    if (this.campaign.visual.videoUrl) {
      this.videoId = this.getVideoYoutubeId(this.campaign.visual.videoUrl);
    } else {
      this.playVideo = NaN;
    }
  },

  methods: {
    getVideoYoutubeId(url) {
      const regExp =
        /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      return match && match[2].length === 11 ? match[2] : null;
    },

    imageSource(id) {
      if (id) {
        return `${process.env.consumerApiUrl}/file/${id}`;
      } else return "";
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep {
  .card-body {
    padding: 0;
    padding-bottom: 15px;
  }
}
</style>
