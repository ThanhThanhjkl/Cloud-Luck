<template>
  <div>
    <div class="d-flex col-6 col-md-5 p-0 cursor-pointer">
      <div class="product-img">
        <b-img fluid :src="imageUrl" />
      </div>
    </div>
    <div class="col-6 product-item">
      <div>
        Funded ID:<span>{{ funded.id }}</span>
      </div>
      <div>
        Amount of money:<span>{{ ammount | japanMoney }}</span>
      </div>
      <div>Project name :</div>
      <div class="product-title">
        {{ title }}
      </div>
      <div class="funded-btn mt-3" @click="deleteFunded">
        Delete this funded
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("home");

export default {
  props: {
    funded: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      title: null,
      ammount: null,
      imageUrl: null,
    };
  },

  computed: {
    ...mapState(["return"]),
    accountId() {
      return this.$route.params.id;
    },
  },

  async mounted() {
    await this.getReturnById(this.funded.return_id);
    this.imageUrl = this.return.image;
    this.title = this.return.title;
    this.ammount = this.return.cost;
  },

  methods: {
    ...mapActions(["getReturnById", "deleteFundedById"]),

    toCampaign(id) {
      this.$router.push(`/project/${id}`);
    },
    deleteFunded() {
      this.deleteFundedById(this.funded.id).then(() => {
        window.location.reload();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.product-img {
  width: 100% !important;
  min-height: 100px;
}
</style>
