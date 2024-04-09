<template>
  <div class="eror-page">
    <b-container>
      <div class="head-eror">Sorry...</div>
      <div class="body-eror">
        <h1>404</h1>
        <hr />
        <h3>Not Found</h3>
        <p>エラー文言エラー文言エラー文言エラー文言 エラー文言エラー文言</p>
        <nuxt-link to="/">kokodeTUKURU トップ</nuxt-link>
      </div>
      <div class="footer-eror">
        <h3>kokodeTUKURU</h3>
        <p>
          株式会社 光文社 <br />
          Copyright © 2022 Kobunsha Co., Ltd. All Rights Reserved.
        </p>
      </div>
    </b-container>
  </div>
</template>
<style scoped lang="scss">
.eror-page {
  position: absolute;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  background-color: #466cb0;
  opacity: 0.9;
  z-index: 1;

  @include min-width(md) {
    opacity: 1;
  }

  .head-eror {
    text-align: center;
    font-size: 32px;
    font-weight: 800;
    margin-top: 80px;
    color: #ffffff;
  }
  .body-eror {
    text-align: center;
    color: #ffffff;
    h1 {
      font-size: 80px;
      font-weight: 800;
      margin-top: 40px;
    }
    hr {
      width: 70%;
      border-top: 4px solid #ffffff;
    }
    h3 {
      font-size: 23px;
      font-weight: 800;
      margin-bottom: 30px;
    }
    p {
      width: 85%;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 50px;
    }
    a {
      padding: 15px 63px;
      width: 80%;
      border: none;
      color: #466cb0;
      background-color: #ffffff;
      font-size: 18px;
      font-weight: medium;
      border-radius: 4px;
    }
  }
  .footer-eror {
    margin-top: 200px;
    text-align: center;
    h3 {
      font-size: 24px;
      font-weight: 800;
      color: #ffffff;
    }
    p {
      margin-left: auto;
      margin-right: auto;
      padding-top: 10px;
      font-size: 10px;
      font-weight: 300;
      color: #ffffff;
      letter-spacing: 1px;
    }
  }
}
</style>
