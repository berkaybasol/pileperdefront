import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/model-perdeler/yuksek-tavanli-perde-modelleri") {
    return NextResponse.redirect(
      new URL("/model-perdeler/yuksek-tavanli-galeri-perde", request.url),
      301
    );
  }

  const host = request.headers.get("host")?.split(":")[0];

  if (host === "admin.pileperde.com.tr" && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
