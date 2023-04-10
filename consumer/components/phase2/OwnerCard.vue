<template>
  <b-card class="owner-card">
    <template #header>
      <b-avatar>
        <b-img fluid class="w-100" src="@/assets/img/author_avatar.png" />
      </b-avatar>
      <div>
        <div class="profile-name">プロジェクト・オーナー名がここに入ります</div>
        <div class="profile-address">
          <SvgLocation class="icon"></SvgLocation>
          <span>東京都</span>
        </div>
      </div>
    </template>
    <div class="mb-2">
      つれづれなるまゝに、日暮らし、硯にむかひて、心にうつりゆくよしなし事を、そこはかとなく書きつくれば、あやしうこそものぐるほしけれ。
    </div>
    <div>
      URL:
      <a href="https://www.kobunsha.com/" target="_blank">
        https://www.kobunsha.com/
      </a>
    </div>
  </b-card>
</template>

<script>
import SvgLocation from "@/components/common/svg/SvgLocation.vue";
export default { components: { SvgLocation } };
</script>
