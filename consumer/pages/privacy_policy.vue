<template>
  <div class="page-policy container pb-4">
    <b-card class="mt-4 mb-4">
      <h3 class="policy-main text-center font-weight-bold mb-4">
        プライバシーポリシー
      </h3>
      <ul class="policy-sub ml-3">
        <li
          v-for="(template, index) in privacyPolicy"
          :key="index"
          class="policy"
        >
          <h5 class="policy-title_main font-weight-bold">
            {{ template.head }}
          </h5>

          <span>{{ template.id }}</span>
          <a class="link" @click="clickTo(template.link)"
            >{{ template.title }}
          </a>
        </li>
      </ul>

      <div class="p-4">
        <h1>{{ policyAbout.index }}</h1>
        <ul
          v-for="(item, index) in policyAbout"
          :key="index"
          class="policy-about mt-4"
        >
          <li :id="item.hash" class="font-policy font-weight-bold">
            {{ item.id }} {{ item.title }}
          </li>
          <p>{{ item.description }}</p>
        </ul>
      </div>
    </b-card>
  </div>
</template>

<script>
import PolicyDescription from "@/helpers/policyDescription";
import policyAboutText from "@/helpers/policyAbout";
export default {
  data() {
    return {
      privacyPolicy: PolicyDescription,
      policyAbout: policyAboutText,
    };
  },

  methods: {
    clickTo(params) {
      this.$router.push({ hash: `#${params}` });
    },
  },
};
</script>
