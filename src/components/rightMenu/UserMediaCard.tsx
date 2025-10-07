import Link from "next/link";
import React from "react";
import Image from "next/image";
import { User } from "@prisma/client";
import prisma from "@/lib/client";

const UserMediaCard = async ({ user }: { user: User }) => {
  const postsWithMedia = await prisma.post.findMany({
    where: {
      userId: user.id,
      img: {
        not: null,
      },
    },
    take: 8,
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md text-sm flex flex-col gap-4">
      {/* Top  */}
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">User media</span>
        <Link href="/" className="text-blue-500 text-sm">
          See all
        </Link>
      </div>
      {/* Bottom */}

      <div className="flex gap-4 justify-between flex-wrap">
        {postsWithMedia.length
          ? postsWithMedia.map((post) => (
              <div className="relative w-1/5 h-24" key={post.id}>
                <Image
                  src={post.img! || "/noCover.png"}
                  alt=""
                  fill
                  className="object-cover rounded-md"
                />
              </div>
            ))
          : "No media found"}
      </div>
    </div>
  );
};

export default UserMediaCard;
