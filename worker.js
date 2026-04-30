// Pass-through Worker — every request is delegated to the static
// asset binding declared in wrangler.toml. No custom routing.
export default {
  fetch(request, env) {
    return env.ASSETS.fetch(request);
  },
};
