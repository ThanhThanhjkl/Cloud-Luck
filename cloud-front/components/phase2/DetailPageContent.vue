<template>
  <b-container class="page-detail" fluid="xl">
    <section>
      <div class="detail-title d-none d-md-block">
        フェーズフリーというコンセプトから生まれた本当に使える浄水器「SESERA」
      </div>
      <div class="box alert-message">
        <div class="box-header">VERY編集部コメント</div>
        <div class="box-body">
          <div class="icon">
            <SvgMessage></SvgMessage>
          </div>
          <div class="box-title">
            水を考える時代。欠かせないものですね。応援してください！
          </div>
        </div>
      </div>

      <section class="detail-info d-grid g-32">
        <b-row>
          <b-col lg="7">
            <div class="section-header d-block d-md-none">
              <h2 class="section-title">PROJECT DETAIL</h2>
              <h4 class="section-subtitle">プロジェクト詳細</h4>
            </div>

            <DetailCarousel />

            <div class="section-header d-none d-md-block">
              <h2 class="section-title">PROJECT DETAIL</h2>
              <h4 class="section-subtitle">プロジェクト詳細</h4>
            </div>

            <b-card class="support-project d-block d-md-none mt-4">
              <div class="box likes p-0">
                <SvgHeart class="icon" opacity="0.7"></SvgHeart>
                <b class="text-primary">お気に入りに追加</b>
                <div class="badge">780</div>
              </div>
            </b-card>

            <div class="bg-white mt-4 mt-md-0">
              <DetailArticle></DetailArticle>
            </div>
          </b-col>
          <b-col lg="5">
            <div class="d-none d-md-block">
              <DetailCard />
            </div>

            <b-card class="support-project d-none d-md-block">
              <b-button variant="primary" class="support" to="/project/1/buy"
                >このプロジェクトを応援する</b-button
              >
              <div class="box likes">
                <SvgHeart class="icon" opacity="0.7"></SvgHeart>
                <b class="text-primary">お気に入りに追加</b>
                <div class="badge">780</div>
              </div>
            </b-card>
            <section class="project-section">
              <div class="section-header">
                <h2 class="section-title">PROJECT OWNER</h2>
                <h4 class="section-subtitle">プロジェクトオーナー</h4>
              </div>
              <OwnerCard></OwnerCard>
            </section>
            <section class="section-plan">
              <div class="section-header">
                <h2 class="section-title">Return Plan</h2>
                <h4 class="section-subtitle">リターンを選択する</h4>
              </div>

              <div class="d-grid g-32">
                <ReturnPlanCard></ReturnPlanCard>
                <ReturnPlanCard></ReturnPlanCard>
              </div>
            </section>
          </b-col>
        </b-row>
      </section>
    </section>
  </b-container>
</template>

<script>
import DetailCarousel from "@/components/phase2/DetailCarousel";
import DetailCard from "@/components/phase2/DetailCard";
import DetailArticle from "@/components/phase2/DetailArticle";
import OwnerCard from "@/components/phase2/OwnerCard";
import ReturnPlanCard from "@/components/phase2/ReturnPlanCard";
import SvgMessage from "@/components/common/svg/SvgMessage";
import SvgHeart from "@/components/common/svg/SvgHeart";

export default {
  components: {
    DetailCarousel,
    DetailCard,
    DetailArticle,
    OwnerCard,
    ReturnPlanCard,
    SvgMessage,
    SvgHeart,
  },
};
</script>
