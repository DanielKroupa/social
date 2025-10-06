"use client";

import React, { useOptimistic, useState } from "react";
import Image from "next/image";
import { useAuth } from "@clerk/nextjs";
import { switchLike } from "@/lib/actions";

type Props = {};

const PostInteraction = ({
  postId,
  likes,
  commentNumber,
}: {
  postId: number;
  likes: string[];
  commentNumber: number;
}) => {
  const { isLoaded, userId } = useAuth();
  const [likeState, setLikeState] = useState({
    likeCount: likes.length,
    isLiked: userId ? likes.includes(userId) : false,
  });

  const [optimisticLike, switchOptimisticLike] = useOptimistic(
    likeState,
    (state, value) => {
      return {
        likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
        isLiked: !state.isLiked,
      };
    }
  );

  const likeAction = async () => {
    switchOptimisticLike("");
    try {
      switchLike(postId);
      setLikeState((state) => ({
        likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
        isLiked: !state.isLiked,
      }));
    } catch (err) {}
  };
  return (
    <>
      <div className="flex items-center justify-between text-sm my-4">
        <div className="flex gap-8">
          <div className="flex items-center gap-4 bg-slate-300 dark:bg-slate-800 p-2 rounded-xl">
            <form action={likeAction}>
              <button>
                <Image
                  className="cursor-pointer"
                  alt=""
                  width={16}
                  height={16}
                  src={optimisticLike.isLiked ? "/liked.png" : "/like.png"}
                />
              </button>
            </form>
            <span className="text-slate-300">|</span>
            <span className="text-slate-500">
              {optimisticLike.likeCount}{" "}
              <span className="hidden md:inline"> Likes</span>
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-slate-200 dark:bg-slate-800 p-2 rounded-xl">
          <Image
            className="cursor-pointer"
            alt=""
            width={16}
            height={16}
            src="/comment.png"
          />
          <span className="text-slate-300">|</span>
          <span className="text-slate-500">
            {commentNumber} <span className="hidden md:inline"> Comments</span>
          </span>
        </div>
      </div>
      <div className="">
        <div className="flex items-center gap-4 bg-slate-200 dark:bg-slate-800 p-2 rounded-xl">
          <Image
            className="cursor-pointer"
            alt=""
            width={16}
            height={16}
            src="/share.png"
          />
          <span className="text-slate-300">|</span>
          <span className="text-slate-500">
            <span className="hidden md:inline"> Share</span>
          </span>
        </div>
      </div>
    </>
  );
};

export default PostInteraction;
