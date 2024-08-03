<template>
  <div class="mb-3 edit-story-page">
    <h4 class="text-center mt-2 mb-3 edit-story-title">
      Let's talk about your thoughts
    </h4>
    <b-card>
      <FormValidator class="mt-3" label="Text" text-required>
        <quill-editor v-model="descriptions"></quill-editor>
        <span class="pass-note"
          >※Press [Shift + Enter] to start a new line without spacing between
          lines.
        </span>
      </FormValidator>
    </b-card>
    <div class="group-btn">
      <button class="btn-true col-5" @click="onSaveStep">keep</button>
      <nuxt-link
        class="btn btn-fall col-5"
        :to="`/account/${accountId}/project/${productId}/preview`"
        ><SvgEyes />
        preview
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import FormValidator from "@/components/common/FormValidator.vue";
import QuillEditor from "@/components/common/QuillEditor";
import SvgEyes from "@/components/common/svg/SvgEyes.vue";
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("auth");
const projectMapper = createNamespacedHelpers("home");
export default {
  inject: ["prefix"],
  components: {
    QuillEditor,
    SvgEyes,
    FormValidator,
  },

  data() {
    return {
      descriptions: "",
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

  mounted() {
    const productUpdate = localStorage.getItem(
      `productUpdate${this.productId}`
    );
    this.productDraft = JSON.parse(productUpdate);
    if (productUpdate && this.productDraft.descriptions) {
      this.descriptions = this.productDraft.descriptions;
    } else {
      this.descriptions = this.product.descriptions;
    }
  },

  methods: {
    onSaveStep() {
      const productUpdateAvailable = localStorage.getItem(
        `productUpdate${this.productId}`
      );
      const productUpdate = JSON.parse(productUpdateAvailable);
      if (productUpdateAvailable) {
        productUpdate.descriptions = this.descriptions;
        localStorage.setItem(
          `productUpdate${this.productId}`,
          JSON.stringify(productUpdate)
        );
      } else {
        const productUpdate = {
          descriptions: this.descriptions,
        };
        localStorage.setItem(
          `productUpdate${this.productId}`,
          JSON.stringify(productUpdate)
        );
      }

      if (this.productId !== "add") {
        this.$router.push("return");
      } else {
        this.$router.push("identifications");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.edit-story-title {
  color: #466cb0;
  font-size: 24px;
  font-weight: bold;
}

.pass-note {
  font-size: 11px;
  color: #999999;
  padding: 7px 0 12px 0;
}

.group-btn {
  width: 70%;
  margin: auto;
  margin-top: 24px;
}
</style>
