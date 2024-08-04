<template>
  <b-card>
    <div class="title-card">
      <div class="warning">Check</div>
      <span>You can now publish your project!</span>
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
      <div class="publish-title">Published soon</div>
      <b-button
        variant="primary"
        class="w-100"
        @click="releasingProject('immediately')"
        ><SvgPublish class="mr-2"></SvgPublish> Publish now
      </b-button>
    </div>
    <div class="publish publish-settings">
      <div class="publish-title">Release at a specified date and time</div>
      <div class="text-center text-primary">
        Setting the publication date and time
      </div>
      <FormValidator name="campaignReleaseRequest.releaseDateTime">
        <b-input
          v-model="releaseDateTime"
          class="input-settings"
          type="text"
          placeholder="2022/11/11 17:00"
        ></b-input>
      </FormValidator>
      <div class="text-muted text-center mb-3">
        ※ Scheduled release can be set in 5-minute increments.
      </div>
      <b-button
        variant="primary"
        class="w-100"
        @click="releasingProject('specified')"
        ><SvgClock class="mr-2"></SvgClock>make a reservation
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
import moment from "moment";
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
          title: "To publish:",
          des: "You can publish at any time by clicking 'Publish' on the right.",
        },
        {
          id: 2141,
          title: "Starting today, we're releasing:",
          des: "The deadline for applications is 2022-12-12 23:59:59. The application period is 27 days.",
        },
      ],
      note: "※ We are currently receiving a large number of submissions, so it is taking some time to complete the required review process.",
    };
  },

  computed: {
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
