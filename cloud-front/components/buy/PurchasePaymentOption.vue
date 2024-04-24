<template>
  <section class="group-chose">
    <div class="header-tickit d-flex">
      お支払い方法をお選びください
      <div class="notion ml-3">必須</div>
    </div>
    <div class="payment-container">
      <div class="card-container">
        <b-card
          v-for="(item, index) in pays"
          :key="index"
          :class="{ active: paymentMethods === item.PaymentMethods }"
          role="button"
        >
          <div class="box-chose">
            <b-form-group class="col-6">
              <b-form-radio
                v-model="paymentMethods"
                name="payment-select"
                :value="item.PaymentMethods"
              >
                <span v-if="item.text">{{ item.text }}</span>
                <img v-else class="img-fluid" :src="item.image" />
              </b-form-radio>
            </b-form-group>
            <img v-if="item.text" class="img-credit" :src="item.image" />
          </div>

          <div
            v-if="
              paymentMethods === 'クレジットカード' &&
              item.PaymentMethods === 'クレジットカード'
            "
            class="cart-info-container"
          >
            <b-row>
              <b-col>
                <div class="card-options">
                  <div class="existed-card">
                    <b-form-radio
                      v-model="cardType"
                      name="card-select"
                      class="font-14px"
                      value="card"
                    >
                      標準に設定したクレジットカードを使う
                    </b-form-radio>

                    <b-form-select
                      v-if="cardType == 'card'"
                      v-model="cardId"
                      class="mr-0 mr-md-5"
                    >
                      <b-form-select-option
                        v-for="card in accountCards"
                        :key="card.id"
                        :value="card.id"
                      >
                        {{ card.number }}, {{ card.expire | cardDate }}
                      </b-form-select-option>
                    </b-form-select>
                  </div>

                  <FormValidator
                    v-if="cardType == 'card'"
                    class="payment-method"
                  >
                    <label class="d-block">支払方法</label>
                    <b-form-select
                      v-model="paymentMethod"
                      :options="paymentMethodOptions"
                    >
                    </b-form-select>
                  </FormValidator>
                </div>

                <div class="new-card">
                  <b-form-radio
                    v-model="cardType"
                    name="card-select"
                    class="font-14px"
                    value="new"
                  >
                    新しいクレジットカード情報を入力する
                  </b-form-radio>
                  <b-row v-if="cardType === 'new'" class="mt-4">
                    <b-col lg="3">
                      <div class="d-flex align-items-center flex-wrap">
                        <FormValidator
                          class="card-info"
                          label="保有者"
                          text-required
                        >
                          <b-input
                            :value="cardInfo.holder"
                            type="text"
                            placeholder="TARO YAMADA"
                            class="custom-input col-12"
                            @input="(e) => setLocalCardInfo({ holder: e })"
                          ></b-input>
                        </FormValidator>
                      </div>
                    </b-col>
                    <b-col lg="3">
                      <FormValidator
                        class="card-info"
                        label="クレジットカード番号"
                        text-required
                      >
                        <b-input
                          :value="cardInfo.number"
                          type="text"
                          placeholder="例：1234 5678 9012 3456"
                          maxlength="16"
                          class="custom-input col-12"
                          @input="(e) => setLocalCardInfo({ number: e })"
                        ></b-input>
                      </FormValidator>
                    </b-col>
                    <b-col lg="3">
                      <FormValidator label="カード有効期限" text-required>
                        <div class="d-flex align-items-center">
                          <b-input
                            :value="cardInfo.expiredMonth"
                            class="col-6 custom-input"
                            required
                            placeholder="ex: 05"
                            maxlength="2"
                            @input="
                              (e) => setLocalCardInfo({ expiredMonth: e })
                            "
                          />

                          <b-input
                            :value="cardInfo.expiredYear"
                            class="col-6 ml-2 custom-input"
                            required
                            placeholder="ex: 2023"
                            maxlength="4"
                            @input="(e) => setLocalCardInfo({ expiredYear: e })"
                          />
                        </div>
                      </FormValidator>
                    </b-col>

                    <b-col lg="3">
                      <FormValidator label="セキュリティコード" text-required>
                        <b-input
                          :value="cardInfo.securityPass"
                          class="custom-input col-4"
                          type="text"
                          placeholder="000"
                          maxlength="4"
                          @input="(e) => setLocalCardInfo({ securityPass: e })"
                        ></b-input>
                      </FormValidator>
                    </b-col>
                  </b-row>
                </div>
              </b-col>
            </b-row>
          </div>
        </b-card>
      </div>
    </div>
  </section>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
import FormValidator from "@/components/common/FormValidator";
import { mapFields } from "vuex-map-fields";
const { mapActions } = createNamespacedHelpers("campaign");

const globalMapper = createNamespacedHelpers("global");

