import repository from "@/repositories";

export default (ctx, inject) => {
  inject("consumerRepositories", repository(ctx.$consumerApi));
};
