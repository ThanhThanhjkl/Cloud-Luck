<template>
  <b-card class="return-plan-card">
    <template #header>
      <b-img class="w-100" src="@/assets/img/image_05.png" />
    </template>

    <div class="row no-gutters align-items-center">
      <div class="price">¥12,400</div>
      <div class="users">残り：100人まで</div>
    </div>

    <div>
      <b-button variant="crimson" block to="/project/1/buy"
        >このリターンを選択する</b-button
      >
    </div>

    <div class="card-text">
      つれづれなるまゝに、日暮らし、硯にむかひて、心にうつりゆくよしなし事を、そこはかとなく書きつくれば、あやしうこそものぐるほしけれ。
    </div>

    <b-card-sub-title>
      <span class="pr-3">
        <label>サポーター</label>
        <strong>1,849人</strong>
      </span>
      <span>
        <label>お届け予定</label>
        <strong>2022年9月頃</strong>
      </span>
    </b-card-sub-title>
  </b-card>
</template>

<script>
export default {};
</script>
