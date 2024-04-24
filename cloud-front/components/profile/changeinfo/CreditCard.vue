<template>
  <div class="changeinfo">
    <b-card class="new-address">
      <div class="form-title text-center">
        {{ card ? "クレジットカード情報の編集" : "クレジットカード情報の追加" }}
      </div>
      <form>
        <FormValidator class="card-info" label="保有者" text-required>
          <b-input
            v-model="cardHolder"
            type="text"
            placeholder="TARO YAMADA"
          ></b-input>
        </FormValidator>

        <FormValidator
          class="card-info"
          label="クレジットカード番号"
          text-required
        >
          <b-input
            v-model="cardNumber"
            type="text"
            placeholder="例：1234 5678 9012 3456"
            maxlength="16"
          ></b-input>
          <span class="text-muted">
            ※「-」は入力不要です。半角英数字で入力してください。
          </span>
        </FormValidator>

        <FormValidator label="カード有効期限" text-required>
          <div class="d-flex align-items-center mb-2">
            <b-input
              v-model="expireYear"
              class="col-4 col-md-2 mr-1"
              placeholder="ex: 2022"
              required
              maxlength="4"
            />年

            <b-input
              v-model="expireMonth"
              class="col-4 col-md-2 ml-2 mr-1"
              placeholder="ex: 09"
              required
              maxlength="2"
            />月
          </div>
          <span class="text-muted">
            ※「-」は入力不要です。半角英数字で入力してください。
          </span>
        </FormValidator>

        <FormValidator
          class="card-info"
          label="セキュリティコード"
          text-required
        >
          <b-input
            v-model="securityPass"
            class="col-4 col-md-2"
            type="text"
            placeholder="000"
            maxlength="4"
          ></b-input>
          <span class="text-muted">
            ※「-」は入力不要です。半角英数字で入力してください。
          </span>
        </FormValidator>
      </form>

      <div class="submit-area">
        <b-button
          v-if="card"
          type="button"
          variant="outline-primary"
          block
          class="mt-0 btn-submit"
          @click="$emit('back')"
        >
          取消
        </b-button>
        <nuxt-link
          v-else
          :to="`/account/${user.id}/card`"
          class="btn btn-block btn-outline-primary mt-0"
        >
          取消
        </nuxt-link>

        <b-button
          type="button"
          variant="primary"
          class="btn-submit mt-0"
          block
          @click.prevent="onSubmit(card)"
          >{{ card ? "変更する" : "追加する" }}</b-button
        >
      </div>
    </b-card>
  </div>
</template>
<script>
import FormValidator from "@/components/common/FormValidator";
import gmoPgCode from "@/utils/gmoPgCode";
import { createNamespacedHelpers } from "vuex";
const authMapper = createNamespacedHelpers("auth");
export default {
  components: { FormValidator },

  props: {
    card: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      expireYear: "",
      expireMonth: "",
      cardHolder: "",
      cardBrand: "",
      cardNumber: "",
      securityPass: "",
    };
  },

  computed: {
    ...authMapper.mapState(["user"]),

    currentYear() {
      return new Date().getFullYear().toString().slice(0, 2);
    },

    validateRequired() {
      if (
        !this.cardHolder ||
        !this.cardNumber ||
        !this.expireMonth ||
        !this.expireYear ||
        !this.cardNumber ||
        !this.securityPass
      ) {
        return false;
      } else {
        return true;
      }
    },
  },

  mounted() {
    const gmoTest = document.createElement("script");
    gmoTest.setAttribute("src", process.env.gmoPgEnv);
    document.head.appendChild(gmoTest);
    if (this.card) {
      this.cardHolder = this.card.holder;
      this.cardBrand = this.card.brand;
      this.cardNumber = this.card.number;
      this.expireYear = `${this.currentYear}${this.card.expire
        .toString()
        .slice(0, 2)}`;
      this.expireMonth = this.card.expire.toString().slice(2, 4);
    }
  },

  methods: {
    onSubmit(card) {
      if (card) {
        this.update();
      } else {
        this.create();
      }
    },

    update() {
      if (!this.validateRequired) {
        this.$toasted.error("情報を入力してください");
        return false;
      } else {
        const self = this;
        window.Multipayment.init(process.env.gmoPgShopId);
        window.Multipayment.getToken(
          {
            holdername: this.cardHolder,
            cardno: this.cardNumber,
            expire: this.expireYear.slice(2, 4) + this.expireMonth,
            securitycode: this.securityPass,
          },
          async function (response) {
            if (response.resultCode === "000") {
              const params = {
                id: self.user.id,
                cardId: self.card.id,
                body: {
                  token: response.tokenObject.token,
                },
              };
              await self.putAccountCard(params);
              await self.getAccountCards(self.account.id);
              self.$emit("back");
            } else {
              self.clickable = true;
              const error = gmoPgCode.find(
                (item) => item.code === response.resultCode.toString()
              );
              self.$toast.error(`Error: ${error.text}`);
              return false;
            }
          }
        );
      }
    },

    create() {
      if (!this.validateRequired) {
        this.$toasted.error("情報を入力してください");
        return false;
      } else {
        const self = this;
        window.Multipayment.init(process.env.gmoPgShopId);
        window.Multipayment.getToken(
          {
            holdername: this.cardHolder,
            cardno: this.cardNumber,
            expire: this.expireYear.slice(2, 4) + this.expireMonth,
            securitycode: this.securityPass,
          },
          async function (response) {
            if (response.resultCode === "000") {
              const params = {
                id: self.user.id,
                body: {
                  token: response.tokenObject.token,
                },
              };
              await self.postAccountCard(params);
              self.$router.push(`/account/${self.$route.params.id}/card`);
            } else {
              const error = gmoPgCode.find(
                (item) => item.code === response.resultCode.toString()
              );
              window.alert(`Error: ${error.text}`);
            }
          }
        );
      }
    },
  },
};
</script>
