<template>
  <div class="card-upload-small">
    <div
      v-if="!src"
      :style="{ 'background-image': `url(${src})` }"
      class="card-upload"
      :class="{ dragging: isDragging }"
      @click="chooseFile"
      @dragover="dragover"
      @dragleave="dragleave"
      @drop="drop"
    >
      <div v-if="id" class="notification">{{ id }}</div>
      <SvgUpload class="cursor-pointer" />
      <div class="card-body">
        <input
          id="form2"
          ref="fileInput"
          class="d-none"
          type="file"
          :accept="acceptFile"
          :readonly="readonly"
          @change="selectImgFile"
        />
        <h4 class="card-title cursor-pointer">ドラッグ＆ドロップ</h4>
        <b-button
          :disabled="readonly"
          variant="primary"
          type="button"
          class="card-title mt-1"
          >画像を選択</b-button
        >
      </div>
    </div>
    <div
      v-else
      :style="{ 'background-image': `url(${src})` }"
      class="card-upload card-uploaded"
    >
      <div class="card-body">
        <div
          v-if="!readonly"
          class="closed cursor-pointer"
          @click="removeImage"
        >
          <SvgClose class="icon-close"></SvgClose>
        </div>
      </div>
    </div>
    <div v-if="errors" class="validation">
      {{ errors }}
    </div>
  </div>
</template>
<script>
import SvgUpload from "@/components/common/svg/SvgUpload.vue";
import SvgClose from "@/components/common/svg/SvgClose.vue";

import { createNamespacedHelpers } from "vuex";
const { mapActions, mapGetters } = createNamespacedHelpers("global");

export default {
  components: {
    SvgUpload,
    SvgClose,
  },
  props: {
    id: {
      type: Number,
      default: 0,
    },
    imageId: {
      type: String,
      default: () => "",
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: null,
    },
    acceptFile: {
      type: String,
      default:
        "image/png, image/jpeg, image/gif, image/jpg, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
    },
  },

  data() {
    return {
      fileAccept:
        "image/png, image/jpeg, image/gif, image/jpg, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
      isDragging: false,
      image: {},
      src: null,
      placeholder: "https://www.youtube.com/watch? \n v=XXXXXXXXX or vimeo",
    };
  },

  computed: {
    errors() {
      return this.getErrors()(this.name);
    },
  },

  watch: {
    async imageId(value) {
      if (value) {
        this.src = await this.getImage(this.imageId);
      }
    },
  },

  async mounted() {
    if (this.imageId) {
      this.src = await this.getImage(this.imageId);
    }
  },

  methods: {
    ...mapActions(["postImage", "getImage", "deleteImage"]),

    ...mapGetters(["getErrors"]),

    chooseFile() {
      if (this.readonly) {
        return false;
      }
      this.$refs.fileInput.click();
    },

    async selectImgFile(e, isDrop) {
      if (this.readonly) {
        return false;
      }

      const fileInput = this.$refs.fileInput;
      const files = isDrop ? e.dataTransfer.files : fileInput.files;
      if (files && files[0]) {
        this.image = await this.postImage(files[0]);
        this.$emit("upload", this.image.body.id);
      }
    },

    dragover(e) {
      e.preventDefault();
      this.isDragging = true;
    },
    dragleave() {
      this.isDragging = false;
    },
    drop(e) {
      e.preventDefault();
      this.selectImgFile(e, true);
      this.isDragging = false;
    },

    async removeImage() {
      if (this.readonly) {
        return false;
      }
      if (this.imageId) {
        await this.deleteImage(this.imageId);
        this.src = null;
        this.$emit("destroy", this.imageId);
      } else if (this.image.body && this.image.body.id) {
        await this.deleteImage(this.image.body.id);
        this.src = null;
        this.$emit("destroy", this.image.body.id);
      } else {
        this.$emit("destroy");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.validation {
  width: 100%;
  margin-top: 0.25rem;
  font-size: 80%;
  color: #dc3545;
}

.card-upload {
  margin: 0;
  background: #f6fcff 0% 0% no-repeat padding-box;
  border: 2px dashed #cccccc;
  border-radius: 4px;
  text-align: center;
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 120px;
  background-position: center;
  @include min-width(md) {
    min-height: 152px;
    padding: 20px;
  }

  &.dragging {
    background-color: #f5fcff;
    opacity: 0.25;
    border: 2px dashed #1c8adb;
  }

  svg {
    width: 32px;
    height: 26px;
    margin-top: 12px;
    opacity: 0.5;
  }
  .card-body {
    padding-top: 5px;
    padding-bottom: 12px;
    .card-title {
      font-size: 10px;
      color: #466cb0;
      margin-bottom: 0;
    }
    button {
      font-size: 10px;
      padding: 5px 20px;
      color: #466cb0;
      background-color: #ffffff;
      border: 1px solid #ceddf8;
      border-radius: 4px;
    }
  }
}
</style>
