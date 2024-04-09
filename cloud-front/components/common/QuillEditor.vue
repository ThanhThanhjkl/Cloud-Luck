<template>
  <div>
    <client-only>
      <quill-editor
        ref="editor"
        :value="value"
        :options="editorOption"
        :disabled="readonly"
        @input="$emit('input', $event)"
      >
        <div id="toolbar" slot="toolbar">
          <select class="ql-header">
            <option selected>ノーマル</option>
            <option value="1">見出し 1</option>
            <option value="2">見出し 2</option>
            <option value="3">見出し 3</option>
            <option value="4">見出し 4</option>
            <option value="5">見出し 5</option>
            <option value="6">見出し 6</option>
          </select>
          <button class="ql-bold"></button>
          <button class="ql-italic"></button>
          <button class="ql-strike"></button>
          <select class="ql-align"></select>
          <button class="ql-link"></button>
          <button class="ql-custom-link" @click.stop="showCustomLink">
            <span>
              <svg width="20" height="20.001" viewBox="0 0 20 20.001">
                <path
                  d="M1509.8,1018.207a6.148,6.148,0,0,1,0-8.683l2.229-2.23a1.134,1.134,0,0,1,1.6,1.6l-2.23,2.23a3.872,3.872,0,0,0,5.476,5.477l2.23-2.229a1.133,1.133,0,1,1,1.6,1.6l-2.23,2.23a6.147,6.147,0,0,1-8.681,0Zm4.175-4.176a1.133,1.133,0,0,1,0-1.6l6.113-6.113a1.133,1.133,0,1,1,1.6,1.6l-6.113,6.113a1.133,1.133,0,0,1-1.6,0Zm8.4-1.323a1.133,1.133,0,0,1,0-1.6l2.229-2.23a3.872,3.872,0,0,0-5.477-5.477l-2.229,2.23a1.134,1.134,0,0,1-1.6-1.6l2.229-2.228a6.139,6.139,0,1,1,8.682,8.682l-2.229,2.23a1.133,1.133,0,0,1-1.6,0Z"
                  transform="translate(-1508 -1000)"
                  fill="#466cb0"
                />
              </svg>
            </span>
            <div
              v-if="customLink.visible"
              class="ql-modal"
              @click.stop
              @keyup.space.prevent
            >
              <input
                v-model="customLink.url"
                class="ql-input"
                placeholder="URL"
              />
              <input
                v-model="customLink.text"
                class="ql-input"
                placeholder="テキスト"
              />
              <div class="d-flex align-items-center justify-content-between">
                <label class="ql-checkbox">
                  <input v-model="customLink.openInNewTab" type="checkbox" />
                  <span>新しいタブで開く</span>
                </label>
                <span class="ql-url" @click="insertCustomLink">挿入</span>
              </div>
            </div>
          </button>
          <button type="button" @click.stop="chooseFile">
            <input
              id="form2"
              ref="fileInput"
              class="d-none"
              type="file"
              accept="image/png, image/jpeg, image/gif, image/jpg"
              @change="selectImgFile"
            />
            <svg width="21" height="17.25" viewBox="0 0 21 17.25">
              <path
                d="M1508,1016.25V1000h20v16.25Zm2.5-2.5h1.25l3.75-5,1.98,2.641,4.27-5.089,3.75,4.47V1002.5h-15Zm1.251-7.5A1.25,1.25,0,1,1,1513,1007.5,1.249,1.249,0,0,1,1511.751,1006.25Z"
                transform="translate(-1507.5 -999.5)"
                fill="#466cb0"
              ></path>
            </svg>
          </button>
          <button class="ql-video"></button>
        </div>
      </quill-editor>
    </client-only>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("global");
export default {
  props: {
    value: {
      type: String,
      default: "",
    },

    placeholder: {
      type: String,
      default: "",
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      customLink: {
        visible: false,
        url: "",
        text: "",
        openInNewTab: false,
        index: 0,
        length: 0,
      },
    };
  },

  computed: {
    editorOption() {
      return {
        modules: {
          toolbar: "#toolbar",
        },
        placeholder: this.placeholder,
      };
    },
  },

  methods: {
    ...mapActions(["postImage", "getImage"]),
    chooseFile() {
      if (this.readonly) {
        return false;
      }
      this.$refs.fileInput.click();
    },

    async selectImgFile() {
      if (this.readonly) {
        return false;
      }
      const fileInput = this.$refs.fileInput;
      const files = fileInput.files;

      if (files && files[0]) {
        this.image = await this.postImage(files[0]);
        const url = await this.getImage(this.image.body.id);
        this.insertImage(url);
      }
    },

    insertImage(url) {
      const editor = this.$refs.editor.quill;
      editor.focus();
      const selection = editor.getSelection();
      editor.insertEmbed(selection.index, "image", url);
    },

    showCustomLink() {
      const editor = this.$refs.editor.quill;
      editor.focus();

      const selection = editor.getSelection();
      const format = editor.getFormat();
      const text = editor.getText();
      const leaf = editor.getLeaf(selection.index);

      const linkText = format.link
        ? leaf[0].domNode.textContent
        : text.substr(selection.index, selection.length);

      this.customLink = {
        visible: true,
        url: format.link || "",
        text: linkText,
        openInNewTab: false,
        index: format.link ? editor.getIndex(leaf[0]) : selection.index,
        length: format.link
          ? leaf[0].domNode.textContent.length
          : selection.length,
      };
    },

    insertCustomLink(e) {
      if (this.readonly) {
        return false;
      }
      e.stopPropagation();
      const editor = this.$refs.editor.quill;
      editor.focus();

      editor.deleteText(this.customLink.index, this.customLink.length);
      editor.pasteHTML(
        this.customLink.index,
        `<a href="${this.customLink.url}" rel="noopener noreferrer" ${
          this.customLink.openInNewTab ? 'target="_blank"' : ""
        }>${this.customLink.text}</a>`
      );

      this.customLink.visible = false;
    },
  },
};
</script>

