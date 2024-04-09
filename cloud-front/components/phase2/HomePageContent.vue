<template>
  <div class="p2-homepage">
    <section class="section-top">
      <div class="section-banner">
        <div class="banner-header">
          <div class="console-container">
            <span id="text" class="banner-title"></span>
            <div id="console" class="console-underscore">&#95;</div>
          </div>
          <div class="banner-button wrap">
            <nuxt-link class="btn-banner" to="/consultation"
              >マイプロジェクト</nuxt-link
            >
          </div>
          <div class="section-header reveal-text">
            <h2 class="service-title">kokode TUKURU</h2>
            <h4 class="service-subtitle">TAGLINE</h4>
          </div>
        </div>
      </div>
    </section>

    <b-container fluid="xl">
      <section class="section-recommend">
        <div class="section-header">
          <h2 class="section-title">RECOMMEND</h2>
          <h4 class="section-subtitle">編集部ピックアップ</h4>
        </div>
        <b-row>
          <b-col lg="6" class="card-spacing">
            <TopCard
              v-for="(item, index) in recommend.slice(0, 1)"
              :key="index"
              :item="item"
              large
              @click="goToDetail"
            />
          </b-col>
          <b-col lg="6">
            <b-row>
              <b-col
                v-for="(item, index) in recommend.slice(1, 5)"
                :key="index"
                cols="6"
                class="card-spacing"
              >
                <TopCard :item="item" @click="goToDetail" />
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </section>

      <section class="section-shop">
        <div class="section-header">
          <h2 class="section-title">OFFICIAL SHOP</h2>
          <h4 class="section-subtitle">サービスから生まれた製品たち</h4>
        </div>

        <div class="gallery-wrapper">
          <div class="gallery">
            <div class="gallery-item">
              <img class="w-100" src="@/assets/img/image_02.png" />
            </div>
            <div class="gallery-item">
              <img class="w-100" src="@/assets/img/image_02.png" />
            </div>
            <div class="gallery-item">
              <img class="w-100" src="@/assets/img/image_02.png" />
            </div>
          </div>
        </div>

        <div class="gallery-pagination">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </section>

      <section class="section-line-up">
        <div class="section-header">
          <h2 class="section-title">LINE UP</h2>
          <h4 class="section-subtitle">ファンディング ラインナップ</h4>
          <div class="mx-auto">
            <b-form-select
              v-model="selected"
              :options="options"
            ></b-form-select>
          </div>
        </div>
        <b-row>
          <b-col lg="6" class="card-spacing">
            <FeatureCard
              v-for="(data, index) in lineUp.slice(0, 1)"
              :key="index"
              :data="data"
              large
            />
          </b-col>
          <b-col lg="6">
            <b-row class="h-100">
              <b-col
                v-for="(data, index) in lineUp.slice(1, 5)"
                :key="index"
                cols="6"
                class="card-spacing h-50"
              >
                <FeatureCard :data="data" />
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row class="mt-4">
          <b-col
            v-for="(data, index) in lineUp.slice(5, lineUp.length)"
            :key="index"
            cols="6"
            lg="3"
            class="card-spacing h-50"
          >
            <FeatureCard :data="data" />
          </b-col>
        </b-row>

        <div class="view-project">
          <div class="d-inline-block">
            <b-button type="submit" variant="primary" block class="btn-view"
              >すべてのプロジェクトを見る</b-button
            >
          </div>
        </div>
      </section>
    </b-container>
  </div>
