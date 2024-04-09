<template>
  <div class="d-flex">
    <div class="term-menu d-none d-xl-block mt-4">
      <b-card class="ml-4">
        <TermMenuTemplate
          v-for="(menuTerm, i) in menuTerms"
          :key="i"
          :index="i"
          :menu="menuTerm"
          :open="menuTerm.open"
          @toggleOpen="toggleOpen"
        ></TermMenuTemplate>
      </b-card>
    </div>
    <div class="container">
      <div class="term-description">
        <b-card class="mt-4 mb-4">
          <div class="term-border">
            <h3 class="text-center font-weight-bold mb-4">
              Kokode Tukuru利用規約
            </h3>
          </div>
          <h4 class="terms-content mt-4">
            「光文社クラウドファンディング 「
            <span>kokode TUKURU」</span>
            」利用規約
          </h4>
          <div class="p-4">
            <font
              v-for="(templates, index) in termRegistration"
              :key="index"
              class="body-terms"
            >
              <font class="header-terms"> {{ templates.head }} </font>
              <h4 :id="templates.hash" class="terms-content text-center mt-4">
                {{ templates.title }}
              </h4>
              <p class="mt-4 mb-4">
                {{ templates.headTerm }}
              </p>
              <font v-for="(item, i) in templates.rules" :key="i">
                <span :id="item.hash" class="font-term">{{ item.title }}</span>

                <font v-for="(items, idx) in item.service" :key="idx">
                  <p>
                    <strong class="text-strong font-weight-bold"
                      >{{ items.id }}. </strong
                    >{{ items.description }}
                  </p>
                  <font v-for="des in items.text" :key="des.id">
                    <p class="pl-2">{{ des.id }} {{ des.title }}</p>
                  </font>
                </font>
              </font>
            </font>
          </div>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import Registration from "@/helpers/termRegistration";
import termMenu from "@/helpers/termMenu";
import TermMenuTemplate from "@/components/term/TermMenuTemplate";
export default {
  components: {
    TermMenuTemplate,
  },
  data() {
    return {
      termRegistration: Registration,
      menuTerms: termMenu,
      checkContainer: false,
    };
  },
  mounted() {},

  methods: {
    toggleOpen(index) {
      this.menuTerms = this.menuTerms.map((menu, i) => {
        if (index === i) {
          menu.open = !menu.open;
        }
        return menu;
      });
    },
    goTo(params) {
      this.$router.push({ hash: `#${params}` });
    },
  },
};
</script>

<style lang="scss" scoped>
.term-description {
  display: flex;
}

.term-border {
  border-bottom: 1px solid #cccccc;
}
p {
  font-size: 16px;
  color: $grey-color;
  font-family: "Hiragino Kaku Gothic ProN", "ヒラギノ角ゴ ProN W3", Meiryo,
    "MS PGothic", Sans-serif;
  @include max-width(lg) {
    font-size: 14px;
  }
}
.font-term {
  font-size: 20px;
  font-weight: bold;
  color: $grey-color;
}

.terms-content {
  font-weight: bold;
  color: $grey-color;
  @include max-width(lg) {
    font-size: 18px;
  }
}

.header-terms {
  font-size: 16px;
  color: $grey-color;
  font-family: "Hiragino Kaku Gothic ProN", "ヒラギノ角ゴ ProN W3", Meiryo,
    "MS PGothic", Sans-serif;
  @include max-width(lg) {
    font-size: 14px;
  }
}
::v-deep {
  .term-menu {
    position: sticky;
    width: 100%;
    width: inherit;
    top: 0;
  }
}

.text-strong {
  font-size: 16px;
  color: $grey-color;
}
</style>
