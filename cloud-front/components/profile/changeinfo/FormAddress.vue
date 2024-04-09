<template>
  <div class="changeinfo">
    <b-card
      :class="{ addAddressOnBuy: $route.name == 'id-buy' }"
      class="new-address"
    >
      <div class="form-title text-center">
        {{ address ? "お届け先の住所編集" : "お届け先の住所" }}
      </div>
      <form>
        <FormValidator :name="`${prefix}.address`"></FormValidator>
        <FormValidator label="氏名" :name="`${prefix}.name`" text-required>
          <b-input
            v-model="addressMapper.name"
            type="text"
            placeholder="姓名"
            text-required
            @input="(e) => setLocalAdrressState({ name: e })"
          ></b-input>
        </FormValidator>

        <FormValidator
          class="col-md-5 col-12 p-0"
          label="郵便番号"
          :name="`${prefix}.zipCode`"
          text-required
        >
          <b-input
            v-model="addressMapper.zipCode"
            placeholder="000000"
            text-required
            @input="(e) => setLocalAdrressState({ zipCode: e })"
          ></b-input>
          <div class="pass-note">
            ※「-」は入力不要です。半角英数字で入力してください。
          </div>
        </FormValidator>

        <FormValidator
          class="col-md-5 col-12 p-0"
          label="都道府県"
          :name="`${prefix}.prefecture`"
          text-required
        >
          <b-form-select
            v-model="addressMapper.prefecture"
            class="form-control"
            :options="prefOptions"
            @input="(e) => setLocalAdrressState({ prefecture: e })"
          >
            <template #first>
              <b-form-select-option :value="null" disabled>
                選択
              </b-form-select-option>
            </template>
          </b-form-select>
        </FormValidator>

        <FormValidator label="市区町村" :name="`${prefix}.city`" text-required>
          <b-input
            v-model="addressMapper.city"
            type="text"
            placeholder="例）文京区音羽"
            required
            @input="(e) => setLocalAdrressState({ city: e })"
          ></b-input>
        </FormValidator>

        <FormValidator
          label="番地  建物名"
          :name="`${prefix}.street`"
          text-required
        >
          <b-input
            v-model="addressMapper.street"
            type="text"
            placeholder="例）1-16-6光文社ビル9F"
            text-required
            @input="(e) => setLocalAdrressState({ street: e })"
          ></b-input>
        </FormValidator>

        <FormValidator
          label="電話番号"
          :name="`${prefix}.phoneNumber`"
          text-required
        >
          <b-input
            v-model="addressMapper.phoneNumber"
            type="text"
            placeholder="電話番号を入力してください"
            text-required
            @input="(e) => setLocalAdrressState({ phoneNumber: e })"
          ></b-input>
        </FormValidator>
      </form>

      <div class="submit-area mt-4">
        <!-- <nuxt-link
          to="/account/1/address/"
          class="btn btn-block btn-outline-primary mt-0"
        >
          取消
        </nuxt-link> -->

        <b-button
          v-if="!hideCreateAddress"
          type="button"
          variant="primary"
          block
          @click.prevent="submit"
        >
          {{ address ? "更新する" : "追加する" }}
        </b-button>
      </div>
    </b-card>
  </div>
</template>
<script>
import { prefectureNames } from "jp-prefectures";
import FormValidator from "@/components/common/FormValidator";
import { cloneDeep } from "lodash";
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("campaign");

export default {
  components: {
    FormValidator,
  },

  props: {
    address: {
      type: Object,
      default: () => {},
    },
    prefix: {
      type: String,
      default: "addAddressRequest",
    },
    hideCreateAddress: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      prefOptions: [],
      addressMapper: {
        prefecture: null,
      },
      ready: false,
    };
  },

  watch: {
    "addressMapper.zipCode"(newValue) {
      if (this.address && this.address.id && !this.ready) return;

      if (newValue.length !== 7) return;

      this.$yubinbango(newValue).then((results) => {
        if (results) {
          this.addressMapper.prefecture = results.region;
          this.addressMapper.city = results.locality;
          this.addressMapper.street = results.street;

          if (this.hideCreateAddress) {
            this.setLocalAddress({
              prefecture: results.region,
              city: results.locality,
              street: results.street,
            });
          }
        }
      });
    },
  },

  async mounted() {
    this.prefOptions = await prefectureNames();

    if (this.address && this.address.id) {
      this.addressMapper = await cloneDeep(this.address);
    }
  },

  methods: {
    ...mapActions(["setLocalAddress"]),
    submit() {
      this.$emit("submit", this.addressMapper);
    },

    setLocalAdrressState(value) {
      this.ready = true;
      if (this.hideCreateAddress) {
        this.setLocalAddress(value);
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>
