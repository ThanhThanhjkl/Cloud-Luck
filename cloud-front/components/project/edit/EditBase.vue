<template>
  <section class="edit-establish-page">
    <div class="head-colapse text-center">Set the desired target amount</div>
    <b-card>
      <form>
        <b-form-group>
          <FormValidator
            class="col-md-6 col-12 mt-3 p-0"
            label="Target amount"
            text-required
          >
            <div class="input-money d-flex">
              <b-input
                v-model="cost"
                type="text"
                placeholder="（例）100,000"
                required
              ></b-input>
              <span>円</span>
            </div>

            <span>※Please enter a target amount of 100,000 yen or more.</span>
          </FormValidator>

          <FormValidator
            class="col-md-6 col-12 mt-3 p-0"
            label="Funding amount"
            text-required
          >
            <div class="input-money d-flex">
              <b-input
                v-model="sale_cost"
                type="text"
                placeholder="（例）100,000"
                required
              ></b-input>
              <span>円</span>
            </div>

            <span>※Please enter a target amount of 100,000 yen or more.</span>
          </FormValidator>
        </b-form-group>
        <hr />
        <b-form-group>
          <FormValidator class="mt-3" label="Recruitment method" text-required>
            <b-form-radio
              v-model="methods"
              value="all_in"
              class="recruit"
              :class="{
                isSelected: methods == 'all_in',
              }"
              ><div class="right-content">
                <div class="head-box">All-In</div>
                <div class="description">
                  Even if the target amount is not achieved, You can receive the
                  support money until the end date.
                </div>
                <span class="p-0">
                  <SvgWaringAlert class="mr-2" />
                  Return performance obligation arises from one person's
                  support.
                </span>
              </div></b-form-radio
            >
            <b-form-radio
              v-model="methods"
              value="all_or_nothing"
              class="recruit"
              :class="{
                isSelected: methods == 'all_or_nothing',
              }"
              ><div class="right-content">
                <div class="head-box">All-or-Nothing</div>
                <div class="description">
                  If you reach the target amount within the period, you will
                  receive the support money.
                </div>
                <span class="p-0">
                  <SvgWaringAlert class="mr-2" />
                  Return performance obligation will occur after the target
                  amount is achieved.
                </span>
              </div>
            </b-form-radio>
          </FormValidator>
        </b-form-group>
        <hr />
        <b-form-group>
          <FormValidator
            class="col-md-5 col-8 mt-3 p-0"
            label="Recruitment end date"
            text-required
          >
            <date-picker
              v-model="date"
              class="date-picker"
              type="date"
              format="YYYY-MM-DD"
              placeholder="----year--month--day"
            >
            </date-picker>
          </FormValidator>
          <div>
            <span
              >※Projects can be published for 1 to 79 days. (1 day to 59 days
              for All-or-Nothing method)
              <br />
              ※The recruitment end time is 23:59 on the recruitment end date.
              Example: If December 31, 2022 is specified, December 31, 2022
              Recruitment ends at 23:59.
            </span>
          </div>
        </b-form-group>
      </form>
    </b-card>
    <div class="group-btn">
      <button class="btn-true col-5" @click="onSaveStep">keep</button>
      <button class="btn btn-fall col-5" @click="onPreview">
        <SvgEyes />
        Preview
      </button>
    </div>
  </section>
</template>
<script>
import FormValidator from "@/components/common/FormValidator.vue";
import SvgEyes from "@/components/common/svg/SvgEyes.vue";
import SvgWaringAlert from "@/components/common/svg/SvgWaringAlert.vue";
import DatePicker from "vue2-datepicker";

import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("auth");
const projectMapper = createNamespacedHelpers("home");
export default {
  components: { SvgEyes, SvgWaringAlert, FormValidator, DatePicker },

  data() {
    return {
      cost: "",
      sale_cost: "",
      methods: "",
      date: "",
      productDraft: null,
    };
  },

  computed: {
    ...projectMapper.mapState(["product"]),
    ...mapState(["userId"]),

    accountId() {
      return this.userId;
    },

    productId() {
      return this.$route.params.projectId;
    },
  },

  // WHEN CREATE PRODUCT SET VALUE TO NULL
  async beforeMount() {
    if (this.$route.params.projectId === "add") {
      await this.setProductToCreate();
    }
  },

  async mounted() {
    const productUpdate = localStorage.getItem(
      `productUpdate${this.productId}`
    );
    this.productDraft = JSON.parse(productUpdate);

    // API GET VALUE WHEN UPDATE PRODUCT
    if (this.$route.params.projectId !== "add") {
      await this.getProductsDetail(this.productId);
    }

    // LOGIC TO SET DEFAULT VALUE FOR FIELD
    if (productUpdate && this.productDraft.cost) {
      this.cost = this.productDraft.cost;
    } else {
      this.cost = this.product.cost;
    }
    if (productUpdate && this.productDraft.sale_cost) {
      this.sale_cost = this.productDraft.sale_cost;
    } else {
      this.sale_cost = this.product.sale_cost;
    }
    if (productUpdate && this.productDraft.methods) {
      this.methods = this.productDraft.methods;
    } else {
      this.methods = this.product.methods;
    }
    if (productUpdate && this.productDraft.date) {
      this.date = new Date(this.productDraft.date);
    } else {
      this.date = new Date(this.product.date);
    }
  },

  methods: {
    ...projectMapper.mapActions(["getProductsDetail", "setProductToCreate"]),
    onSaveStep() {
      const productUpdateAvailable = localStorage.getItem(
        `productUpdate${this.productId}`
      );
      if (productUpdateAvailable) {
        const productUpdate = JSON.parse(productUpdateAvailable);
        productUpdate.id = this.productId;
        productUpdate.cost = this.cost;
        productUpdate.sale_cost = this.sale_cost;
        productUpdate.methods = this.methods;
        productUpdate.date = this.date;
        localStorage.setItem(
          `productUpdate${this.productId}`,
          JSON.stringify(productUpdate)
        );
      } else {
        const productUpdate = {
          id: this.productId,
          cost: this.cost,
          sale_cost: this.sale_cost,
          methods: this.methods,
          date: this.date,
        };
        localStorage.setItem(
          `productUpdate${this.productId}`,
          JSON.stringify(productUpdate)
        );
      }
      this.$router.push("overview");
    },

    onPreview() {
      this.setLocalCampaign(this.campaignMapper);
      this.$router.push(
        `/account/${this.accountId}/project/${this.productId}/preview`
      );
    },
  },
};
</script>
