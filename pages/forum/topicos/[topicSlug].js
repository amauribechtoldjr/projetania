import BaseLayout from "@/layouts/BaseLayout";
import { useGetTopicBySlug, useGetPostsByTopic } from "@/apollo/actions/forum";
import { useRouter } from "next/router";
import withApollo from "@/hoc/withApollo";
import { getDataFromTree } from "@apollo/react-ssr";
import PostItem from "@/components/Forum/PostItem";

const useTopicInitialData = () => {
  const router = useRouter();
  const { topicSlug: slug } = router.query;
  const { data: topicData } = useGetTopicBySlug({ variables: { slug } });
  const { data: topicPostsData } = useGetPostsByTopic({ variables: { slug } });
  const topic = (topicData && topicData.topicBySlug) || {};
  const posts = (topicPostsData && topicPostsData.postsByTopic) || [];
  return { topic, posts };
};

const Topic = () => {
  const { topic, posts } = useTopicInitialData();

  return (
    <BaseLayout>
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>{topic.title}</h1>
          </div>
        </div>
      </section>
      <section>
        <div className="fj-post-list">
          {topic._id && <PostItem post={topic} className="topic-post-lead" />}
          <div className="row">
            {posts &&
              posts.map((p) => (
                <div className="col-md-9" key={p._id}>
                  <PostItem post={p} />
                </div>
              ))}
          </div>
        </div>
      </section>
    </BaseLayout>
  );
};

export default withApollo(Topic, { getDataFromTree });
