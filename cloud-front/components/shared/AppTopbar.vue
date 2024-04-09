<template>
  <div class="topbar">
    <nav>
      <div class="navbar">
        <div class="container justify-content-center nav-container">
          <input v-model="showMenu" class="checkbox" type="checkbox" name="" />
          <div class="hamburger" @click="showMenu != showMenu">
            <span class="line line1"></span>
            <span class="line line2"></span>
            <span class="line line3"></span>
          </div>
          <div class="header-menu px-5 menu-items">
            <div class="opaciti-bg"></div>
            <div class="d-block d-lg-none">
              <span>MENU</span>
              <div class="inner rotate">kokodeTUKURU</div>
            </div>
            <div v-if="!user" class="menu-list">
              <li class="firt-list" @click="unlogined = false">
                <SvgList class="d-inline-block d-lg-none" /><a href="#"
                  >ログイン / 新規登録</a
                >
              </li>
              <li class="second-list" @click="unlogined = false">
                <SvgList class="d-inline-block d-lg-none" /><a href="#"
                  >プロジェクトをはじめる</a
                >
              </li>
              <li v-for="(item, index) in secondaryMenu" :key="index">
                <SvgList class="d-inline-block d-lg-none" />
                <div class="d-none d-lg-inline-block mr-2 ml-2">/</div>
                <a v-if="item.blank" :href="item.link" target="_blank">{{
                  item.text
                }}</a>
                <nuxt-link v-else :to="item.link">{{ item.text }}</nuxt-link>
              </li>
              <li><SvgHome /><a href="/">トップページ</a></li>
            </div>
            <div v-else class="menu-list">
              <li class="firt-list">
                <SvgList class="d-inline-block d-lg-none" />
                <a href="#">設定</a>
              </li>
              <li class="second-list">
                <SvgList class="d-inline-block d-lg-none" /><a
                  href="#"
                  @click="nextClose"
                  >プロジェクトをはじめる</a
                >
              </li>
              <li v-for="(item, index) in primaryMenu" :key="'primary' + index">
                <component
                  :is="item.svg"
                  class="d-inline-block d-lg-none"
                ></component>
                <div class="d-none d-lg-inline-block mr-1 ml-1">/</div>
                <nuxt-link :to="`/account/${user.id}/${item.url}`">{{
                  item.text
                }}</nuxt-link>
              </li>
              <li v-for="(item, index) in secondaryMenu" :key="index">
                <SvgList class="d-inline-block d-lg-none" />
                <div class="d-none d-lg-inline-block mr-1 ml-1">/</div>
                <nuxt-link :to="item.link">{{ item.text }}</nuxt-link>
              </li>
              <li><SvgHome /><a href="#">トップページ</a></li>
              <li>
                <SvgLogout /><a href="#" @click="user = !user">サインアウト</a>
              </li>
            </div>
          </div>
          <nuxt-link v-if="!user" to="/auth/login" class="btn btn-login">
            ログイン / 新規登録
          </nuxt-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import SvgUser from "@/components/common/svg/SvgUserPri.vue";
import SvgList from "@/components/common/svg/SvgList.vue";
import SvgLocked from "@/components/common/svg/SvgLocked.vue";
import SvgMap from "@/components/common/svg/SvgMapPri.vue";
import SvgMail from "@/components/common/svg/SvgMailPri.vue";
import SvgMoney from "@/components/common/svg/SvgMoney.vue";
import SvgArlert from "@/components/common/svg/SvgArlert.vue";
import SvgHome from "@/components/common/svg/SvgHome.vue";
import SvgLogout from "@/components/common/svg/SvgLoggout.vue";

