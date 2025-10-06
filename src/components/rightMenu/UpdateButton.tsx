"use client";

import React from "react";
import { useFormStatus } from "react-dom";

type Props = {};

const UpdateButton = (props: Props) => {
  const { pending } = useFormStatus();
  return (
    <button
      className="bg-blue-500 p-2 m-2 rounded-md text-white disabled:bg-opacity-50 disabled:cursor-not-allowed"
      disabled={pending}
    >
      {pending ? "Updating..." : "Update"}
    </button>
  );
};

export default UpdateButton;
