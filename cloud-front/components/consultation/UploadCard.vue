<template>
  <!-- <div class="img-item">
    <label for="files" class="upload-image" v-if="!previewImage">
      <svg-picture></svg-picture>
      <span>{{ info }}</span>
      <b-button class="select-image">画像を選択</b-button>
    </label>
    <b-img class="dispay-img" v-else fluid :src="previewImage" />
    <input
      id="files"
      style="visibility: hidden"
      type="file"
      accept="image/jpeg/png"
      @change="uploadImage"
    />
  </div> -->
  <div
    v-if="previewImage == null"
    :style="{ 'background-image': `url(${previewImage})` }"
    class="upload-image"
    @click="handleClickAvatarFile"
  >
    <svg-picture></svg-picture>
    <span class="text-info">{{ info }}</span>
    <input
      ref="fileInput"
      style="display: none"
      type="file"
      @input="uploadImage"
    />
    <button ref="fileInputAvatar" class="select-image" @click="uploadImage">
      画像を選択
    </button>
  </div>
  <div
    v-else
    :style="{ 'background-image': `url(${previewImage})` }"
    class="card-upload card-uploaded"
  >
    <div class="card-body">
      <div class="closed" @click="previewImage = null">
        <SvgClose class="icon-close"></SvgClose>
      </div>
    </div>
  </div>
</template>
<script>
import SvgClose from "@/components/common/svg/SvgClose.vue";
import SvgPicture from "@/components/common/svg/SvgPicture";
export default {
  components: {
    SvgPicture,
    SvgClose,
  },
  props: {
    info: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      previewImage: null,
    };
  },
  methods: {
    handleClickAvatarFile() {
      this.$refs.fileInput.click();
    },
    uploadImage() {
      const fileInput = this.$refs.fileInput;
      const imgFile = fileInput.files;
      if (imgFile && imgFile[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.previewImage = e.target.result;
        };
        reader.readAsDataURL(imgFile[0]);
        this.$emit("fileInput", imgFile[0]);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.img-item {
  width: 50%;
}
.upload-image {
  width: 25%;
  // width: 100%;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  padding: 27px 0;
  border: 2px dashed $gray-03;
  border-radius: 4px;

  color: $primary;
  background-color: $primary-04;
  font-size: 10px;
  @include max-width(lg) {
    width: 50%;
  }
  span {
    padding: 5px 0 2px 0;
  }
  button.select-image {
    font-size: 12px;
    color: $primary;
    background-color: white;
    border: 1px solid $primary-11;
    border-radius: 4px;
    padding: 2px 30px;
  }
}
.dispay-img {
  width: 100%;
  object-fit: cover;
}

.text-info {
  font-size: 14px;
}
.card-body {
  position: relative;
  .closed {
    .icon-close {
      position: absolute;
      right: 6px;
      top: 6px;
      display: block;
      width: 12px;
      height: 12px;
      margin: 0;
      z-index: 10;
    }
  }
}
.card-upload.card-uploaded {
  width: 25%;
  height: 152px;
  border: unset;
  display: block;
  cursor: pointer;
  background-position: center center;
  background-size: cover;
  @include max-width(lg) {
    width: 50%;
  }
}
</style>
