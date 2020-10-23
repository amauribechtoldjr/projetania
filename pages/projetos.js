import React from "react";
import BaseLayout from "@/layouts/BaseLayout";
import ProjectCard from "../components/shared/projetos/ProjectCard";

import withApollo from "@/hoc/withApollo";
import { getDataFromTree } from "@apollo/react-ssr";

import { useRouter } from "next/router";

import { useGetProjects, useUpdateProject } from "@/apollo/actions";

const Projetos = () => {
  const { data } = useGetProjects();
  const router = useRouter();

  const [updateProject] = useUpdateProject();

  const handleUpdateProject = (id) => {
    const variables = {
      id,
      title: "teste",
      about_project: "teste2",
    };

    updateProject({ variables });
  };

  const handleCreateProject = async () => {
    router.push("/projeto/novo");
  };

  const projects = (data && data.projects) || [];

  return (
    <BaseLayout page="Projetos">
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>Projetos para você</h1>
          </div>
        </div>
        <button onClick={handleCreateProject} className="btn btn-primary mb-4">
          Create project
        </button>
      </section>
      <section className="pb-5">
        <div className="row">
          {projects &&
            projects.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
                updateProject={handleUpdateProject}
              />
            ))}
        </div>
      </section>
    </BaseLayout>
  );
};

export default withApollo(Projetos, { getDataFromTree });
