<template>
  <b-card v-if="campaign" class="detail-carousel">
    <div>
      <b-carousel controls indicators>
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
          v-for="(item, imageIndex) in validSubImages"
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
      <b-card-text class="d-none d-md-block mt-2">
        {{ campaign.detail.summary }}
      </b-card-text>
    </div>
  </b-card>
</template>

<script>
import { get } from "lodash";

export default {
  data() {
    return {
      isLiked: false,
      playVideo: false,
      videoId: "",
    };
  },

  computed: {
    progressPercent() {
      if (this.campaign) {
        return (this.campaign.currentAmount / this.campaign.targetAmount) * 100;
      } else {
        return 0;
      }
    },

    validSubImages() {
      return this.campaign.visual.subImage.filter((item) => {
        return item;
      });
    },
  },

  mounted() {
    if (this.campaign) {
      const idVideo = get(this.campaign, "visual.videoUrl");
      if (idVideo) {
        this.videoId = this.getVideoYoutubeId(idVideo);
        this.playVideo = true;
      }
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
      return `${process.env.consumerApiUrl}/file/${id}`;
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep {
  .card-body {
    padding-bottom: 15px;
    @include min-width(md) {
      padding-top: 0;
    }
  }
}
</style>
