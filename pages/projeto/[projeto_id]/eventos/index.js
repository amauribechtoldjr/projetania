import BaseLayout from '@/layouts/BaseLayout';

const apiCall = () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res({ testingData: "Test" });
    }, 200);
  });
};

const Eventos = (props) => {
  return <BaseLayout page="EventoPage">Eventos: {props.testingData}</BaseLayout>;
};

Eventos.getInitialProps = async () => {
  const data = await apiCall();
  return { ...data };
};

export default Eventos;
