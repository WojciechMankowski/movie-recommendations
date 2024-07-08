"use client";
"use strict";
import axios from "axios";
import React, { FormEvent, useState } from "react";
var bcrypt = require("bcryptjs");

const Signin = () => {
  const [errors, setErrors] = useState<string>("");
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData) as { [key: string]: string };
    const { username, password } = data;
    try {
      const request = await axios.get(
        `http://127.0.0.1:3000/api/users/${username}`
      );

      const data = request.data;
      if (request.status == 200 && data.length !== 0) {
        const password_db = data.password;
        const saltRounds = 10;
        let isLogin = false;
        bcrypt.hash(
          password,
          saltRounds,
          function (error: Error, hash: string) {
            bcrypt.compare(
              password_db,
              hash,
              function (error: Error, result: Boolean) {
                if (result) {
                  isLogin = true;
                }
              }
            );
          }
        );

        if (isLogin) {
          location.href = "http://127.0.0.1:3000/";
        } else {
          setErrors("Podałe złe hasło do konta");
        }
      } else {
        setErrors(`Nie znaleziono użytkownika o nazwie: ${username}`);
      }
    } catch (error) {
      console.error("Error submitting the form", error);
    }
  };
  return (
    <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
      <h2>Zaloguj się !!</h2>
      {errors.length > 0 && <div className="mb-5 text-red-600">{errors}</div>}
      <div className="mb-5">
        <label
          htmlFor="username"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Nazwa uzytkownika
        </label>
        <input
          type="text"
          name="username"
          id="username"
          className="border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Hasło
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
        />
      </div>

      <div className="mb-5">
        <input
          type="submit"
          value="Zaloguj się"
          className="text-white
           bg-blue-700
            hover:bg-blue-800 
            focus:outline-none focus:ring-4
             focus:ring-blue-300
              font-medium rounded-full text-sm px-5
               py-2.5 text-center mb-2 dark:bg-blue-600
                dark:hover:bg-blue-700
                 dark:focus:ring-blue-800"
        />
      </div>
    </form>
  );
};

export default Signin;
