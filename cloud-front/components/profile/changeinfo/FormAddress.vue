<template>
  <div class="changeinfo">
    <b-card
      :class="{ addAddressOnBuy: $route.name == 'id-buy' }"
      class="new-address"
    >
      <div class="form-title text-center">
        {{ address ? "Edit delivery address" : "Shipping Address" }}
      </div>
      <form>
        <FormValidator label="Full Name" text-required>
          <b-input
            v-model="name"
            type="text"
            placeholder="First and last name"
            text-required
          ></b-input>
        </FormValidator>

        <FormValidator
          class="col-md-5 col-12 p-0"
          label="Post Code"
          text-required
        >
          <b-input
            v-model="postCode"
            placeholder="000000"
            text-required
          ></b-input>
          <div class="pass-note">
            ※"-" does not need to be entered. Please enter in half-width
            alphanumeric characters.
          </div>
        </FormValidator>

        <FormValidator
          class="col-md-5 col-12 p-0"
          label="Prefectures"
          text-required
        >
          <b-form-select
            v-model="prefectures"
            class="form-control"
            :options="prefOptions"
          >
            <template #first>
              <b-form-select-option :value="null" disabled>
                choice
              </b-form-select-option>
            </template>
          </b-form-select>
        </FormValidator>

        <FormValidator label="District" text-required>
          <b-input
            v-model="district"
            type="text"
            placeholder="(Example) Cau Giay"
            required
          ></b-input>
        </FormValidator>

        <FormValidator label="address building name" text-required>
          <b-input
            v-model="street"
            type="text"
            placeholder="(Example) 1-16-6 Kobunsha Building 9F"
            text-required
          ></b-input>
        </FormValidator>

        <FormValidator label="telephone number" text-required>
          <b-input
            v-model="phone"
            type="text"
            placeholder="Please enter your phone number"
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
          {{ address ? "Update" : "Create" }}
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
