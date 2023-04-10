<template>
  <div class="project-report">
    <b-card>
      <div class="form-title text-center">活動報告</div>
      <div class="form">
        <form>
          <div class="product-info">
            <div class="info-content">
              <div class="product-img">
                <b-img fluid :src="imageSource" />
              </div>
            </div>
            <div class="product-title">
              {{ title }}
            </div>
          </div>
        </form>
      </div>
    </b-card>
    <h5 class="mt-5 text-center text-primary">あなたの想いを語りましょう</h5>
    <section class="mt-4">
      <ProjectEdit />
    </section>
  </div>
</template>
<script>
import ProjectEdit from "@/components/project/edit/ProjectEdit.vue";

import { get } from "lodash";
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("business/campaign");

export default {
  layout: "auth",
  components: {
    ProjectEdit,
  },

  computed: {
    ...mapState(["campaign"]),

    imageSource() {
      if (this.campaign) {
        const id = get(this.campaign, "visual.mainImage.id");
        return `${process.env.businessApiUrl}/file/${id}`;
      } else return null;
    },

    title() {
      return get(this.campaign, "detail.title");
    },
  },
};
</script>
