import { useState } from "react";
import BaseLayout from "@/layouts/BaseLayout";
import withApollo from "@/hoc/withApollo";
import { getDataFromTree } from "@apollo/react-ssr";
import { useGetTopicsByCategory } from "@/apollo/actions/forum";
import { useRouter } from "next/router";
import Link from "next/link";
import Replier from "@/components/shared/Replier";
import { useGetUser } from "@/apollo/actions/user";
import { useCreateTopic } from "@/apollo/actions/forum";

const useTopicsInitialData = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { data: topicsData } = useGetTopicsByCategory({ slug });
  const { data: userData } = useGetUser();
  const [createTopic] = useCreateTopic();
  const topicsByCategory = (topicsData && topicsData.topicsByCategory) || [];
  const user = (userData && userData.user) || null;

  return {
    topicsByCategory,
    user,
    createTopic,
    slug,
    router,
  };
};

const Topics = () => {
  const [isReplierOpen, setReplierOpen] = useState(false);
  const {
    topicsByCategory,
    user,
    createTopic,
    slug,
    router,
  } = useTopicsInitialData();

  const handleCreateTopic = (variables, done) => {
    variables.forumCategory = slug;
    createTopic({
      variables: {
        ...variables,
      },
    }).then((data) => {
      setReplierOpen(false);
      done();
    });
  };

  const goToTopic = (slug) => {
    router.push("/forum/topicos/[topicSlug]", `/forum/topicos/${slug}`);
  };

  return (
    <BaseLayout>
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>Selecione um tópico</h1>
            <button
              className="btn btn-primary"
              onClick={() => setReplierOpen(true)}
              disabled={!user}
            >
              Create topic
            </button>
            {!user && <i className="ml-2">Conecte-se para criar um tópico</i>}
          </div>
        </div>
      </section>
      <section className="fj-topic-list">
        <table className="table table-hover ">
          <thead>
            <tr>
              <th scope="col">Tópico</th>
              <th scope="col">Categoria</th>
              <th scope="col">Autor</th>
            </tr>
          </thead>
          <tbody>
            {topicsByCategory.map((tp) => (
              <tr key={tp._id} onClick={() => goToTopic(tp.slug)}>
                <th>{tp.title}</th>
                <td className="category">{tp.forumCategory.slug}</td>
                <td>{tp.user.username}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link href="/forum/categorias">Voltar</Link>
      </section>
      <Replier
        open={isReplierOpen}
        onSubmit={handleCreateTopic}
        closeBtn={() => (
          <button
            className="btn btn-danger ml-2"
            onClick={() => setReplierOpen(false)}
          >
            Cancelar
          </button>
        )}
      />
    </BaseLayout>
  );
};

export default withApollo(Topics, { getDataFromTree });
