import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="relative">
        <div className="h-12 w-12 rounded-full border-t-2 border-b-2 border-primary dark:border-secondary animate-spin"></div>
        <div className="h-12 w-12 rounded-full border-r-2 border-l-2 border-primary dark:border-secondary animate-spin absolute top-0 left-0 animate-[spin_1.5s_linear_infinite]"></div>
      </div>
    </div>
  );
};

export default Loader;
