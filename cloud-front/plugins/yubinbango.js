import Vue from "vue";

const yubinbango = function (zipCode) {
  return new Promise(
    (resolve) =>
      new window.YubinBango.Core(zipCode, (address) => resolve(address))
  );
};

Vue.prototype.$yubinbango = yubinbango;
