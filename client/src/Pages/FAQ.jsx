import React, { useState } from "react";

  const Accordion = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="w-full md:w-[503px] px-6 py-4 bg-white rounded-[7px] flex flex-col">
        <h6 className="mb-0">
          <button
            className="relative flex items-center w-full p-4 font-semibold text-left transition-all ease-in-out duration-500 border-b border-solid cursor-pointer border-slate-100 text-slate-700 rounded-t-1 group text-dark-500"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="grow shrink basis-0 text-slate-700 text-base font-semibold font-['Poppins'] leading-normal transition-all">
              {title}
            </div>
            <div className="w-[38px] h-[38px] p-[5.43px] bg-white rounded-[7px] border border-orange-600 border-opacity-70 justify-center items-center gap-[27.14px] flex text-orange-600 transition-all">
              {isOpen ? "-" : "+"}
            </div>
          </button>
        </h6>
        <div
          className={`overflow-hidden transition-all duration-100 ease-in-out ${
            isOpen ? "max-h-[1000px]" : "max-h-0"
          }`}
        >
          <div className="p-4 text-sm leading-normal text-blue-gray-500/80">
            {children}
          </div>
        </div>
      </div>
    );
  };

  const FAQ = () => (
    <div className="flex flex-col items-center justify-start h-screen bg-gray-100 text-gray-900 pt-12 overflow-auto">
      <div className="text-center text-2xl font-semibold mb-4 h-16">
        Frequently Asked Questions
      </div>
      <div className="w-full md:w-1/2 text-center text-base font-light mb-8 h-8">
        Need help? Find your questions here.
      </div>
      <div className="flex flex-col md:flex-row justify-center items-start gap-6">
        <div className="flex flex-col items-center gap-6">
          <Accordion title="How do I start the process of adopting an animal through your website?">
            Begin by completing our eligibility questionnaire. If determined
            eligible, log in to your account to proceed with the adoption process.
          </Accordion>
          <Accordion title="What are the specific criteria for eligibility to adopt through your system?">
            Eligibility criteria typically include completing our questionnaire,
            being at least 18 years old, providing proof of identification and
            residency, and meeting other requirements outlined in the
            questionnaire.
          </Accordion>
          <Accordion title="Once I'm eligible, how do I choose a pet from your website?">
            Log in to your account and browse through a variety of pets available
            from different local shelters. Select the pet you're interested in,
            and our system will send a request to the respective shelter.
          </Accordion>
          <Accordion title="What happens after I choose a pet on your website?">
            Once you choose a pet, our system automatically sends an adoption
            request to the local shelter. The shelter will review your request
            and, if approved, you can proceed to finalize the adoption.
          </Accordion>
        </div>
        <div className="flex flex-col items-center gap-6">
          <Accordion title="What is the process for finalizing the adoption after the shelter approves my request?">
            Visit the local shelter to complete the adoption paperwork. Our
            system streamlines this process, ensuring a smooth transition from
            online selection to in-person finalization.
          </Accordion>
          <Accordion title="Can I interact with the online before making a decision to adopt through your system?">
            Absolutely. Our platform encourages users to explore and interact
            with pets before making a decision. Log in to your account, browse
            through profiles, and find the perfect match for your lifestyle.
          </Accordion>
          <Accordion title="What happens once the adoption paperwork is completed through your system?">
            Congratulations! You've successfully adopted a pet. The completion of
            paperwork finalizes the process, and you can now enjoy the
            companionship of your newly adopted animal.
          </Accordion>
          <Accordion title="Is there a trial period or return policy if the adopted pet doesn't fit into my home after finalizing the paperwork?">
            Our system may include a trial period. If any challenges arise, our
            platform supports communication between you and the shelter. Return
            policies are in place, emphasizing early communication for
            resolution.
          </Accordion>
        </div>
      </div>
    </div>
  );

  export default FAQ;