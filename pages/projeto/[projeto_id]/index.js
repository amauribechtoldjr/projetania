import React from "react";
import BaseLayout from "@/layouts/BaseLayout";
import withApollo from "@/hoc/withApollo";
import withAuth from "@/hoc/withAuth";
import { useGetProject } from "@/apollo/actions/project";
import { getDataFromTree } from "@apollo/react-ssr";
import {formatDate} from '@/utils/functions';
import {useRouter} from 'next/router';

const Project = () => {
  const router = useRouter();
  const { data } = useGetProject({
    id: router.query.projeto_id,
  });

  const project = (data && data.project) || {};

  return (
    <BaseLayout page="ProjetoPage">
      <div className="mt-4">{`Título: ${project.title}`}</div>
      <div className="mt-1">{`Sobre o projeto: ${project.about_project}`}</div>
      <div className="mt-1">{`Data de criação: ${formatDate(project.createdAt)}`}</div>
      <div className="mt-1">{`Criado a mais de 7 dias? ${project.isExpired}`}</div>
    </BaseLayout>
  );
};

// Project.getInitialProps = async ({ query }) => {
//   return { query };
// };

export default withApollo(withAuth(Project), { getDataFromTree });