<style lang="scss">
.quill-editor {
  border: 2px solid #759bdf;
  background: white;
  border-radius: 4px;
  padding: 6px;

  .ql-toolbar.ql-snow {
    border: none;
    border-bottom: 1px solid #ccc;
  }

  .ql-container.ql-snow {
    border: none;
  }

  .ql-snow {
    &.ql-toolbar button,
    .ql-toolbar button,
    .ql-picker {
      @include flex-center;
      width: 36px;
      height: 36px;
      margin-right: 2px;
      border-radius: 4px;

      svg {
        color: #466cb0;
      }

      &.ql-active,
      &:hover {
        background: #d8f2ff;
      }
    }

    .ql-icon-picker .ql-picker-item {
      width: 36px;
      height: 36px;
    }

    .ql-picker.ql-expanded {
      .ql-picker-label {
        border: none;
        background: #d8f2ff;

        .ql-stroke {
          stroke: #466cb0;
        }
      }

      .ql-picker-options {
        border: none;
        border-radius: 4px;
      }
    }

    .ql-stroke {
      stroke: #466cb0;
    }

    .ql-fill,
    .ql-stroke.ql-fill {
      fill: #466cb0;
    }

    .ql-picker-label {
      @include flex-center;
      border: none;
      border-radius: 4px;
      padding-left: 0;
    }

    // HEADING
    .ql-picker.ql-header {
      .ql-picker-label {
        svg {
          display: none;
        }

        &::before {
          content: "" !important;
          width: 16px;
          height: 19px;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='19.118' viewBox='0 0 16 19.118'%3E%3Cpath d='M66.651 386.4H63.928a1.136 1.136 0 0 0-.133-.028 1.1 1.1 0 0 0-.135.028H58.654a1.135 1.135 0 0 0-.133-.028 1.1 1.1 0 0 0-.135.028H57.091a5.133 5.133 0 0 0-5.122 5.122 5.355 5.355 0 0 0 5.191 5.357c.015 0 .028-.008.042-.009v7.3a1.318 1.318 0 0 0 2.637 0V389.04h2.637v15.135a1.319 1.319 0 0 0 2.637 0V389.04h1.537a1.318 1.318 0 1 0 0-2.637Zm-9.448 7.85c-.015 0-.028-.008-.042-.008a2.729 2.729 0 0 1-2.554-2.72 2.5 2.5 0 0 1 2.485-2.485H57.2Z' transform='translate(-51.969 -386.375)' fill='%23466cb0' /%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: center center;
          margin-right: 5px;
        }

        &::after {
          content: "";
          width: 6px;
          height: 4px;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='6' height='4' viewBox='0 0 6 4'%3E%3Cpath d='M3 0 6 4H0Z' transform='translate(6 4) rotate(180)' fill='%23466cb0'/%3E%3C/svg%3E");
        }
      }

      .ql-picker-options {
        left: 0;
      }
    }

    // ALIGN
    .ql-picker.ql-align {
      .ql-picker-label {
        &::after {
          content: "";
          width: 6px;
          height: 4px;
          margin-left: 1px;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='6' height='4' viewBox='0 0 6 4'%3E%3Cpath d='M3 0 6 4H0Z' transform='translate(6 4) rotate(180)' fill='%23466cb0'/%3E%3C/svg%3E");
        }
      }

      .ql-picker-options {
        padding: 6px 12px;
        left: 0;

        .ql-picker-item {
          width: auto;
          height: auto;
          padding: 6px 0;
        }
      }
    }

    .ql-custom-link {
      position: relative;

      .ql-modal {
        font-size: 11px;
        width: 175px;
      }
    }

    .ql-modal {
      position: absolute;
      top: 100%;
      background: white;
      padding: 10px;
      border-radius: 4px;
      box-shadow: 0px 4px 8px #00000029;
      z-index: 1;
      font-size: 11px;
    }

    .ql-input {
      background: #efefef;
      margin-bottom: 10px;
      border-radius: 2px;
      padding: 6px 10px;
      border: none;
      display: block;
      width: 100%;

      &::placeholder {
        color: #bbbbbb;
      }
    }

    .ql-checkbox {
      @include flex-center;
      color: #333333;
      margin-bottom: 0;
      cursor: pointer;
      position: relative;

      input[type="checkbox"] {
        margin-right: 0.5em;
        display: block;
        appearance: none;
        width: 1.45454545455em;
        height: 1.45454545455em;
        border: 2px solid #1d9afb;
        border-radius: 4px;

        &:checked + * {
          &::before {
            content: "";
            position: absolute;
            width: 0.28545454545em;
            height: 1.14272727273em;
            background: #d84646;
            transform: rotate(45deg);
            left: 0.93636363636em;
            top: 0;
            outline: 1px solid white;
          }

          &::after {
            content: "";
            position: absolute;
            width: 0.28545454545em;
            height: 0.57181818181em;
            background: #d84646;
            transform: rotate(-45deg);
            left: 0.43636363636em;
            top: 0.3909090909em;
          }
        }
      }
    }

    .ql-url {
      color: #1d9afb;
    }
  }
}
</style>
