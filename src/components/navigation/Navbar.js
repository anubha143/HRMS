'use client '

import Image from "next/image";

const Navbar = ({user}) => {

    return <div className="flex items-center justify-between bg-[#2196f3] px-6 py-2">
        <div className="flex items-center gap-4">
            <Image src="/assets/logo-white.png" alt="logo" width={32} height={32} />
            <div className="flex flex-col items-start title text-white  text-xl font-medium leading-[160%]">
                Workforce
            </div>
        </div>
        <div className="flex items-center space-x-4">
            <div className="flex flex-col justify-center items-center p-2 rounded-full">
                <Image src={`/assets/notification.png`} alt="notifications" width={24} height={24} />
            </div>
            <Image src={`/assets/${user?.dp}.png`} alt="avatar" width={40} height={40} className="rounded-full" />
        </div>
    </div>
}

export default Navbar;