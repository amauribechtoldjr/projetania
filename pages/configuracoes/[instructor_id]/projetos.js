import React from "react";
import { useRouter } from "next/router";
import BaseLayout from "@/layouts/BaseLayout";
import withAuth from "@/hoc/withAuth";
import withApollo from "@/hoc/withApollo";
import { Card, Button } from "react-bootstrap";
import { getDataFromTree } from "@apollo/react-ssr";
import { useUserProjects } from "@/apollo/actions/project";
import Link from "next/link";
import {
  useGetProjects,
  useUpdateProject,
  useDeleteProject,
} from "@/apollo/actions";
import {formatDate} from '@/utils/functions';

const ConfigurationProjects = () => {
  const { data } = useUserProjects();
  const [deleteProject] = useDeleteProject();
  const userProjects = (data && data.userProjects) || [];
  const router = useRouter();

  const handleDeleteProject = (projectId) => () => {
    const confirmDelete = confirm("Tem certeza que deseja excluir o projeto?");

    const variables = { id: projectId };

    if (confirmDelete) {
      deleteProject({ variables });
    }
  };

  

  return (
    <BaseLayout page="Projetos">
      <div className="row mt-4">
        <div className="col-md-12">
          <h1 className="mb-4">Seus projetos</h1>
          {userProjects &&
            userProjects.map((p) => {
              console.log();
              return (
              <Card className="mb-2" key={p._id}>
                <Card.Header>{p.title}</Card.Header>
                <Card.Body>
                  <Card.Title>
                    {`${p.title} - ${formatDate(p.createdAt, 'Data não informada')}`}
                  </Card.Title>
                  <Card.Text>{p.about_project}</Card.Text>
                  <Link
                    href="/projeto/[projeto_id]/editar"
                    as={`/projeto/${p._id}/editar`}
                  >
                    <a className="btn btn-warning mr-1">Editar</a>
                  </Link>
                  <Button variant="danger" onClick={handleDeleteProject(p._id)}>
                    Excluir
                  </Button>
                </Card.Body>
              </Card>
            );})}
        </div>
      </div>
    </BaseLayout>
  );
};

export default withApollo(withAuth(ConfigurationProjects), { getDataFromTree });
