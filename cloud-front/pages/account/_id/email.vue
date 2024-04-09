<template>
  <div class="changeinfo detail">
    <AuthRegisterInfo class="mb-4"></AuthRegisterInfo>
    <div class="mx-lg-5">
      <div
        v-if="user"
        id="register-setting-3"
        accordion="register-setting"
        class="email-setting"
      >
        <b-card>
          <div class="setting-title text-center">メールマガジン受信設定</div>
          <div class="select-toggle">
            <div
              v-for="(mails, index) in accountMails"
              :key="index"
              class="toggle-list"
            >
              <div class="toggle-item">
                <div class="toggle-title">
                  {{ mails.name }}
                </div>
                <div class="row">
                  <div class="col-9 toggle-description">
                    {{ mails.name }}
                  </div>
                  <div class="col-3 text-right">
                    <b-form-checkbox
                      v-model="mails.isEnable"
                      name="check-button"
                      switch
                    >
                    </b-form-checkbox>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="submit-area">
            <b-button
              type="button"
              variant="primary"
              block
              class="btn-update w-100"
              :disabled="!accountMails.length"
              @click="updateMail"
              >更新する</b-button
            >
          </div>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import AuthRegisterInfo from "@/components/auth/AuthRegisterInfo";
import { createNamespacedHelpers } from "vuex";
import { mapMultiRowFields } from "vuex-map-fields";

const { mapActions } = createNamespacedHelpers("account/address");
const authMapper = createNamespacedHelpers("auth");
const accountMapper = createNamespacedHelpers("account");
export default {
  components: {
    AuthRegisterInfo,
  },
  layout: "auth",
  computed: {
    ...authMapper.mapState(["user"]),
    ...accountMapper.mapState(["account"]),
    ...mapMultiRowFields("account/address", {
      accountMails: "accountMail",
    }),
  },
  mounted() {
    if (this.account) {
      this.getAccountMail(this.account.id);
    }
  },

  methods: {
    ...mapActions(["getAccountMail", "updateAccountMail"]),
    async updateMail() {
      const accountId = this.account.id;

      try {
        await Promise.all([
          this.accountMails.forEach((element) => {
            const params = {
              isEnable: element.isEnable,
            };
            this.updateAccountMail({
              accountId,
              mailSettingId: element.emailMagazineId,
              params,
            });
          }),
        ]);
        this.$toasted.success("更新しました");
      } catch (error) {
        this.$toasted.error(error.message);
      }
    },
  },
};
</script>
