<template>
  <div class="changeinfo detail">
    <AuthRegisterInfo class="mb-4"></AuthRegisterInfo>
    <div class="mx-lg-5">
      <div
        v-if="user"
        id="register-setting-2"
        accordion="register-setting"
        class="shipping-address"
      >
        <b-card>
          <div class="form-title text-center">登録済み住所</div>
          <form @submit.prevent="submitForm">
            <div
              class="text-center"
              @click.prevent="
                $router.push(`/account/${$route.params.id}/address/add`)
              "
            >
              <div class="register-now"><svg-add></svg-add>新しく登録する</div>
            </div>
            <table>
              <thead>
                <tr>
                  <th width="45%">保存したお届け先住所</th>
                  <th width="25%">編集</th>
                  <th width="25%">削除</th>
                  <th width="5%">標準</th>
                </tr>
              </thead>
              <tbody v-if="accountAddress">
                <tr v-for="(item, index) in accountAddress" :key="index">
                  <td>
                    {{ item.name }}
                    <br />
                    〒{{ item.zipCode }}
                    <br />
                    {{ item.prefecture }}
                    <br />
                    {{ item.city }}-
                    {{ item.street }}
                    <br />
                    (tel:{{ item.phoneNumber }})
                  </td>
                  <td>
                    <button
                      class="btn-edit"
                      type="button"
                      @click.prevent="toEdit(item)"
                    >
                      編集する
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      :disabled="unclickable"
                      @click.prevent="showConfirmModal(item)"
                    >
                      <svg-delete></svg-delete>削除する
                    </button>
                  </td>
                  <td>
                    <b-form-radio
                      v-model="isSelected"
                      :value="item.id"
                      name="some-radios"
                    ></b-form-radio>
                  </td>
                </tr>
              </tbody>
            </table>
            <ConfirmModal
              ref="confirmModal"
              @submit="deleteAddress"
            ></ConfirmModal>
          </form>
          <b-button
            type="button"
            variant="primary"
            class="btn-changeinfo-profile mt-4"
            block
            :disabled="!accountAddress.length || !isSelectedId"
            @click="changeDefaultAddress"
            >更新する</b-button
          >
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import AuthRegisterInfo from "@/components/auth/AuthRegisterInfo";
import SvgAdd from "@/components/common/svg/SvgAdd";
import SvgDelete from "@/components/common/svg/SvgDelete";
import ConfirmModal from "@/components/common/ConfirmModal";

import { createNamespacedHelpers } from "vuex";

const { mapState, mapActions } = createNamespacedHelpers("account/address");
const authMapper = createNamespacedHelpers("auth");
const accountMapper = createNamespacedHelpers("account");
export default {
  components: {
    ConfirmModal,
    AuthRegisterInfo,
    SvgAdd,
    SvgDelete,
  },

  layout: "auth",

  data() {
    return {
      unclickable: false,
      isSelectedId: null,
      addressSelected: null,
    };
  },

  computed: {
    ...authMapper.mapState(["user"]),
    ...accountMapper.mapState(["account"]),
    ...mapState(["accountAddress"]),

    isSelected: {
      get() {
        return this.accountAddress.find((item) => {
          return item.isPrimary ? item.id : null;
        }).id;
      },
      set(value) {
        this.isSelectedId = value;
      },
    },
  },

  mounted() {
    this.getAccountAddress(this.account.id);
  },

  methods: {
    ...mapActions([
      "getAccountAddress",
      "deleteAccountAddress",
      "postChangingDefaultAddress",
    ]),

    addNewAddress() {
      this.allAddress = false;
    },

    async deleteAddress() {
      this.unclickable = true;
      const accountId = this.account.id;
      await this.deleteAccountAddress({
        accountId,
        addressId: this.addressSelected.id,
      });
      this.getAccountAddress(this.account.id);
      this.unclickable = false;
      this.$toast.success("削除しました");
    },

    toEdit(address) {
      this.$router.push({
        name: `account-id-address-addressId`,
        params: { id: this.account.id, addressId: address.id, address },
      });
    },

    async changeDefaultAddress() {
      if (this.isSelectedId) {
        const accountId = this.account.id;
        await this.postChangingDefaultAddress({
          accountId,
          addressId: this.isSelectedId,
        });
        this.$toast.success("成功");
      }
    },

    showConfirmModal(address) {
      this.addressSelected = address;
      this.$refs.confirmModal.show();
    },
  },
};
</script>
