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
                    〒{{ item.postCode }}
                    <br />
                    {{ item.prefectures }}
                    <br />
                    {{ item.street }}-
                    {{ item.district }}
                    <br />
                    (tel: {{ item.phone }})
                  </td>
                  <td>
                    <button
                      class="btn-edit"
                      type="button"
                      @click.prevent="toEdit(item.id)"
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
                      v-model="item.defaultSelect"
                      :value="item.defaultSelect"
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
const { mapState, mapActions } = createNamespacedHelpers("auth");
export default {
  layout: "auth",

  components: {
    ConfirmModal,
    SvgAdd,
    SvgDelete,
  },

  data() {
    return {
      unclickable: false,
      isSelectedId: null,
      addressSelected: null,
    };
  },

  computed: {
    ...mapState(["userId", "accountAddress"]),

    accountId() {
      return this.userId;
    },
  },

  mounted() {
    this.getAddressByAccountId(this.userId);
  },

  methods: {
    ...mapActions(["getAddressByAccountId", "deleteAccountAddress"]),

    async deleteAddress() {
      this.unclickable = true;
      await this.deleteAccountAddress(this.addressSelected.id);
      this.getAccountAddress(this.account.id);
      this.unclickable = false;
      this.$toast.success("削除しました");
    },

    toEdit(id) {
      this.$router.push(`/account/${this.accountId}/address/${id}`);
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
