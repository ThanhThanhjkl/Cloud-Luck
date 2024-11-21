<template>
  <b-form-group>
    <div v-if="label" class="d-flex align-items-center mb-2">
      <legend class="col-form-label pt-0 mr-1">
        {{ label }}
      </legend>
      <span v-if="required || textRequired" class="ic-required">＊</span>
      <span v-if="textRequired" class="required">required</span>
    </div>

    <div :class="{ 'has-error': conditionalError }">
      <slot></slot>
      <div v-if="errors && !confirm" class="validation">
        {{ errors }}
      </div>

      <div v-if="validator && validator.$error" class="validation">
        <span v-if="!validator.required">{{ requiredMessage }}</span>
        <span v-if="validator.checked">{{ requiredMessage }}</span>
      </div>
    </div>
  </b-form-group>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters } = createNamespacedHelpers("global");

export default {
  props: {
    label: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    confirm: {
      type: Boolean,
      default: false,
    },
    fieldName: {
      type: String,
      default: null,
    },
    validator: {
      type: Object,
      default: null,
    },
    required: Boolean,
    textRequired: Boolean,
  },

  data() {
    return {
      requiredMessage: "",
    };
  },
  computed: {
    errors() {
      return this.getErrors()(this.name);
    },

    conditionalError() {
      if (this.validator) {
        return (
          (this.errors && !this.confirm) ||
          (this.validator.$error && !this.validator.required)
        );
      } else {
        return this.errors && !this.confirm;
      }
    },
  },

  methods: {
    ...mapGetters(["getErrors"]),
  },
};
</script>
<style lang="scss" scoped>
.form-group {
  .col-form-label {
    color: $primary;
    font-size: 13px;
    width: fit-content;
    padding-bottom: 0;
    font-weight: bold;
  }
  .ic-required {
    color: $red;
    padding-left: 5px;
    margin-right: 3px;
  }
  .required {
    color: white !important;
    background-color: $red;
    line-height: 20px;
    font-size: 10px;
    font-weight: bold;
    padding: 0 5px;
    border-radius: 2px;
    white-space: nowrap;
  }
}

.validation {
  width: 100%;
  margin-top: 0.25rem;
  font-size: 80%;
  color: #dc3545;
  span {
    color: #dc3545 !important;
  }
}
</style>
