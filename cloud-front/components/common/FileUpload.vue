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
      <SvgUpload class="cursor-pointer" />
      <div class="card-body">
        <input
          id="form2"
          ref="fileInput"
          class="d-none"
          type="file"
          :accept="fileAccept"
          @change="selectImgFile"
        />
        <h4 class="card-title cursor-pointer">Drag and Drop</h4>
        <b-button variant="primary" type="button" class="card-title mt-1"
          >select</b-button
        >
      </div>
    </div>
    <div
      v-else
      :style="{ 'background-image': `url(${src})` }"
      class="card-upload card-uploaded"
    >
      <div class="card-body">
        <div class="closed cursor-pointer" @click="removeImage">
          <SvgClose class="icon-close"></SvgClose>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SvgUpload from "@/components/common/svg/SvgUpload.vue";
import SvgClose from "@/components/common/svg/SvgClose.vue";

export default {
  components: {
    SvgUpload,
    SvgClose,
  },
  props: {
    imageId: {
      type: String,
      default: () => "",
    },
  },

  data() {
    return {
      fileAccept:
        "image/png, image/jpeg, image/gif, image/jpg, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
      isDragging: false,
      src: null,
      placeholder: "https://www.youtube.com/watch? \n v=XXXXXXXXX or vimeo",
    };
  },

  computed: {},

  watch: {
    imageId(value) {
      if (value) {
        this.src = this.imageId;
      }
    },
  },

  mounted() {
    if (this.imageId) {
      this.src = this.imageId;
    }
  },

  methods: {
    chooseFile() {
      this.$refs.fileInput.click();
    },

    selectImgFile(e, isDrop) {
      const fileInput = this.$refs.fileInput;
      const files = isDrop ? e.dataTransfer.files : fileInput.files;
      if (files && files[0]) {
        this.src = URL.createObjectURL(files[0]);
        this.$emit("upload", this.src);
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

    removeImage() {
      this.src = null;
      this.$emit("destroy");
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
