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
          <div class="form-title text-center">Địa chỉ nhận hàng</div>
          <form @submit.prevent="submitForm">
            <div
              class="text-center"
              @click.prevent="
                $router.push(`/account/${$route.params.id}/address/add`)
              "
            >
              <div class="register-now"><svg-add></svg-add>Thêm mới</div>
            </div>
            <table>
              <thead>
                <tr>
                  <th width="45%">Địa chỉ đã lưu</th>
                  <th width="25%">Sửa</th>
                  <th width="25%">Xóa</th>
                  <th width="5%">Mặc định</th>
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
                    (SĐT: {{ item.phone }})
                  </td>
                  <td>
                    <button
                      class="btn-edit"
                      type="button"
                      @click.prevent="toEdit(item.id)"
                    >
                      Chỉnh sửa
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      :disabled="item.defaultSelect === 'true'"
                      @click.prevent="showConfirmModal(item)"
                    >
                      <svg-delete></svg-delete>Xóa
                    </button>
                  </td>
                  <td>
                    <b-form-checkbox
                      :checked="isChecked(item)"
                      name="check-button"
                      switch
                      @change="onChangeDefaultAddress(item.id)"
                    />
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
            @click="submitUpdatedDefaultAddress"
            >Cập nhật</b-button
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

  computed: {
    ...mapState(["userId", "accountAddress"]),

    accountId() {
      return this.userId;
    },
    isChecked() {
      return (item) => item.defaultSelect;
    },
  },

  mounted() {
    this.getAddressByAccountId(this.userId);
    this.address = this.accountAddress;
  },

  methods: {
    ...mapActions([
      "getAddressByAccountId",
      "deleteAccountAddress",
      "updateDefaultAddress",
      "changedDefaultAddress",
    ]),

    async deleteAddress() {
      await this.deleteAccountAddress(this.addressSelected.id).then((res) => {
        this.getAddressByAccountId(this.userId);
        this.$toast.success("Xóa thành công");
      });
    },

    toEdit(id) {
      this.$router.push(`/account/${this.accountId}/address/${id}`);
    },

    async submitUpdatedDefaultAddress() {
      const address = this.accountAddress.find(
        (item) => item.defaultSelect === "true"
      );
      const params = {
        accountId: this.accountId,
        id: address.id,
      };
      await this.updateDefaultAddress(params).then((res) => {
        this.$toast.success(res);
      });
    },

    showConfirmModal(address) {
      this.addressSelected = address;
      this.$refs.confirmModal.show();
    },

    onChangeDefaultAddress(addressId) {
      this.changedDefaultAddress(addressId);
    },
  },
};
</script>
