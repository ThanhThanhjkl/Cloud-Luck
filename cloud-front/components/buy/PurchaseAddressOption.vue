<template>
  <section>
    <div class="header-tickit d-flex">
      必要情報を入力してください
      <div class="notion ml-3">必須</div>
    </div>
    <b-card>
      <div class="transport">お届け先情報</div>
      <hr class="line" />
      <b-row class="transport-content">
        <b-col lg="9" class="mx-auto">
          <b-form-group v-slot="{ ariaDescribedby }">
            <b-form-radio
              v-model="isNewAddress"
              :aria-describedby="ariaDescribedby"
              name="some-radios"
              class="font-14px"
              :value="false"
            >
              登録済みのお届け先情報を使う
            </b-form-radio>
          </b-form-group>
          <div class="location">
            <b-form-select
              v-if="!isNewAddress"
              v-model="addressId"
              @change="changeAddress"
            >
              <b-form-select-option
                v-for="address in accountAddress"
                :key="address.id"
                :value="address.id"
                >{{ address.name }}, 〒{{ address.zipCode }},
                {{ address.prefecture }}, {{ address.city }},
                {{ address.street }}, (tel:{{ address.phoneNumber }})
              </b-form-select-option>
            </b-form-select>
          </div>
          <div>
            <b-form-group v-slot="{ ariaDescribedby }" class="mt-0 mt-md-5">
              <input
                type="radio"
                name="some-radios"
                value="A"
                class="custom-control-input"
              />
              <b-form-radio
                v-model="isNewAddress"
                :aria-describedby="ariaDescribedby"
                name="some-radios"
                class="font-14px"
                :value="true"
              >
                新しいお届け先情報を使う
              </b-form-radio>
              <div
                class="form-new-shipping"
                :class="{ 'd-block': isNewAddress }"
              >
                <FormAddress
                  :address="address"
                  hide-create-address
                  prefix="addDonationRequest"
                ></FormAddress>
                <div class="head-chose">
                  <b-form-checkbox
                    v-model="wantToAddListAddress"
                    class="mr-n2"
                  ></b-form-checkbox>
                  <div class="price">このお届け先を保存する</div>
                </div>
              </div>
            </b-form-group>
          </div>
        </b-col>
      </b-row>
    </b-card>
  </section>
</template>
<script>
import FormAddress from "@/components/profile/changeinfo/FormAddress.vue";
import { mapFields } from "vuex-map-fields";
import _ from "lodash";
export default {
  components: {
    FormAddress,
  },

  data() {
    return {
      hideCreateAddress: true,
    };
  },

  computed: {
    ...mapFields("campaign", {
      address: "donation.address",
      addressId: "donation.addressId",
      isNewAddress: "donation.isNewAddress",
      wantToAddListAddress: "donation.wantToAddListAddress",
    }),
  },

  watch: {
    accountAddress(value) {
      if (value.length) {
        this.isNewAddress = false;
        const addressDefault = this.accountAddress.find((item) => {
          return item.isPrimary;
        });
        this.addressId = addressDefault?.id;
      } else {
        this.isNewAddress = true;
      }
    },
  },

  async mounted() {
    await this.getProfile();
    this.getAccountAddress(this.account.id);
  },

  methods: {
    changeAddress($event) {
      // TODO
      this.$emit("address", $event);
      this.address = _.omit($event, "isPrimary");
    },
  },
};
</script>
<style lang="scss" scoped>
label {
  margin-bottom: 0;
}
.form-new-shipping {
  display: none;
  margin-top: 20px;
}
.custom-control {
  z-index: 0;
}
.font-14px {
  font-size: 14px;
}
.header-tickit {
  font: normal normal bold 16px/20px Noto Sans JP;
  letter-spacing: 0px;
  color: #333333;
  margin-bottom: 16px;
  margin-left: 16px;
  .notion {
    background-color: #d84646;
    font: normal normal bold 10px/20px Noto Sans JP;
    letter-spacing: 0px;
    color: #ffffff;
    border-radius: 2px;
    padding: 4px 8px;
  }
}
.card {
  position: relative;
  border-radius: 8px;
  padding: 20px 16px 24px;
  .transport {
    text-align: center;
    font: normal normal bold 20px/29px Noto Sans JP;
    letter-spacing: 0px;
    color: #333333;
  }
  .line {
    width: 100%;
  }
  .transport-content {
    .location {
      border: 2px solid #1d9afb;
      border-radius: 5px;
      margin: 15px 0;
      .custom-select {
        background-color: #efefef;
        border: unset;
      }
      input.form-control,
      .custom-select {
        padding: 20px;
        height: auto;
      }
    }
  }
  .form-control {
    background-color: #eeeeee;
    color: #333333;
    border: unset;
  }
  .custom-control-label {
    font-size: 16px;
  }
  .card-header {
    padding: 0;
    border: none;
    background: white;
    margin-bottom: 10px;
  }
  .card-body {
    padding: 0;
    display: grid;
    gap: 10px;
    .form-group {
      margin-bottom: 0;
      font-size: 13px;
    }
    .head-change {
      display: flex;
      justify-content: space-between;
      .money-back {
        font: normal normal bold 13px/20px Noto Sans JP;
        letter-spacing: 0px;
        color: #466cb0;
      }
      .change {
        font: normal normal bold 24px/20px Noto Sans JP;
        letter-spacing: 0px;
        color: #333333;
      }
    }
    .run-out {
      text-align: center;
      font: normal normal 900 14px/24px Noto Sans JP;
      letter-spacing: 0px;
      color: #d84646;
      margin-left: auto;
      margin-right: auto;
    }
    .detail {
      text-align: left;
      font: normal normal medium 13px/20px Noto Sans JP;
    }
  }
  .card-subtitle {
    font-size: inherit;
    @include flex-center-y;

    label {
      font-size: 0.75em;
      color: $primary;
      margin-right: 8px;
      margin-bottom: 0;
    }

    strong {
      font-size: 1em;
      font-weight: normal;
      color: #000000;
      margin-right: 10px;
    }
  }
  .head-chose {
    display: flex;
    justify-content: center;
    align-items: center;

    .price {
      font: normal normal bold 40px/40px Noto Sans JP;
      font-size: 14px;
      font-weight: normal;
      color: #333333;
      padding-left: 10px;
    }
  }
  .chose-size {
    text-align: center;
    .head-chose {
      display: flex;
      justify-content: center;
      align-items: center;
      .price {
        font: normal normal bold 40px/40px Noto Sans JP;
        color: #333333;
        margin-bottom: 10px;
      }
    }
    .chose {
      border-radius: 5px;
      padding: 20px 15px;
      background-color: #efefef;
      margin-bottom: 15px;
      .custom-select {
        border: none;
        border-radius: 5px;
        background-color: #efefef;
      }
    }
    .number {
      display: grid;
      grid-auto-flow: column;
      background-color: #efefef;
      border-radius: 5px;
      padding: 15px 15px;
      input {
        border: none;
      }
    }
  }
}
</style>
