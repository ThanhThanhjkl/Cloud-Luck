<template>
  <section class="edit-back-page">
    <div class="head-colapse text-center">
      Give back to your supporters in an attractive way
    </div>

    <!-- LIST RETURN -->

    <b-card>
      <div class="details-title text-center">saved returns</div>
      <hr />
      <form>
        <div
          id="show-btn"
          class="new-register cursor-pointer"
          @click="showCreate"
        >
          <span>+</span>
          <p>Register new</p>
        </div>

        <div class="head-back">
          <p>saved returns</p>
        </div>
        <div v-for="(item, index) in myReturns" :key="index" class="group-back">
          <div class="d-flex">
            <div class="image-back col-5 p-0">
              <div class="return-image">
                <img class="w-100 return-image" :src="item.image" />
              </div>
            </div>
            <div class="price-back col-7">
              <p>{{ item.title }}</p>
              <div>
                <span>{{ item.cost | japanMoney }}円</span>
                <div class="group-btn d-none d-lg-flex">
                  <div
                    type="button"
                    class="btn-true col-6"
                    @click="showEdit(item.id)"
                  >
                    To edit
                  </div>
                  <div class="btn-fall col-6" @click="showModal(item.id)">
                    <SvgDelete class="mr-1" width="16px" height="16px" />
                    delete
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="group-btn d-flex d-lg-none">
            <div
              type="button"
              class="btn-true col-6"
              @click="showEdit(item.id)"
            >
              To edit
            </div>
            <b-button
              type="button"
              class="btn-fall col-6"
              @click="showModal(item.id)"
            >
              <SvgDelete class="mr-1" width="16px" height="16px" />
              delete
            </b-button>
          </div>
        </div>
      </form>
    </b-card>
    <ConfirmModal
      ref="confirmModal"
      @submit="onDeleteReturnPlan(idSelected)"
    ></ConfirmModal>

    <div class="group-btn-saving">
      <button class="btn-true col-5" @click="onSaveStep">keep</button>
      <nuxt-link
        class="btn btn-fall col-5"
        :to="`/account/${accountId}/project/${productId}/preview`"
        ><SvgEyes />preview
      </nuxt-link>
    </div>
  </section>
</template>
<script>
import ConfirmModal from "@/components/common/ConfirmModal";
import SvgDelete from "@/components/common/svg/SvgDelete";
import SvgEyes from "@/components/common/svg/SvgEyes.vue";

import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("auth");
const projectMapper = createNamespacedHelpers("home");
export default {
  components: {
    SvgDelete,
    SvgEyes,
    ConfirmModal,
  },
  data() {
    return {
      indexSelected: null,
      returns: [
        {
          id: 1,
          title: "title",
          amount: 10000,
          images: [
            {
              id: 1,
            },
          ],
        },
      ],
    };
  },
  computed: {
    ...projectMapper.mapState(["myReturns"]),
    ...mapState(["userId"]),
    accountId() {
      return this.userId;
    },
    productId() {
      return this.$route.params.projectId;
    },
  },

  mounted() {
    this.getReturnsByProductId(this.productId);
  },

  methods: {
    ...projectMapper.mapActions(["getReturnsByProductId", "deleteReturn"]),
    showModal(id) {
      this.idSelected = id;
      this.$refs.confirmModal.show();
    },

    showEdit(id) {
      this.$router.push(`return/${id}/edit`);
    },

    showCreate() {
      if (this.readOnly) {
        return false;
      }
      this.$router.push("return/new");
    },

    async onDeleteReturnPlan(id) {
      await this.deleteReturn(id);
      this.$toasted.success("It has been deleted");
      this.getReturnsByProductId(this.productId);
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
