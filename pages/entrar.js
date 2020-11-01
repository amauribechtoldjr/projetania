import { useEffect, useRef } from "react";

import BaseLayout from "@/layouts/BaseLayout";
import LoginForm from "@/components/forms/LoginForm";
import Redirect from "@/components/shared/Redirect";

import withApollo from "@/hoc/withApollo";

import { useRouter } from "next/router";
import { useSignIn } from "@/apollo/actions/user";
import { MESSAGES } from "@/utils/consts";

const Entrar = () => {
  const disposeId = useRef(null);
  const router = useRouter();
  const [signIn, { data, loading, error }] = useSignIn();

  let { message } = router.query;

  const disposeMessage = () => {
    router.replace("/entrar", "/entrar", { shallow: true });
  };

  useEffect(() => {
    if (message) {
      disposeId.current = setTimeout(() => {
        disposeMessage();
      }, 3000);
    }

    return () => {
      clearTimeout(disposeId.current);
    };
  }, [message]);

  const errorMessage = (error) => {
    return (
      (error.graphQLErrors &&
        error.graphQLErrors.length > 0 &&
        error.graphQLErrors[0].message) ||
      "Ops, algo deu errado tente novamente mais tarde!"
    );
  };

  return (
    <BaseLayout page="Entrar">
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Entrar</h1>
            {message && (
              <div className={`alert alert-${MESSAGES[message].status}`}>
                {MESSAGES[message].value}
              </div>
            )}
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
