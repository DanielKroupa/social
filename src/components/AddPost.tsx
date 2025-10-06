"use client";

import React, { useState } from "react";
import Image from "next/image";
import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import { useUser } from "@clerk/nextjs";
import { CldUploadWidget } from "next-cloudinary";
import AddPostButton from "./AddPostButton";
import { addPost } from "@/lib/actions";

type Props = {};

const AddPost = (props: Props) => {
  const { user, isLoaded } = useUser();
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState<any>();

  if (!isLoaded) {
    return "Loading..";
  }

  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex gap-4 justify-between text-sm">
      {/* AVATAR */}
      <Image
        src={user?.imageUrl || "/noAvatar.png"}
        alt=""
        className="w-12 h-12 object-cover rounded-full"
        width={48}
        height={48}
      />
      <div className=" flex-1">
        <form
          action={(formData) => addPost(formData, img?.secure_url || "")}
          className="flex gap-4"
        >
          <textarea
            name="desc"
            placeholder="What's on your mind?"
            id=""
            className="bg-slate-100 rounded-lg flex-1 p-2 outline-none"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          <div className="">
            <Image
              src="/emoji.png"
              alt=""
              className="w-5 h-5 cursor-pointer self-end"
              width={20}
              height={20}
            />
            <AddPostButton />
          </div>
        </form>

        <div className="flex items-center gap-4 mt-4 text-gray-400 flex-wrap">
          <CldUploadWidget
            uploadPreset="social"
            onSuccess={(result, { widget }) => {
              setImg(result.info);
              widget.close();
            }}
          >
            {({ open }) => {
              return (
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => open()}
                >
                  <Image
                    src="/addimage.png"
                    alt=""
                    className="w-5 h-5 object-cover rounded-full"
                    width={20}
                    height={20}
                  />
                  Photo
                </div>
              );
            }}
          </CldUploadWidget>

          <div className="flex items-center gap-2 cursor-pointer">
            <Image
              src="/addvideo.png"
              alt=""
              className="w-5 h-5 object-cover rounded-full"
              width={20}
              height={20}
            />
            Video
          </div>

          <div className="flex items-center gap-2 cursor-pointer">
            <Image
              src="/addevent.png"
              alt=""
              className="w-5 h-5 object-cover rounded-full"
              width={20}
              height={20}
            />
            Event
          </div>

          <div className="flex items-center gap-2 cursor-pointer">
            <Image
              src="/poll.png"
              alt=""
              className="w-5 h-5 object-cover rounded-full"
              width={20}
              height={20}
            />
            Poll
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
