<template>
  <div class="footer">
    <b-container fluid="xl">
      <div v-if="showTopAndBodyFooter" class="footer-header">
        <nuxt-link class="footer-title text-white" to="/"
          >CloudFunding
        </nuxt-link>
        <ul class="footer-menu links">
          <li v-for="(item, index) in menu" :key="index">
            <a v-if="item.target" :href="item.url" target="_blank">
              {{ item.text }}
            </a>
            <nuxt-link v-else :to="item.url">{{ item.text }}</nuxt-link>
          </li>
        </ul>
        <ul class="footer-menu social">
          <a href="#" target="_blank">
            <svg-mail></svg-mail>
          </a>
          <a href="https://twitter.com/koko_tuku" target="_blank">
            <svg-twitter></svg-twitter>
          </a>
          <a href="https://www.facebook.com/kokotuku/" target="_blank">
            <svg-facebook-white width="31px" height="35px"></svg-facebook-white>
          </a>
          <a href="https://www.instagram.com/koko_tuku/" target="_blank">
            <svg-instagram></svg-instagram>
          </a>
          <a href="#" target="_blank">
            <svg-line></svg-line>
          </a>
          <a href="https://www.tiktok.com/@koko_tuku" target="_blank">
            <svg-tiktok></svg-tiktok>
          </a>
        </ul>
      </div>

      <div v-if="showTopAndBodyFooter" class="footer-body">
        <a
          href="https://www.kobunsha.com"
          target="_blank"
          class="footer-external"
          >運営会社 <i class="mdi mdi-open-in-new"></i>
        </a>
      </div>

      <div class="footer-footer">
        <div class="footer-copyright">
          <span>株式会社 光文社</span>
          <span> Copyright © 2022 Kobunsha Co., Ltd. All Rights Reserved.</span>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
import SvgMail from "@/components/common/svg/SvgMail";
import SvgTwitter from "@/components/common/svg/SvgTwitter";
import SvgFacebookWhite from "@/components/common/svg/SvgFacebookWhite";
import SvgInstagram from "@/components/common/svg/SvgInstagram";
import SvgLine from "@/components/common/svg/SvgLine";
import SvgTiktok from "@/components/common/svg/SvgTiktok";

export default {
  components: {
    SvgMail,
    SvgTwitter,
    SvgFacebookWhite,
    SvgInstagram,
    SvgLine,
    SvgTiktok,
  },
  props: {
    simple: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      menu: [
        { id: 1, text: "利用規約", url: "/terms" },
        { id: 2, text: "個人情報の取り扱いについて", url: "/privacy_policy" },
        { id: 3, text: "特定商取引法に基づく表記", url: "/legal" },
        { id: 4, text: "ヘルプセンター", url: "/privacy_policy" },
        {
          id: 5,
          text: "お問合せ",
          url: "/contact",
        },
        {
          id: 6,
          text: "プライバシーポリシー ",
          url: "https://www.kobunsha.com/privacy/",
          target: "_blank",
        },
      ],
      screenWidth: 0,
    };
  },

  computed: {
    showTopAndBodyFooter() {
      return !(this.simple && this.screenWidth <= 768);
    },
  },

  mounted() {
    this.updateScreenWidth();
    this.onScreenResize();
  },

  methods: {
    onScreenResize() {
      window.addEventListener("resize", () => {
        this.updateScreenWidth();
      });
    },
    updateScreenWidth() {
      this.screenWidth = window.innerWidth;
    },
  },
};
</script>

<style lang="scss" scoped>
.footer {
  background-color: $primary;
  padding: 60px 0 60px 0;
  color: white;
  margin-top: auto;
  min-height: 400px;

  .footer-header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 40px;

    @include max-width(lg) {
      display: block;
      text-align: center;
    }

    .footer-title {
      font-size: 22px;
      font-family: "Open Sans";
      font-weight: 800;

      @include max-width(xl) {
        margin-bottom: 46px;
      }
    }

    .footer-menu {
      display: flex;
      align-items: center;
      justify-content: center;
      list-style: none;
      margin: 0;
      padding: 0;

      &.links {
        margin: auto;
        max-width: 50%;
        flex-wrap: wrap;
        @include max-width(md) {
          margin-top: 48px;
          display: grid;
          gap: 30px;
        }
        li {
          margin-bottom: 7px;
        }
      }

      &.social {
        a {
          margin-right: 25px;
          &:last-child {
            margin-right: 0;
          }
          svg {
            color: white;
            width: 32px;
          }
        }
      }

      @include max-width(lg) {
        margin-bottom: 40px;
        flex-wrap: wrap;

        &.social {
          > li {
            margin-bottom: 0;
          }

          i {
            font-size: 32px;
          }
        }
      }

      @include max-width(sm) {
        &.links {
          flex-direction: column;
        }
      }

      > li {
        padding: 0 8px;

        @include max-width(lg) {
          margin-bottom: 40px;
        }

        > a {
          color: white;
          font-size: 14px;
          white-space: nowrap;

          i {
            font-size: 24px;
            line-height: 1;
          }
        }
      }
    }
  }

  .footer-body {
    text-align: center;
    margin-bottom: 32px;

    .footer-external {
      display: inline-block;
      position: relative;
      background-color: #375ea4;
      font-size: 14px;
      color: #ffffff;
      padding: 20px 110px 20px 110px;

      i {
        position: absolute;
        right: 15px;
      }
    }
  }

  .footer-copyright {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
    font-weight: 100;
    line-height: 24px;
    letter-spacing: 1px;

    @include max-width(sm) {
      font-size: 10px;
    }
  }
  @include max-width(md) {
    padding: 60px 0;
  }
}
</style>
