import React from "react";
import { useRouter } from "next/router";
import BaseLayout from '@/layouts/BaseLayout';
import withAuth from '@/hoc/withAuth';
import withApollo from "@/hoc/withApollo";
import {Card, Button} from 'react-bootstrap';
import {getDataFromTree} from '@apollo/react-ssr';
import {useUserProjects} from '@/apollo/actions/project';

const ConfigurationProjects = () => {
  const {data} = useUserProjects();
  const userProjects = (data && data.userProjects) || [];
  const router = useRouter();
  console.log(userProjects);
  return (
    <BaseLayout page="Projetos">
      <div className="row mt-4">
        <div className="col-md-12">
          <h1 className="mb-4">Seus projetos</h1>
          {userProjects && userProjects.map(p => (
            <Card className="mb-2" key={p._id}>
              <Card.Header>{p.title}</Card.Header>
              <Card.Body>
                <Card.Title>{p.title} - {p.createdAt}</Card.Title>
                <Card.Text>{p.about_project}</Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </BaseLayout>
  );
};

export default withApollo(withAuth(ConfigurationProjects), {getDataFromTree});
