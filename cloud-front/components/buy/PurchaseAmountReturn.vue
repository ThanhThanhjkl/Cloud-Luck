<template>
  <div class="amount-support">
    <div class="header-tickit">応援金額</div>
    <section>
      <b-card>
        <b-row>
          <b-col lg="6" sm="12" class="head-change">
            <div class="money-back">リターン合計金額</div>
            <div v-if="selectedReturnId" class="change">
              {{ amount | japanMoney }}
            </div>
          </b-col>
          <b-col lg="6" sm="12">
            <div class="hold-back text-center m-0">
              <p>上乗せ応援で応援しよう</p>
            </div>
            <div class="up-down">
              <div class="down cursor-pointer" @click="down">
                <span>-</span>
              </div>
              <input
                v-model.number="additional"
                type="text"
                placeholder="¥"
                class="text-right"
                value="0"
                @input="$emit('input', additional)"
              />
              <div class="up cursor-pointer" @click="up">
                <span>+</span>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-card>
    </section>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
import { mapFields } from "vuex-map-fields";

const { mapState } = createNamespacedHelpers("consumer");

export default {
  layout: "default",

  props: {
    status: {
      type: Boolean,
      default: () => false,
    },

    campaignReturnDetail: {
      type: Object,
      default: () => {},
    },
  },

  computed: {
    ...mapState(["donation"]),
    ...mapFields("campaign", {
      donation: "donation",
      additional: "donation.additional",
      selectedReturnId: "donation.campaign.return.id",
      quantity: "donation.campaign.return.count",
    }),

    amount() {
      const subtotal = this.campaignReturnDetail.amount * this.quantity;
      if (this.additional < 0) {
        return subtotal;
      }
      if (this.additional) {
        return subtotal + this.additional;
      } else return subtotal;
    },
  },

  methods: {
    down() {
      if (this.additional === 0 || !this.additional || this.additional < 0)
        return;
      const count = 500;
      this.additional = this.additional - count;
    },
    up() {
      const count = 500;
      this.additional = this.additional + count;
    },
  },
};
</script>
<style lang="scss" scoped>
.up-down {
  input {
    &::placeholder {
      font-weight: bold;
      font-size: 24px;
    }
  }
}
</style>
