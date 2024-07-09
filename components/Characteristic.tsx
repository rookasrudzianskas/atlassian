"use client";

import React from 'react';
import {ChatbotCharacteristic} from "@/types/types";
import {OctagonX} from "lucide-react";
import {useMutation} from "@apollo/client";

const Characteristic = ({characteristic}: {characteristic: ChatbotCharacteristic}) => {
  const [removeCharacteristic] = useMutation(REMOVE_CHARACTERISTIC, {
    // refetchQueries: ["GetChatById"],
  });

  const handleRemoveCharacteristic = () => {
    console.log("REMOVE CHARACTERISTIC", characteristic);

  }

  return (
    <li className={'relative p-10 bg-white border rounded-md'}>
      {characteristic.content}
      <OctagonX
        onClick={handleRemoveCharacteristic}
        className={'w-6 h-6 text-white fill-red-500 absolute top-1 right-1 cursor-pointer hover:opacity-50'} />
    </li>
  );
};

export default Characteristic;
// by Rokas with ❤️
