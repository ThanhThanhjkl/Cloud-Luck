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
      <div class="card-header d-flex">
        <b-avatar class="ml-0 mr-2">
          <b-img fluid :src="avatar" />
        </b-avatar>
        <div>
          <div>
            <div class="profile-date">
              name: <span class="text-secondary">{{ name }}</span>
            </div>
            <div class="profile-date">
              email: <span class="text-secondary">{{ email }}</span>
            </div>
            <div class="profile-date">
              email: <span class="text-secondary">{{ email }}</span>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="$route.path === `/account/${accountId}/donation`"
        class="funded-btn mt-3"
        @click="deleteFunded"
      >
        Delete this funded
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("home");
const authMapper = createNamespacedHelpers("auth");

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
      avatar: null,
      name: null,
      email: null,
    };
  },

  computed: {
    ...mapState(["return"]),
    ...authMapper.mapState(["account", "accountAddress"]),
    accountId() {
      return this.$route.params.id;
    },
  },

  async mounted() {
    await this.getReturnById(this.funded.return_id).then(() => {
      this.imageUrl = this.return.image;
      this.title = this.return.title;
      this.ammount = this.return.cost;
      this.getAccount(this.funded.account_id).then(() => {
        this.avatar = "data:image/jpeg;base64," + this.account.avatar;
        this.name = this.account.name;
        this.email = this.account.email;
      });
    });
  },

  methods: {
    ...mapActions(["getReturnById", "deleteFundedById"]),
    ...authMapper.mapActions(["getAccount", "getAddressByAccountId"]),

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
