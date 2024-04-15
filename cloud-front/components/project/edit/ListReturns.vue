<template>
  <section class="edit-back-page">
    <div class="head-colapse text-center">サポーターへ魅力的なお返しを</div>

    <!-- LIST RETURN -->

    <b-card>
      <div class="details-title text-center">保存済みリターン</div>
      <hr />
      <form>
        <div
          id="show-btn"
          class="new-register cursor-pointer"
          @click="showCreate"
        >
          <span>+</span>
          <p>新しく登録する</p>
        </div>

        <div class="head-back">
          <p>保存したリターン</p>
        </div>
        <div
          v-for="(item, index) in campaign.returns"
          :key="index"
          class="group-back"
        >
          <div class="d-flex">
            <div class="image-back col-5 p-0">
              <b-carousel
                v-if="item.images"
                :interval="4000"
                controls
                indicators
                class="w-100"
              >
                <b-carousel-slide
                  v-for="image in isImages(item.images)"
                  :key="image.id"
                >
                  <template #img>
                    <div class="return-image">
                      <img
                        class="w-100 return-image"
                        :src="imageSource(image.id)"
                      />
                    </div>
                  </template>
                </b-carousel-slide>
              </b-carousel>
            </div>
            <div class="price-back col-7">
              <p>{{ item.title }}</p>
              <div>
                <span>{{ item.amount | japanMoney }}円</span>
                <div
                  v-if="item && item.status"
                  class="group-btn d-none d-lg-flex"
                >
                  <div
                    type="button"
                    class="btn-true col-6"
                    @click="showEdit(index)"
                  >
                    編集する
                  </div>
                  <div class="btn-fall col-6" @click="showModal(index)">
                    <SvgDelete class="mr-1" width="16px" height="16px" />
                    削除する
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="item && item.status" class="group-btn d-flex d-lg-none">
            <div type="button" class="btn-true col-6" @click="showEdit(index)">
              編集する
            </div>
            <b-button
              type="button"
              class="btn-fall col-6"
              @click="showModal(index)"
            >
              <SvgDelete class="mr-1" width="16px" height="16px" />
              削除する
            </b-button>
          </div>
        </div>
      </form>
    </b-card>
    <ConfirmModal
      ref="confirmModal"
      @submit="onDeleteReturnPlan(indexSelected)"
    ></ConfirmModal>

    <div class="group-btn-saving">
      <button
        class="btn-true col-5"
        :class="{ disabled: readOnly }"
        :disabled="readOnly"
        @click="onSaveStep"
      >
        保存
      </button>
      <nuxt-link
        class="btn btn-fall col-5"
        :to="`/account/${accountId}/project/${campaignId}/preview`"
        ><SvgEyes />プレビュー
      </nuxt-link>
    </div>
  </section>
</template>
<script>
import ConfirmModal from "@/components/common/ConfirmModal";
import SvgDelete from "@/components/common/svg/SvgDelete";
import SvgEyes from "@/components/common/svg/SvgEyes.vue";

import _ from "lodash";
import { createNamespacedHelpers } from "vuex";
const accountMapper = createNamespacedHelpers("account");
export default {
  components: {
    SvgDelete,
    SvgEyes,
    ConfirmModal,
  },
  data() {
    return {
      returnId: null,
      indexSelected: null,
    };
  },
  computed: {
    ...accountMapper.mapState(["account"]),

    readOnly() {
      const status = ["reviewing", "update_reviewing", "finished"];
      return status.includes(this.campaignStatus);
    },

    campaignStatus() {
      return _.get(this.campaign, "status");
    },

    campaignId() {
      return this.$route.params.projectId;
    },

    accountId() {
      return this.account.id;
    },
  },
  methods: {
    showModal(index) {
      this.indexSelected = index;
      this.$refs.confirmModal.show();
    },

    showEdit(index) {
      this.$router.push(`return/${index}/edit`);
    },

    showCreate() {
      if (this.readOnly) {
        return false;
      }
      this.$router.push("return/new");
    },

    imageSource(id) {
      return `${process.env.consumerApiUrl}/file/${id}`;
    },
    onDeleteReturnPlan(index) {
      this.deleteReturnPlan(index);
      this.$toasted.success("削除しました");
    },
    onSaveStep() {
      this.setLocalCampaign();
      this.$router.push("identifications");
    },
    isImages(listImages) {
      return listImages.filter((item) => item.id !== "");
    },
  },
};
</script>
<style lang="scss" scoped>
.return-image {
  height: 100%;
  max-height: 160px;
  object-fit: cover;
  @include max-width(md) {
    max-height: 80px;
  }
}
</style>
