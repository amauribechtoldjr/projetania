import BaseLayout from "@/layouts/BaseLayout";
import ProjectForm from "@/components/forms/project/ProjectForm";

import withApollo from "@/hoc/withApollo";
import withAuth from "@/hoc/withAuth";

import { useGetProject, useUpdateProject } from "@/apollo/actions/project";
import { useRouter } from "next/router";

import { toast } from "react-toastify";

const ProjectEdit = () => {
  const router = useRouter();
  const [updateProject, { error }] = useUpdateProject();
  const { projeto_id } = router.query;
  const { data } = useGetProject({
    id: projeto_id,
  });

  const handleProjectUpdate = async (updateProjectData) => {
    await updateProject({
      variables: {
        id: projeto_id,
        ...updateProjectData,
      },
    });
    toast("Projeto alterado com sucesso!");
  };

  const errorMessage = (error) => {
    return (
      (error.graphQLErrors &&
        error.graphQLErrors.length > 0 &&
        error.graphQLErrors[0].message) ||
      "Ops, algo deu errado tente novamente mais tarde!"
    );
  };

  return (
    <BaseLayout page="NovoProjeto">
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Alterando projeto</h1>
            {data && (
              <ProjectForm
                onSubmit={handleProjectUpdate}
                initialData={data.project}
              />
            )}
            {error && (
              <div className="alert alert-danger">{errorMessage(error)}</div>
            )}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default withApollo(withAuth(ProjectEdit, ["admin", "page-admin"]));
