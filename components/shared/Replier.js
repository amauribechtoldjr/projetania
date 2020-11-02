import { useState } from "react";

const initialReplyData = {
  title: "",
  content: "",
};

const Replier = ({
  open,
  closeBtn: CloseButton,
  onSubmit,
  replyTo,
  hasTitle = true,
}) => {
  const [reply, setReply] = useState(initialReplyData);
  const isOpen = open ? "is-open" : "";

  const handleChange = (event) => {
    const { name, value } = event.target;
    setReply({ ...reply, [name]: value });
  };

  const resetReplier = () => {
    setReply(initialReplyData);
  };

  return (
    <div className={`reply-controls ${isOpen}`}>
      <div className="reply-area">
        {replyTo && (
          <div className="reply-to">
            Responder para: <span className="text ml-2">{replyTo}</span>
          </div>
        )}
        {hasTitle && (
          <div className="fj-editor-input">
            <input
              name="title"
              placeholder="Título"
              type="text"
              onChange={handleChange}
              value={reply.title}
            />
          </div>
        )}
        <div className="fj-editor">
          <div className="fj-editor-textarea-wrapper">
            <textarea
              name="content"
              placeholder="Conteúdo"
              onChange={handleChange}
              value={reply.content}
            />
          </div>
          <div className="fj-editor-preview-wrapper">
            <div className="preview">
              <p></p>
            </div>
          </div>
        </div>
        <div className="submit-area">
          <div className="send mr-auto">
            <button
              className="btn btn-main bg-blue py-2 ttu"
              onClick={() => {
                onSubmit(reply, resetReplier);
              }}
            >
              Responder
            </button>
            <CloseButton />
          </div>
          <div>
            <a className="btn py-2 ttu gray-10">hide preview</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Replier;
