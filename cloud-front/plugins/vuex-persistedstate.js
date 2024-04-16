// import createPersistedState from "vuex-persistedstate";
// import * as Cookies from "js-cookie";
// import cookie from "cookie";

// export default ({ store, req }) => {
//   const persistedStateConfigs = [
//     {
//       key: "cloud-funding-frontend-data",
//       paths: ["auth.user"],
//       storage: {
//         getItem: (key) => {
//           if (process.server && req.headers.cookie) {
//             const parsedCookies = cookie.parse(req.headers.cookie);
//             if (parsedCookies) return parsedCookies[key];
//           } else {
//             return Cookies.get(key);
//           }
//         },
//         setItem: (key, value) =>
//           Cookies.set(key, value, { expires: 365, secure: false }),
//         removeItem: (key) => Cookies.remove(key),
//       },
//     },
//   ];

//   persistedStateConfigs.forEach((config) => {
//     createPersistedState(config)(store);
//   });
// };
