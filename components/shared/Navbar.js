import { useState, useEffect } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import withApollo from "@/hoc/withApollo";
import { useLazyGetUser } from "@/apollo/actions";
import AppLink from "@/components/shared/AppLink";

const NavbarApp = () => {
  const [user, setUser] = useState();
  const [hasResponse, setHasResponse] = useState(false);
  const [getUser, { data, error }] = useLazyGetUser();

  useEffect(() => {
    getUser();
  }, []);

  if (data) {
    if (data.user && !user) setUser(data.user);
    if (!data.user && user) setUser(null);
    if (!hasResponse) {
      setHasResponse(true);
    }
  }
  // console.log(user.role);

  return (
    <div className="navbar-wrapper">
      <Navbar expand="lg" className="navbar-dark fj-mw9">
        <AppLink href="/" className="navbar-brand mr-3 font-weight-bold">
          Projetânia
        </AppLink>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <AppLink href="/projetos" className="nav-link mr-3">
              Projetos
            </AppLink>
            <AppLink href="/forum/categorias" className="nav-link mr-3">
              Forum
            </AppLink>
            <AppLink href="#" className="nav-link mr-3">
              Eventos
            </AppLink>
            <AppLink href="/sobre" className="nav-link mr-3">
              Sobre
            </AppLink>
          </Nav>
          {hasResponse && (
            <Nav>
              {user && (
                <>
                  <span className="nav-link mr-2">Bem vindo {user.name}</span>
                  <NavDropdown
                    title="Configurações"
                    id="collasible-nav-dropdown"
                    className="mr-2"
                  >
                    {["admin", "page-admin"].includes(user.role) && (
                      <>
                        <AppLink href="/projeto/novo" className="dropdown-item">
                          Novo projeto
                        </AppLink>
                        <AppLink
                          href="/configuracoes/[instructor_id]/projetos"
                          as={`/configuracoes/${user._id}/projetos`}
                          className="dropdown-item"
                        >
                          Meus projetos
                        </AppLink>
                        <NavDropdown.Divider />
                      </>
                    )}
                    <NavDropdown.Item href="#action/3.4">
                      Perfil
                    </NavDropdown.Item>
                  </NavDropdown>
                  <AppLink href="/sair" className="nav-link btn btn-danger">
                    Sair
                  </AppLink>
                </>
              )}
              {(error || !user) && (
                <>
                  <AppLink href="/entrar" className="nav-link mr-3">
                    Entrar
                  </AppLink>
                  <AppLink
                    href="/registrar"
                    className="nav-AppLink mr-3 btn btn-success bg-green-2 bright"
                  >
                    Registrar
                  </AppLink>
                </>
              )}
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default withApollo(NavbarApp);
