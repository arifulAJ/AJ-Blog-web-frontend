import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === "/login" || path === "/signup";
  // c = request.cookies.get("token")?.value || "";
  // console.log(request.cookies);
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
  // if (path != "/login") {
  //   return NextResponse.redirect(new URL("/login", request.nextUrl));
  // }
  // Set a flag in the request object
  request.showProfilePopup = !isPublicPath;

  if (!isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
  console.log(path, isPublicPath);
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/article",
    "/articleCreate",
    "/profilePopUp",
    "/profile",
  ],
};
