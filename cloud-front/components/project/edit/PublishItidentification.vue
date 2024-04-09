<template>
  <b-card>
    <div class="title-card">
      <div class="warning">Check</div>
      <span>プロジェクトを公開できるようになりました！</span>
    </div>
    <div class="contents">
      <div v-for="item in contents" :key="item.id" class="item">
        <div class="d-flex align-items-center mb-1">
          <SvgCheckbox class="mr-2"></SvgCheckbox>
          <span class="font-weight-bold">{{ item.title }}</span>
        </div>
        <div class="description">{{ item.des }}</div>
      </div>

      <span class="text-muted">{{ note }}</span>
    </div>

    <div class="publish">
      <div class="publish-title">すぐに公開</div>
      <b-button
        variant="primary"
        class="w-100"
        :disabled="readOnly"
        :class="{ disabled: readOnly }"
        @click="releasingProject('immediately')"
        ><SvgPublish class="mr-2"></SvgPublish> すぐに公開する
      </b-button>
    </div>
    <div class="publish publish-settings">
      <div class="publish-title">日時指定で公開</div>
      <div class="text-center text-primary">公開日時の設定</div>
      <FormValidator name="campaignReleaseRequest.releaseDateTime">
        <b-input
          v-model="releaseDateTime"
          class="input-settings"
          type="text"
          placeholder="2022/11/11 17:00"
          :readonly="readOnly"
          :class="{ disabled: readOnly }"
        ></b-input>
      </FormValidator>
      <div class="text-muted text-center mb-3">
        ※予約公開は5分刻みで設定が可能です
      </div>
      <b-button
        variant="primary"
        class="w-100"
        :disabled="readOnly"
        :class="{ disabled: readOnly }"
        @click="releasingProject('specified')"
        ><SvgClock class="mr-2"></SvgClock>予約する
      </b-button>
    </div>
  </b-card>
</template>
<script>
import SvgCheckbox from "@/components/common/svg/SvgCheckbox";
import SvgPublish from "@/components/common/svg/SvgPublish";
import SvgClock from "@/components/common/svg/SvgClock";
import FormValidator from "@/components/common/FormValidator";

import _ from "lodash";
import { createNamespacedHelpers } from "vuex";
import moment from "moment";
const { mapState, mapActions } = createNamespacedHelpers("business/campaign");
export default {
  components: {
    SvgCheckbox,
    SvgPublish,
    SvgClock,
    FormValidator,
  },
  data() {
    return {
      releaseDateTime: "",
      contents: [
        {
          id: 12,
          title: "公開するためには：",
          des: "右の「公開する」よりお好きなタイミングを公開できます。",
        },
        {
          id: 2141,
          title: "本日公開を開始すると：",
          des: "募集終了日は、2022-12-12 23:59:59。募集期間は27日です。",
        },
      ],
      note: "※ 現在、数多くのご投稿をいただいているため、所定の審査に時間がかかっております。",
    };
  },

  computed: {
    ...mapState(["campaign"]),

    campaignId() {
      return this.$route.params.projectId;
    },

    accountId() {
      return this.$route.params.id;
    },

    readOnly() {
      const status = ["updated", "offline"];

      return !status.includes(this.campaignStatus);
    },

    campaignStatus() {
      return _.get(this.campaign, "status");
    },
  },
  methods: {
    ...mapActions(["publishCampaign"]),
    async releasingProject(type) {
      const params = {
        campaignId: this.campaignId,
        releaseDateTime:
          type === "specified" ? moment(this.releaseDateTime) : new Date(),
      };
      try {
        await this.publishCampaign(params);

        this.$router.push({
          name: "account-id-project-publicdone",
          params: { id: this.accountId, campaignId: this.campaignId },
        });
      } catch (error) {}
    },
  },
};
</script>
<style lang="scss" scoped>
.card {
  border: 4px solid #1d9afb;
  .card-body {
    padding-bottom: 20px;
  }
}
.title-card {
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 13px;
  position: relative;
  text-align: center;
  margin-bottom: 33px;
  justify-content: center;

  &::after {
    content: "";
    position: absolute;
    width: calc(100% + 32px);
    height: 1px;
    background: #ceddf8;
    left: -16px;
    bottom: -15px;
  }

  .warning {
    width: 20%;
    // padding: 5px 13px;
    background: #d84646;
    color: white;
    margin-right: 10px;
    border-radius: 2px;
    font-size: 16px;
  }

  span {
    font-size: 13px;
  }
}
.contents {
  margin: 0 12px;
  .item {
    margin-bottom: 13px;
    .description {
      line-height: 17px;
      font-weight: 300;
    }
  }
}
.publish {
  padding: 22px;
  background: #eff5ff;
  border-radius: 4px;
  margin-top: 16px;

  .input-settings {
    padding: 15px;
    height: auto;
    margin: 12px 0px;
  }

  &-title {
    color: #466cb0;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    position: relative;
    margin-bottom: 30px;
    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 1px;
      left: 0;
      bottom: -15px;
      background: #ceddf8;
    }
  }
}

.text-muted {
  font-size: 11px;
}
</style>
