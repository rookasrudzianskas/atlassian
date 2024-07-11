import React from 'react';
import Avatar from "@/components/Avatar";

const Loading = ({}) => {
  return (
    <div className={'mx-auto animate-spin p-10'}>
      <Avatar seed={'Loading...'} />
    </div>
  );
};

export default Loading;
// by Rokas with ❤️
