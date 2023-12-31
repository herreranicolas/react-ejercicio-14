import { Container, Row, Spinner } from "react-bootstrap";
import SliderInicio from "./recetas/SliderInicio";
import CardReceta from "./recetas/CardReceta";
import { useEffect, useState } from "react";
import { obtenerListaRecetas } from "../helpers/queries";
import Swal from "sweetalert2";

const Inicio = () => {
  const [recetas, setRecetas] = useState([]);
  const [mostrarSpinner, setMostrarSpinner] = useState(true);

  useEffect(() => {
    obtenerListaRecetas().then((respuesta) => {
      if (respuesta) {
        setRecetas(respuesta);
        setMostrarSpinner(false);
      } else {
        Swal.fire({
          title: "Oops! Lo siento!",
          text: "No se pudieron obtener las recetas. Intente realizar esta operación en otro momento.",
          icon: "error",
          confirmButtonColor: "#fa8072",
        });
      }
    });
  }, []);
  return (
    <section className="container seccionPrincipal">
      <h1 className="text-center py-2 fw-bolder">Recetas de Cocina</h1>
      <SliderInicio></SliderInicio>
      <Container className="py-3">
        <Row
          xs={1}
          md={2}
          lg={3}
          xl={4}
          className="justify-content-center align-items-stretch"
        >
          {mostrarSpinner ? (
            <div className="my-3 text-center">
              <Spinner animation="border" variant="danger"></Spinner>
            </div>
          ) : recetas.length === 0 ? (
            <div className="w-100">
              <p className="my-4 text-center lead display-3">
                No hay recetas cargadas
              </p>
            </div>
          ) : (
            <>
              {recetas.map((receta) => (
                <CardReceta key={receta.id} receta={receta}></CardReceta>
              ))}
            </>
          )}
        </Row>
      </Container>
    </section>
  );
};

export default Inicio;
