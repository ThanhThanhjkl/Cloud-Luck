<template>
  <div class="footer">
    <b-container fluid="xl">
      <div class="footer-footer">
        <div class="footer-copyright">
          <span>株式会社 光文社</span>
          <span> Copyright © 2022 Kobunsha Co., Ltd. All Rights Reserved.</span>
        </div>
      </div>
    </b-container>
  </div>
</template>

<style lang="scss" scoped>
.footer {
  background-color: $primary;
  color: white;
  padding-top: 40px;
  padding-bottom: 80px;
  margin-top: auto;

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
}
</style>
