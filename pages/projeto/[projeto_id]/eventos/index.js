const apiCall = () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res({ testingData: "Test" });
    }, 200);
  });
};

const Eventos = (props) => {
  return <span>Eventos: {props.testingData}</span>;
};

Eventos.getInitialProps = async () => {
  const data = await apiCall();
  return { ...data };
};

export default Eventos;
