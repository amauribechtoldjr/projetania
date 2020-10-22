import React from "react";
import BaseLayout from '@/layouts/BaseLayout';
import {useQuery} from '@apollo/react-hooks';
import {GET_PROJECT} from '@/apollo/queries';
import withApollo from '@/hoc/withApollo';

import { getDataFromTree } from '@apollo/react-ssr';

const Project = ({ query }) => {
  const { data } = useQuery(GET_PROJECT, {variables:  {
    id: query.projeto_id
  }});

  const project = data && data.project || {};

  return <BaseLayout page="ProjetoPage"> Eu sou a pagina com o título: {project.title}</BaseLayout>;
};

Project.getInitialProps = async ({ query }) => {
  return { query };
};

export default withApollo(Project, {getDataFromTree});
