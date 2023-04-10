<template>
  <div>
    <div class="pb-2">
      <b-button
        variant="light"
        class="btn-menu"
        @click="$emit('toggleOpen', index)"
      >
        <span v-if="!open" class="icon">+</span>
        <span v-else class="icon-hide">-</span>
      </b-button>
      <a
        class="text-bottom font-terms cursor-pointer"
        @click="goTo(menu.link)"
        >{{ menu.title }}</a
      >
    </div>
    <ul :class="open ? 'text-fo' : 'text'">
      <li v-for="(item, i) in menu.rules" :key="i">
        <font class="menu-title cursor-pointer" @click="goTo(item.link)">
          <span class="pl-2">{{ item.title }}</span>
        </font>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    menu: {
      type: Object,
      default: () => {},
    },
    index: {
      type: Number,
      default: 0,
    },
    open: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    goTo(params) {
      this.$router.push({ hash: `#${params}` });
    },
  },
};
</script>

<style lang="scss" scoped>
.text {
  display: none;
}
.text-fo {
  display: inline-block;
}

li {
  list-style-type: none;
}

.menu-title {
  cursor: pointer;
}

.icon {
  font-size: 16px;
}
.icon-hide {
  font-size: 20px;
}
</style>
