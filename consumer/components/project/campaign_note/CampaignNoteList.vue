<template>
  <div v-if="campaignNote.length">
    <b-card
      v-for="(item, index) in campaignNote"
      :key="index"
      :item="item"
      :class="{ 'last-article': item.id == 2 }"
      class="detail-article"
    >
      <template #header>
        <b-card-title>
          {{ item.title }}
        </b-card-title>
        <div class="date">{{ item.createdAt }}</div>
      </template>

      <figure>
        <b-img fluid src="@/assets/img/image_04.png" />
        <figcaption></figcaption>
      </figure>

      <b-card-text>
        <div>
          {{ item.summary }}
        </div>
        <a
          href="#"
          class="link-detail-article"
          @click.prevent="$emit('detail', item.id)"
        >
          もっと見る
        </a>
      </b-card-text>
      <div class="sns">
        <a
          class="btn-facebook cursor-pointer"
          target="popup"
          href="#"
          @click.prevent="sharePost('twitter', item)"
        >
          <svg-twitter class="svg-twitter"></svg-twitter>
        </a>
        <a
          class="btn-facebook cursor-pointer"
          target="popup"
          @click.prevent="sharePost('facebook', item)"
        >
          <svg-facebook class="svg-facebook"></svg-facebook>
        </a>
      </div>
    </b-card>

    <nav class="paginations">
      <ul class="pagination">
        <div>
          <li class="page-item btn-prev"></li>
          <div class="arrowLine"><a href="#">前</a></div>
        </div>
        <li class="page-item active">
          <span class="page-link"> 1 </span>
        </li>
        <li class="page-item disable">
          <span class="page-link"> 2 </span>
        </li>
        <li class="page-item disable">
          <span class="page-link"> 3 </span>
        </li>
        <div>
          <div class="arrowLine"><a href="#">次</a></div>
          <li class="page-item btn-next"></li>
        </div>
      </ul>
    </nav>
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

  props: {
    campaignNote: {
      type: Array,
      default: () => [],
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
