import BaseLayout from '@/layouts/BaseLayout';
import RegisterForm from "@/components/forms/RegisterForm";
import Redirect from "@/components/shared/Redirect";
import withApollo from "@/hoc/withApollo";
import { Mutation } from "react-apollo";
import { SIGN_UP } from "@/apollo/mutations";
import { MESSAGE_TYPES } from '@/utils/consts';

const Registrar = () => {
  // TODO: handle DB errors
  const errorMessage = (error) => {
    return (
      (error.graphQLErrors && error.graphQLErrors[0].message) ||
      "Ops, algo deu errado tente novamente mais tarde!"
    );
  };

  return (
    <BaseLayout page="Registrar">
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Cadastro</h1>
            <Mutation mutation={SIGN_UP}>
              {(signUpUser, { data, error }) => {
                return (
                  <>
                    <RegisterForm
                      onSubmit={(registerData) => {
                        signUpUser({ variables: { ...registerData } });
                      }}
                    />
                    {data && data.signUp && <Redirect to="/entrar" query={{message: MESSAGE_TYPES.SIGNUP_SUCCESS}}/>}
                    {error && (
                      <div className="alert alert-danger">
                        {errorMessage(error)}
                      </div>
                    )}
                  </>
                );
              }}
            </Mutation>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default withApollo(Registrar);
