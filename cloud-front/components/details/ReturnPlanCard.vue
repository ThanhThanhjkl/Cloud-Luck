<template>
  <div>
    <div v-for="returnPlan in myReturns" :key="returnPlan.id">
      <b-card class="return-plan-card position-relative">
        <template #header>
          <b-carousel controls>
            <b-carousel-slide>
              <template #img>
                <img class="w-100" :src="returnPlan.image" />
              </template>
            </b-carousel-slide>
          </b-carousel>
        </template>
        <h4>{{ returnPlan.title }}</h4>
        <div class="row no-gutters align-items-center">
          <div class="price">
            {{ returnPlan.cost | japanMoney }}
          </div>
        </div>

        <div class="px-3 text-center">
          <a
            class="w-100 btn btn-crimson"
            @click="choseReturnPlan(returnPlan.id)"
          >
            MUA
          </a>
        </div>

        <div class="card-text" v-html="returnPlan.descriptions"></div>
      </b-card>
    </div>
    <b-modal
      v-model="showConfirmModal"
      size="xl"
      title="Xác nhận mua dự án"
      ok-title="Mua"
      cancel-title="Hủy"
      ok-variant="danger"
      @ok="submitBuy"
    >
      <p>Bạn có chắc chắn muốn mua dự án này?</p></b-modal
    >

    <b-modal
      v-model="showModalNeedAddress"
      size="xl"
      title="Tài khoản chưa có địa chỉ!"
      ok-title="Thêm địa chỉ mới"
      cancel-title="Hủy"
      ok-variant="danger"
      @ok="submitToAddNewAddress"
    >
      <p>Bạn cần thêm địa chỉ giao hàng trước khi mua.</p></b-modal
    >
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("home");
const authMapper = createNamespacedHelpers("auth");
export default {
  props: {
    myReturns: {
      type: Array,
      default: () => [],
    },
    accountId: {
      type: String,
      default: "",
    },
    ownerId: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      showConfirmModal: false,
      showModalNeedAddress: false,
      idSelected: 0,
    };
  },

  computed: {
    ...authMapper.mapState(["accountAddress"]),
    campaignId() {
      return this.$route.params.id;
    },
  },

  mounted() {
    this.getAddressByAccountId(this.accountId);
  },

  methods: {
    ...mapActions(["createFunded"]),
    ...authMapper.mapActions(["getAddressByAccountId"]),
    choseReturnPlan(id) {
      if (this.accountAddress.length > 0) {
        this.showConfirmModal = true;
        this.showModalNeedAddress = false;
      } else {
        this.showModalNeedAddress = true;
        this.showConfirmModal = false;
      }

      this.idSelected = id;
    },
    submitBuy() {
      const params = {
        id: 0,
        account_id: Number(this.accountId),
        return_id: this.idSelected,
        owner_id: Number(this.ownerId),
      };
      this.createFunded(params).then(() => {
        this.$router.push({
          path: `/account/${this.accountId}/donation`,
          query: { returnId: this.idSelected },
        });
      });
    },

    submitToAddNewAddress() {
      this.$router.push({
        path: `/account/${this.accountId}/address`,
      });
    },
  },
};
</script>
<style lang="scss" scoped></style>
