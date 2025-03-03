import Image from 'next/image';

export default function Header() {
  return (
    <div className="w-full px-6 py-6">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <Logo />
        <AuthButtons />
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Image 
        src="/fire.svg" 
        alt="Fire icon" 
        width={24} 
        height={24}
      />
      <div className="text-white font-sans text-xl font-bold tracking-wide">
        deepwork.zone
      </div>
    </div>
  );
}

function AuthButtons() {
  return (
    <div className="flex gap-3">
      <button 
        className="inline-flex items-center justify-center text-sm font-medium rounded-md h-9 w-[75px] text-center text-white border border-[#363636] bg-transparent hover:bg-[#1F1F1F] transition-all duration-100 ease-in-out"
      >
        Log in
      </button>
      <button 
        className="inline-flex items-center justify-center text-sm font-medium rounded-md h-9 w-[75px] text-center text-black bg-white hover:bg-[#E5E5E5] transition-all duration-100 ease-in-out"
      >
        Sign up
      </button>
    </div>
  );
} 