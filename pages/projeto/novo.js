import BaseLayout from "@/layouts/BaseLayout";
import ProjectForm from "@/components/forms/project/ProjectForm";
import Redirect from "@/components/shared/Redirect";

import withApollo from "@/hoc/withApollo";
import withAuth from "@/hoc/withAuth";

import { useCreateProject } from "@/apollo/actions/project";

const ProjectNew = () => {
  const [createProject, { data, loading, error }] = useCreateProject();

  const errorMessage = (error) => {
    return (
      (error.graphQLErrors && error.graphQLErrors[0].message) ||
      "Ops, algo deu errado tente novamente mais tarde!"
    );
  };

  return (
    <BaseLayout page="NovoProjeto">
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Novo projeto</h1>
            <ProjectForm
              onSubmit={(createProjectData) =>
                createProject({ variables: { ...createProjectData } })
              }
              loading={loading}
            />
            {data && data.createProject && <Redirect to="/projetos" />}
            {error && (
              <div className="alert alert-danger">{errorMessage(error)}</div>
            )}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default withApollo(withAuth(ProjectNew, ["admin", "page-admin"]));
