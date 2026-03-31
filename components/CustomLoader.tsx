'use client';

import Image from 'next/image';

export default function CustomLoader() {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a1e5e] overflow-hidden">
            {/* Background Effects matching the theme */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-sky-500/20 rounded-full blur-3xl animate-pulse"></div>

            <div className="relative z-10 flex flex-col items-center">
                {/* Logo Container with animations */}
                <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full bg-white/5 backdrop-blur-md p-4 flex items-center justify-center border border-white/10 shadow-2xl spin-stop-animation">
                    <div className="absolute inset-0 rounded-full border-t-2 border-sky-400 opacity-50 animate-ping"></div>
                    <Image
                        src="/iste-light.png"
                        alt="ISTE Logo"
                        width={80}
                        height={80}
                        className="object-contain"
                    />
                </div>

                {/* Text */}
                <p className="mt-4 text-sky-200/70 text-xs uppercase tracking-[0.3em] animate-pulse">
                    Loading...
                </p>
            </div>
        </div>
    );
}
