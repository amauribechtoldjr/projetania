import React from "react";
import BaseLayout from "@/layouts/BaseLayout";
import withApollo from "@/hoc/withApollo";
import { useGetProject } from "@/apollo/actions/project";
import { getDataFromTree } from "@apollo/react-ssr";

const Project = ({ query }) => {
  const { data } = useGetProject({
    id: query.projeto_id,
  });

  const project = (data && data.project) || {};

  return (
    <BaseLayout page="ProjetoPage">
      <div className="mt-4">{`Título: ${project.title}`}</div>
      <div className="mt-1">{`Sobre o projeto: ${project.about_project}`}</div>
    </BaseLayout>
  );
};

Project.getInitialProps = async ({ query }) => {
  return { query };
};

export default withApollo(Project, { getDataFromTree });
