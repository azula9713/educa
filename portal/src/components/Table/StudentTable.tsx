import React from "react";
import {
  useBatchRevealQuery,
  useStudentsQuery,
  useViewBatchesQuery,
} from "../../generated/graphql";
import avatar from "../../assets/img/30.jpg";
import { useState } from "react";

export const StudentTable: React.FC = () => {
  const [batch_id, setBatchId] = useState(1);
  const { data: Batches } = useViewBatchesQuery();
  const { data: Students } = useStudentsQuery();
  const { loading, data: Batch } = useBatchRevealQuery({
    variables: { batch_id: batch_id },
  });
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!Batch) {
    console.log(Error);
    return <div>Error...</div>;
  }

  return (
    <div className="flex flex-wrap">
      <table className="min-w-full table-auto">
        <thead className="justify-between">
          <tr className="bg-gray-800">
            <th className="py-2 items-center">
              <span className="text-gray-300" />
            </th>
            <th className="px-16 py-2 items-center">
              <span className="text-gray-300">Name</span>
            </th>
            <th className="px-16 py-2 items-center">
              <span className="text-gray-300">Email</span>
            </th>
            <th className="px-16 py-2 items-center">
              <span className="text-gray-300">Status</span>
            </th>
            <th className="px-16 py-2 items-center">
              <span className="text-gray-300">Applied Date</span>
            </th>
            <th className="px-16 py-2 items-center">
              <span className="text-gray-300">Batch</span>
            </th>
            <th className="px-16 py-2 items-center">
              <span className="text-gray-300">Action</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-200">
          {Students?.students.map((x) => {
            return (
              <tr key={x.stu_id} className="bg-white border-4 border-gray-200">
                <td className="px-16 py-2 flex flex-row items-center">
                  <img
                    className="h-8 w-8 rounded-full object-cover "
                    src={avatar}
                    alt=""
                  />
                </td>
                <td>
                  <span className="text-center ml-2 font-semibold">
                    {x.stu_first_name} {x.stu_last_name}
                  </span>
                </td>
                <td>
                  <span className="text-center ml-2 font-semibold">
                    {x.stu_email}
                  </span>
                </td>
                <td>
                  <span className="text-center ml-2 font-semibold">
                    {JSON.stringify(x.stu_is_approved)}
                  </span>
                </td>
                <td>
                  <span className="text-center ml-2 font-semibold">
                    {x.stu_reg_date}
                  </span>
                </td>
                <td>
                  <span className="text-center ml-2 font-semibold">
                    {Batch.viewBatch.batch_name}
                  </span>
                </td>
              </tr>
            );
          })}
          <tr className="bg-white border-4 border-gray-200">
            <td className="px-16 py-2">
              <button className="bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-white hover:border-indigo-500 hover:text-black ">
                Open Link
              </button>
            </td>
            <td className="px-16 py-2">
              <span>05/06/2020</span>
            </td>
            <td className="px-16 py-2">
              <span>10:00</span>
            </td>
            <td className="px-16 py-2">
              <span className="text-green-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h5 "
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#2c3e50"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <path d="M5 12l5 5l10 -10" />
                </svg>
              </span>
            </td>
          </tr>
          <tr className="bg-white border-4 border-gray-200">
            <td className="px-16 py-2 flex flex-row items-center">
              <img
                className="h-8 w-8 rounded-full object-cover "
                src="https://randomuser.me/api/portraits/men/76.jpg"
                alt=""
              />
            </td>
            <td>
              <span className="text-center ml-2 font-semibold">
                Ralph Barnes
              </span>
            </td>
            <td className="px-16 py-2">
              <button className="bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-white hover:border-indigo-500 hover:text-black ">
                Open Link
              </button>
            </td>
            <td className="px-16 py-2">
              <span>05/06/2020</span>
            </td>
            <td className="px-16 py-2">
              <span>12:15</span>
            </td>
            <td className="px-16 py-2">
              <span className="text-yellow-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#2c3e50"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <circle cx={12} cy={12} r={9} />
                  <polyline points="12 7 12 12 15 15" />
                </svg>
              </span>
            </td>
          </tr>
          <tr className="bg-white border-4 border-gray-200">
            <td className="px-16 py-2 flex flex-row items-center">
              <img
                className="h-8 w-8 rounded-full object-cover "
                src="https://randomuser.me/api/portraits/men/38.jpg"
                alt=""
              />
            </td>
            <td>
              <span className="text-center ml-2 font-semibold">
                Brett Castillo
              </span>
            </td>
            <td className="px-16 py-2">
              <button className="bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-white hover:border-indigo-500 hover:text-black ">
                Open Link
              </button>
            </td>
            <td className="px-16 py-2">
              <span>05/06/2020</span>
            </td>
            <td className="px-16 py-2">
              <span>08:35</span>
            </td>
            <td className="px-16 py-2">
              <span className="text-yellow-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#2c3e50"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <line x1={18} y1={6} x2={6} y2={18} />
                  <line x1={6} y1={6} x2={18} y2={18} />
                </svg>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
