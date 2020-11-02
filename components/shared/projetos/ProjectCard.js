import { useRouter } from "next/router";

const ProjectCard = ({ project, updateProject, deleteProject }) => {
  const route = useRouter();

  const redirectProject = (projectId) => {
    route.push("/projeto/[projeto_id]", `/projeto/${projectId}`);
  };

  return (
    <div className="col-md-4 mb-4">
      <div
        className="card subtle-shadow no-border"
        onClick={() => redirectProject(project._id)}
      >
        <div className="card-body">
          <h5 className="card-title">{project.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            {project.about_project}
          </h6>
          <p className="card-text fs-2 ">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
        </div>
        <div className="card-footer no-border">
          <small className="text-muted">Last updated 3 mins ago</small>
        </div>
      </div>
      {(updateProject || deleteProject) && (
        <div>
          {updateProject && (
            <button onClick={() => updateProject(project._id)}>
              Update project
            </button>
          )}
          {deleteProject && (
            <button onClick={() => deleteProject(project._id)}>
              Delete project
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
