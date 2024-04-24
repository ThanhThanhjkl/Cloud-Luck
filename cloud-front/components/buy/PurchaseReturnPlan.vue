<template>
  <b-container v-if="!loading" class="page-buy" fluid="xl">
    <PurchaseStepList step="form"></PurchaseStepList>
    <PurchaseReturnOption
      :campaign-return-detail="campaignReturnDetail"
      :return-id="returnId"
    ></PurchaseReturnOption>

    <div>
      <PurchaseAmountReturn
        :campaign-return-detail="campaignReturnDetail"
        @input="(value) => (donation.additional = value)"
      ></PurchaseAmountReturn>

      <PurchasePaymentOption />

      <PurchaseAddressOption />
      <section>
        <b-card>
          <div class="transport">備考欄</div>
          <hr class="line" />
          <b-form-textarea
            id="textarea-default"
            v-model="remark"
            rows="8"
            placeholder="プロジェクトオーナーから備考欄入力の指定がある場合はご入力ください"
          ></b-form-textarea
        ></b-card>
      </section>
      <section>
        <b-card
          ><div class="transport">応援コメント</div>
          <hr class="line" />
          <b-form-textarea
            id="textarea-default"
            v-model="comment"
            class="text-dark"
            rows="8"
            placeholder="応援しています！頑張ってください！"
            maxlength="240"
          ></b-form-textarea
        ></b-card>
      </section>
      <section>
        <button class="btn-submit" @click="confirm">確認画面へ</button>
        <p class="sub-submit">
          ※<a href="#">利用規約</a>が適用されます。<br />
          事前にご確認の上、確認画面へを押してください。
        </p>
        <div class="last">
          <p class="note">
            <b-icon icon="exclamation-circle-fill" variant="dark"></b-icon>
            お読みください
          </p>
          <div class="note-content">
            <p>
              応援額とリターンの内容をご確認ください。応援完了後はキャンセルおよび変更ができませんのでご注意ください。
            </p>
            <p>
              募集終了日時の[募集終了日時を表示]までに応援総額が目標金額の100,000円に達しない場合は、プロジェクト不成立となり応援金の決済はされません。また、リターンも発送（履行）されません。
            </p>
            <p>
              CloudFundingはプロジェクトオーナーの能力やプロジェクトの実行を保証するものではありません。プロジェクトの実行やリターンの発送（履行）などは、全てプロジェクトオーナーの責任のもと行われます。<br />
            </p>
            <p>
              応援に関するよくある質問は
              <a href="/contact">こちら</a>
              からご覧いただけます。
            </p>
          </div>
        </div>
      </section>
    </div>
  </b-container>
  <div v-else class="loading">
    <div class="spinner"></div>
  </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";

import PurchaseStepList from "@/components/buy/PurchaseStepList.vue";
import PurchaseReturnOption from "@/components/buy/PurchaseReturnOption.vue";
import PurchasePaymentOption from "@/components/buy/PurchasePaymentOption.vue";
import PurchaseAmountReturn from "@/components/buy/PurchaseAmountReturn.vue";
import PurchaseAddressOption from "@/components/buy/PurchaseAddressOption.vue";
import { createNamespacedHelpers } from "vuex";

const { mapActions } = createNamespacedHelpers("campaign");
const authMapper = createNamespacedHelpers("auth");

export default {
  components: {
    PurchaseStepList,
    PurchaseReturnOption,
    PurchasePaymentOption,
    PurchaseAddressOption,
    PurchaseAmountReturn,
  },

  layout: "default",

  props: {
    campaignReturnDetail: {
      type: Object,
      default: () => {},
    },

    loading: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    ...mapFields("campaign", {
      donation: "donation",
      remark: "donation.remark",
      comment: "donation.comment",
      campaignId: "donation.campaign.id",
      cardType: "donation.cardType",
      cardInfo: "donation.cardInfo",
      arrivalDate: "donation.arrivalDate",
      isNewAddress: "donation.isNewAddress",
      address: "donation.address",
      addressId: "donation.addressId",
      remaining: "donation.remaining",
      supportCount: "donation.supportCount",
    }),

    ...mapFields("global", {
      keepError: "keepError",
    }),

    ...authMapper.mapState(["user"]),

    validateCardInfoRequired() {
      if (
        !this.cardInfo.number ||
        !this.cardInfo.expiredMonth ||
        !this.cardInfo.expiredYear ||
        !this.cardInfo.securityPass
      ) {
        return false;
      } else {
        return true;
      }
    },

    returnId() {
      return this.$route.query.returnId;
    },
  },

  beforeDestroy() {
    this.keepError = false;
  },

  methods: {
    ...mapActions(["setLocalDonation"]),
    confirm() {
      if (this.cardType === "new" && !this.validateCardInfoRequired) {
        this.$toasted.error("情報を入力してください");
        return false;
      }
      this.campaignId = this.$route.params.id;
      this.arrivalDate = this.campaignReturnDetail.arrivalDate;
      this.remaining = this.campaignReturnDetail.stockQuantity;
      this.supportCount = this.campaignReturnDetail.sponsorCount;

      this.$router.push({
        name: "project-id-buy-confirm",
        params: { id: this.campaignId },
      });
    },
  },

  head() {
    return {
      bodyAttrs: {
        class: "bg_buy",
      },
    };
  },
};
</script>
<style lang="scss" scoped>
.card-option {
  @include max-width(md) {
    border-radius: 8px;
  }
}

#textarea-default {
  padding: 15px 18px;
}
.btn-submit {
  @include max-width(md) {
    font-size: 18px;
  }
}
.sub-submit {
  @include max-width(md) {
    font-size: 9px;
    margin-top: 8px;
  }
}
.last {
  margin: 28px 17px 0;
  .note-content {
    p {
      @include max-width(md) {
        font-size: 9px;
      }
    }
  }
}
.submit-area {
  .btn {
    @include max-width(md) {
      width: 90%;
    }
  }
  .btn-sign-up {
    position: relative;
    color: white;
    display: block;
    background-color: #d84646;
    padding: 15px;
  }
}
.loading {
  @include flex-center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba($color: black, $alpha: 0.1);
  z-index: 1100;
  transition: 1s;

  .spinner {
    width: 100px;
    height: 100px;
    border: 15px solid white;
    border-top-color: $primary;
    border-radius: 50%;
    animation: spinner-border 0.75s linear infinite;
  }
}
</style>
