import BaseLayout from '@/layouts/BaseLayout';
import LoginForm from "@/components/forms/LoginForm";
import Redirect from "@/components/shared/Redirect";

import withApollo from "@/hoc/withApollo";

import { useSignIn } from "@/apollo/actions";

const Entrar = () => {
  const [signIn, { data, loading, error }] = useSignIn();

  const errorMessage = (error) => {
    console.log(error.graphQLErrors);
    return (
      (error.graphQLErrors && error.graphQLErrors.length > 0 && error.graphQLErrors[0].message) ||
      "Ops, algo deu errado tente novamente mais tarde!"
    );
  };

  return (
    <BaseLayout page="Entrar">
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Entrar</h1>
            <LoginForm
              onSubmit={(signInData) => {
                signIn({ variables: signInData });
              }}
              loading={loading}
            />
            {data && data.signIn && <Redirect to="/" />}
            {error && (
              <div className="alert alert-danger">{errorMessage(error)}</div>
            )}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default withApollo(Entrar);
