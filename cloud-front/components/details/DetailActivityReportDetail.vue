<template>
  <div class="detail-article-report">
    <b-card v-if="CampaignNoteDetail" class="article">
      <template #header>
        <b-card-title>
          {{ CampaignNoteDetail.title }}
        </b-card-title>
        <div class="date">
          {{ CampaignNoteDetail.createdAt | fullDateTime }}
        </div>
      </template>

      <div v-html="CampaignNoteDetail.body"></div>
    </b-card>

    <b-card v-if="CampaignNoteDetail" class="share-report">
      <b-card-title>
        この活動報告が気に入ったら、 シェアしてみませんか？
      </b-card-title>
      <div class="btn-share-sns">
        <b-button
          type="button"
          class="btn-twitter"
          @click="sharePost('twitter', CampaignNoteDetail)"
        >
          <svg-twitter class="svg-twitter"></svg-twitter>
          <span>ツイート</span>
        </b-button>

        <b-button
          type="button"
          class="btn-facebook"
          @click="sharePost('facebook', CampaignNoteDetail)"
        >
          <svg-facebook class="svg-facebook"></svg-facebook>
          <span>シェア</span>
        </b-button>
      </div>
    </b-card>

    <section
      class="carousel-list d-flex justify-content-between align-items-center"
    >
      <SvgArrow></SvgArrow>
      <div class="d-flex justify-content-between">
        <a href="#">史上最速充電 12台同時接続 2200W高出力を誇るポータ...</a>
        <a href="#">1657%目標金額達成!!最速充電ポータブル電源TRAVOR</a>
      </div>

      <SvgArrow class="next"></SvgArrow>
    </section>

    <div class="btn-submit">
      <nuxt-link
        :to="`/project/${campaignId}/note`"
        class="btn btn-primary view-activity"
        block
      >
        活動報告の一覧を見る
      </nuxt-link>
      <nuxt-link :to="`/project/${campaignId}`" block class="btn view-project">
        プロジェクトを見る
      </nuxt-link>
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
import SvgTwitter from "@/components/common/svg/SvgTwitter";
import SvgFacebook from "@/components/common/svg/SvgFacebook";
import SvgArrow from "@/components/common/svg/SvgArrow";
const { mapState, mapActions } = createNamespacedHelpers("campaign");
export default {
  components: {
    SvgTwitter,
    SvgFacebook,
    SvgArrow,
  },
  computed: {
    ...mapState(["CampaignNote", "CampaignNoteDetail"]),
    campaignId() {
      return this.$route.params.id;
    },

    noteId() {
      return this.$route.params.noteId;
    },
  },
  async mounted() {
    await this.getCampaignNote(this.campaignId);
    const params = {
      id: this.campaignId,
      noteId: this.noteId,
    };
    this.getCampaignNoteDetail(params);
  },
  methods: {
    ...mapActions(["getCampaignNote", "getCampaignNoteDetail"]),

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
