import React, { useState, useEffect } from "react";
import { useForm, ValidationError } from "@formspree/react";

const formID = import.meta.env.VITE_FORM_ID;

export default function ContactForm({ removeActiveComponent }) {
  const [state, handleSubmit] = useForm(formID);
  const [name, setName] = useState("");
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (state.succeeded) {
      const countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      setTimeout(() => {
        clearInterval(countdownInterval);
        removeActiveComponent("Contact");
      }, 5000);

      return () => clearInterval(countdownInterval);
    }
  }, [state.succeeded, removeActiveComponent]);

  return (
    <div className="flex flex-col p-1">
      {state.succeeded ? (
        <div>
          <p className="font-bold">Thank you for your email, {name}!</p>
          <p>Closing in {countdown}</p>
        </div>
      ) : (
        <>
          {/* <p className="text-right">
            <a className="text-blue-700" href="mailto:chriscoding@icloud.com">
              chriscoding@icloud.com
            </a>
          </p> */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col"
            style={{ width: "200px" }}
          >
            <label className="font-bold" htmlFor="name">
              Name:
            </label>
            <input
              // placeholder="name"
              required
              id="name"
              type="text"
              name="name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />

            <label className="font-bold" htmlFor="email">
              Email:
            </label>
            <input
              // placeholder="your e-mail"
              required
              id="email"
              type="email"
              name="email"
            />

            <label className="font-bold" htmlFor="message">
              Message:
            </label>
            <textarea
              required
              // placeholder="message"
              id="message"
              name="message"
              className="h-40 resize-y p-2"
            ></textarea>

            <div className="flex mt-1">
              <a className="text-blue-700" href="mailto:chriscoding@icloud.com">
                <button
                  type="button"
                  style={{ width: "50px" }}
                  className="hover:bg-gray-100 flex items-center justify-center ml-auto"
                >
                  <img
                    className="items-center"
                    title="email directly (not with form)"
                    src="https://win98icons.alexmeub.com/icons/png/outlook_express-2.png"
                    alt=""
                  />
                </button>
              </a>
              <button
                style={{ width: "50px" }}
                type="submit"
                disabled={state.submitting}
                className="hover:bg-gray-100 flex items-center justify-center ml-auto"
              >
                Submit
                {/* <img
              className=""
              src="https://win98icons.alexmeub.com/icons/png/outlook_express-2.png"
              alt=""
            /> */}
              </button>
            </div>

            <ValidationError prefix="Name" field="name" errors={state.errors} />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />
          </form>
        </>
      )}
    </div>
  );
}
