import Vue from "vue";
import moment from "moment";

function formatNumber(number) {
  return number.toLocaleString();
}

function japanMoney(number) {
  if (!number) return "￥0";
  const formatter = new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
  });

  return formatter.format(number);
}

function cardDate(str) {
  if (str != null) {
    return str ? str.toString().replace(/\B(?=(\d{2})+(?!\d))/g, "/") : 0;
  }
  return "";
}

function numberFormat(value) {
  if (!value) return null;

  if (typeof value !== "number") {
    return value;
  }

  return value ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0;
}

function japanDate(date) {
  return new Date(date).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
}

function fullDateTime(date) {
  if (!date) return null;

  return moment(date).format("YYYY/MM/DD HH:mm:ss");
}

function remainDate(date) {
  const dateNew = moment(new Date());
  const endDate = moment(date);
  if (endDate.diff(dateNew, "days") < 0) {
    return 0;
  } else {
    return endDate.diff(dateNew, "days");
  }
}

Vue.filter("cardDate", cardDate);
Vue.filter("japanDate", japanDate);
Vue.filter("japanMoney", japanMoney);
Vue.filter("numberFormat", numberFormat);
Vue.filter("fullDateTime", fullDateTime);
Vue.filter("remainDate", remainDate);
Vue.filter("formatNumber", formatNumber);
