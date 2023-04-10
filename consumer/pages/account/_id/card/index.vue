<template>
  <div class="changeinfo detail">
    <AuthRegisterInfo class="mb-4"></AuthRegisterInfo>
    <div class="mx-lg-5">
      <div id="register-setting-2" class="shipping-address">
        <b-card v-if="listCard">
          <div class="form-title text-center">クレジットカード情報</div>
          <form>
            <div class="text-center">
              <nuxt-link
                :to="`/account/${account.id}/card/add`"
                class="register-now"
              >
                <svg-add></svg-add>新しく登録する
              </nuxt-link>
            </div>
            <table>
              <thead>
                <tr>
                  <th width="50%">保存したクレジットカー ド情報</th>
                  <th width="25%">編集</th>
                  <th width="25%">削除</th>
                  <th width="5%">標準</th>
                </tr>
              </thead>
              <tbody v-if="accountCards">
                <tr v-for="card in accountCards" :key="card.id">
                  <td>
                    <div class="font-weight-normal">
                      {{ card.brand.toUpperCase() }}<br />
                      {{ card.number }}<br />
                    </div>
                  </td>
                  <td>
                    <button
                      class="btn-edit"
                      type="button"
                      @click="showEditCard(card)"
                    >
                      編集する
                    </button>
                  </td>

                  <td>
                    <button
                      class="btn-delete"
                      type="button"
                      @click="showConfirmModal(card)"
                    >
                      <svg-delete></svg-delete>削除する
                    </button>
                  </td>
                  <td class="text-center">
                    <b-form-radio
                      v-model="card.isDefault"
                      class="cursor-pointer"
                      name="some-radios"
                      :value="card.isDefault"
                    ></b-form-radio>
                  </td>
                </tr>
              </tbody>
            </table>

            <ConfirmModal
              ref="confirmModal"
              @submit="deleteCard"
            ></ConfirmModal>
          </form>

          <div class="submit-area">
            <b-button type="button" variant="primary" block class="btn-update">
              更新する
            </b-button>
          </div>
        </b-card>
        <CreditCard
          v-else
          :card="cardSelected"
          @back="listCard = true"
        ></CreditCard>
      </div>
    </div>
  </div>
</template>

<script>
import AuthRegisterInfo from "@/components/auth/AuthRegisterInfo";
import SvgAdd from "@/components/common/svg/SvgAdd";
import SvgDelete from "@/components/common/svg/SvgDelete";
import { createNamespacedHelpers } from "vuex";
import CreditCard from "@/components/profile/changeinfo/CreditCard";
import ConfirmModal from "@/components/common/ConfirmModal";

const { mapState, mapActions } = createNamespacedHelpers("account");

export default {
  components: {
    CreditCard,
    ConfirmModal,
    AuthRegisterInfo,
    SvgAdd,
    SvgDelete,
  },

  layout: "auth",

  data() {
    return {
      listCard: true,
      cardSelected: null,
      cardDefault: null,
    };
  },

  computed: {
    ...mapState(["accountCards", "account"]),
  },

  mounted() {
    if (this.account) {
      this.getAccountCards(this.account.id);
    }
  },

  methods: {
    ...mapActions(["getAccountCards", "deleteAccountCard"]),
    showEditCard(cardDetail) {
      this.cardSelected = cardDetail;
      this.listCard = false;
    },

    showConfirmModal(card) {
      this.cardSelected = card;
      this.$refs.confirmModal.show();
    },

    deleteCard() {
      this.deleteAccountCard({
        id: this.account.id,
        cardId: this.cardSelected.id,
      }).then(() => {
        this.$toasted.success("削除しました");
        this.getAccountCards(this.account.id);
        this.cardSelected = null;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
table tbody {
  tr {
    border-bottom: 1px solid #ccc;
  }
}
.btn-update {
  margin-top: 24px;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}
.register-setting-2 {
  form {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    @include max-width(md) {
      width: 100%;
    }
  }
}
</style>
