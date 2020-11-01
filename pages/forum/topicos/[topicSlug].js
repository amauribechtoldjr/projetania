import BaseLayout from "@/layouts/BaseLayout";
import { useGetTopicBySlug } from "@/apollo/actions/forum";
import { useRouter } from "next/router";
import withApollo from "@/hoc/withApollo";
import { getDataFromTree } from "@apollo/react-ssr";

const useTopicInitialData = () => {
  const router = useRouter();
  const { topicSlug: slug } = router.query;
  console.log(slug);
  const { data } = useGetTopicBySlug({ variables: slug });
  console.log(data);
  const topic = (data && data.topicBySlug) || {};
  return { topic };
};

const Topic = () => {
  const { topic } = useTopicInitialData();
  console.log(topic);

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
          <div className="row">
            <div className="col-md-9">
              <div className="topic-post">
                <article>
                  <div className="row">
                    <div className="topic-avatar">
                      <div className="main-avatar">
                        <img
                          className="avatar subtle-shadow"
                          src="https://i.imgur.com/cVDadwb.png"
                        ></img>
                      </div>
                    </div>
                    <div className="topic-body">
                      <div className="topic-header">
                        <div className="topic-meta">
                          <div className="name-container">
                            <span className="name">Filip Jerga</span>
                          </div>
                          <div className="date-container">
                            <span className="date">21h</span>
                          </div>
                        </div>
                      </div>
                      <div className="topic-content">
                        <div className="cooked">
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book.
                          </p>
                        </div>
                        <section className="post-menu-area">
                          <nav className="post-controls">
                            <div className="actions">
                              <button className="btn">reply</button>
                            </div>
                          </nav>
                        </section>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-9">
              <div className="topic-post">
                <article>
                  <div className="row">
                    <div className="topic-avatar">
                      <div className="main-avatar">
                        <img
                          className="avatar subtle-shadow"
                          src="https://i.imgur.com/cVDadwb.png"
                        ></img>
                      </div>
                    </div>
                    <div className="topic-body">
                      <div className="topic-header">
                        <div className="topic-meta">
                          <div className="name-container">
                            <span className="name">Filip Jerga</span>
                          </div>
                          <div className="date-container">
                            <span className="date">21h</span>
                          </div>
                        </div>
                      </div>
                      <div className="topic-content">
                        <div className="cooked">
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book.
                          </p>
                        </div>
                        <section className="post-menu-area">
                          <nav className="post-controls">
                            <div className="actions">
                              <button className="btn">reply</button>
                            </div>
                          </nav>
                        </section>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-9">
              <div className="topic-post">
                <article>
                  <div className="row">
                    <div className="topic-avatar">
                      <div className="main-avatar">
                        <img
                          className="avatar subtle-shadow"
                          src="https://i.imgur.com/cVDadwb.png"
                        ></img>
                      </div>
                    </div>
                    <div className="topic-body">
                      <div className="topic-header">
                        <div className="topic-meta">
                          <div className="name-container">
                            <span className="name">Filip Jerga</span>
                          </div>
                          <div className="date-container">
                            <span className="date">21h</span>
                          </div>
                        </div>
                      </div>
                      <div className="topic-content">
                        <div className="cooked">
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book.
                          </p>
                        </div>
                        <section className="post-menu-area">
                          <nav className="post-controls">
                            <div className="actions">
                              <button className="btn">reply</button>
                            </div>
                          </nav>
                        </section>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
};

export default withApollo(Topic, { getDataFromTree });