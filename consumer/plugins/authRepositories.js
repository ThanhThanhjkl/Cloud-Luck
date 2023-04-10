import repository from "@/repositories/auth/authRepository";

export default (ctx, inject) => {
  inject("authRepositories", repository(ctx.$authApi));
};
