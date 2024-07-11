import React from 'react';
import Avatar from "@/components/Avatar";

const loading = ({}) => {
  return (
    <div className={'mx-auto animate-spin p-10'}>
      <Avatar seed={'Loading...'} />
    </div>
  );
};

export default loading;
// by Rokas with ❤️
