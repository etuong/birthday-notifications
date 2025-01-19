import React from "react";

const Faq = () => (
  <div className="modal fade" id="faqModal">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Frequently Asked Questions</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div className="modal-body">
          <div className="faq-body">
            <details>
              <summary>What is the purpose of this app?</summary>
              <p className="faq-content">
                To send an email notification on your people's birthday!
              </p>
            </details>

            <details>
              <summary>How does it work?</summary>
              <p className="faq-content">
                You created an account in order to access the dashboard. You can then create, edit, and delete birthday cards. On the day of the birthday, an email notification will be sent to you.
              </p>
            </details>

            <details>
              <summary>What if I want to skip a birthday?</summary>
              <p className="faq-content">
                Clicking on the "Disable" button on the card will disable the email notification for that birthday.
              </p>
            </details>

            <details>
              <summary>Can the app send a birthday text directly?</summary>
              <p className="faq-content">
                Not at the moment but future enhancements are in the works to send a birthday text directly instead of sending you a notification!
              </p>
            </details>


            <details>
              <summary>What is the tech stack?</summary>
              <p className="faq-content">
                This app was built with Vite (React) on the front, Firebase (Authentication, Document Database, File Storage, Serverless Functions) on the back, and SendGrid to send emails.
              </p>
            </details>

            <details>
              <summary>What if I have questions, concerns, or suggestions?</summary>
              <p className="faq-content">
                The best way to contact the developer of this app is to message him on <a href="https://www.linkedin.com/in/ethan-uong-4066407a/" target="_blank">LinkedIn</a>.
              </p>
            </details>

          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Faq;

