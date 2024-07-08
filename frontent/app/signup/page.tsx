"use client";
"use strict";
import axios from "axios";
import React, { FormEvent, useState } from "react";
var bcrypt = require('bcryptjs');

const Signup = () => {
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData) as { [key: string]: string };

    const fieldTranslations: Record<string, string> = {
      username: "Puste pole nazwa użytkownika",
      email: "Puste pole email",
      password: "Puste pole hasło",
    };

    const emptyFields = Object.keys(data).filter((key) => data[key] === "");

    if (emptyFields.length > 0) {
      const fields = emptyFields.map(
        (field) => fieldTranslations[field] || field
      );
      setErrors(fields);
      return;
    }

    const email = data.email;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors(["Nieprawidłowy email"]);
      return;
    }

    const password = data.password;
    const passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (password.length !== 0) {
      if (!passwordRegex.test(password)) {
        setErrors(["Nieprawidłowe hasło"]);
        return;
      }
    }
    try {
      const now = new Date();
      data.created_at = now.toISOString();

      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
      data.password = hashedPassword;

      const request = await axios.post("http://127.0.0.1:3000/api/users", data);
      location.href = "http://127.0.0.1:3000/signin";
    } catch (error) {
      console.error("Error submitting the form", error);
    }
  };

  return (
    <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
      <h2>Formularz rejestracji</h2>
      {errors.length > 0 && (
        <div className="mb-5 text-red-600">
          {`Nie można wysłać formularza. Błędy: ${errors.join(", ")}`}
        </div>
      )}
      <div className="mb-5">
        <label
          htmlFor="username"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Twoje imię
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
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          E-mail
        </label>
        <input
          type="email"
          name="email"
          id="email"
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
          value="Załóż konto"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        />
      </div>
    </form>
  );
};

export default Signup;
