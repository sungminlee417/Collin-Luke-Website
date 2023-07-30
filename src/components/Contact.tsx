import React, { FormEvent, useState } from "react";

export const Contact = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSendMailSubmit = (e: FormEvent): void => {
    e.preventDefault();
    window.location.href = `mailto:${"themuseduo@gmail.com"}?subject=${
      subject || ""
    }&body=${message || ""}`;
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-2xl font-bold text-[#660000] sm:text-3xl">
          Connect with us!
        </h1>

        <form
          onSubmit={handleSendMailSubmit}
          className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
        >
          <p className="text-center text-lg font-medium">
            <a
              className=" decoration-dotted decoration-inherit underline underline-offset-4"
              href={`mailto:${"themuseduo@gmail.com"}`}
            >
              themuseduo@gmail.com
            </a>
          </p>

          <div>
            <label htmlFor="subject" className="sr-only">
              Subject
            </label>

            <div className="relative">
              <input
                id="subject"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="sr-only">
              Message
            </label>

            <div className="relative">
              <textarea
                id="message"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm resize-none"
                placeholder="Message"
                rows={8}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="block w-full rounded-lg bg-[#660000] px-5 py-3 text-sm font-medium text-white"
          >
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
