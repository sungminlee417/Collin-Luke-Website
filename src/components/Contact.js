import { useEffect, useState } from "react";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import image from "../images/IMG_4650.jpeg";

export const Contact = () => {
  const form = useRef();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [validationErrors, setValidationErrors] = useState(new Set());
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const validEmail = new RegExp(
      "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
    );
    const errors = new Set();
    if (!name) errors.add("name");
    if (!validEmail.test(email)) errors.add("email");
    if (!message) errors.add("message");
    setValidationErrors(errors);
  }, [email, name, message]);

  const sendEmail = (e) => {
    e.preventDefault();

    if (!validationErrors.length) {
      emailjs
        .sendForm(
          "service_vuw3xhj",
          "template_x2714ql",
          form.current,
          "eMlZzUFZjzRtC_BAp"
        )
        .then(
          (result) => {
            setSubmitted(true);
            setTimeout(() => {
              setSubmitted(false);
            }, 15000);
            setEmail("");
            setName("");
            setMessage("");
          },
          (error) => {
            setSubmitted(true);
          }
        );
    }
  };

  return (
    <section className="contact-section flex flex-col gap-14 md:m-20 m-12">
      <h2 className="text-4xl">Contact</h2>
      <div className="flex flex-col divide-y-[1px] divide-gray-400 gap-14">
        <div className="text-center text-7xl">Get In Touch</div>
        <div className="flex justify-center items-center gap-10 pt-14">
          <img
            className="lg:w-2/5 lg:block hidden object-contain h-2/5"
            src={image}
            alt="Collin and Luke"
          />
          <form className="w-full" ref={form} onSubmit={sendEmail}>
            <div className="flex flex-col gap-2">
              <input
                className="border-none rounded-md h-12"
                placeholder="Name"
                type="text"
                name="user_name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <p
                className={`font-light text-[#bf0000] ${
                  submitted && validationErrors.has("name")
                    ? "opacity-1"
                    : "opacity-0"
                }`}
              >
                A valid name is required
              </p>
              <input
                className="border-none rounded-md h-12"
                placeholder="Email"
                type="text"
                name="user_email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p
                className={`font-light text-[#bf0000] ${
                  submitted && validationErrors.has("email")
                    ? "opacity-1"
                    : "opacity-0"
                }`}
              >
                A valid email is required
              </p>
              <textarea
                className="border-none rounded-md h-96"
                placeholder="Message"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <p
                className={`font-light text-[#bf0000] ${
                  submitted && validationErrors.has("message")
                    ? "opacity-1"
                    : "opacity-0"
                }`}
              >
                A valid message is required
              </p>
              <button
                className="cursor-pointer bg-[#967e76] text-white border-none text-2xl tracking-wider rounded-md h-16"
                type="submit"
              >
                SUBMIT
              </button>
              {submitted && !validationErrors.length && (
                <div className="text-center mt-10 font-light">
                  Thank you! Your submission has been received.
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
