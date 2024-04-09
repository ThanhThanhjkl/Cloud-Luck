<template>
  <div>
    <div
      v-for="(item, index) in result"
      :key="index"
      class="result result-value"
    >
      <div class="result-title">{{ item.title }}</div>
      <div class="result-content">{{ item.about }}</div>
    </div>
    <div v-if="consultationType == 'company'" class="result result-images">
      <div class="result-title">画像項目名</div>
      <div v-if="imagesList" class="images-content">
        <div
          class="result-image"
          :style="{ backgroundImage: `url(${imageSource(imagesList[0].id)})` }"
        ></div>
        <div
          class="result-image"
          :style="{ backgroundImage: `url(${imageSource(imagesList[2].id)})` }"
        ></div>
      </div>
    </div>
    <div v-if="consultationType == 'company'" class="result result-images">
      <div class="result-title">画像項目名</div>
      <div v-if="imagesList" class="images-content">
        <div
          class="result-image"
          :style="{ backgroundImage: `url(${imageSource(imagesList[3].id)})` }"
        ></div>
        <div
          class="result-image"
          :style="{ backgroundImage: `url(${imageSource(imagesList[4].id)})` }"
        ></div>
      </div>
    </div>
    <div>
      <b-button type="submit" block class="btn-send" @click="onSave">
        送信
      </b-button>
      <b-button type="submit" block class="btn-return" @click="$router.go(-1)">
        戻る
      </b-button>
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
import { omit } from "lodash";
import { mapFields } from "vuex-map-fields";
const { mapActions, mapState } = createNamespacedHelpers(
  "business/application"
);
export default {
  data() {
    return {
      result: [],
    };
  },

  computed: {
    ...mapState(["application"]),
    ...mapFields("global", {
      keepError: "keepError",
    }),

    imagesList() {
      if (this.$route.params.type === "individual") {
        return false;
      } else {
        return this.application.company.images;
      }
    },

    consultationType() {
      return this.$route.params.type || "company";
    },
  },

  mounted() {
    // TODO
    if (!this.application.length) {
      this.$router.push("/consultation/confirm");
    }
    this.setResult();
  },

  methods: {
    ...mapActions(["getApplication", "updateApplication", "resetApplication"]),
    setResult() {
      this.result = [
        {
          id: 1,
          title: "目標金額",
          about: this.application.project.targetAmount,
        },
        {
          id: 2,
          title: "本文",
          about: this.application.project.aboutProject,
        },
        {
          id: 3,
          title: "想定プロジ ェ クト掲載希望起案",
          about: `${this.application.project.preferredPublicationDateStart}  ~  ${this.application.project.preferredPublicationDateEnd}`,
        },
        {
          id: 4,
          title: "HPやブログなどのURL",
          about: this.application.publisher.website,
        },
        {
          id: 5,
          title: "本文",
          about: this.application.publisher.website,
        },
      ];
    },
    async onSave() {
      const type = this.$route.params.type;
      // TODO two type update application,
      // 1.company
      // 2.invidiual
      try {
        // TODO temporally remove images
        if (type === "company") {
          await this.updateApplication(
            omit(this.application, "company.images")
          );
        } else if (type === "individual") {
          await this.updateApplication(omit(this.application, "company"));
        }
        this.keepError = false;
        this.resetApplication();
        this.$router.push("complete");
      } catch (error) {
        this.keepError = true;
        this.$router.go(-1);
      }
    },

    imageSource(id) {
      return `${process.env.businessApiUrl}/file/${id}`;
    },
  },
};
</script>
<style lang="scss" scoped>
.result {
  margin-bottom: 10px;
  .result-title {
    color: $primary;
    font-size: 13px;
    font-weight: bold;
    padding: 10px 22px 11px 22px;
    background-color: $primary-06;
  }
  .result-content {
    font-size: 11px;
    padding: 17px 22px 18px 22px;
  }
  &.result-images {
    .images-content {
      display: flex;
      justify-content: center;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 12px;
      font-size: 11px;
      @include max-width(sm) {
        flex-wrap: nowrap;
      }
      .result-image {
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        width: 47%;
        height: 250px;
        background-color: $gray-02;
        margin: 24px 0 28px 0;
        @include max-width(md) {
          width: 100%;
        }
      }
    }
  }
}

.page-consultation {
  button,
  a {
    width: 80%;
    margin: auto;
    padding: 15px 0;
    &.btn-send {
      border: none;
      background-color: $red;
      margin-bottom: 24px;
      width: 45%;
      @include max-width(md) {
        width: 70%;
      }
    }
    &.btn-return {
      width: 45%;
      color: $primary;
      border: 2px solid $gray-02;
      background-color: white;
      margin-bottom: 64px;
      @include max-width(md) {
        width: 70%;
      }
    }
  }
}
</style>
