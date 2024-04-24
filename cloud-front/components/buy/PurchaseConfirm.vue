<template>
  <b-container class="page-buyconfirm" fluid="xl">
    <PurchaseStepList step="confirm"></PurchaseStepList>
    <section class="buy-confirm">
      <b-card class="top-head">
        <div class="head-confirm">
          <p>決済金額</p>
        </div>
        <div class="about-confirm purchase-price">
          <p class="font-weight-bold">
            合計：{{ donation.quotation.support | japanMoney }}
          </p>
        </div>
      </b-card>
      <b-card>
        <div class="head-confirm">
          <p>リターン内容</p>
        </div>
        <div class="about-confirm">
          <div
            v-for="(item, index) in campaignReturns"
            :key="index"
            class="result-content"
          >
            <div class="result-header">
              <div class="return-image">
                <img class="w-100" :src="imageSource(item.images[0].id)" />
              </div>
              <div class="product-item">
                <p class="text-danger font-weight-bold">
                  数量:
                  <span>{{ donation.campaign.return.count }} </span>
                </p>
                <div>{{ donation.amount }}</div>
                <p>
                  お届け予定:
                  <span>{{ item.scheduledDeliveryDate | japanDate }} </span>
                </p>
              </div>
            </div>
            <div>
              <div class="result-body">
                <div v-if="returnOptions.length" class="return-options">
                  <strong>オプション:</strong>
                  <span>
                    <p
                      v-for="(opt, itemIndex) in returnOptions"
                      :key="itemIndex"
                    >
                      {{ `${opt.field} - ${opt.value}` }}
                    </p>
                  </span>
                </div>

                <p>
                  <strong>内容:</strong>
                  {{ item.body }}
                  <!-- <a href="">もっと見る</a> -->
                </p>
              </div>
            </div>
          </div>
        </div>
      </b-card>

      <b-card>
        <div class="head-confirm">
          <p>備考欄</p>
          <p>（非公開）</p>
        </div>
        <div class="about-confirm">
          <p>{{ donation.remark }}</p>
        </div>
      </b-card>

      <b-card>
        <div class="head-confirm">
          <p>コメント</p>
          <p>（公開）</p>
        </div>
        <div class="about-confirm">
          <p>{{ donation.comment }}</p>
        </div>
      </b-card>

      <b-card>
        <div class="head-confirm">
          <p>お支払い方法</p>
        </div>
        <div class="about-confirm">
          <p>クレジットカード払い</p>
          <p v-if="defaultCard">
            {{ defaultCard.brand ? defaultCard.brand.toUpperCase() : "" }}
            {{ defaultCard.number }}
          </p>
        </div>
      </b-card>

      <b-card class="bottom-page">
        <div class="head-confirm">
          <p>お届け先情報</p>
        </div>
        <div
          v-if="donation.address && donation.address.zipCode"
          class="about-confirm"
        >
          <p>〒{{ donation.address.zipCode }}</p>
          <p>
            {{ donation.address.prefecture }}{{ donation.address.city
            }}{{ donation.address.street }}
          </p>
          <p>（tel:{{ donation.address.phoneNumber }}）</p>
          <p>{{ donation.address.name }}</p>
        </div>

        <div v-else-if="defaultAddress" class="about-confirm">
          <p>〒{{ defaultAddress.zipCode }}</p>
          <p>
            {{ defaultAddress.prefecture }}{{ defaultAddress.city
            }}{{ defaultAddress.street }}
          </p>
          <p>（tel:{{ defaultAddress.phoneNumber }}）</p>
          <p>{{ defaultAddress.name }}</p>
        </div>
      </b-card>
      <div class="btn-confirm">
        <button class="submit" @click="onDonate">完了</button>
        <button class="unsubmit" @click="back">戻る</button>
      </div>
      <li
        v-for="(item, index) in notes"
        :key="'note' + index"
        class="notes d-block d-md-none"
      >
        <span>{{ item.note }}</span>
      </li>
    </section>
  </b-container>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
import _ from "lodash";
import { mapFields } from "vuex-map-fields";
import gmoPgCode from "@/utils/gmoPgCode";
import PurchaseStepList from "~/components/buy/PurchaseStepList.vue";

