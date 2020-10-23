import { useGetUser } from "@/apollo/actions";
import Redirect from "@/components/shared/Redirect";
import {MESSAGE_TYPES} from '@/utils/consts'; 

export default (Component, role, options = {ssr: false}) => {
  function withAuth(props) {
    const { data: { user } = {}, loading, error } = useGetUser({
      fetchPolicy: "network-only",
    });

    if (!loading && (!user || error) && typeof window !== undefined) {
      return <Redirect to="/entrar" query={{message: MESSAGE_TYPES.NOT_CONNECTED}} />;
    }

    if (user) {
      if (role && !role.includes(user.role)) {
        return <Redirect to="/entrar" query={{message: MESSAGE_TYPES.NOT_AUTHORIZED}} />;
      }

      return <Component {...props} query={{message: ''}}/>;
    }

    return <p>Loading...</p>;
  }

  if (options.ssr) {
    const serverRdirect = (res, to) => {
      res.redirect(to);
      res.end();
      return {};
    }

    withAuth.getInitialProps = async (context) => {
      const {req, res} = context;

      if (req) {
        const {user} = req;

        if (!user) {
          return serverRdirect(res, `/entrar?message=${MESSAGE_TYPES.NOT_CONNECTED}`);
        }

        if (role && !role.includes(user.role)) {
          return serverRdirect(res, `/entrar?message=${MESSAGE_TYPES.NOT_AUTHORIZED}`);
        }
      }

      const pageProps = await Component.getInitialProps && Component.getInitialProps(context);
      return {...pageProps}
    }
  }
  
  return withAuth;
};
