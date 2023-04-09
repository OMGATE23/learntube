import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

const ShareTweet = ({
  shareText = "Hello there 👋 I'm following and learning through youtube playlist! Join my journey!",
}) => {
  function shareProgressUrl() {
    return "http://twitter.com/share?text=" + encodeURIComponent(shareText);
  }

  return (
    <a
      className="share-tweet"
      href={shareProgressUrl()}
      target="_blank"
      rel="noreferrer"
    >
      Share your progress
      <i className="fa-brands fa-twitter"></i>
    </a>
  );
};

export default function Modal({
  closeModal,
  shareText = "Hello there 👋 I'm following and learning through youtube playlist! Join my journey!",
  maxWidth = "450px",
}) {
  return ReactDOM.createPortal(
    <div className="modal-background" aria-hidden="true">
      <div className="modal" style={{ maxWidth }}>
        <div className="modal-content">
          <button
            className="modal-close-btn"
            onClick={closeModal}
            type="button"
          >
            X
          </button>

          <div className="txt-dark-gray lh-md modal-children">
            <h2>Success🎊</h2>
            <p>You have completed one more section! Share your progress 🤗</p>
            <ShareTweet shareText={shareText} />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
