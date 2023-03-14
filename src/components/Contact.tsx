import React from "react";
import { Formik, Form, Field } from "formik";
import image from "../images/IMG_4650.jpeg";

interface MyFormValues {
  subject: string;
  message: string;
}

export const Contact = () => {
  const initialValues: MyFormValues = { subject: "", message: "" };

  return (
    <section className="contact-section flex flex-col gap-14 md:m-20 m-12">
      <h2 className="text-4xl">Contact</h2>
      <div className="flex flex-col divide-y-[1px] divide-gray-400 gap-14">
        <div className="text-center text-7xl">Get In Touch</div>
        <div className="flex justify-between items-center gap-10 pt-14">
          <img
            className="lg:w-5/12 lg:block hidden object-contain h-2/5"
            src={image}
            alt="Collin and Luke"
          />
          <div className="flex flex-col w-full gap-6">
            <div className="text-3xl flex gap-2">
              <span>Email:</span>
              <a
                className=" decoration-dotted decoration-inherit underline underline-offset-4"
                href={`mailto:${"themuseduo@gmail.com"}`}
              >
                themuseduo@gmail.com
              </a>
            </div>
            <Formik
              initialValues={initialValues}
              onSubmit={(values, actions) => {
                const { subject, message } = values;
                window.location.href = `mailto:${"themuseduo@gmail.com"}?subject=${
                  subject || ""
                }&body=${message || ""}`;
                actions.setSubmitting(false);
              }}
            >
              <Form className="w-full flex flex-col gap-6">
                <Field
                  id="subject"
                  name="subject"
                  placeholder="Subject"
                  className="border-none rounded-md h-12 p-4"
                />
                <Field
                  as="textarea"
                  id="message"
                  name="message"
                  placeholder="Message"
                  className="border-none rounded-md h-96 p-4"
                />
                <button
                  type="submit"
                  className="cursor-pointer bg-[#967e76] text-white text-center border-none text-2xl tracking-wider rounded-md px-16 py-4 w-full"
                >
                  SUBMIT
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
