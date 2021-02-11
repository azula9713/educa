import React from "react";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { StudentTable } from "../../components/Table/StudentTable";

interface props {}

export const LecDashboard: React.FC<props> = () => {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-gray-200">
        <StudentTable />
      </div>
    </>
  );
};
