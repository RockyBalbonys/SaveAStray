import React from "react";
import PawPng from "../../assets/images/Paw.png";

export default function TermsOfServices() {
  return (
    // Container div
    <div
      className="flex justify-center items-center h-[1444px] py-14"
      style={{ backgroundImage: `url(${PawPng})`, backgroundSize: "cover" }}
    >
      <div className="w-[1027px] h-full px-[31px] py-8 bg-white rounded-[7px] flex flex-col justify-center items-center gap-6 overflow-y-auto">
        <div className="w-[84px] h-[84px] justify-center items-center inline-flex">
          <div className="w-[84px] h-[84px] relative flex flex-col justify-start items-start" />
        </div>
        <div className="w-[965px] h-[39px] relative">
          <div className="left-[328.50px] top-0 absolute text-orange-500 text-[32px] font-bold font-['Inter']">
            PRIVACY POLICY
          </div>
          <img
            className="w-[965px] h-px left-0 top-[19px] absolute"
            src="https://via.placeholder.com/965x1"
          />
        </div>
        <div className="h-[885px] px-[81px] pt-0.5 flex flex-col justify-end items-center overflow-y-auto">
          <div className="w-[656px] text-justify text-orange-500">
            <span className="text-base font-bold font-['Inter']">
              Your privacy is important to us.
            </span>
            <span className="text-base font-normal font-['Poppins'] leading-normal">
              {" "}
              This Privacy Policy explains how SaveAStray collects, uses, and
              discloses information about you when you visit and use our website
              and services.
              <br />
            </span>
            <span className="text-base font-bold font-['Inter']">
              1. Information We Collect:
            </span>
            <span className="text-base font-normal font-['Poppins'] leading-normal">
              {" "}
              Personally Identifiable Information (PII): We may collect the
              following PII from you:
            </span>
            <span className="text-base font-normal font-['Poppins'] leading-normal">
              {" "}
              Name
              <br />
              Email address
              <br />
              Phone number
              <br />
              Demographic information (age, gender, etc.)
              <br />
              Information about your pets, including photos and descriptions
              <br />
              Adoption-related information, such as adoption history and
              preferences
              <br />
            </span>
            <span className="text-base font-bold font-['Inter']">
              2. How We Use Your Information:
            </span>
            <span className="text-base font-normal font-['Poppins'] leading-normal">
              {" "}
              We use your PII to:
              <br />
              Create and manage your account
              <br />
              Process adoption applications
              <br />
              Connect you with shelters and rescue organizations
              <br />
              Provide you with information and updates about adoptable animals
              and adoption news
              <br />
              Respond to your inquiries and requests
              <br />
              Personalize your experience on our website
              <br />
            </span>
            <span className="text-base font-bold font-['Inter']">
              3. Sharing Your Information:
            </span>
            <span className="text-base font-normal font-['Poppins'] leading-normal">
              {" "}
              We will not share your PII with any third party except in the
              following limited circumstances:
              <br />
              With your consent.
              <br />
              With shelters and rescue organizations you poppinsact with during
              the adoption process.
              <br />
              With service providers who help us operate our website and
              services (these providers are obligated to keep your information
              confidential).
              <br />
              To comply with legal requirements, such as a court order or
              subpoena.
              <br />
              To prevent fraud or harm to others.
              <br />
            </span>
            <span className="text-base font-bold font-['Inter']">
              4. Data Security:
            </span>
            <span className="text-base font-normal font-['Poppins'] leading-normal">
              {" "}
              We take reasonable security measures to protect your information
              from unauthorized access, disclosure, alteration, or destruction.
              However, no security measure is perfect, and we cannot guarantee
              the complete security of any information you transmit to us.
              <br />
            </span>
            <span className="text-base font-bold font-['Inter']">
              5. Cookies and Tracking Technologies:
            </span>
            <span className="text-base font-normal font-['Poppins'] leading-normal">
              {" "}
              We use cookies and other tracking technologies to track user
              activity on our website and to hold certain information. You can
              configure your browser to reject cookies or to alert you when a
              cookie is placed on your device. However, if you disable cookies,
              some features of our website may not function properly.
              <br />
            </span>
            <span className="text-base font-bold font-['Inter']">
              6. Your Choices:
            </span>
            <span className="text-base font-normal font-['Poppins'] leading-normal">
              {" "}
              You have the right to access, update, or delete your PII at any
              time. You can do this by logging into your account or contacting
              us.
              <br />
              You can also opt out of receiving promotional emails from us by
              clicking on the "unsubscribe" link in any email.
              <br />
            </span>
            <span className="text-base font-bold font-['Inter']">
              7. Changes to this Privacy Policy:
            </span>
            <span className="text-base font-normal font-['Poppins'] leading-normal">
              {" "}
              We may update this Privacy Policy from time to time. We will post
              any changes on this page. We encourage you to review this Privacy
              Policy periodically for the latest information about our privacy
              practices.
              <br />
            </span>
            <span className="text-base font-bold font-['Inter']">
              8. Contact Us:
            </span>
            <span className="text-base font-normal font-['Poppins'] leading-normal">
              {" "}
              If you have any questions about this Privacy Policy, please
              contact us at saveastray.lyfie@gmail.com.
            </span>
          </div>
        </div>
        <div className="flex justify-start items-start gap-2">
          <div className="h-[35px] px-8 py-2 bg-white rounded-[7px] border border-orange-500 justify-center items-center gap-[8.82px] flex">
            <div className="w-[59px] text-center text-orange-500 text-base font-bold font-['Inter']">
              Decline
            </div>
          </div>
          <div className="h-[35px] px-8 py-2 bg-orange-500 rounded-[7px] justify-center items-center gap-[8.82px] flex">
            <div className="w-[99.87px] text-center text-white text-base font-bold font-['Inter']">
              Agree
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