</template>
<script>
import TopCard from "@/components/phase2/TopCard";
import FeatureCard from "@/components/phase2/FeatureCard";
export default {
  components: {
    TopCard,
    FeatureCard,
  },
  data() {
    return {
      recommend: [
        {
          id: 1,
          label: "VERY",
          type: "very",
          img: require("@/assets/img/image_03.png"),
          percent: 70,
          title:
            "フェーズフリーというコンセプトから生まれた本当に使える浄水器「SESERA」",
          price: "¥10,293,000",
          timeRemaining: "120日",
          supporter: "20,849人",
          author: "プロジェクト・オーナー名が入ります",
          isLiked: "false",
        },
        {
          id: 2,
          label: "Mart",
          type: "mart",
          img: require("@/assets/img/image_09.png"),
          percent: 120,
          title:
            "家庭菜園デビューに！特許技術でグングン成長！家庭菜園デビューに！特許技術でグン...",
          price: "¥10,293,000",
          timeRemaining: "120日",
          supporter: "20,849人",
          author: "プロジェクト・オーナー名が入ります",
          isLiked: "true",
        },
        {
          id: 3,
          label: "美st",
          type: "beauty",
          img: require("@/assets/img/image_06.png"),
          percent: 70,
          title:
            "家庭菜園デビューに！特許技術でグングン成長！家庭菜園デビューに！特許技術でグン...",
          price: "¥10,293,000",
          timeRemaining: "120日",
          supporter: "20,849人",
          author: "プロジェクト・オーナー名が入ります",
          isLiked: "true",
        },
        {
          id: 4,
          label: "女性自身",
          type: "women",
          img: require("@/assets/img/image_07.png"),
          percent: 120,
          title:
            "家庭菜園デビューに！特許技術でグングン成長！家庭菜園デビューに！特許技術でグン...",
          price: "¥10,293,000",
          timeRemaining: "120日",
          supporter: "20,849人",
          author: "プロジェクト・オーナー名が入ります",
          isLiked: "false",
        },
        {
          id: 5,
          label: "The Book",
          type: "book",
          img: require("@/assets/img/image_08.png"),
          percent: 70,
          title:
            "家庭菜園デビューに！特許技術でグングン成長！家庭菜園デビューに！特許技術でグン...",
          price: "¥10,293,000",
          timeRemaining: "120日",
          supporter: "20,849人",
          author: "プロジェクト・オーナー名が入ります",
          isLiked: "true",
        },
      ],
      lineUp: [
        {
          id: 1,
          img: require("@/assets/img/image_03.png"),
          percent: 70,
          title:
            "フェーズフリーというコンセプトから生まれた本当に使える浄水器「SESERA」",
          price: "¥10,293,000",
          timeRemaining: "120日",
          supporter: "20,849人",
          author: "プロジェクト・オーナー名が入ります",
          isLiked: "false",
        },
        {
          id: 2,
          img: require("@/assets/img/image_09.png"),
          percent: 120,
          title:
            "家庭菜園デビューに！特許技術でグングン成長！家庭菜園デビューに！特許技術でグン...",
          price: "¥10,293,000",
          timeRemaining: "120日",
          supporter: "20,849人",
          author: "プロジェクト・オーナー名が入ります",
          isLiked: "true",
        },
        {
          id: 3,
          img: require("@/assets/img/image_06.png"),
          percent: 70,
          title:
            "家庭菜園デビューに！特許技術でグングン成長！家庭菜園デビューに！特許技術でグン...",
          price: "¥10,293,000",
          timeRemaining: "120日",
          supporter: "20,849人",
          author: "プロジェクト・オーナー名が入ります",
          isLiked: "true",
        },
        {
          id: 4,
          img: require("@/assets/img/image_07.png"),
          percent: 120,
          title:
            "家庭菜園デビューに！特許技術でグングン成長！家庭菜園デビューに！特許技術でグン...",
          price: "¥10,293,000",
          timeRemaining: "120日",
          supporter: "20,849人",
          author: "プロジェクト・オーナー名が入ります",
          isLiked: "false",
        },
        {
          id: 5,
          img: require("@/assets/img/image_08.png"),
          percent: 70,
          title:
            "家庭菜園デビューに！特許技術でグングン成長！家庭菜園デビューに！特許技術でグン...",
          price: "¥10,293,000",
          timeRemaining: "120日",
          supporter: "20,849人",
          author: "プロジェクト・オーナー名が入ります",
          isLiked: "true",
        },
        {
          id: 6,
          img: require("@/assets/img/image_09.png"),
          percent: 120,
          title:
            "家庭菜園デビューに！特許技術でグングン成長！家庭菜園デビューに！特許技術でグン...",
          price: "¥10,293,000",
          timeRemaining: "120日",
          supporter: "20,849人",
          author: "プロジェクト・オーナー名が入ります",
          isLiked: "true",
        },
        {
          id: 7,
          img: require("@/assets/img/image_06.png"),
          percent: 70,
          title:
            "家庭菜園デビューに！特許技術でグングン成長！家庭菜園デビューに！特許技術でグン...",
          price: "¥10,293,000",
          timeRemaining: "120日",
          supporter: "20,849人",
          author: "プロジェクト・オーナー名が入ります",
          isLiked: "true",
        },
        {
          id: 8,
          img: require("@/assets/img/image_09.png"),
          percent: 120,
          title:
            "家庭菜園デビューに！特許技術でグングン成長！家庭菜園デビューに！特許技術でグン...",
          price: "¥10,293,000",
          timeRemaining: "120日",
          supporter: "20,849人",
          author: "プロジェクト・オーナー名が入ります",
          isLiked: "true",
        },
        {
          id: 9,
          img: require("@/assets/img/image_06.png"),
          percent: 70,
          title:
            "家庭菜園デビューに！特許技術でグングン成長！家庭菜園デビューに！特許技術でグン...",
          price: "¥10,293,000",
          timeRemaining: "120日",
          supporter: "20,849人",
          author: "プロジェクト・オーナー名が入ります",
          isLiked: "true",
        },
        {
          id: 10,
          img: require("@/assets/img/image_07.png"),
          percent: 120,
          title:
            "家庭菜園デビューに！特許技術でグングン成長！家庭菜園デビューに！特許技術でグン...",
          price: "¥10,293,000",
          timeRemaining: "120日",
          supporter: "20,849人",
          author: "プロジェクト・オーナー名が入ります",
          isLiked: "false",
        },
        {
          id: 11,
          img: require("@/assets/img/image_08.png"),
          percent: 70,
          title:
            "家庭菜園デビューに！特許技術でグングン成長！家庭菜園デビューに！特許技術でグン...",
          price: "¥10,293,000",
          timeRemaining: "120日",
          supporter: "20,849人",
          author: "プロジェクト・オーナー名が入ります",
          isLiked: "true",
        },
        {
          id: 12,
          img: require("@/assets/img/image_07.png"),
          percent: 120,
          title:
            "家庭菜園デビューに！特許技術でグングン成長！家庭菜園デビューに！特許技術でグン...",
          price: "¥10,293,000",
          timeRemaining: "120日",
          supporter: "20,849人",
          author: "プロジェクト・オーナー名が入ります",
          isLiked: "false",
        },
        {
          id: 13,
          img: require("@/assets/img/image_08.png"),
          percent: 70,
          title:
            "家庭菜園デビューに！特許技術でグングン成長！家庭菜園デビューに！特許技術でグン...",
          price: "¥10,293,000",
          timeRemaining: "120日",
          supporter: "20,849人",
          author: "プロジェクト・オーナー名が入ります",
          isLiked: "true",
        },
        {
          id: 14,
          img: require("@/assets/img/image_09.png"),
          percent: 120,
          title:
            "家庭菜園デビューに！特許技術でグングン成長！家庭菜園デビューに！特許技術でグン...",
          price: "¥10,293,000",
          timeRemaining: "120日",
          supporter: "20,849人",
          author: "プロジェクト・オーナー名が入ります",
          isLiked: "true",
        },
        {
          id: 15,
          img: require("@/assets/img/image_06.png"),
          percent: 70,
          title:
            "家庭菜園デビューに！特許技術でグングン成長！家庭菜園デビューに！特許技術でグン...",
          price: "¥10,293,000",
          timeRemaining: "120日",
          supporter: "20,849人",
          author: "プロジェクト・オーナー名が入ります",
          isLiked: "true",
        },
        {
          id: 16,
          img: require("@/assets/img/image_09.png"),
          percent: 120,
          title:
            "家庭菜園デビューに！特許技術でグングン成長！家庭菜園デビューに！特許技術でグン...",
          price: "¥10,293,000",
          timeRemaining: "120日",
          supporter: "20,849人",
          author: "プロジェクト・オーナー名が入ります",
          isLiked: "true",
        },
        {
          id: 17,
          img: require("@/assets/img/image_06.png"),
          percent: 70,
          title:
            "家庭菜園デビューに！特許技術でグングン成長！家庭菜園デビューに！特許技術でグン...",
          price: "¥10,293,000",
          timeRemaining: "120日",
          supporter: "20,849人",
          author: "プロジェクト・オーナー名が入ります",
          isLiked: "true",
        },
        {
          id: 18,
          img: require("@/assets/img/image_07.png"),
          percent: 120,
          title:
            "家庭菜園デビューに！特許技術でグングン成長！家庭菜園デビューに！特許技術でグン...",
          price: "¥10,293,000",
          timeRemaining: "120日",
          supporter: "20,849人",
          author: "プロジェクト・オーナー名が入ります",
          isLiked: "false",
        },
        {
          id: 19,
          img: require("@/assets/img/image_08.png"),
          percent: 70,
          title:
            "家庭菜園デビューに！特許技術でグングン成長！家庭菜園デビューに！特許技術でグン...",
          price: "¥10,293,000",
          timeRemaining: "120日",
          supporter: "20,849人",
          author: "プロジェクト・オーナー名が入ります",
          isLiked: "true",
        },
        {
          id: 20,
          img: require("@/assets/img/image_07.png"),
          percent: 120,
          title:
            "家庭菜園デビューに！特許技術でグングン成長！家庭菜園デビューに！特許技術でグン...",
          price: "¥10,293,000",
          timeRemaining: "120日",
          supporter: "20,849人",
          author: "プロジェクト・オーナー名が入ります",
          isLiked: "false",
        },
        {
          id: 21,
          img: require("@/assets/img/image_08.png"),
          percent: 120,
          title:
            "家庭菜園デビューに！特許技術でグングン成長！家庭菜園デビューに！特許技術でグン...",
          price: "¥10,293,000",
          timeRemaining: "120日",
          supporter: "20,849人",
          author: "プロジェクト・オーナー名が入ります",
          isLiked: "true",
        },
      ],
      selected: "1",
      options: [{ value: "1", text: "新着" }],
    };
  },
  mounted() {
    this.consoleText(
      [
        "つれづれなるまゝに",
        "日暮らし、硯にむかひて、心にうつりゆくよしなし事を、そこはかとなく書きつくれば、",
        "あやしうこそものぐるほしけれ。",
      ],
      "text",
      ["white", "white", "white"]
    );
  },
  methods: {
    goToDetail() {
      this.$router.push("/phase2/1");
    },
    consoleText(words, id, colors) {
      if (colors === undefined) colors = ["#fff"];
      let visible = true;
      const con = document.getElementById("console");
      let letterCount = 1;
      let x = 1;
      let waiting = false;
      const target = document.getElementById(id);
      target.setAttribute("style", "color:" + colors[0]);
      window.setInterval(function () {
        if (letterCount === 0 && waiting === false) {
          waiting = true;
          target.innerHTML = words[0].substring(0, letterCount);
          window.setTimeout(function () {
            const usedColor = colors.shift();
            colors.push(usedColor);
            const usedWord = words.shift();
            words.push(usedWord);
            x = 1;
            target.setAttribute("style", "color:" + colors[0]);
            letterCount += x;
            waiting = false;
          }, 1000);
        } else if (letterCount === words[0].length + 1 && waiting === false) {
          waiting = true;
          window.setTimeout(function () {
            x = -1;
            letterCount += x;
            waiting = false;
          }, 1000);
        } else if (waiting === false) {
          target.innerHTML = words[0].substring(0, letterCount);
          letterCount += x;
        }
      }, 120);
      window.setInterval(function () {
        if (visible === true) {
          con.className = "console-underscore hidden";
          visible = false;
        } else {
          con.className = "console-underscore";

          visible = true;
        }
      }, 400);
    },
  },
};
</script>
