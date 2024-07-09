import React from 'react';
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import {Toaster} from "@/components/ui/sonner";

const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className={'flex flex-col flex-1'}>
      <Header />
      <div className={'flex flex-col flex-1 lg:flex-row bg-gray-100'}>
        <Sidebar />
        <div className={'flex flex-1 justify-center lg:justify-start items-start max-w-5xl mx-auto w-full'}>
          {children}

          <Toaster position={'bottom-center'} />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
// by Rokas with ❤️
