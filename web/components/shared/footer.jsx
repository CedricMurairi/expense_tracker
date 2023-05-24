import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="text-xs mt-20 font-extralight text-center">
      <div>Designed with Brains.</div>
      <div className="flex gap-2">
        <Link href="term-of-service">Term of Service</Link>
        <Link href="privacy-policy">Privacy Policy</Link>
      </div>
      <p>&copy; 2023 Cédric Murairi</p>
    </div>
  );
}
