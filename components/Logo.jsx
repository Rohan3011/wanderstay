import { CubeIcon } from "@heroicons/react/solid";
import { Button } from "@mantine/core";
import { NextLink } from "@mantine/next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Logo() {
  return (
    <Link href="/">
      <div className="relative flex justify-between">
        <Image
          src="/logo.webp"
          height="24px"
          width="24px"
          className="object-contain"
          alt="wanderstay-logo"
        />
        <span className="hidden select-none font-bold sm:inline-block">
          WanderStay
        </span>
      </div>
    </Link>
  );
}

export default Logo;
