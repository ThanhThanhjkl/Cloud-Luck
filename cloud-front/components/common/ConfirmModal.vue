<template>
  <b-modal
    ref="modal"
    hide-header
    ok-title="削除"
    cancel-title="キャンセル"
    ok-variant="danger"
    @ok="submit"
  >
    本当に削除しますか？
    <br />
    削除した情報は2度と復旧できません。
  </b-modal>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      value: null,
    };
  },
  methods: {
    show(value) {
      this.value = value;
      this.$refs.modal.show();
    },

    hide() {
      this.$refs.modal.hide();
    },

    submit() {
      this.$emit("submit", this.value);
      this.hide();
    },
  },
};
</script>
<style lang="scss" scoped>
.btn-cancel {
  background: #98cae1;
  border: transparent;
}

:v-deep {
  .modal-content {
    border-radius: 10px;

    @media (max-width: 768px) {
      width: 95%;
      margin-left: auto;
      margin-right: auto;
    }
  }
  .modal-dialog {
    max-width: 600px;
    .modal-body {
      padding: 85px 60px;
      text-align: center;

      @media (max-width: 768px) {
        padding: 50px 30px;
      }
      .modal-title {
        margin-bottom: 50px;
        @media (max-width: 768px) {
          margin-bottom: 30px;
        }
      }

      .modal-action {
        display: grid;
        grid-template-columns: auto;
        grid-gap: 15px;
        justify-content: center;
        button {
          max-width: 280px;
          border-radius: 100px;
          padding: 10px 90px;
          white-space: nowrap;
          color: white;
        }
      }
    }
  }
}
</style>