const { mapActions } = createNamespacedHelpers("campaign");
export default {
  layout: "default",

  components: {
    PurchaseStepList,
  },

  props: {
    donation: {
      type: Object,
      default: () => {},
    },
    campaignReturnDetail: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      notes: [
        {
          id: 1,
          note: "このプロジェクトの終了日は2022-07-31です。終了日を過ぎると応援ができなくなります。",
        },
        {
          id: 2,
          note: "リターンに限定数が設定されている場合、限定数に達した時点でそのリターンは選択できなくなります。",
        },
        {
          id: 3,
          note: " 応援完了後はキャンセルおよび変更ができません。内容をよくご確認いただいた上で「完了」ボタンをおしてください。",
        },
        {
          id: 4,
          note: "決済金額の引き落とし日に関しては、ご利用の決済会社の締日をご確認ください。",
        },
      ],
      campaignReturns: [],
    };
  },

  computed: {
    ...mapFields("campaign", {
      cardType: "donation.cardType",
      cardInfo: "donation.cardInfo",
      token: "donation.payment.token",
      selectedReturnId: "donation.campaign.id",
    }),
    ...mapFields("global", {
      keepError: "keepError",
    }),

    defaultCard() {
      if (this.cardType === "card") {
        return this.accountCards.find((item) => item.isDefault);
      } else {
        return { number: ` *************${this.cardInfo.number.slice(13)}` };
      }
    },
    defaultAddress() {
      return this.accountAddress.find((item) => item.isPrimary);
    },

    returnOptions() {
      const listOptionsReturn = this.campaignReturns[0]?.options;
      if (listOptionsReturn && listOptionsReturn.length) {
        const selectedOptions = this.donation.campaign.return.options;

        const output = selectedOptions.map((obj) => {
          const { id } = obj;
          const { title, items } = listOptionsReturn.find((o) => o.id === id);
          const { name } = items.find((i) => i.id === obj.item.id);
          return { field: title, value: name };
        });

        return output;
      } else return [];
    },
  },

  mounted() {
    const gmoTest = document.createElement("script");
    gmoTest.setAttribute("src", process.env.gmoPgEnv);
    document.head.appendChild(gmoTest);

    this.getQuotation(this.donation);
    this.getDonationCampaignReturn();
  },

  methods: {
    ...mapActions([
      "postDonation",
      "resetLocalDonation",
      "getQuotation",
      "getCampaignReturnDetail",
    ]),

    async getDonationCampaignReturn() {
      if (this.donation) {
        const params = {
          id: this.donation.campaign.id,
          returnId: this.donation.campaign.return.id,
        };

        const res = await this.getCampaignReturnDetail(params);
        this.campaignReturns.push(res);
      } else {
        return null;
      }
    },

    async donateWithNewCard() {
      const self = this;
      await window.Multipayment.init(process.env.gmoPgShopId);
      await window.Multipayment.getToken(
        {
          cardno: this.cardInfo.number,
          expire:
            this.cardInfo.expiredYear.slice(2, 4) + this.cardInfo.expiredMonth,
          securitycode: this.cardInfo.securityPass,
        },
        async function (response) {
          if (response.resultCode === "000") {
            self.token = await response.tokenObject.token;
            self.donate();
          } else {
            const error = gmoPgCode.find(
              (item) => item.code === response.resultCode.toString()
            );
            window.alert(`Error: ${error.text}`);
            self.$router.go(-1);
          }
        }
      );
      return self.token;
    },

    changeSelect(type) {
      if (!this.isActive) {
        this.isActive = type;
      } else {
        this.isActive = "";
      }
    },

    onDonate() {
      if (this.cardType === "new") {
        this.donateWithNewCard();
      } else {
        this.donate();
      }
    },

    async donate() {
      const params = {
        id: this.donation.campaign?.return.id,
        body: _.pick(this.donation, [
          "campaign",
          "payment",
          "comment",
          "remark",
          "additional",
          "address",
          "addressId",
          "isNewAddress",
          "wantToAddListAddress",
        ]),
      };

      try {
        await this.postDonation(params);
        this.resetLocalDonation();
        this.keepError = false;
        this.$router.push({
          name: "project-id-buy-complete",
          params: {
            donation: this.donation,
            id: this.$route.params.id,
            title: this.campaignReturns[0].title,
          },
        });
        this.$toasted.success("成功");
      } catch (e) {
        this.keepError = true;
        this.$router.go(-1);
      }
    },

    back() {
      this.$router.push({
        name: `project-id-buy`,
        query: { returnId: this.donation.campaign.return.id },
        params: { donation: this.donation, id: this.donation.campaign.id },
      });
    },

    imageSource(id) {
      return `${process.env.consumerApiUrl}/file/${id}`;
    },
  },
};
</script>
<style lang="scss" scoped>
.buy-confirm {
  .top-head {
    @include min-width(md) {
      .head-confirm {
        margin-top: 44px;
      }
    }
  }
  .bottom-page {
    .about-confirm {
      @include min-width(md) {
        margin-bottom: 44px;
      }
    }
  }
}
.result-header {
  display: grid;
  grid-template-columns: 60% 40%;

  @include max-width(md) {
    grid-template-columns: auto;
    gap: 10px;
  }

  .return-image {
    width: 70%;
    margin-right: 93px;
    height: 100%;

    @include max-width(md) {
      width: 100%;
      margin-right: 0px;
    }
  }

  img {
    aspect-ratio: 16/9;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.result-body {
  margin-top: 10px;
  width: 60%;
  line-height: 25px;

  @include max-width(md) {
    width: 100%;
  }
  .return-options {
    display: grid;
    grid-template-columns: 75px auto;
    font-size: 13px;
  }
}
</style>
