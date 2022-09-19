import { useEffect, useState } from "react";
import "./Contact.css";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import image from "../images/IMG_4650.jpeg";

export const Contact = () => {
  const validEmail = new RegExp(
    '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
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
    const nameElement = document.getElementById("error-name")
    const emailElement = document.getElementById("error-email")
    const messageElement = document.getElementById("error-message")
    nameElement.classList.remove("show-error-message")
    emailElement.classList.remove("show-error-message")
    messageElement.classList.remove("show-error-message")
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
    }
    else {
      nameElement.classList.add("show-error-message")
      emailElement.classList.add("show-error-message")
      messageElement.classList.add("show-error-message")
    }
  };

  return (
    <section className="contact-section content-margin">
      <h3 id="contact-section-header-text">Contact </h3>
      <div className="email-header">
        <div id="contact-section-header">Get In Touch</div>
        <hr id="contact-section-header-underline"></hr>
      </div>
      <div className="contact-content">
        <img className="contact-image" src={image} alt="Collin and Luke" />
        <form className="contact-form" ref={form} onSubmit={sendEmail}>
          <div id="contact-inputs">
            <div className="input-container"> 
              <input
                className="contact-input"
                placeholder="Name"
                type="text"
                name="user_name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <p className="error-message" id="error-name">A valid name is required</p>
            </div>
            <div className="input-container">
              <input
                className="contact-input"
                placeholder="Email"
                type="text"
                name="user_email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="error-message" id="error-email">A valid email is required</p>
            </div>
            <div className="input-container">
              <textarea
                className="contact-message-input"
                placeholder="Message"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <p className="error-message" id="error-message">A valid message is required</p>
            </div>
          </div>
          {submitted && validationErrors.length > 0 && (
            <ul className="validation-errors">
              {validationErrors.map((error, index) => {
                return (
                  <div className="error-icon">
                    <ion-icon name="alert-circle-outline"></ion-icon>
                    <li>{error}</li>
                  </div>
                );
              })}
            </ul>
          )}
          <button className="submit-contact-form" type="submit">
            SUBMIT
          </button>
        </form>
      </div>
    </section>
  );
};

// const Contact = () => {
//     const [email,setEmail] = useState("")
//     const onSubmit = (e) => {
//         e.preventDefault()
//         console.log(email)
//     }
//     return (
//         <section id="contact-section">
//             <form onSubmit={onSubmit}>
//                 <div className="email-container">
//                 <label htmlFor="contact-email">Email</label>
//                 <input placeholder="Enter Email here" name="contact-email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
//                 </div>
//                 <button type="submit">Submit</button>
//             </form>
//         </section>
//     );
// };

export default Contact;
