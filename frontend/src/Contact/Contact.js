import { useEffect, useState } from "react";
import "./Contact.css";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import image from "../images/IMG_4650.jpeg";

export const Contact = () => {
  const validEmail = new RegExp(
    "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
  );
  const form = useRef();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    const errors = [];
    if (!name) errors.push("name");
    if (!validEmail.test(email)) errors.push("email");
    if (!message) errors.push("message");
    setValidationErrors(errors);
  }, [email, name, message]);

  const sendEmail = (e) => {
    e.preventDefault();
    const errorElements = document.getElementsByClassName("error-message");

    for (let i = 0; i < errorElements.length; i++) {
      const error = errorElements[i];
      error.classList.remove("show-error-message");
    }

    setSubmitted(true);
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
            setEmail("");
            setName("");
            setMessage("");
            setSubmitted(false);
          },
          (error) => {
            setValidationErrors([error.text]);
          }
        );
    } else {
      validationErrors.forEach((error) => {
        const element = document.getElementById(`error-${error}`);
        element.classList.add("show-error-message");
      });
    }
  };

  return (
    <section className="contact-section content-margin">
      <div className="contact-section-content">
        <h3 id="contact-section-header-text">Contact </h3>
        <div className="email-header">
          <div id="contact-section-header">Get In Touch</div>
        </div>
        <div className="contact-content">
          <img className="contact-image" src={image} alt="Collin and Luke" />
          <form className="contact-form" ref={form} onSubmit={sendEmail}>
            <div id="contact-input-section">
              <input
                className="contact-input"
                placeholder="Name"
                type="text"
                name="user_name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <p className="error-message" id="error-name">
                A valid name is required
              </p>
              <input
                className="contact-input"
                placeholder="Email"
                type="text"
                name="user_email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="error-message" id="error-email">
                A valid email is required
              </p>
              <textarea
                className="contact-message-input"
                placeholder="Message"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <p className="error-message" id="error-message">
                A valid message is required
              </p>
              <button className="submit-contact-form" type="submit">
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
