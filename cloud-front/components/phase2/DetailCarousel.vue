<template>
  <b-card class="detail-carousel">
    <template #header>
      <b-carousel :interval="4000" controls indicators>
        <b-carousel-slide>
          <template #img>
            <img
              class="d-block img-fluid w-100"
              width="1024"
              height="480"
              src="@/assets/img/image_03.png"
              alt="image slot"
            />
          </template>
        </b-carousel-slide>
        <b-carousel-slide>
          <template #img>
            <img
              class="d-block img-fluid w-100"
              width="1024"
              height="480"
              src="@/assets/img/image_03.png"
              alt="image slot"
            />
          </template>
        </b-carousel-slide>
        <b-carousel-slide>
          <template #img>
            <img
              class="d-block img-fluid w-100"
              width="1024"
              height="480"
              src="@/assets/img/image_03.png"
              alt="image slot"
            />
          </template>
        </b-carousel-slide>
      </b-carousel>
    </template>

    <div class="section-detail-card d-block d-md-none">
      <DetailCard />
    </div>

    <div class="box likes floating d-flex d-md-none">
      <SvgHeart class="icon" opacity="0.7"></SvgHeart>
      <span>780</span>
      <b-button variant="primary" to="/project/1/buy"
        >このプロジェクトを応援する</b-button
      >
    </div>

    <b-card-text>
      新型コロナによる長い長い緊急事態宣言が明け、これからというとき、火災により休業に追い込まれました。幸いにも怪我人もおらず、一休そばの味である"地下の返し"も無事でした。しかし、"返し"を熟成させる環境は失うことに。北海道内にお届けしていた蕎麦と返しの味を復活させたい！再出発のご応援をお願い致します！
    </b-card-text>
  </b-card>
</template>
ß
<script>
import SvgHeart from "@/components/common/svg/SvgHeart";
import DetailCard from "@/components/phase2/DetailCard";
export default {
  components: {
    SvgHeart,
    DetailCard,
  },
  props: {
    large: Boolean,
  },
};
</script>
