import React from "react";
import BaseLayout from "@/layouts/BaseLayout";
import ProjectCard from "../components/shared/projetos/ProjectCard";

import withApollo from "@/hoc/withApollo";
import { getDataFromTree } from "@apollo/react-ssr";

import { useRouter } from "next/router";

import { useGetProjects } from "@/apollo/actions/project";

const Projetos = () => {
  const { data } = useGetProjects();
  const router = useRouter();

  const projects = (data && data.projects) || [];

  return (
    <BaseLayout page="Projetos">
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>Projetos para você</h1>
          </div>
        </div>
      </section>
      <section className="pb-5">
        <div className="row">
          {projects &&
            projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
        </div>
      </section>
    </BaseLayout>
  );
};

export default withApollo(Projetos, { getDataFromTree });
