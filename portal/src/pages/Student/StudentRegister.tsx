import React, { useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import {
  useStudentRegisterMutation,
  useViewBatchesQuery,
} from "../../generated/graphql";

interface props {}

export const StudentRegister: React.FC<RouteComponentProps> = ({ history }) => {
  const [stu_email, setEmail] = useState("");
  const [stu_password, setPassword] = useState("");
  const [stu_first_name, setFirstName] = useState("");
  const [stu_last_name, setLastName] = useState("");
  const [batch_name, setBatchName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [stu_mobile, setMobile] = useState("");
  const [stu_is_allowed, setIsAllowed] = useState<boolean>(false);
  const [stu_is_approved, setIsApproved] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [register] = useStudentRegisterMutation();
  const { data: Batches } = useViewBatchesQuery();

  const [showResults, setShowResults] = React.useState(false);
  function alertShow() {
    setShowResults(true);
  }

  const Results = () => (
    <div role="alert" className="width">
      <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2 text-center">
        Error
      </div>
      <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700 text-center">
        <p>{errorMessage}</p>
      </div>
    </div>
  );

  // const handler = function (e: any) {
  //   setBatchId(Number(e.target.getAttribute("data-index")));
  //   console.log(setBatchId); //will log the index of the clicked item
  // };

  return (
    <div>
      <div className="w-full flex flex-wrap">
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24">
            <Link to="/" className="text-white font-bold text-xl p-4">
              <img
                className="mx-auto h-12 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt="Workflow"
              />
            </Link>
          </div>
          <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
            <p className="text-center text-3xl">Welcome To Educa</p>
            {showResults ? <Results /> : null}
            <form
              className="flex flex-col pt-3 md:pt-8"
              onSubmit={async (e) => {
                e.preventDefault();
                console.log("Form Submitted!");
                try {
                  await register({
                    variables: {
                      stu_email,
                      stu_password,
                      avatar,
                      stu_first_name,
                      stu_last_name,
                      stu_mobile,
                      batch_name,
                      stu_is_allowed,
                      stu_is_approved,
                    },
                  });
                  console.log(stu_email, batch_name);
                  history.push("/student-login");
                } catch (err) {
                  console.log(err.message);
                  setErrorMessage(err.message);
                  alertShow();
                  alert(err.message);
                }
              }}
            >
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Profile Picture
                </label>
                <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col pt-4">
                <label htmlFor="firstname" className="text-lg">
                  First Name
                </label>
                <input
                  id="firstname"
                  value={stu_first_name}
                  placeholder="First Name"
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex flex-col pt-4">
                <label htmlFor="lastname" className="text-lg">
                  Last Name
                </label>
                <input
                  id="lastname"
                  value={stu_last_name}
                  placeholder="Last Name"
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex flex-col pt-4">
                <label htmlFor="email" className="text-lg">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="sample@email.com"
                  value={stu_email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setIsApproved(false);
                    setIsAllowed(false);
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex flex-col pt-4">
                <label htmlFor="password" className="text-lg">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={stu_password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex flex-col pt-4">
                <label htmlFor="mobile" className="text-lg">
                  Mobile Number
                </label>
                <input
                  id="mobile"
                  value={stu_mobile}
                  placeholder="07XXXXXXXX"
                  onChange={(e) => {
                    setMobile(e.target.value);
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex flex-col pt-4">
                <label htmlFor="mobile" className="text-lg">
                  Mobile Number
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline-600"
                  value={batch_name}
                  onChange={(e) => {
                    setBatchName(e.target.value);
                  }}
                >
                  <option hidden>Select Your Batch</option>
                  {Batches?.viewBatches.map((x) => {
                    return <option key={x.batch_id}> {x.batch_name}</option>;
                  })}
                </select>
              </div>
              <button
                type="submit"
                className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"
              >
                Register
              </button>
            </form>
            <div className="text-center pt-12 pb-12">
              <p>
                Already have an account?{" "}
                <Link to="student-login" className="underline font-semibold">
                  Login here.
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="w-1/2 shadow-2xl">
          <img
            className="object-cover w-full h-screen hidden md:block"
            src="https://source.unsplash.com/IXUM4cJynP0"
          />
        </div>
      </div>
    </div>
  );
};
