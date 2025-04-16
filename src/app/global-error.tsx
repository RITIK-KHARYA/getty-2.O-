"use client";

import Image from "next/image";
import "./globals.css";

export default function GlobalError() {
  return (
    <html>
      <body>
        <Image
          className="object-cover "
          src="/thumbnail.jpg"
          alt="404"
          width={500}
          height={500}
        />
        <span>error bitches hehe</span>
      </body>
    </html>
  );
}