export default {
  components: { FormValidator },

  data() {
    return {
      activeItem: -1,
      paymentMethods: "クレジットカード",
      pays: [
        {
          id: 1,
          PaymentMethods: "クレジットカード",
          text: "クレジットカード",
          image: require("@/assets/img/visa.png"),
        },
        // {
        //   id: 2,
        //   PaymentMethods: "コンビニ",
        //   text: "コンビニ",
        //   image: require("@/assets/img/convenience.png"),
        // },
        // {
        //   id: 3,
        //   PaymentMethods: "paypay",
        //   text: "",
        //   image: require("@/assets/img/paypay.png"),
        // },
      ],

      paymentMethodOptions: [
        { value: null, text: "選択してください" },
        { value: 1, text: "一括払" },
        { value: 2, text: "分割払" },
        { value: 3, text: "ボーナス一括" },
        { value: 4, text: "リボ" },
      ],
    };
  },

  computed: {
    ...globalMapper.mapState(["keepError"]),

    ...mapFields("campaign", {
      cardType: "donation.cardType",
      cardInfo: "donation.cardInfo",
      cardId: "donation.payment.id",
      paymentMethod: "donation.paymentMethod",
    }),

    accountId() {
      if (this.account) {
        return this.account.id;
      } else {
        return "";
      }
    },
  },

  watch: {
    accountId(value) {
      if (value) {
        this.getAccountCards(this.accountId);
      }
    },

    accountCards(value) {
      if (this.keepError) {
        return false;
      }
      if (!value.length) {
        this.cardType = "new";
      } else {
        const cardPrimary = this.accountCards.find((item) => {
          return item.isDefault;
        });
        this.cardType = "card";
        this.cardId = cardPrimary ? cardPrimary.id : null;
      }
    },
  },

  mounted() {
    if (this.account?.id) {
      this.getAccountCards(this.account.id);
    }
  },

  methods: {
    ...mapActions(["setLocalCardInfo"]),

    checkActive(idx) {
      this.activeItem = idx;
    },

    changePaymentMethods(paymentMethods) {
      this.paymentMethods = paymentMethods;
    },

    onUpdated() {
      this.getAccountCards(this.account.id);
    },
  },
};
</script>
<style lang="scss" scoped>
.group-chose {
  display: grid;
  grid-auto-flow: row;

  .header-tickit {
    font: normal normal bold 16px/20px Noto Sans JP;
    letter-spacing: 0px;
    color: #333333;
    margin-bottom: 16px;
    margin-left: 16px;
    .notion {
      background-color: #d84646;
      font: normal normal bold 10px/20px Noto Sans JP;
      letter-spacing: 0px;
      color: #ffffff;
      border-radius: 2px;
      padding: 4px 8px;
    }
  }
  .card {
    position: relative;
    border-radius: 8px;
    padding: 20px 16px 24px;
    .box-chose {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .img-credit {
        @include max-width(md) {
          max-width: 150px;
        }
      }

      .form-group {
        padding: 0;
        .custom-control {
          font-size: 16px;
          z-index: 0;
          label {
            font-size: 16px;
          }
        }
      }
      button {
        width: 160px;
        background: #466cb0 0% 0% no-repeat padding-box;
        text-align: center;
        font: normal normal bold 10px/20px Noto Sans JP;
        letter-spacing: 0px;
        color: #ffffff;
        padding: 9px 20px;
        border: none;
        border-radius: 5px;
      }
    }
    .form-control {
      padding-bottom: 50px;
      background-color: #eeeeee;
      color: black;
      border: unset;
    }
    .card-header {
      padding: 0;
      border: none;
      background: white;
      margin-bottom: 10px;
    }
    .card-body {
      padding: 0;
      display: grid;
      .form-group {
        margin-bottom: 0;
      }
    }
  }

  .card-container {
    display: grid;
    row-gap: 10px;
    @include max-width(md) {
      font-size: 14px;
    }
    .card {
      @include max-width(md) {
        margin-top: 0px;
      }
    }
  }

  .cart-info-container {
    margin-top: 10px;
    width: 100%;
  }

  .card-options {
    display: flex;
    align-items: self-end;
    gap: 10px;

    @include max-width(md) {
      display: grid;
    }
    .existed-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      width: 75%;

      ::v-deep {
        .custom-control-label {
          white-space: nowrap;
        }
      }

      @include max-width(md) {
        display: grid;
        gap: 10px;
        width: 100%;
      }

      .payment-method {
        .col-form-label {
          color: #333333;
        }

        .custom-select {
          margin-left: 0;
        }
      }
    }
    .custom-select {
      max-width: 230px;
      background-color: #efefef;
      padding: 10px 20px;
      height: auto;
      border-radius: 5px;
      @include max-width(md) {
        width: 100%;
      }
    }
  }

  .new-card {
    display: flex;
    flex-direction: column;
    margin-top: 20px;

    .custom-input {
      background-color: #efefef;
      padding: 10px 20px;
      height: auto;
      border-radius: 5px;
    }
  }
}
</style>
