import { formatDate } from "@/utils/functions";

const PostItem = ({ post, className, onReply, canCreate = false }) => {
  const parent = post.parent;

  return (
    <div className={`topic-post ${className}`}>
      <article>
        <div className="row">
          <div className="topic-avatar ml-2">
            <div className="main-avatar">
              <img
                className="avatar border-0 subtle-shadow"
                src={post.user.avatar}
              ></img>
            </div>
          </div>
          <div className="topic-body">
            <div className="topic-header">
              <div className="topic-meta">
                <div className="name-container">
                  <span className="name">{post.user.username}</span>
                </div>
                <div className="date-container">
                  <span className="date">
                    {formatDate(
                      post.createdAt,
                      "Data inválida",
                      "'Dia' dd 'de' MMMM', às ' HH:mm'h'"
                    )}
                  </span>
                </div>
              </div>
            </div>
            <div className="topic-content">
              {parent && (
                <div className="topic-parent cooked">
                  <div className="topic-parent-inner cooked">
                    <div className="topic-parent-header">
                      <div className="topic-parent-avatar">
                        <div className="main-avatar">
                          <img
                            className="avatar border-0 subtle-shadow"
                            src={parent.user.avatar}
                          ></img>
                        </div>
                      </div>
                      <div className="username">{parent.user.username}</div>
                    </div>
                    <div className="topic-parent-content">
                      <p>{parent.content}</p>
                    </div>
                  </div>
                </div>
              )}
              <div className="cooked">
                <p>{post.content}</p>
              </div>
              <section className="post-menu-area">
                <nav className="post-controls">
                  <div className="actions">
                    {onReply && (
                      <button
                        disabled={!canCreate}
                        className="btn"
                        onClick={() => onReply({ ...post })}
                        title={
                          !canCreate
                            ? "Faça o login para responder"
                            : "Responder"
                        }
                      >
                        Responder
                      </button>
                    )}
                  </div>
                </nav>
              </section>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default PostItem;
