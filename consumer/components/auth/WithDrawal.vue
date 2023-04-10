<template>
  <div>
    <b-card class="with-drawal-form">
      <div class="form-title text-center">退会</div>
      <div class="wrapped-content">
        <div class="note-description">
          SERVICE
          NAMEをご利用いただき、誠にありがとうございます。退会の手続きを行う場合は、下記事項を必ずご確認ください。
        </div>
        <div v-for="(item, index) in drawals" :key="index">
          <div class="supporter">
            <div class="drawal-title">{{ item.title }}</div>
            <div class="supporter-content">
              <ul>
                <li v-for="(data, indexData) in item.list" :key="indexData">
                  <span v-html="data.li"></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="btn-drawal submit-area">
        <button
          type="button"
          class="btn"
          @click.prevent="$refs.confirmModal.show()"
        >
          退会手続きを続ける
        </button>
      </div>
    </b-card>

    <ConfirmModal
      ref="confirmModal"
      @submit="handleWithDrawal()"
    ></ConfirmModal>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
import ConfirmModal from "@/components/common/ConfirmModal";

const { mapState, mapActions } = createNamespacedHelpers("auth");
export default {
  components: {
    ConfirmModal,
  },

  computed: {
    ...mapState(["user"]),

    userId() {
      if (this.user) return this.user.id;
      return null;
    },

    drawals() {
      return [
        {
          id: 1,
          title: "プロジェクトのサポーターになっている場合",
          list: [
            {
              li: `現在サポーターになっているプロジェクトがないか、<a href='/account/${this.userId}/donation'>応援したプロジェクト</a>をご確認ください。`,
            },
            {
              li: "退会をすることで、応援のキャンセルは行えません。",
            },
            {
              li: "退会した場合でもサポーター一覧ページにユーザー名とコメントは残ります。",
            },
            {
              li: "メッセージの送受信が行えなくなります。",
            },
          ],
        },
        {
          id: 2,
          title: "下記ページへのアクセスが行えなくなります",
          list: [
            {
              li: "アクティビティ",
            },
            {
              li: "お気に入り",
            },
            {
              li: "応援したプロジェクト",
            },
            {
              li: "投稿したプロジェクト",
            },
            {
              li: "メッセージの送受信",
            },
            {
              li: "その他ログインを必要とするページ",
            },
          ],
        },
        {
          id: 3,
          title: "メール通知やニュースレターが迷惑な場合",
          list: [
            {
              li: `メール通知やニュースレターを受け取りたくない場合は、<a href='/account/${this.userId}/email'>メール通知設定</a>より変更することができます`,
            },
          ],
        },
        {
          id: 4,
          title: "その他の注意事項",
          list: [
            {
              li: "同一のユーザー名の再取得はできません。",
            },
            {
              li: "マイページの情報は、ユーザー名以外が全て非表示となります。",
            },
          ],
        },
        {
          id: 5,
          title: "kokode TUKURUに関してご不満・ご不明点がある場合",
          list: [
            {
              li: "<a href='/contact'>お問い合わせ</a>よりご連絡ください。",
            },
          ],
        },
      ];
    },
  },
  methods: {
    ...mapActions(["deactivateUser", "resetUser"]),
    sorted() {},
    async handleWithDrawal() {
      try {
        await this.deactivateUser();
        this.resetUser();
        this.$toasted.success("削除しました");
        this.$router.push("/with_drawal/complete");
      } catch (error) {
        this.$toasted.error(error);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.with-drawal-form {
  .form-title {
    position: relative;
    font-size: 20px;
    font-weight: bold;
    padding-bottom: 16px;
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;

      width: 100%;
      height: 2px;
      background-color: $gray-03;
    }
  }

  @include min-width(md) {
    .wrapped-content {
      width: 90%;
      margin: auto;
    }
  }
  .card-body {
    padding: 24px 16px 57px 16px;
    width: 90%;
    margin: auto;
    @include max-width(sm) {
      width: 100%;
    }
  }
  .note-description {
    text-align: center;
    font-size: 13px;
    color: $gray-04;
    padding: 17px 0 20px 0;
    @include max-width(sm) {
      font-size: 11px;
      padding: 17px 16px;
    }
  }
  .drawal-title {
    font-size: 13px;
    font-weight: bold;
    color: $primary;
    padding: 10px 0 11px 22px;
    background-color: $primary-06;
  }
  .supporter-content {
    font-size: 13px;
    padding: 17px 16px 10px 16px;
    ul {
      padding-left: 0;
      list-style: inside;
      li {
        line-height: 20px;
        &::marker {
          font-size: 5px;
        }
      }
    }
  }
  .btn-drawal {
    text-align: center;
    button {
      width: 90%;
      color: $gray-02;
      font-weight: medium;
      padding: 15px 0;
      border: 1px solid $gray-02;
      border-radius: 4px;
      max-width: 320px;
    }
  }
}
</style>
