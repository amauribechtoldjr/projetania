import BaseLayout from '@/layouts/BaseLayout';
import { useEffect } from "react";
import withApollo from "@/hoc/withApollo";
import { useSignOut } from "@/apollo/actions";
import { useRouter } from "next/router";

const Sair = ({ apollo }) => {
  const [signOut] = useSignOut();
  const router = useRouter();

  useEffect(() => {
    signOut().then(() => {
      apollo.cache.reset();
      apollo.resetStore().then(() => router.push("/entrar"));
    });
  }, []);

  return (
    <BaseLayout page="Sair">
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Sair</h1>
            <p>Saindo...</p>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default withApollo(Sair);
