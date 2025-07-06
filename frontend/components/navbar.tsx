import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    return (
        <section>
            <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900 border-b border-gray-800">
                <div className="px-4 mx-auto sm:px-6 lg:px-8 xl:px-12">
                    <div className="flex items-center justify-between h-16 lg:h-[72px]">
                        <div className="flex items-center flex-shrink-0">
                            <Link href="/" className="inline-flex">
                                <Image
                                    src="/logo.svg"
                                    alt="logo"
                                    width={32}
                                    height={32}    
                                />
                                <span className="text-white font-bold tracking-tight p-3">Shop.ly</span>
                            </Link>
                        </div>

                        <div className="hidden lg:flex lg:justify-center lg:space-x-10 xl:space-x-14">
                            <Link href="/recommender" className="text-base font-medium text-gray-400 transition-all duration-200 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white hover:text-white">
                                Recommender
                            </Link>

                            <a href="#" className="text-base font-medium text-gray-400 transition-all duration-200 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white hover:text-white"> Features </a>

                            <a href="#" className="text-base font-medium text-gray-400 transition-all duration-200 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white hover:text-white"> Documentation </a>
                        </div>

                        <div className="flex items-center justify-end space-x-5">
                            <button type="button" className="p-2 -m-2 text-white transition-all duration-200 lg:hidden hover:text-gray-200">
                                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>

                            <button type="button" className="relative p-2 -m-2 text-white transition-all duration-200 hover:text-gray-200">
                                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>

                                <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-indigo-600 rounded-full"> 3 </span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>
        </section>
    );
}