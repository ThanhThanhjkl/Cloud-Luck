import repository from "@/repositories";

export default (ctx, inject) => {
  inject("businessRepositories", repository(ctx.$businessApi));
};
