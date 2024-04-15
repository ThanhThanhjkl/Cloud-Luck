<template>
  <div>
    <div class="guide">
      <div v-for="(item, index) in guide" :key="index">
        <b-card class="card-guide">
          <div class="guide-steps ml-auto mr-auto">
            <div class="text-center regis-title">
              <div class="number">{{ item.id }}</div>
              <p>{{ item.name }}</p>
            </div>
            <div class="section-right">
              <div class="row about" :class="{ last_step: item.isLastSteps }">
                <div class="icon-guide">
                  <component :is="item.svg"></component>
                </div>
                <h4>
                  {{ item.about }}
                </h4>
              </div>
              <div v-if="item.ishave" class="row boxs">
                <div class="box">
                  <div class="days d-flex text-center text-white">
                    <SvgTime />
                    <p>所要日数目安</p>
                  </div>
                  <div class="information">
                    <span>{{ item.col1 }}</span>
                  </div>
                </div>
                <div class="box">
                  <div class="days d-flex text-center text-white">
                    <SvgFile />
                    <p>提出物</p>
                  </div>
                  <div class="information">
                    <ul>
                      <li>{{ item.col2_1 }}</li>
                      <li>{{ item.col2_2 }}</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div :class="{ arrow_down: item.isActive }"></div>
            </div>
          </div>
        </b-card>
      </div>
    </div>

    <b-card class="consultation-select">
      <div class="form-title text-center">
        プロジェクト掲載申請・相談フォーム
      </div>
      <div class="btn-content">
        <b-button
          type="submit"
          variant="primary"
          block
          class="btn-company"
          @click="createApplication('company')"
        >
          <svg-company></svg-company>
          法人の方
        </b-button>
        <b-button
          type="submit"
          variant="primary"
          block
          class="btn-individual"
          @click="createApplication('individual')"
        >
          <svg-invidual></svg-invidual>
          個人の方
        </b-button>
      </div>
    </b-card>
  </div>
</template>
<script>
import SvgCompany from "@/components/common/svg/SvgCompany";
import SvgInvidual from "@/components/common/svg/SvgInvidual";
import SvgBook from "@/components/common/svg/SvgBook.vue";
import SvgBookComfirm from "@/components/common/svg/SvgBookComfirm.vue";
import SvgBookMultimedia from "@/components/common/svg/SvgBookMultimedia.vue";
import SvgMediaConfirm from "@/components/common/svg/SvgMediaConfirm.vue";
import SvgSmartphone from "@/components/common/svg/SvgSmartPhone.vue";
import SvgTime from "@/components/common/svg/SvgTime.vue";
import SvgFile from "@/components/common/svg/SvgFile.vue";

const COMPANY = "company";
const INDIVIDUAL = "individual";

export default {
  components: {
    SvgCompany,
    SvgInvidual,
    SvgTime,
    SvgFile,
  },
  data() {
    return {
      register_project: false,
      guide: [
        {
          id: 1,
          name: "相談・申請",
          about:
            "下記から申請フォームに進んでいただき、必要な書類と情報を入力してから送信をしてください。",
          col1: "1~2週間",
          col2_1: "・申請フォームの記入",
          col2_2: "・各種証明書類",
          svg: SvgBook,
          isActive: true,
          ishave: true,
        },
        {
          id: 2,
          name: "審査",
          about: "光文社によるプロジェクト掲載のための審査が行われます。",
          col1: "1~2週間",
          col2_1: "・審査通過後、契約書へ同意書",
          svg: SvgBookComfirm,
          isActive: true,
          ishave: true,
        },
        {
          id: 3,
          name: "掲載案作成",
          about:
            "審査通過後、具体的なプロジェクト記載内容の決定・プロジェクトページに掲載する画像などを揃えて頂きます。",
          col1: "1~4週間",
          col2_1: "・プロジェクト内容の記入",
          col2_2: "・GMO審査申込書類",
          svg: SvgBookMultimedia,
          isActive: true,
          ishave: true,
        },
        {
          id: 4,
          name: "最終審査",
          about: "プロジェクトページの最終的な掲載内容の確認と承認を行います。",
          col1: "1~2週間",
          col2_1: "・必要に応じて追加の証明書類",
          svg: SvgMediaConfirm,
          isActive: true,
          ishave: true,
        },
        {
          id: 5,
          name: "公開",
          about:
            "プロジェクトページが公開され、ファンディングの受付を開始します。",
          svg: SvgSmartphone,
          isActive: false,
          ishave: false,
          isLastSteps: true,
        },
      ],
    };
  },

  computed: {},

  methods: {
    createApplication(type) {
      // let application = {};

      // if (!this.user) {
      //   return this.$router.push("/auth/login");
      // }

      // try {
      //   application = await this.getApplication();
      // } catch (error) {
      //   application = false;
      // }

      // if (application) {
      this.redirectToConsultation(type);
      // } else {
      //   this.postApplication().then(() => {
      //     this.redirectToConsultation(type);
      //   });
      // }
    },

    redirectToConsultation(type) {
      if (type === COMPANY) {
        this.$router.push("/consultation/company");
      } else if (type === INDIVIDUAL) {
        this.$router.push("/consultation/individual");
      }
    },
  },

  head() {
    return {
      bodyAttrs: {
        class: "bg-consultation",
      },
    };
  },
};
</script>
<style lang="scss" scoped>
.card {
  padding: 0 70px;
  @include max-width(lg) {
    padding: 0;
  }
}
.consultation-select {
  @include max-width(md) {
    margin-bottom: 50px;
  }
}
</style>
