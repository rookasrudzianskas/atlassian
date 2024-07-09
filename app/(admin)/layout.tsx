import React from 'react';
import Header from "@/components/Header";

const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className={'flex flex-col flex-1'}>
      <Header />
      <div className={'flex flex-col md:flex-row bg-gray-100 flex-1'}>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
// by Rokas with ❤️
