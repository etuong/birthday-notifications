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
              <summary>How can I pay for my appointment?</summary>
              <p className="faq-content">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
                illo quod debitis ducimus iste soluta rerum ipsa consequuntur
                minus quae. Ea minus ex corporis, pariatur quia rerum sequi
                iusto odit enim expedita fugiat, assumenda molestiae earum
                iste blanditiis, ipsum ratione.
              </p>
            </details>

            <details>
              <summary>What can I expect at my first consultation?</summary>
              <p className="faq-content">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Sequi, molestias similique! Molestiae sapiente omnis, illo
                facere odit reprehenderit eveniet consequuntur sit minus
                adipisci temporibus eius inventore quidem. Dignissimos, facere
                quae. Rem quas a laborum est officia pariatur voluptatum iusto
                perferendis aut labore fugit magni inventore nulla architecto,
                velit, facilis itaque.
              </p>
            </details>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Faq;

