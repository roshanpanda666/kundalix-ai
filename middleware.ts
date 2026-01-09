import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    // ✅ If logged in, block login & register pages
    if (
      token &&
      (pathname === "/login" || pathname === "/userregister")
    ) {
      return NextResponse.redirect(new URL("/see-kundali", req.url));
    }

    // otherwise let it pass
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // ✅ PUBLIC ROUTES
        if (
          pathname === "/" ||
          pathname === "/login" ||
          pathname === "/userregister"
        ) {
          return true;
        }

        // 🔒 PROTECTED ROUTES
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
