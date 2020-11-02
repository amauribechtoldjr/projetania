import BaseLayout from "@/layouts/BaseLayout";
import withApollo from "@/hoc/withApollo";
import { getDataFromTree } from "@apollo/react-ssr";
import { useGetHighlight } from "@/apollo/actions";
import ProjectCard from "@/components/shared/projetos/ProjectCard";
import TopicLink from "@/components/forum/TopicLink";
import Link from "next/link";

const useGetInitialData = () => {
  const { data } = useGetHighlight({ variables: { limit: 3 } });
  const projects = (data && data.highlight.projects) || [];
  const topics = (data && data.highlight.topics) || [];
  return {
    projects,
    topics,
  };
};

const Home = () => {
  const { topics, projects } = useGetInitialData();
  return (
    <BaseLayout page="Home">
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>Projetos</h1>
          </div>
        </div>
      </section>
      <section className="pb-5">
        <div className="row">
          {projects &&
            projects.map((p) => <ProjectCard key={p._id} project={p} />)}
        </div>
      </section>
      <Link href="/projetos">
        <a className="btn btn-main bg-blue ttu">Veja mais projetos</a>
      </Link>
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>Forum de dúvidas</h1>
          </div>
        </div>
      </section>
      <section className="pb-5">
        <div className="list-group">
          {topics && topics.map((t) => <TopicLink topic={t} key={t._id} />)}
        </div>
      </section>
      <Link href="/forum/categorias">
        <a className="btn btn-main bg-blue ttu">Veja mais tópicos</a>
      </Link>
      {/* HOME PAGE ENDS */}
    </BaseLayout>
  );
};

export default withApollo(Home, { getDataFromTree });
