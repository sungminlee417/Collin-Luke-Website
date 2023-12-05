import React, { FormEvent, useState } from "react";

const pianoIMG =
  "https://the-muse-duo.s3.us-west-1.amazonaws.com/muse-duo-gallery-12.jpeg";

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
    <section className="relative flex flex-wrap lg:h-screen lg:items-center container mx-auto">
      <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl sm:text-3xl">Connect with us!</h1>

          <p className="mt-4 text-gray-500">
            <a
              className=" decoration-dotted decoration-inherit underline underline-offset-4"
              href={`mailto:${"themuseduo@gmail.com"}`}
            >
              themuseduo@gmail.com
            </a>
          </p>
        </div>

        <form
          className="mx-auto mb-0 mt-8 max-w-md space-y-4 rounded-lg p-4 shadow-lg "
          onSubmit={handleSendMailSubmit}
        >
          <div>
            <label htmlFor="email" className="sr-only">
              Subject
            </label>

            <div className="relative">
              <input
                onChange={(e) => setSubject(e.target.value)}
                type="subject"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter subject"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Message
            </label>

            <div className="relative">
              <textarea
                onChange={(e) => setMessage(e.target.value)}
                rows={8}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm resize-none"
                placeholder="Enter message"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div></div>
            <button
              type="submit"
              className="inline-block rounded-lg bg-[#EE2E31] px-5 py-3 text-sm font-medium text-white"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
        <img
          alt="Piano"
          src={pianoIMG}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </section>
  );
};

export default Contact;
