import React, { useRef, useState } from "react"
import { ProfileType, string } from "../../types"
import "./contact-form.css"
import axios from "axios"
import {ClipLoader} from 'react-spinners';

const ContactForm = ({  budget }) => {
  const [isInquiry, setIsInquiry] = useState(false)
  const [selectedBudget, setSelectedBudget] = useState(budget.default)
  const inquiryDetails = useRef(null)

  const [isLoading, setIsLoading] = useState(false); 

  const [name,setname] = useState( "" );
  const [email,setemail] = useState( "" );
  const [phone,setphone] = useState( "" );
  const [message,setmessage] = useState( "" );
  const [subject,setsubject] = useState( "" );

  const handleNameInput = (e) => {

    setname(e.target.value);

  }

  const handlePhoneInput = (e) => {

    setphone(e.target.value);

  }
  const handleEmailInput = (e) => {


    setemail(e.target.value);


  }
  
  const handleMessageInput = (e) => {


    setmessage(e.target.value);

  }

  const handleSubjectInput = (e) => {

    setsubject(e.target.value);

  }

  const sendmail1 = async (e) => {

    console.log("i am running");

    e.preventDefault();

    setIsLoading(true);

    try {
      const response = await axios.post('https://gatsby-backend-5939a551ead9.herokuapp.com/api/mail/sendmail1', { name:name, email: email, phone: phone, message: message, subject: subject, selectedBudget: selectedBudget});
      if (response.status === 201) {
              console.log("success");
              window.alert("Contact Form Sent!")
              location.reload();
             
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false); 

    }

  return (
    <>
      <h5
        className="font-header font-semibold text-front text-sm uppercase mt-12 mb-3"
        id="contact"
      >
        Contact
      </h5>

      <form className="flex flex-wrap" method="post" onSubmit={sendmail1}>
        <div className="flex flex-wrap w-full">
          <div className="w-full lg:w-1/3 py-px lg:px-px">
            <input
              aria-label="Name"
              autoComplete="name"
              className="form-input"
              name="name"
              placeholder="NAME"
              required
              type="text"
              value={name}
              onChange={handleNameInput}
            />
          </div>
          <div className="w-full lg:w-1/3 py-px lg:px-px">
            <input
              aria-label="E-mail"
              autoComplete="email"
              className="form-input"
              name="email"
              placeholder="EMAIL ADDRESS"
              required
              type="email"
              value={email}
              onChange={handleEmailInput}
            />
          </div>
          <div className="w-full lg:w-1/3 py-px lg:px-px">
            <div className="form-control bg-back-light">
              <label className="cursor-pointer select-none">
                <input
                  className="hidden"
                  name="inquiry"
                  onChange={() => setIsInquiry(!isInquiry)}
                  type="checkbox"
                />
                <span className="relative inline-block border-2 align-middle mr-2 -mt-1 border-back w-5 h-5">
                  {isInquiry && (
                    <span className="absolute inline-block bg-lead inset-0 m-1"></span>
                  )}
                </span>
                <span className="text-front opacity-50 uppercase">Inquiry</span>
              </label>
            </div>
          </div>
        </div>

        <div
          className="w-full overflow-hidden transition-all duration-300 ease-linear"
          style={{
            height: isInquiry ? inquiryDetails.current?.clientHeight : 0,
            opacity: isInquiry ? 100 : 0.3,
          }}
        >
          <div ref={inquiryDetails}>
            <div className="flex flex-wrap w-full py-px lg:p-px">
              <div className="w-1/4 lg:w-1/5 bg-back-light">
                <label
                  htmlFor="budget"
                  className="block opacity-50 text-front px-4 py-3 h-full font-header text-sm uppercase font-semibold leading-tight"
                >
                  Budget
                </label>
              </div>
              <div className="w-3/4 lg:w-4/5 p-4 bg-back-light">
                <input
                  className="input-range"
                  defaultValue={budget.default}
                  max={budget.max}
                  min={budget.min}
                  name="budget"
                  onChange={e => setSelectedBudget(e.currentTarget.value)}
                  step="1"
                  type="range"
                />
                <div className="font-header font-semibold leading-none text-front opacity-50">
                  {budget.currency} {selectedBudget}K
                </div>
              </div>
            </div>

            <div className="flex flex-wrap w-full py-px lg:p-px">
              <input
                aria-label="Project Type"
                autoComplete="new-password"
                className="form-input"
                name="project_type"
                placeholder="Enter the Subject: "
                type="text"
                value={subject}
                onChange={handleSubjectInput}
              />
            </div>

            <div className="w-full py-px lg:p-px">
              <input
                aria-label="Phone number"
                autoComplete="tel"
                className="form-input"
                name="phone"
                placeholder="PHONE NUMBER"
                type="tel"
                value={phone}
                onChange={handlePhoneInput}
              />
            </div>
          </div>
        </div>

        <div className="w-full text-right py-px lg:p-px">
          <textarea
            aria-label="Message"
            className="block form-input bg-back-light resize-none border-b-0 pb-4"
            name="message"
            placeholder="MESSAGE"
            required
            rows="6"
            value={message}
            onChange={handleMessageInput}
          ></textarea>
          <div className="bg-back-light">
            <button
              className="font-header inline-block font-semibold px-6 py-2 leading-tight cursor-pointer outline-none bg-front text-back-light uppercase mr-4 my-4 transition-opacity duration-150 hover:opacity-75"
              type="submit"
              
            >{isLoading ? <ClipLoader loading color='#ffffff' size={30}/> : 'Send'}</button>
          </div>
        </div>
      </form>
    </>
  )
}

ContactForm.propTypes = {
  budget: ProfileType.budget,
}

export default ContactForm