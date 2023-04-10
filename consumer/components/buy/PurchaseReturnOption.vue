<template>
  <div v-if="campaignReturnDetail" class="buy-option-page">
    <b-card :class="{ active: selectedReturnId }">
      <template #header>
        <div v-if="campaignReturnDetail.images">
          <b-img
            class="w-100"
            :src="imageSource(campaignReturnDetail.images[0].id)"
          />
          <b-button class="btn-select text-primary" variant="light">
            選択中
          </b-button>
        </div>
      </template>

      <div class="row no-gutters flex-column">
        <div class="no-gutter-title">
          {{
            campaignReturnDetail.title ||
            "リターン品目がここに入ります。リターン品目がここに入ります。"
          }}
        </div>

        <div v-if="campaignReturnDetail.stockQuantity > 0" class="users">
          残り：{{ campaignReturnDetail.stockQuantity }}人まで
        </div>
        <div v-else class="text-danger out-stock">在庫なし</div>

        <div v-if="campaignReturnDetail.body">
          <font class="detail" :class="{ 'line-clamp': !lineClamp }">
            {{ campaignReturnDetail.body }}
          </font>

          <span v-if="indicator">
            <a
              class="cursor-pointer text-primary"
              :href="null"
              @click="lineClamp = !lineClamp"
              >{{ lineClamp ? "閉じる" : "もっと見る" }}
            </a>
          </span>
        </div>
      </div>
      <div class="chose-size">
        <div class="head-chose">
          <b-form-checkbox
            v-model="selectedReturnId"
            class="mr-n2"
            :value="campaignReturnDetail.id"
            :unchecked-value="null"
          ></b-form-checkbox>
          <div class="price">
            {{ campaignReturnDetail.amount | japanMoney }}
          </div>
        </div>

        <form v-if="campaignReturnDetail">
          <b-form-group
            v-for="(option, index) in campaignReturnDetail.options"
            :key="index"
            class="mb-0"
          >
            <div v-if="option">
              <label class="col-12">
                {{ option.title }}
              </label>
              <b-form-select
                v-model="selectedOptions[index].item.id"
                :value="itemId(index)"
                :disabled="!selectedReturnId"
                @change="
                  addReturnOptionDonation({
                    idx: index,
                    itemID: $event,
                    optionID: option.id,
                    title: option.title,
                  })
                "
              >
                <b-form-select-option
                  v-for="item in option.items"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ item.name }}
                </b-form-select-option>
              </b-form-select>
            </div>
          </b-form-group>

          <b-form-group
            v-if="campaignReturnDetail.stockQuantity > 0"
            class="mb-0"
          >
            <div class="number">
              <label>数量</label>
              <b-input
                v-model="quantity"
                class="select-quantity"
                type="number"
                :disabled="!selectedReturnId"
                :min="1"
                :max="campaignReturnDetail.stockQuantity"
              >
              </b-input>
            </div>
          </b-form-group>
        </form>
      </div>

      <b-card-sub-title>
        <label>サポーター</label>
        <strong> {{ campaignReturnDetail.sponsorCount }}人 </strong>
        <label v-if="campaignReturnDetail.scheduledDeliveryDate"
          >お届け予定
        </label>
        <strong v-if="campaignReturnDetail.scheduledDeliveryDate">
          {{ campaignReturnDetail.scheduledDeliveryDate | japanDate }}
        </strong>
      </b-card-sub-title>
    </b-card>

    <b-button class="btn-fixed d-block" @click="postDonation">
      確認画面へ
    </b-button>
  </div>
</template>

<script>
import { get } from "lodash";
import { mapFields } from "vuex-map-fields";
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("campaign");
const authMapper = createNamespacedHelpers("auth");

export default {
  props: {
    campaignReturnDetail: {
      type: Object,
      default: () => {},
    },

    returnId: {
      type: String,
      default: () => "",
    },
  },

  data() {
    return {
      campaign: {},
      options: [],
      lineClamp: false,
    };
  },

  computed: {
    ...mapFields("campaign", {
      donation: "donation",
      campaignId: "donation.campaign.id",
      selectedReturnId: "donation.campaign.return.id",
      quantity: "donation.campaign.return.count",
      arrivalDate: "donation.arrivalDate",
      selectedOptions: "donation.campaign.return.options",
    }),

    ...authMapper.mapState(["user"]),

    id() {
      return get(this.campaignReturnDetail, "id");
    },

    indicator() {
      return this.campaignReturnDetail.body.length > 59;
    },
  },

  watch: {
    "campaignReturnDetail.body"(value) {
      if (value && value.length < 59) {
        this.lineClamp = true;
      }
    },
    quantity(value) {
      if (value > this.campaignReturnDetail.stockQuantity) {
        this.quantity = this.campaignReturnDetail.stockQuantity;
      }
    },
  },

  methods: {
    ...mapActions(["addReturnOptionDonation"]),
    countOptions(value) {
      return Array.from({ length: value }, (_, i) => i + 1);
    },

    postDonation() {
      if (!this.user) {
        this.$router.push("/auth/login");
      } else {
        this.campaignId = this.$route.params.id;
        this.arrivalDate = this.campaignReturnDetail.arrivalDate;

        this.$router.push({
          name: "project-id-buy-confirm",
          params: { donation: this.donation, id: this.campaignId },
        });
      }
    },

    imageSource(id) {
      return `${process.env.consumerApiUrl}/file/${id}`;
    },

    itemId(index) {
      return get(this.donation, `campaign.return.options[${index}].item.id`);
    },
  },
};
</script>
<style lang="scss" scoped>
.line-clamp {
  @include line-clamp(1);
}
</style>
