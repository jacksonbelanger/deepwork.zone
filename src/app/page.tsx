'use client';

import Header from '@/components/Header';
import Timer from '@/components/Timer';

export default function Home() {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black m-0 p-0 flex flex-col justify-between font-sans">
      <Header />
      <Timer />
      {/* Empty footer to balance the layout */}
      <div className="p-6"></div>
    </div>
  );
}
