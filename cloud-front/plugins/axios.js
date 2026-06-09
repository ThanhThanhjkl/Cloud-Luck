export default function ({ $axios, store, app }, inject) {
  const axiosConfig = { timeout: 60000, headers: {} };
  // plugins/axios.js
  const authApi = $axios.create({
    baseURL: process.env.authApiUrl,
    withCredentials: true,
    ...axiosConfig,
  });
  authApi.onRequest((config) => {
    const keepError = store.state.global.keepError;
    if (!keepError) {
      store.dispatch("global/setValidationErrors", {});
    }

    return config;
  });
  authApi.onResponse((response) => {
    return response.data;
  });

  authApi.onError((error) => {
    if (!error.response) {
      app.$toast.error("Không thể kết nối đến máy chủ.");
      return false;
    }

    if (error.response.status === 401) {
      store.dispatch("auth/accountLogout");
      app.router.push("/auth/login");
      app.$toast.error("Vui lòng đăng nhập.");
    } else if (error.response.status === 404) {
      const message = error.response.data && error.response.data.message;
      app.$toast.error(message);
    } else if (error.response.status === 422) {
      const message = error.response.data && error.response.data.message;
      app.$toast.error(message);
      const findError = error.response.data && error.response.data.details;
      store.dispatch("global/setValidationErrors", findError || {});
    } else if (error.response.status === 500) {
      const message =
        (error.response.data && error.response.data.message) ||
        "Đã xảy ra lỗi hệ thống.";
      store.commit("auth/RESET_CURRENT_USER");
      if (!message.includes("Duplicate")) {
        app.router.push("/auth/login");
      }
      app.$toast.error(message);
    }
  });

  inject("authApi", authApi);

  const consumerApi = $axios.create({
    baseURL: process.env.consumerApiUrl,
    withCredentials: true,
    ...axiosConfig,
  });
  consumerApi.onRequest((config) => {
    const keepError = store.state.global.keepError;
    if (!keepError) {
      store.dispatch("global/setValidationErrors", {});
    }

    return config;
  });
  consumerApi.onResponse((response) => {
    return response.data;
  });

  consumerApi.onError((error) => {
    if (error.response) {
      if (error.response.status === 422) {
        const message = error.response.data && error.response.data.message;
        app.$toast.error(message);
        const findError = error.response.data && error.response.data.details;
        store.dispatch("global/setValidationErrors", findError || {});
      } else if (error.response.status >= 500 && app.$toast) {
        const message =
          (error.response.data && error.response.data.message) ||
          "Đã xảy ra lỗi hệ thống.";
        app.$toast.error(message);
        if (message.includes("jwt")) {
          store.dispatch("auth/accountLogout");
          app.$router.push("/auth/login");
          app.$toast.error("Vui lòng đăng nhập.");
        }
        return false;
      } else if (error.response.status === 401) {
        store.commit("auth/RESET_CURRENT_USER");
        app.router.push("/auth/login");
        app.$toast.error("Vui lòng đăng nhập.");
      } else if (error.response.status === 404) {
        const message = error.response.data && error.response.data.message;
        app.$toast.error(message);
        return false;
      } else if (error.response.status === 403) {
        const message = error.response.data && error.response.data.message;
        store.dispatch("auth/accountLogout");
        app.router.push("/");
        app.$toast.error(message);
      } else {
        app.$toast.error(error);
      }
    }
  });

  inject("consumerApi", consumerApi);

  const updateAxiosConfig = () => {
    const token = store.state.auth.token;
    if (token) {
      axiosConfig.headers = {
        Authorization: `Bearer ${token}`,
      };
    } else {
      axiosConfig.headers = {};
    }
    authApi.defaults.headers = { ...axiosConfig.headers };
    consumerApi.defaults.headers = { ...axiosConfig.headers };
  };
  updateAxiosConfig();
  store.watch(
    (state) => state.auth.token,
    () => {
      updateAxiosConfig();
    }
  );
}
