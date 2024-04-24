<template>
  <b-container class="page-consultation" fluid="xl">
    <PurchaseStepList step="complete"></PurchaseStepList>
    <section>
      <div class="complete-content text-center">
        <svg-complete></svg-complete>
        <div class="complete-alert">
          exampleさん、<br />ありがとうございます！
        </div>
        <ul>
          <li>
            あなたは <b>{{ nextPerson }}人</b> 目のサポーターです<br />
            応援総額は
            <b v-if="donation">{{ donation.quotation.support | japanMoney }}</b>
            になりました<br />
          </li>
        </ul>
      </div>
      <b-card class="support-project">
        <div class="support-title">
          このプロジェクトをもっと応援しませんか？
        </div>
        <div class="support-notice">
          あなたのシェアが <br />プロジェクトの成功を後押しします！
        </div>
        <div class="btn-external">
          <nuxt-link to="/" block class="btn btn-block btn-twitter">
            <svg-twitter></svg-twitter>
            <span>ツイートする</span>
          </nuxt-link>
          <nuxt-link to="/" block class="btn btn-block btn-facebook">
            <svg-facebook></svg-facebook>
            <span>シェアする</span>
          </nuxt-link>
          <nuxt-link to="/" block class="btn btn-block btn-line">
            <svg-line-circle></svg-line-circle>
            <span>LINEで送る</span>
          </nuxt-link>
        </div>
      </b-card>
      <b-card class="project-info">
        <div>
          <div class="info-title">プロジェクト名</div>
          <div class="info-content">{{ campaignTitle }}</div>
        </div>
        <div>
          <div class="info-title">応援ID</div>
          <div class="info-content">{{ orderID }}</div>
        </div>
      </b-card>
      <div class="section-notice">
        <div>
          【決済に関して】<br />このプロジェクトは、目標金額の達成/未達成に関わらず、プロジェクトは成立となり決済が行われます。
        </div>
        <div>
          【リターンに関して】<br />リターンに関してプロジェクトオーナーからメッセージが届く場合がございます。メッセージは登録されたメールに通知されます。チェックしましょう。またプロジェクトオーナーへもメッセージを送ることが可能です。
        </div>
      </div>
    </section>
    <div class="btn-service-name">
      <b-button type="submit" variant="primary" block @click="viewOrderStatus">
        マイページで応援履歴を確認する
      </b-button>
    </div>
  </b-container>
</template>

<script>
import _ from "lodash";
import PurchaseStepList from "@/components/buy/PurchaseStepList.vue";
import SvgComplete from "@/components/common/svg/SvgComplete";
import SvgTwitter from "@/components/common/svg/SvgTwitter";
import SvgFacebook from "@/components/common/svg/SvgFacebook";
import SvgLineCircle from "@/components/common/svg/SvgLineCircle";
export default {
  components: {
    SvgComplete,
    SvgTwitter,
    SvgFacebook,
    SvgLineCircle,
    PurchaseStepList,
  },
  layout: "auth",

  props: {
    campaignReturnDetail: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      infos: [
        {
          id: 1,
          title: "プロジェクト名",
          content:
            "この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。",
        },
        {
          id: 2,
          title: "応援ID",
          content: "5629295",
        },
      ],

      donation: null,
    };
  },

  computed: {
    nextPerson() {
      const x = _.get(this.campaignReturnDetail, "sponsorCount");
      return x + 1;
    },

    orderID() {
      return this.$route.params.id;
    },

    campaignTitle() {
      return this.$route.params.title;
    },
  },

  mounted() {
    if (this.$route.params.donation) {
      this.donation = this.$route.params.donation;
    }
  },

  methods: {
    viewOrderStatus() {
      if (this.account) {
        this.$router.push(`/account/${this.account.id}/donation`);
      } else {
        this.$router.push("/");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.page-consultation {
  section {
    .complete-content {
      width: 80%;
      margin: auto;
      padding-top: 30px;
      .complete-alert {
        color: $primary;
        font-size: 16px;
        font-weight: bold;
        padding-top: 14px;
      }
      ul {
        padding: 0 15px;
        margin-bottom: 32px;
        li {
          list-style-type: none;
          font-size: 14px;
          padding-top: 10px;
          @include max-width(sm) {
            font-size: 11px;
          }
        }
      }
    }
    .card {
      margin-bottom: 22px;
      .card-body {
        padding: 24px 16px 3px 16px;
      }
    }
    .support-project {
      text-align: center;
      .support-title {
        font-size: 16px;
        font-weight: bold;
        color: $primary-05;
        @include max-width(sm) {
          font-size: 13px;
        }
      }
      .support-notice {
        font-size: 13px;
        padding: 15px 0 20px 0;
        @include max-width(sm) {
          font-size: 11px;
        }
      }
      .btn-external {
        width: 320px;
        margin: auto;
        padding: 10px 0 27px 0;
        a {
          width: 100%;
          position: relative;
          font-size: 18px;
          color: white;
          padding: 15px 0;
          &.btn-twitter {
            background-color: $primary-02;
            margin-bottom: 16px;
          }
          &.btn-facebook {
            background-color: $primary-03;
            margin-bottom: 16px;
          }
          &.btn-line {
            background-color: $success;
          }
          svg {
            position: absolute;
            top: 50%;
            left: 15px;
            transform: translateY(-50%);
          }
        }
        svg {
          color: white;
        }
      }
    }
    .project-info {
      margin-bottom: 28px;
      .info-title {
        font-size: 13px;
        font-weight: bold;
        color: $primary;
        padding: 10px 0 11px 22px;
        background-color: $primary-06;
      }
      .info-content {
        font-size: 13px;
        line-height: 20px;
        padding: 17px 16px 20px 16px;
        @include max-width(sm) {
          font-size: 11px;
        }
      }
    }
    .section-notice {
      font-size: 11px;
      color: $gray-05;
      padding: 0 16px;
      @include max-width(sm) {
        font-size: 9px;
      }
      div {
        &:last-child {
          padding-top: 10px;
        }
      }
    }
  }
  .btn-service-name {
    max-width: 320px;
    margin: auto;
    button {
      padding: 15px 0;
      margin: 24px 0 50px 0;
    }
  }

  @include max-width(md) {
    section {
      .support-project {
        .btn-external {
          width: 90%;
        }
      }
    }
    .btn-service-name {
      width: 90%;
    }
  }
}
</style>
