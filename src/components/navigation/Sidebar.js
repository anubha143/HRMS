"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Sidebar = ({ user }) => {
  const pathname = usePathname();

  const handleLogout = () => {
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/login";
  };

  return (
    <div
      className="flex flex-col flex-shrink-0 items-start w-[19.25rem] bg-white border-r shadow-lg"
      style={{ minHeight: "calc(100vh - 56px)" }}
    >
      <div className="flex flex-col items-start w-2">
        <div className="w-px h-4"></div>
      </div>
      <div className="flex flex-col items-start gap-2 self-stretch p-2">
        <div className="flex flex-col items-center w-[17.5rem]">
          <Image
            src={`/assets/${user?.dp}.png`}
            alt="avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
          <p className="mt-4 mb-2 font-medium">{user.name}</p>
          <p className="m-0 text-sm mb-6">
            {user.role === "employee"
              ? "Software Developer"
              : user.role === "manager"
              ? "Manager"
              : "HR Generalist"}
          </p>
        </div>
        <div className="flex flex-col items-start w-[17.5rem]">
          <div className="flex flex-col items-start self-stretch rounded">
            <div className="flex items-center self-stretch py-2 px-4">
              <div className="flex flex-col items-start min-w-[3.5rem]">
                <Image
                  src={`/assets/calendarFilled.png`}
                  alt="dashboard"
                  width={24}
                  height={24}
                />
              </div>
              <div className="flex flex-col items-start py-1 px-0">
                <div className="self-stretch text-black/[.87]  leading-[150%]">
                  Leave Tracker
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start self-stretch pl-14 rounded">
            <Link
              href="/apply"
              className={`flex items-center self-stretch py-2 px-4 rounded-lg no-underline ${
                pathname === "/apply" ? "bg-blue-100" : ""
              } `}
            >
              <div className="flex flex-col items-start py-1 px-0">
                <div className="self-stretch text-black/[.87]  leading-[150%]">
                  Apply Leave
                </div>
              </div>
            </Link>
          </div>
          <div className="flex flex-col items-start self-stretch pl-14 rounded">
            <Link
              href="/"
              className={`flex items-center self-stretch py-2 px-4 rounded-lg ${
                pathname === "/" ? "bg-blue-100" : ""
              } no-underline`}
            >
              <div className="flex flex-col items-start py-1 px-0">
                <div className="self-stretch text-black/[.87]  leading-[150%]">
                  Leave Applications
                </div>
              </div>
            </Link>
          </div>
        </div>
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="flex flex-col items-start self-stretch">
              <div className="flex items-center self-stretch py-2 px-4">
                <div className="flex flex-col items-start min-w-[3.5rem]">
                  <div className="flex items-start">
                    <Image
                      src={`/assets/star.png`}
                      alt="dashboard"
                      width={24}
                      height={24}
                    />
                  </div>
                </div>
                <div className="flex flex-col items-start py-1 px-0">
                  <div className="self-stretch text-black/[.87]  leading-[150%]">
                    List item
                  </div>
                </div>
              </div>
            </div>
          ))}
        <div
          onClick={handleLogout}
          className="flex flex-col items-start self-stretch px-4 py-4"
        >
          <div className="border-red-600 border py-3 cursor-pointer flex items-center justify-center w-full border-solid rounded hover:border-red-700">
            <span className="text-red-600 font-medium hover:text-red-700">
              Logout
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
