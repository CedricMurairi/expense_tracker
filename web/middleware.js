import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseconfig";

import { NextResponse, userAgent } from "next/server";

export function middleware(request) {
  const { device } = userAgent(request);

  if (device.type === "mobile") {
    const url = request.nextUrl.clone();
    url.pathname = "/mobile-coming-soon";
    resolve(NextResponse.redirect(url));
  }
  // return new Promise((resolve) => {
  //   onAuthStateChanged(auth, (user) => {
  //     const { device } = userAgent(request);

  //     if (device.type === "mobile") {
  //       const url = request.nextUrl.clone();
  //       url.pathname = "/mobile-coming-soon";
  //       resolve(NextResponse.redirect(url));
  //     }

  //     if (user) {
  //       console.log("User is not null");
  //       resolve(NextResponse.next());
  //     }else{
  //       console.log("User is null");
  //       const url = request.nextUrl.clone();
  //       url.pathname = "/login";
  //       resolve(NextResponse.redirect(url));
  //     }
  //   });
  // });
}
