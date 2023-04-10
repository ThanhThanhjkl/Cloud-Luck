export default function ({ $axios, store, app }, inject) {
  const axiosConfig = { timeout: 60000 };
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
    const hideLoading = config.hideLoading;

    if (!hideLoading && store._vm.$nuxt) {
      store._vm.$nuxt.$loading.start();
    }

    return config;
  });
  authApi.onResponse((response) => {
    if (!response.config.hideLoading && store._vm.$nuxt) {
      store._vm.$nuxt.$loading.finish();
    }

    return response.data;
  });

  authApi.onError((error) => {
    if (store._vm.$nuxt) {
      store._vm.$nuxt.$loading.finish();
    }

    if (error.response.status === 401) {
      store.dispatch("auth/accountLogout");
      app.router.push("/auth/login");
      app.$toast.error("ログインが必要です");
    } else if (error.response.status === 404) {
      const message = error.response.data.message;
      app.$toast.error(message);
    } else if (error.response.status === 422) {
      const message = error.response.data.message;
      app.$toast.error(message);
      const findError = error.response.data.details;
      store.dispatch("global/setValidationErrors", findError);
    } else if (error.response.status === 500) {
      const message = error.response.data.message;
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

    const hideLoading = config.hideLoading;

    if (!hideLoading && store._vm.$nuxt) {
      store._vm.$nuxt.$loading.start();
    }

    return config;
  });
  consumerApi.onResponse((response) => {
    if (!response.config.hideLoading && store._vm.$nuxt) {
      store._vm.$nuxt.$loading.finish();
    }
    return response.data;
  });

  consumerApi.onError((error) => {
    if (store._vm.$nuxt) {
      store._vm.$nuxt.$loading.finish();
    }

    if (error.response) {
      if (error.response.status === 422) {
        const message = error.response.data.message;
        app.$toast.error(message);
        const findError = error.response.data.details;
        store.dispatch("global/setValidationErrors", findError);
      } else if (error.response.status >= 500 && app.$toast) {
        const message = error.response.data.message;
        app.$toast.error(message);
        if (message.includes("jwt")) {
          store.dispatch("auth/accountLogout");
          app.$router.push("/auth/login");
          app.$toast.error("ログインが必要です");
        }
        return false;
      } else if (error.response.status === 401) {
        store.commit("auth/RESET_CURRENT_USER");
        app.router.push("/auth/login");
        app.$toast.error("ログインが必要です");
      } else if (error.response.status === 404) {
        const message = error.response.data.message;
        app.$toast.error(message);
        return false;
      } else if (error.response.status === 403) {
        const message = error.response.data.message;
        store.dispatch("auth/accountLogout");
        app.router.push("/");
        app.$toast.error(message);
      } else {
        app.$toast.error(error);
      }
    }
  });

  inject("consumerApi", consumerApi);

  const businessApi = $axios.create({
    baseURL: process.env.businessApiUrl,
    ...axiosConfig,
    withCredentials: true,
  });
  businessApi.onRequest((config) => {
    const keepError = store.state.global.keepError;
    if (!keepError) {
      store.dispatch("global/setValidationErrors", {});
    }

    const hideLoading = config.hideLoading;

    if (!hideLoading && store._vm.$nuxt) {
      store._vm.$nuxt.$loading.start();
    }

    return config;
  });
  businessApi.onResponse((response) => {
    if (!response.config.hideLoading && store._vm.$nuxt) {
      store._vm.$nuxt.$loading.finish();
    }
    return response.data;
  });

  businessApi.onError((error) => {
    if (store._vm.$nuxt) {
      store._vm.$nuxt.$loading.finish();
    }

    if (error.response) {
      if (error.response.status === 422) {
        const findError = error.response.data.details;
        const message = error.response.data.message;
        app.$toast.error(message);
        store.dispatch("global/setValidationErrors", findError);
      } else if (error.response.status === 500 && app.$toast) {
        const message = error.response.data.message;
        app.$toast.error(message, { duration: 5000 });
        store.dispatch("auth/accountLogout");
        return false;
      } else if (error.response.status === 401) {
        store.dispatch("auth/accountLogout");
        app.router.push("/auth/login");
        app.$toast.error("ログインが必要です");
      } else if (error.response.status === 403) {
        const message = error.response.data.message;
        store.dispatch("auth/accountLogout");
        // store.commit("auth/RESET_CURRENT_USER");
        app.router.push("/auth/login");
        app.$toast.error(message);
      } else if (error.response.status === 404) {
        const message = error.response.data.message;
        app.$toast.error(message);
      } else {
        const message = error.response.data.message;
        if (error.response.config.toasted) {
          app.$toast.error(message);
        }
      }
    }
  });

  inject("businessApi", businessApi);
}
