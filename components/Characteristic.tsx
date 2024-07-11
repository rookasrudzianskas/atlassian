"use client";

import React from 'react';
import {ChatbotCharacteristic} from "@/types/types";
import {OctagonX} from "lucide-react";
import {useMutation} from "@apollo/client";
import {REMOVE_CHARACTERISTIC} from "@/graphql/mutations";
import {toast} from "sonner";

const Characteristic = ({characteristic}: {characteristic: ChatbotCharacteristic}) => {
  const [removeCharacteristic] = useMutation(REMOVE_CHARACTERISTIC, {
    refetchQueries: ["GetChatbotById"],
  });

  const handleRemoveCharacteristic = async (characteristicId: number) => {
    console.log("REMOVE CHARACTERISTIC", characteristicId);
    try {
      await removeCharacteristic({
        variables: {
          characteristicId,
        },
      });
    } catch (error) {
      console.error('This is error', error);
    }
  }

  return (
    <li key={characteristic.id} className={'relative p-10 bg-white border rounded-md'}>
      {characteristic.content}
      <OctagonX
        onClick={() => {
          const promise = handleRemoveCharacteristic(characteristic.id);
          toast.promise(promise, {
            loading: 'Removing...',
            success: 'Removed!',
            error: 'Error removing!',
          });
        }}
        className={'w-6 h-6 text-white fill-red-500 absolute top-1 right-1 cursor-pointer hover:opacity-50'} />
    </li>
  );
};

export default Characteristic;
// by Rokas with ❤️
