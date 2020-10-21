import React from "react";
import {useQuery} from '@apollo/react-hooks';
import {GET_PROJECT} from '@/apollo/queries';
import withApollo from '@/hoc/withApollo';

import { getDataFromTree } from '@apollo/react-ssr';

const Project = ({ query }) => {
  const { data } = useQuery(GET_PROJECT, {variables:  {
    id: query.projeto_id
  }});

  const project = data && data.project || {};

  return <h1> Eu sou a pagina com o título: {project.title}</h1>;
};

Project.getInitialProps = async ({ query }) => {
  return { query };
};

export default withApollo(Project, {getDataFromTree});
