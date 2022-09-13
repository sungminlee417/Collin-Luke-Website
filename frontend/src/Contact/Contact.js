import { useEffect, useState } from "react";
import "./Contact.css";
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

export const Contact = () => {
  const form = useRef();
  const [email,setEmail] = useState("")
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [validationErrors, setValidationErrors] = useState([])
  const [submitted, setSubmitted] = useState(false)
  useEffect(() => {
    const errors = []
    if (!name) errors.push("A valid name is required.")
    if (!message) errors.push("A valid message is required.")
    setValidationErrors(errors)

  }, [email, name, message])

  const sendEmail = (e) => {
    e.preventDefault();
    setSubmitted(true)
    if (!validationErrors.length) {
      emailjs.sendForm('service_vuw3xhj', 'template_x2714ql', form.current, 'eMlZzUFZjzRtC_BAp')
      .then((result) => {
          setEmail("")
          setName("")
          setMessage("")
          setSubmitted(false)
      }, (error) => {
          setValidationErrors([error.text])
      });
    }


  };

  return (
    <section className="contact-section content-margin">
      <h3 id="contact-section-header-text">(4) Contact </h3>
      <form ref={form} onSubmit={sendEmail}>
        <label>Name</label>
        <input type="text" name="user_name" value={name} onChange={(e) => setName(e.target.value)}/>
        <label>Email</label>
        <input type="email" name="user_email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Message</label>
        <textarea name="message" value={message} onChange={(e) => setMessage(e.target.value)}/>
        <input type="submit" value="Send"/>
      </form>
      {submitted && validationErrors.length > 0 && <ul>
        {
          validationErrors.map((error, index) => {
            return <li>{error}</li>
          })
        }
        </ul>}
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