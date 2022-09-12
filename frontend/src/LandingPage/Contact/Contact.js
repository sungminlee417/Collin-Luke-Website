import { useState } from "react";
import "./Contact.css";

const Contact = () => {
    const [email,setEmail] = useState("")
    const onSubmit = (e) => {
        e.preventDefault()
        console.log(email)
    }
    return (
        <section id="contact-section">
            <form onSubmit={onSubmit}>
                <div className="email-container">
                <label htmlFor="contact-email">Email</label>
                <input placeholder="Enter Email here" name="contact-email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                </div>
                <button type="submit">Submit</button>
            </form>
        </section>
    );
};

export default Contact;