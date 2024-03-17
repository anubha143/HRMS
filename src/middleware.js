import { NextResponse, userAgent } from "next/server";

export async function middleware(request) {
  try {
    if (request.nextUrl.pathname.startsWith("/assets")) {
      return NextResponse.next();
    }

    const { device } = userAgent(request);
    const viewport = device.type === "mobile" ? device.type : "desktop";

    request.nextUrl.searchParams.set("viewport", viewport);
    const user = request.cookies.get("user");

    if (request.url.pathname !== "/login" && !user) {
      return NextResponse.rewrite(new URL("/login", request.url));
    }

    request.nextUrl.searchParams.set("user", JSON.stringify(user.value));

    return NextResponse.rewrite(request.nextUrl);
  } catch (error) {
    console.log(error);
    return NextResponse.rewrite(request.nextUrl);
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
