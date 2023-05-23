import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseconfig";

import { NextResponse, userAgent } from "next/server";

export function middleware(request) {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      const { device } = userAgent(request);

      if (device.type === "mobile") {
        const url = request.nextUrl.clone();
        url.pathname = "/mobile-coming-soon";
        resolve(NextResponse.redirect(new URL("/login", request.url)));
      }

      if (user === null) {
        const url = request.nextUrl.clone();
        url.pathname = "/login";
        resolve(NextResponse.redirect(url));
      }else{
        resolve(NextResponse.next());
      }
    });
  });
}

export const config = {
  matcher: ["/((?!_next/static|favicon.ico|login|signup).*)"],
};