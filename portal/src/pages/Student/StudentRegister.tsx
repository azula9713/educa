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
  const [batch, setBatch] = useState("");
  const [batch_id, setBatchId] = useState(0);
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

  const handler = function (e: any) {
    setBatchId(Number(e.target.getAttribute("data-index")));
    console.log(setBatchId); //will log the index of the clicked item
  };

  return (
    <div>
      <div className="w-full flex flex-wrap">
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24">
            <a href="#" className="text-white font-bold text-xl p-4">
              <img
                className="mx-auto h-12 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt="Workflow"
              />
            </a>
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
                      stu_first_name,
                      stu_last_name,
                      stu_mobile,
                      batch_id,
                      stu_is_allowed,
                      stu_is_approved,
                    },
                  });
                  console.log(stu_email, batch_id);
                  history.push("/student-login");
                } catch (err) {
                  console.log(err.message);
                  setErrorMessage(err.message);
                  alertShow();
                  alert(err.message);
                }
              }}
            >
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
                  value={batch}
                  onChange={(e) => {
                    setBatch(e.target.value);
                  }}
                >
                  <option hidden>Select Your Batch</option>
                  {Batches?.viewBatches.map((x) => {
                    return (
                      <option
                        key={x.batch_id}
                        data-index={x.batch_id}
                        onClick={handler}
                      >
                        {" "}
                        {x.batch_name}
                      </option>
                    );
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
        {/* Image Section */}
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
