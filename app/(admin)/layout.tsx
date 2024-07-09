import React from 'react';
import Header from "@/components/Header";

const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      {/* Sidebar */}
      <div>
        {/* Header */}
        <Header />
        <div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
// by Rokas with ❤️
