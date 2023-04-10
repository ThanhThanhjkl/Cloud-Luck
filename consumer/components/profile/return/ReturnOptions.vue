<template>
  <div>
    <div v-for="(option, optionIndex) in optionsList" :key="optionIndex">
      <b-card class="return-options-area">
        <div class="head-colap d-flex">
          <p>オプションタイトル</p>
          <button class="btn-remove" @click.prevent="removeOption(optionIndex)">
            <SvgClosePrimery class="mr-1" />
            削除
          </button>
        </div>
        <div class="input-money">
          <b-input
            v-model="option.title"
            type="text"
            placeholder="（例）サイズをお選びください"
            required
            @input="$emit('input', optionsList)"
          ></b-input>
        </div>
        <div class="head-colap">
          <p>オプションタイトル</p>
        </div>
        <div
          v-for="(type, index) in option.items"
          :key="index"
          class="delete-idear d-flex align-items-center"
        >
          <div class="input-money input-small d-flex">
            <b-input
              v-model="type.title"
              type="text"
              placeholder="（例）サイズの種類"
              required
              @input="$emit('input', optionsList)"
            ></b-input>
          </div>
          <button
            v-if="option.items && option.items.length > 2"
            class="btn-remove"
            @click.prevent="removeType(optionIndex, index)"
          >
            <SvgCloseBlack />
          </button>
        </div>
        <button
          class="btn-submit d-flex text-primary"
          @click.prevent="addType(optionIndex)"
        >
          <SvgPlus />
          種類を追加
        </button>
      </b-card>
    </div>

    <button type="button" class="box-back col-9 col-lg-12" @click="addOption">
      <SvgAddBorder class="mr-2" /> オプションを追加する
    </button>
    <span>{{ addOptionTitle }}</span>
  </div>
</template>
<script>
import SvgClosePrimery from "@/components/common/svg/SvgClosePrimery";
import SvgCloseBlack from "@/components/common/svg/SvgCloseBlack";
import SvgPlus from "@/components/common/svg/SvgPlus";
import SvgAddBorder from "@/components/common/svg/SvgAddBorder.vue";
import _ from "lodash";

export default {
  components: {
    SvgClosePrimery,
    SvgCloseBlack,
    SvgPlus,
    SvgAddBorder,
  },

  props: {
    options: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      addOptionTitle:
        "※ 色やサイズ、その他の選択肢がある場合に設定してください\n ※ 追加できるオプションは5つまでです。\n ※ オプションの内容はプロジェクト終了後にダウンロードできるCSVファイルで確認できます。",
      optionsList: [
        {
          items: [
            {
              title: "",
            },
          ],
          title: "",
        },
      ],
      types: [],
    };
  },

  watch: {
    options(value) {
      if (value) {
        this.optionsList = _.cloneDeep(this.options);
      }
    },
  },

  methods: {
    addType(optionIndex) {
      this.optionsList[optionIndex].items.push({ title: "" });
    },

    removeType(optionIndex, index) {
      const array = this.optionsList[optionIndex].items;
      array.splice(index, 1);
    },

    addOption() {
      // TODO
      this.optionsList.push({
        items: [
          {
            title: "",
          },
        ],
        title: "",
      });
    },

    removeOption(optionIndex) {
      this.optionsList.splice(optionIndex, 1);
    },
  },
};
</script>
<style lang="scss" scoped>
.btn-remove {
  padding: 0;
  background: transparent;
  width: fit-content;
  height: fit-content;
  border: none;
}
</style>
