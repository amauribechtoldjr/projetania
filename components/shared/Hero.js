const Hero = () => {
  return (
    <section className="fj-hero">
      <div className="fj-hero-wrapper row">
        <div className="hero-left col-md-6">
          <h1 className="white hero-title">
            Projetânia, você tem a ideia e nós a solução!
          </h1>
          <h2 className="white hero-subtitle">
            O controle completo da sua festa!
          </h2>
        </div>
        <div className="hero-right col-md-6">
          <div className="hero-image-container">
            <a className="grow hero-link">
              <img
                className="hero-image"
                src="https://i.udemycdn.com/course/750x422/1652608_662b_8.jpg"
              ></img>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
