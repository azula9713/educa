import React, { useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { useLecLoginMutation } from "../../generated/graphql";

export const LecLogin: React.FC<RouteComponentProps> = ({ history }) => {
  const [login] = useLecLoginMutation();

  const [lec_email, setLecEmail] = useState("");
  const [lec_password, setLecPassword] = useState("");

  const [showResults, setShowResults] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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

  return (
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
          <p className="text-center text-3xl">Welcome To Educa Lecturer Portal</p>
          {showResults ? <Results /> : null}
          <form
            className="flex flex-col pt-3 md:pt-8"
            onSubmit={async (e) => {
              e.preventDefault();
              console.log("Form Submitted!");
              try {
                await login({
                  variables: {
                    lec_email,
                    lec_password,
                  },
                });
                console.log(lec_email, lec_password);
                history.push("/lec-dashbaord");
              } catch (err) {
                console.log(err.message);
                setErrorMessage(err.message);
                alertShow();
                alert(err.message);
              }
            }}
          >
            <div className="flex flex-col pt-4">
              <label htmlFor="email" className="text-lg">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={lec_email}
                onChange={(e) => {
                  setLecEmail(e.target.value);
                }}
                placeholder="your@email.com"
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
                value={lec_password}
                onChange={(e) => {
                  setLecPassword(e.target.value);
                }}
                placeholder="Password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <button
              type="submit"
              className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"
            >
              Login
            </button>
          </form>
          <div className="text-center pt-12 pb-12">
            <p>
              Don't have an account?{" "}
              <Link to="lec-register" className="underline font-semibold">
                Register here.
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
  );
};
