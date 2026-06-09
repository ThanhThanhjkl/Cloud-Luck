<template>
  <div class="changeinfo">
    <b-card
      :class="{ addAddressOnBuy: $route.name == 'id-buy' }"
      class="new-address"
    >
      <div class="form-title text-center">
        {{ address ? "Chỉnh sửa địa chỉ" : "Địa chỉ nhận hàng" }}
      </div>
      <form>
        <FormValidator label="Họ và tên" text-required>
          <b-input
            v-model="name"
            type="text"
            placeholder="Nhập họ và tên"
            text-required
          ></b-input>
        </FormValidator>

        <FormValidator
          class="col-md-5 col-12 p-0"
          label="Mã bưu điện"
          text-required
        >
          <b-input
            v-model="postCode"
            placeholder="000000"
            text-required
          ></b-input>
          <div class="pass-note">
            ※Không cần nhập dấu "-". Vui lòng nhập bằng số.
          </div>
        </FormValidator>

        <FormValidator
          class="col-md-5 col-12 p-0"
          label="Tỉnh/Thành phố"
          text-required
        >
          <b-form-select
            v-model="prefectures"
            class="form-control"
            :options="prefOptions"
          >
            <template #first>
              <b-form-select-option :value="null" disabled>
                Chọn
              </b-form-select-option>
            </template>
          </b-form-select>
        </FormValidator>

        <FormValidator label="Quận/Huyện" text-required>
          <b-input
            v-model="district"
            type="text"
            placeholder="(Ví dụ) Cầu Giấy"
            required
          ></b-input>
        </FormValidator>

        <FormValidator label="Địa chỉ chi tiết" text-required>
          <b-input
            v-model="street"
            type="text"
            placeholder="(Ví dụ) Số 1, Ngõ 16, Đường ABC"
            text-required
          ></b-input>
        </FormValidator>

        <FormValidator label="Số điện thoại" text-required>
          <b-input
            v-model="phone"
            type="text"
            placeholder="Vui lòng nhập số điện thoại"
            text-required
          ></b-input>
        </FormValidator>
      </form>

      <div class="submit-area mt-4">
        <b-button
          v-if="!hideCreateAddress"
          type="button"
          variant="primary"
          block
          @click.prevent="submit"
        >
          {{ address ? "Cập nhật" : "Tạo mới" }}
        </b-button>
      </div>
    </b-card>
  </div>
</template>
<script>
import FormValidator from "@/components/common/FormValidator";

export default {
  components: {
    FormValidator,
  },

  props: {
    address: {
      type: Object,
      default: () => {},
    },
    hideCreateAddress: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      name: "",
      postCode: "",
      prefectures: null,
      district: "",
      street: "",
      phone: "",
      prefOptions: ["Ha Noi", "Hai Duong", "Ha Nam"],
    };
  },

  mounted() {
    if (this.address) {
      this.name = this.address.name;
      this.postCode = this.address.postCode;
      this.prefectures = this.address.prefectures;
      this.district = this.address.district;
      this.street = this.address.street;
      this.phone = this.address.phone;
    }
  },

  methods: {
    submit() {
      const params = {
        name: this.name,
        postCode: this.postCode,
        prefectures: this.prefectures,
        district: this.district,
        street: this.street,
        phone: this.phone,
      };
      this.$emit("submit", params);
    },
  },
};
</script>
<style lang="scss" scoped></style>
