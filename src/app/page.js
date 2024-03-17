"use client";

import Navbar from "../components/navigation/Navbar";
import Sidebar from "../components/navigation/Sidebar";
import LeaveTable from "../components/tables/EmployeeTable";
import HrLeaveTable from "../components/tables/HrTable";

const LeaveApplications = ({ searchParams }) => {
  let user = searchParams.user;

  if (user) {
    user = JSON.parse(JSON.parse(user));
  }

  return (
    <div className="bg-white">
      <Navbar user={user} />
      <div className="flex bg-white space-x-4">
        <Sidebar user={user} />
        <div className="grow px-8">
          <div className="flex flex-col items-start py-4">
            <div className="flex items-start self-stretch">
              <div className="flex flex-col items-start gap-2">
                <div className="self-stretch text-black/[.87]  text-[2.125rem] leading-[123.5%]">
                  Your Leave Applications
                </div>
              </div>
            </div>
          </div>
          {user.role === "employee" ? (
            <LeaveTable user={user} />
          ) : (
            <HrLeaveTable />
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaveApplications;