const { mapState } = createNamespacedHelpers("auth");
export default {
  components: {
    SvgList,
    SvgHome,
    SvgLogout,
  },
  data() {
    return {
      unlogined: true,
      primaryMenu: [
        {
          id: 1,
          svg: SvgUser,
          text: "プロフィール編集",
          url: "profile",
        },
        {
          id: 2,
          svg: SvgLocked,
          text: " パスワード設定",
          url: "password",
        },
        {
          id: 3,
          svg: SvgMap,
          text: " お届け先の住所",
          url: "address",
        },
        {
          id: 4,
          svg: SvgMail,
          text: " メールマガジン受信設定",
          url: "email",
        },
        { id: 5, svg: SvgMoney, text: " 購入明細", url: "project" },
        {
          id: 6,
          svg: SvgArlert,
          text: " メール通知設定",
          url: "card",
        },
      ],
      secondaryMenu: [
        { id: 1, text: "利用規約", link: "/terms" },
        { id: 2, text: " 個人情報取扱いについて", link: "/privacy_policy" },
        { id: 3, text: " 特定商取引法に基づく表記", link: "/legal" },
        { id: 4, text: " ヘルプセンター", link: "/privacy_policy" },
        {
          id: 5,
          text: " お問合せ",
          link: "/contact",
        },
        {
          id: 6,
          text: " 運営会社について",
          link: "https://www.kobunsha.com",
          blank: true,
        },
        {
          id: 7,
          text: " プロジェクト掲載・相談フォーム",
          link: "/consultation",
        },
      ],
      CloseMenu: false,
    };
  },
  computed: {
    ...mapState(["user"]),
    path() {
      return this.$route.path;
    },
  },

  methods: {
    nextClose() {
      if (this.unlogined) {
        this.unlogined = false;
      } else {
        this.unlogined = true;
        this.CloseMenu = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.topbar {
  background-color: $primary;
  color: white;
  padding-top: 25px;
  font-size: 12px;
  line-height: 17px;

  .container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    max-width: 100% !important;
    input {
      display: none;
    }
  }

  .header-menu {
    position: relative !important;
    padding-left: 0 !important;
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    list-style: none;
    position: relative !important;
    .menu-list {
      display: flex;
    }
    li {
      a {
        color: #ffffff;
        width: 100%;
        padding: 0;
        margin: 0;
      }
    }
    .opaciti-bg {
      display: none;
    }
    @include max-width(lg) {
      position: fixed !important;
      top: 25px;
      .menu-list {
        display: unset;
        height: 90vh;
        overflow: scroll;
      }
      li {
        padding: 10px 30px;
        padding-right: 0 !important;
        margin-bottom: 5px !important;
        background-color: #ffffff;

        a {
          color: #333333;
          font-size: 14px;
          margin-left: 10px;
        }
      }
      .opaciti-bg {
        display: block;
        background-color: #466cb0;
        opacity: 0.8;
        position: absolute;
        z-index: -1;
        width: 51%;
        height: 130vh;
        right: 0;
        top: 0;
      }
      span {
        display: block;
        margin-left: 30px;
        margin-bottom: 11px;
        font-size: 14px;
        font-weight: 800;
        color: #466cb0;
      }
      .inner {
        top: 320px;
        right: -320px;
        font-weight: 800;
        font-size: 48px;
        position: absolute;
        color: #ffffff;
        opacity: 0.4;
      }
      .rotate {
        -moz-transform: translateX(-50%) translateY(-50%) rotate(90deg);
        -webkit-transform: translateX(-50%) translateY(-50%) rotate(90deg);
        transform: translateX(-50%) translateY(-50%) rotate(90deg);
      }
    }
  }

  .btn-login {
    color: $primary !important;
    font-size: 12px !important;
    line-height: 17px;
    background-color: white;
    padding: 5px 25px 5px 25px !important;
    border-radius: 20px;
    white-space: nowrap !important;
  }

  .hamburger {
    display: none;
    color: white;
    font-size: 32px;
    margin-right: auto;
  }

  @include max-width(lg) {
    .hamburger {
      display: block;
      height: 30px;
      width: 32px;
      position: absolute;
      top: -8px;
      left: 20px;
      z-index: 5;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      z-index: 4;
      .line {
        display: block;
        height: 2px;
        width: 100%;
        border-radius: 10px;
        background-color: #ffffff;
        @include max-width(md) {
          background: #466cb0;
        }
      }
      .line1 {
        transform-origin: 0% 0%;
        transition: transform 0.4s ease-in-out;
      }
      .line2 {
        transition: transform 0.2s ease-in-out;
        width: 80%;
      }
      .line3 {
        transform-origin: 0% 100%;
        transition: transform 0.4s ease-in-out;
      }
    }

    .header-menu {
      display: none;
    }
  }

  @include max-width(md) {
    position: absolute;
    background: none;
    width: 100%;

    .container {
      padding: 0;
    }

    .hamburger {
      position: absolute;
      left: 24px;
      color: $primary;
    }

    .btn-login {
      position: absolute;
      top: 60px;
      left: 50%;
      transform: translateX(-50%);
      white-space: nowrap;
      font-size: 14px;
    }
  }
}
@include max-width(lg) {
  .navbar {
    width: 100%;
    padding: 0 !important;
    .nav-container {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 60px;
      li {
        list-style: none;
        border-radius: 0px 4px 4px 0px;
        &:hover {
          background-color: #d84646;
        }
      }
      a {
        text-decoration: none;
        color: #0e2431;
        font-weight: 500;
        font-size: 1.2rem;
        padding: 0.7rem;
        &:hover {
          font-weight: bolder;
          color: #ffffff;
        }
      }
      .checkbox {
        position: absolute;
        display: block;
        height: 32px;
        width: 32px;
        top: -10px;
        left: 24px;
        z-index: 5;
        opacity: 0;
        cursor: pointer;
      }
      .menu-items {
        padding-right: 100px !important;
        padding-top: 25px;
        margin-top: -25px;
        // height: auto;
        height: 130vh;
        width: 100%;
        transform: translate(-150%);
        display: flex;
        flex-direction: column;
        padding-left: 50px;
        transition: transform 0.5s ease-in-out;
        text-align: left;
        z-index: 4;
        li {
          margin-bottom: 1.2rem;
          font-size: 14px;
          font-weight: 500;
          width: 280px;
          &:active,
          &:hover {
            width: 300px;
            color: white;
            svg {
              color: white;
            }
          }
        }

        .firt-list {
          background-color: #466cb0;
          a {
            color: #ffffff;
            margin-left: 15px;
          }
        }
        .second-list {
          background-color: #d84646;
          a {
            color: #ffffff;
            margin-left: 15px;
          }
        }
      }
    }
  }
  .nav-container input[type="checkbox"]:checked ~ .menu-items {
    transform: translateX(15px);
    z-index: 3;
    background: linear-gradient(to right, #eff5ff 49%, transparent 49%);
    // overflow: auto;
  }
  .nav-container input[type="checkbox"] ~ .menu-items {
    background: linear-gradient(to right, #eff5ff 49%, transparent 49%);
    // overflow: auto;
  }
  .nav-container input[type="checkbox"]:checked {
    position: absolute;
    left: unset;
    right: 16px;
  }
  .nav-container input[type="checkbox"]:checked ~ .hamburger {
    position: fixed;
    top: 20px;
    left: unset;
    right: 16px;
  }

  .nav-container input[type="checkbox"]:checked ~ .hamburger .line1 {
    transform: rotate(40deg);
    background-color: #ffffff;
  }

  .nav-container input[type="checkbox"]:checked ~ .hamburger .line2 {
    transform: scaleY(0);
  }

  .nav-container input[type="checkbox"]:checked ~ .hamburger .line3 {
    transform: rotate(-40deg);
    background-color: #ffffff;
  }
}
</style>
