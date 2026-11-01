// Workers' static HTML routing redirects *.html to pretty URLs. Google requires
// the exact verification URL to return the supplied file without a redirect.
const verificationPath = "/google7ecf99f475b9e5b2.html";

export default {
  fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === verificationPath && (request.method === "GET" || request.method === "HEAD")) {
      // Under force-trailing-slash, this internal URL serves the same .html asset.
      url.pathname = verificationPath.slice(0, -5) + "/";
      return env.ASSETS.fetch(new Request(url, request));
    }
    return env.ASSETS.fetch(request);
  },
};
