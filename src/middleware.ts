import { NextRequest, NextResponse } from "next/server";

const PROTECTED = "/dashboard";
const LOGIN = "/auth/login";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith(PROTECTED)) {
    return NextResponse.next();
  }

  const token = request.cookies.get("stylohub_token")?.value;

  if (!token) {
    const loginUrl = new URL(LOGIN, request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
