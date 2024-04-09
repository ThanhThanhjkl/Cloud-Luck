<template>
  <div>
    <div class="paginations">
      <b-pagination
        :value="page"
        :total-rows="total"
        :per-page="12"
        prev-text="前"
        next-text="次"
        first-number
        last-number
        class="pagination pagination-rounded justify-content-center mt-4"
        @change="onChange"
      ></b-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      required: true,
    },
    page: {
      type: Number,
      default: 1,
    },
  },

  data() {
    return {
      limit: 12,
    };
  },

  computed: {
    totalPages() {
      return Math.ceil(this.total / this.limit);
    },
  },

  methods: {
    onChange(page) {
      this.$emit("change", page);
    },
  },
};
</script>
