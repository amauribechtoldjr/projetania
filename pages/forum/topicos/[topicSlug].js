import { useState, useRef } from "react";
import BaseLayout from "@/layouts/BaseLayout";
import {
  useGetTopicBySlug,
  useGetPostsByTopic,
  useCreatePost,
} from "@/apollo/actions/forum";
import { useGetUser } from "@/apollo/actions/user";
import { useRouter } from "next/router";
import withApollo from "@/hoc/withApollo";
import { getDataFromTree } from "@apollo/react-ssr";
import PostItem from "@/components/Forum/PostItem";
import Replier from "@/components/shared/Replier";
import { toast } from "react-toastify";

const useTopicInitialData = () => {
  const router = useRouter();
  const { topicSlug: slug } = router.query;
  const { data: topicData } = useGetTopicBySlug({ variables: { slug } });
  const { data: topicPostsData } = useGetPostsByTopic({ variables: { slug } });
  const { data: userData } = useGetUser();
  const topic = (topicData && topicData.topicBySlug) || {};
  const posts = (topicPostsData && topicPostsData.postsByTopic) || [];
  const user = (userData && userData.user) || null;
  return { topic, posts, user };
};

const PostList = ({ posts, topic, user }) => {
  const pageEnd = useRef();
  const [createPost, { error }] = useCreatePost();
  const [isReplierOpen, setReplierOpen] = useState(false);
  const [replyTo, setReplyTo] = useState(null);

  const handleCreatePost = async (reply, resetReplier) => {
    if (replyTo) {
      reply.parent = replyTo._id;
    }

    reply.topic = topic._id;
    await createPost({ variables: { ...reply } });
    toast.success("Post criado com sucesso!", { autoClose: 2000 });
    setReplierOpen(false);
    resetReplier();
    scrollToBottom();
  };

  const scrollToBottom = () => {
    pageEnd.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="mb-5">
      <div className="fj-post-list">
        {topic._id && <PostItem post={topic} className="topic-post-lead" />}
        <div className="row">
          {posts &&
            posts.map((p) => (
              <div className="col-md-9" key={p._id}>
                <PostItem
                  post={p}
                  canCreate={user !== null}
                  onReply={(reply) => {
                    setReplyTo(reply);
                    setReplierOpen(true);
                  }}
                />
              </div>
            ))}
        </div>
      </div>
      <div className="mt-2 mx-0">
        <div className="col-md-9">
          <div className="posts-bottom">
            {user && (
              <div className="pt-2 pb-2">
                <button
                  className="btn btn-lg btn-outline-primary"
                  onClick={() => {
                    setReplyTo(null);
                    setReplierOpen(true);
                  }}
                >
                  Responder
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div ref={pageEnd} />
      <Replier
        open={isReplierOpen}
        hasTitle={false}
        onSubmit={handleCreatePost}
        replyTo={(replyTo && replyTo.user.username) || topic.title}
        closeBtn={() => (
          <button
            className="btn btn-danger ml-2"
            onClick={() => setReplierOpen(false)}
          >
            Cancelar
          </button>
        )}
      />
    </section>
  );
};

const Topic = () => {
  const { topic, posts, user } = useTopicInitialData();

  return (
    <BaseLayout>
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>{topic.title}</h1>
          </div>
        </div>
      </section>
      <PostList posts={posts} topic={topic} user={user} />
    </BaseLayout>
  );
};

export default withApollo(Topic, { getDataFromTree });
