import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextRequest } from "next/server";

export default withAuth(
  async function proxy(req: NextRequest) {
    const url = new URL(req.url);

    if (url.pathname.includes("/api/posts/all")) return
    if(url.pathname === "/api/posts/all") return
    if (url.pathname === "/posts/all") {
      return;
    }

  },
  {
    // Proxy still runs on all routes, but doesn't protect the home route
    publicPaths: ["/", "/login", "/posts", "/api/post"], // e.g. ["/api/public", "/blog", "/about"]
  }
);

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
}
// export const config = {
//   matcher: [
//     '/((?!api|_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//   ],
// }