import { useForm } from "react-hook-form";

const ProjectForm = ({ onSubmit, loading, initialData }) => {
  const { register, handleSubmit } = useForm({ defaultValues: initialData });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          ref={register}
        />
      </div>
      <div className="form-group">
        <label htmlFor="about_project">Sobre o projeto</label>
        <input
          type="textarea"
          className="form-control"
          id="about_project"
          name="about_project"
          ref={register}
        />
      </div>
      {!loading && (
        <button type="submit" className="btn btn-main bg-blue py-2 ttu">
          {initialData ? "Alterar" : "Cadastrar"}
        </button>
      )}
      {loading && <span>Cadastrando...</span>}
    </form>
  );
};

export default ProjectForm;
