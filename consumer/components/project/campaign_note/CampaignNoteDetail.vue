<template>
  <div v-if="campaignNoteDetail">
    <b-card class="article">
      <template #header>
        <b-card-title>
          {{ campaignNoteDetail.title }}
        </b-card-title>
        <div class="date">{{ campaignNoteDetail.createdAt }}</div>
      </template>

      <figure>
        <b-img fluid src="@/assets/img/image_04.png" />
        <figcaption></figcaption>
      </figure>

      <div v-html="campaignNoteDetail.body"></div>

      <figure>
        <b-img fluid src="@/assets/img/image_04.png" />
        <figcaption></figcaption>
      </figure>

      <div v-html="campaignNoteDetail.body"></div>
    </b-card>

    <b-card class="share-report">
      <b-card-title>
        この活動報告が気に入ったら、 シェアしてみませんか？
      </b-card-title>
      <div class="btn-share-sns">
        <b-button class="btn-twitter">
          <svg-twitter class="svg-twitter"></svg-twitter>
          <span>ツイート</span>
        </b-button>
        <b-button class="btn-facebook">
          <svg-facebook class="svg-facebook"></svg-facebook>
          <span>シェア</span>
        </b-button>
      </div>
    </b-card>

    <section
      class="carousel-list d-flex justify-content-between align-items-center"
    >
      <SvgArrow></SvgArrow>
      <a href="#">史上最速充電 12台同時接続 2200W高出力を誇るポータ...</a>
      <a href="#">1657%目標金額達成!!最速充電ポータブル電源TRAVOR</a>
      <SvgArrow class="next"></SvgArrow>
    </section>

    <div class="btn-submit">
      <b-button
        variant="primary"
        block
        class="view-activity"
        @click="$emit('list')"
        >活動報告の一覧を見る</b-button
      >
      <b-button block class="view-project">プロジェクトを見る</b-button>
    </div>
  </div>
</template>

<script>
import SvgArrow from "@/components/common/svg/SvgArrow";
import SvgTwitter from "@/components/common/svg/SvgTwitter";
import SvgFacebook from "@/components/common/svg/SvgFacebook";

export default {
  components: {
    SvgArrow,
    SvgTwitter,
    SvgFacebook,
  },

  props: {
    campaignNoteDetail: {
      type: Object,
      default: () => {},
    },
  },

  methods: {
    sharePost(platform, item) {
      let shareUrl = "";
      if (platform === "facebook") {
        shareUrl = `http://www.facebook.com/sharer.php?u=google.com&quote=${item.title}`;
      } else if (platform === "twitter") {
        shareUrl = `https://twitter.com/intent/tweet?text=${item.title}%0a&url=google.com&`;
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
