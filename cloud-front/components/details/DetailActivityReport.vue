<template>
  <div>
    <div>
      <b-card
        v-for="(item, index) in CampaignNote"
        :key="index"
        :item="item"
        :class="{ 'last-article': index == 2 }"
        class="detail-article"
      >
        <template #header>
          <b-card-title>
            {{ item.title }}
          </b-card-title>
          <div class="date">{{ item.createdAt | fullDateTime }}</div>
        </template>

        <figure>
          <b-img fluid src="@/assets/img/image_04.png" />
          <figcaption>キャプションキャプション</figcaption>
        </figure>

        <b-card-text>
          {{ item.body || item.summary }}
          <nuxt-link
            class="link-detail-article"
            :to="`/project/${campaignId}/note/${item.id}`"
          >
            もっと見る
          </nuxt-link>
        </b-card-text>
        <div class="sns">
          <a @click="sharePost('twitter', item)">
            <svg-twitter class="svg-twitter cursor-pointer"> </svg-twitter>
          </a>
          <a @click="sharePost('facebook', item)">
            <svg-facebook class="svg-facebook cursor-pointer"> </svg-facebook>
          </a>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
import SvgTwitter from "@/components/common/svg/SvgTwitter";
import SvgFacebook from "@/components/common/svg/SvgFacebook";
export default {
  components: {
    SvgTwitter,
    SvgFacebook,
  },

  data() {
    return {
      CampaignNote: [
        {
          id: "1",
          title: "キャンペションキャンペション",
          summary: "キャンペションキャンペション",
          body: "キャンペションキャンペション",
          createdAt: "2020-01-01T00:00:00.000Z",
        },
      ],
    };
  },
  computed: {
    campaignId() {
      return this.$route.params.id;
    },
  },

  methods: {
    sharePost(platform, item) {
      let shareUrl = "";
      if (platform === "facebook") {
        const url = `${location.host}/note/${item.id}`;
        shareUrl = `http://www.facebook.com/sharer.php?u=${url}&quote=${item.title}`;
      } else if (platform === "twitter") {
        shareUrl = `https://twitter.com/intent/tweet?text=${item.title}%0a&url=${location.href}&`;
      }

      window.open(
        shareUrl,
        "popup",
        "width=550,height=450,menubar=no,toolbar=no,resizable=yes,scrollbars=yes"
      );

      return false;
    },
  },
};
</script>
