// components/Loading.tsx
import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="w-16 h-16 border-4 border-t-[#FF7A55] border-[#FFF] rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
