import BaseLayout from "@/layouts/BaseLayout";
import withApollo from "@/hoc/withApollo";
import { getDataFromTree } from "@apollo/react-ssr";
import { useGetTopicsByCategory } from "@/apollo/actions/forum";
import { useRouter } from "next/router";
import Link from "next/link";

const Topics = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { data } = useGetTopicsByCategory({ slug });
  const topicsByCategory = (data && data.topicsByCategory) || [];

  return (
    <BaseLayout>
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>Selecione um tópico</h1>
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
              {/* <th scope="col">Replies</th> */}
            </tr>
          </thead>
          <tbody>
            {topicsByCategory.map((tp) => (
              <tr key={tp._id}>
                <th>{tp.title}</th>
                <td className="category">{tp.forumCategory.slug}</td>
                <td>{tp.user.username}</td>
                {/* <td>2</td> */}
              </tr>
            ))}
          </tbody>
        </table>
        <Link href="/forum/categorias">Voltar</Link>
      </section>
    </BaseLayout>
  );
};

export default withApollo(Topics, { getDataFromTree });
