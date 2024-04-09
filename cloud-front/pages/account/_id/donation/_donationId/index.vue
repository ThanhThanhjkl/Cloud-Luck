<template>
  <div class="detail">
    <div class="mx-lg-5">
      <div
        v-if="user"
        id="register-setting-4"
        accordion="register-setting"
        class="purchase_details"
      >
        <b-card class="card-projetc-detail">
          <div class="details-title text-center">応援履歴詳細</div>

          <hr class="d-none d-md-block" />

          <div class="form">
            <div class="product-info product-detail">
              <div v-if="campaign" class="d-flex">
                <div class="product-img">
                  <b-img
                    v-if="campaignImage"
                    :src="campaignImage"
                    class="w-100"
                  />
                </div>
                <div class="product-title">
                  <p v-if="campaign.detail">
                    {{ campaign.detail.title }}
                  </p>

                  <div class="product-item text-dark">
                    <p>
                      応援ID: <span>{{ currentDonation.id }}</span>
                    </p>
                    <p>
                      注文日：
                      <span>{{ currentDonation.createdAt | japanDate }} </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="currentDonation" class="result result-value">
            <div class="result-title">リターン内容</div>
            <div v-if="campaignReturns.length">
              <div
                v-for="(item, index) in campaignReturns"
                :key="index"
                class="result-content container"
              >
                <div class="result-header">
                  <div class="return-image">
                    <img class="w-100" :src="imageSource(item.images[0].id)" />
                  </div>
                  <div class="product-item">
                    <p>
                      お届け予定:
                      <span>{{ item.arrivalDate | japanDate }} </span>
                    </p>
                  </div>
                </div>
                <div>
                  <div class="result-body">
                    <p>
                      {{ item.body }}
                      <!-- <a href="">もっと見る</a> -->
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="currentDonation" class="result result-value">
            <div class="result-title">決済金額</div>
            <div class="result-content container">
              <div class="result-header-1 justify-content-between">
                <div class="product-item">
                  <p>応援金額<span>500円</span></p>
                  <p>上乗せ応援金額: <span>0円</span></p>
                  <p>
                    システム利用料: <span>{{ 220 | japanMoney }}（税込）</span>
                  </p>
                  <div class="d-flex justify-content-between">
                    <strong>
                      <p>合計：{{ currentDonation.amount | japanMoney }}</p>
                    </strong>
                    <a class="text-primary float-right"
                      >システム利用料について
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="result result-value">
            <div class="result-title">お支払い方法</div>
            <div class="result-content container">
              <div class="result-header-2">
                <div>
                  <p>クレジットカード払い</p>
                  <div v-if="currentDonation && currentDonation.transaction">
                    <div class="d-flex justify-content-between">
                      <div class="d-flex flex-column">
                        <span>{{ currentDonation.transaction.brand }}</span>
                        <span>{{ currentDonation.transaction.cardNo }}</span>
                      </div>
                      <!-- <div class="d-flex flex-column text-right">
                        <span>000000</span>
                        <span>0000000000</span>
                        <span>2022/07/05 23:59:59</span>
                      </div> -->
                    </div>
                  </div>
                </div>
                <!-- <div class="d-flex flex-column">
                  <span>お支払いステータス </span>
                  <span>お支払い待ち </span>
                  <span class="text-danger"
                    >※お支払いが完了しておりません。
                    お支払い期限内でのお支払いが確認できなかった場合、
                    ご応援は自動的にキャンセルとなり、
                    以後ご利用に制限をかけさせていただくこともござますのでご注意ください。
                  </span>
                </div> -->
              </div>
            </div>
          </div>

          <div class="result result-value">
            <div class="result-title">お届け先情報</div>
            <div class="result-content container">
              <div class="result-header justify-content-between">
                <div
                  v-if="currentDonation && currentDonation.address"
                  class="product-item"
                >
                  <p>〒{{ currentDonation.address.zipCode }}</p>
                  <p>{{ currentDonation.address.prefecture }}</p>
                  <p>（tel:{{ currentDonation.address.phoneNumber }}）</p>
                  <p>{{ currentDonation.address.street }}</p>
                </div>
              </div>
            </div>
          </div>

          <div
            v-if="currentDonation && currentDonation.remark"
            class="result result-value"
          >
            <div class="result-title">備考欄</div>
            <div class="result-content container">
              {{ currentDonation.remark }}
            </div>
          </div>

          <div
            v-if="currentDonation && currentDonation.comment"
            class="result result-value"
          >
            <div class="result-title">コメント</div>
            <div class="result-content container">
              {{ currentDonation.comment }}
            </div>
          </div>
        </b-card>

        <div class="submit-area mt-4 text-center">
          <nuxt-link :to="`/account/${user.id}/donation`" class="btn btn-fall">
            戻る
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import _ from "lodash";
const { mapState, mapActions } = createNamespacedHelpers("campaign");
const authMapper = createNamespacedHelpers("auth");

export default {
  layout: "auth",

  data() {
    return {
      campaign: null,
      campaignReturns: [],
    };
  },

  computed: {
    ...authMapper.mapState(["user"]),
    ...mapState(["donations"]),

    donationId() {
      return this.$route.params.donationId;
    },

    currentDonation() {
      return this.donations.find((item) => item.id === this.donationId);
    },

    campaignImage() {
      if (this.campaign) {
        const imageId = _.get(this.campaign, "visual.mainImage.id");
        return `${process.env.consumerApiUrl}/file/${imageId}`;
      } else {
        return null;
      }
    },
  },

  watch: {
    currentDonation(value) {
      if (value) {
        this.getDonationCampaign();
        // TODO
        this.getDonationCampaignReturn();
      }
    },
  },

  mounted() {
    this.getDonations();
  },

  methods: {
    ...mapActions([
      "getDonations",
      "getCampaignDetail",
      "getCampaignReturnDetail",
    ]),

    async getDonationCampaign() {
      if (this.currentDonation) {
        const res = await this.getCampaignDetail(
          this.currentDonation?.campaign.id
        );
        this.campaign = res;
        return res;
      } else {
        return null;
      }
    },

    getDonationCampaignReturn() {
      if (this.currentDonation) {
        this.currentDonation.returns.forEach(async (item, index) => {
          const params = {
            id: this.currentDonation.campaign.id,
            returnId: this.currentDonation.returns[index].id,
          };

          const res = await this.getCampaignReturnDetail(params);
          this.campaignReturns.push(res);
        });
      } else {
        return null;
      }
    },

    imageSource(id) {
      return `${process.env.consumerApiUrl}/file/${id}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.purchase_details {
  .card-body {
    .form {
      width: 90%;
      margin-left: auto;
      margin-right: auto;
      @include max-width(md) {
        width: 100%;
      }
    }
  }
}
</style>
