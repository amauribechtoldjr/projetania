import { useForm } from "react-hook-form";

const LoginForm = ({ onSubmit, loading }) => {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          ref={register}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          ref={register}
        />
      </div>
      {!loading && (
        <button type="submit" className="btn btn-main bg-blue py-2 ttu">
          Entrar
        </button>
      )}
      {loading && <span>Entrando...</span>}
    </form>
  );
};

export default LoginForm;
