<template>
  <div class="topbar">
    <nav>
      <div class="navbar">
        <div class="container-xl nav-container">
          <input v-model="showMenu" class="checkbox" type="checkbox" name="" />
          <div class="hamburger 1122" @click="showMenu = !showMenu">
            <span class="line line1"></span>
            <span class="line line2"></span>
            <span class="line line3"></span>
          </div>

          <!-- SMALL MENU -->
          <div class="header-menu menu-items">
            <div class="opaciti-bg"></div>
            <div class="d-block d-lg-none">
              <span>MENU</span>
              <div class="inner rotate">kokodeTUKURU</div>
            </div>
            <div class="d-lg-none">
              <div class="menu-list">
                <li class="firt-list">
                  <SvgList class="d-inline-block d-lg-none" />
                  <nuxt-link v-if="userId" to="/">設定</nuxt-link>
                  <nuxt-link
                    v-else
                    to="/auth/login"
                    @click.native="showMenu = false"
                  >
                    ログイン / 新規登録
                  </nuxt-link>
                </li>
                <li class="second-list">
                  <SvgList class="d-inline-block d-lg-none" />
                  <nuxt-link
                    :to="`/account/${accountId}`"
                    @click.native="showMenu = false"
                  >
                    My Account
                  </nuxt-link>
                </li>
                <div v-if="userId">
                  <li
                    v-for="(item, index) in primaryTree"
                    :key="'primary' + index"
                  >
                    <component
                      :is="item.svg"
                      class="d-inline-block d-lg-none"
                    ></component>
                    <div class="d-none d-lg-inline-block mr-1 ml-1">/</div>
                    <nuxt-link
                      :to="`/account/${accountId}/${item.url}`"
                      @click.native="showMenu = false"
                      >{{ item.text }}</nuxt-link
                    >
                  </li>
                </div>

                <li v-for="(item, index) in secondaryMenu" :key="index">
                  <SvgList class="d-inline-block d-lg-none" />
                  <div class="d-none d-lg-inline-block mr-1 ml-1">/</div>
                  <a v-if="item.blank" :href="item.link" target="_blank">{{
                    item.text
                  }}</a>
                  <nuxt-link
                    v-else
                    :to="item.link"
                    @click.native="showMenu = false"
                    >{{ item.text }}</nuxt-link
                  >
                </li>

                <li>
                  <SvgHome />
                  <nuxt-link to="/" @click.native="showMenu = false">
                    トップページ
                  </nuxt-link>
                </li>
                <li>
                  <SvgLogout />
                  <b-button variant="white" @click="onLogout">
                    サインアウト
                  </b-button>
                </li>
              </div>
            </div>
          </div>

          <!-- BIG MENU -->
          <div class="d-none d-md-flex align-items-center">
            <div class="select-project mr-3">
              <nuxt-link to="/consultation" class="text-white">
                Create Projects
              </nuxt-link>
            </div>

            <nuxt-link
              :to="`/account/${accountId}`"
              class="btn btn-project btn-top-bar"
            >
              My Account</nuxt-link
            >
          </div>
          <nuxt-link
            v-if="!userId"
            to="/auth/login"
            class="btn btn-login btn-top-bar ml-3"
          >
            ログイン / 新規登録
          </nuxt-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

import SvgList from "@/components/common/svg/SvgList.vue";

import SvgHome from "@/components/common/svg/SvgHome.vue";
import SvgLogout from "@/components/common/svg/SvgLoggout.vue";
import primaryMenu from "@/helpers/primaryMenu";
const { mapState, mapActions } = createNamespacedHelpers("auth");

export default {
  components: {
    SvgList,
    SvgHome,
    SvgLogout,
  },
  data() {
    return {
      windowWidth: null,
      showMenu: false,
      primaryTree: primaryMenu,
      secondaryMenu: [
        { id: 1, text: "利用規約", link: "/terms" },
        { id: 2, text: " 個人情報取扱いについて", link: "/privacy_policy" },
        { id: 3, text: " 特定商取引法に基づく表記", link: "/legal" },
        {
          id: 4,
          text: " ヘルプセンター",
          link: "/privacy_policy",
        },
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
          text: "Create Projects",
          link: "/consultation",
        },
      ],
    };
  },

  computed: {
    isMobile() {
      return this.windowWidth <= 768;
    },
    ...mapState(["userId"]),
    path() {
      return this.$route.path;
    },

    accountId() {
      if (this.userId) {
        return this.userId;
      } else {
        return null;
      }
    },
  },

  mounted() {
    this.windowWidth = window.innerWidth;
    window.addEventListener("resize", () => {
      this.windowWidth = window.innerWidth;
    });
  },

  methods: {
    ...mapActions(["accountLogout"]),
    onLogout() {
      if (this.user) {
        this.accountLogout();
      }
      this.$router.push("/auth/login");
      this.showMenu = false;
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

  @include min-width(md) {
    padding: 20px 0;
  }

  .container-xl {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    max-width: 1310px;
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

  .btn-top-bar {
    padding: 6px 25px !important;
    border-radius: 20px;
    white-space: nowrap !important;
    font-size: 14px !important;
    line-height: 17px;
    display: none;

    @include min-width(md) {
      display: block;
    }
  }

  .btn-login {
    color: $primary !important;
    background-color: white;
  }

  .select-project {
    cursor: pointer;
    position: relative;
    &::before {
      content: "";
      position: absolute;
      left: -20px;
      top: 5px;
      border: solid #759bdf;
      border-width: 0 3px 3px 0;
      display: inline-block;
      padding: 3px;
      transform: rotate(-45deg);
      -webkit-transform: rotate(-45deg);
    }
  }

  .btn-project {
    color: white;
    background-color: #d84646;
  }

  .hamburger {
    display: none;
    color: white;
    font-size: 32px;
    margin-right: auto;
  }

  @include max-width(md) {
    .hamburger {
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
      top: 80px;
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
      justify-content: flex-end;
      align-items: center;
      height: auto;
      li {
        list-style: none;
        border-radius: 0px 4px 4px 0px;
        &:hover {
          background-color: #d84646;
        }
      }
      // a {
      //   text-decoration: none;
      //   color: #0e2431;
      //   font-weight: 500;
      //   font-size: 1.2rem;
      //   padding: 0.7rem;
      //   &:hover {
      //     font-weight: bolder;
      //     color: #ffffff;
      //   }
      // }
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
        overflow: scroll;
        padding-top: 25px;
        margin-top: -25px;
        width: 100%;
        height: 100vh;
        transform: translate(-150%);
        display: block;
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
