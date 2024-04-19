<template>
  <div class="changeinfo detail">
    <div class="mx-lg-5">
      <div
        v-if="userId"
        id="register-setting-2"
        accordion="register-setting"
        class="shipping-address"
      >
        <b-card>
          <div class="form-title text-center">Shipping Address</div>
          <form @submit.prevent="submitForm">
            <div
              class="text-center"
              @click.prevent="
                $router.push(`/account/${$route.params.id}/address/add`)
              "
            >
              <div class="register-now"><svg-add></svg-add>Register new</div>
            </div>
            <table>
              <thead>
                <tr>
                  <th width="45%">Saved shipping address</th>
                  <th width="25%">edit</th>
                  <th width="25%">delete</th>
                  <th width="5%">standard</th>
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
                      To edit
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      :disabled="unclickable"
                      @click.prevent="showConfirmModal(item)"
                    >
                      <svg-delete></svg-delete>delete
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
            >Update</b-button
          >
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
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
    ...authMapper.mapState(["userId"]),
    ...accountMapper.mapState(["account"]),
    ...mapState(["accountAddress"]),
  },

  mounted() {
    // this.getAccountAddress(this.account.id);
  },

  methods: {
    ...mapActions(["getAccountAddress"]),

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
