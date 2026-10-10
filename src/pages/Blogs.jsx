import caso1 from "../assets/sanan2cat.jpg";
import caso2 from "../assets/maxfeliz.jpg";
import {useEffect, useState} from "react";

const CASOS = [
  {
    id: 1,
    categoria: 'Dato Curioso',
    titulo: 'Síntomas Curiosos',
    parrafos: [
      'En esta oportunidad, nuestro equipo enfrentó un diagnóstico poco común en un felino doméstico que presentaba síntomas atípicos de intolerancia alimentaria.',
      'Conoce este dato curioso cuidar la nutrición de tu mascota desde el hogar.',
    ],
    detalle:  [
      '¿Sabías que un simple cambio de alimento o darle sobras caseras puede activar alergias ocultas?',
      'Cuidalo en casa: mantén una dieta estable, evita premios de comida humana y vigila cualquier rascado o cambio al comer',
    ],
    imagen: caso1,
    alt: 'Imagen Caso 1',
  },
  {
    id: 2,
    categoria: 'Rehabilitación',
    titulo: 'Patitas Esperanzadoras',
    parrafos: [
      'Descubre la sorprendente recuperación de Max, un perro rescatado con una lesión compleja en sus patas traseras.',
      'Gracias a la terapia de rehabilitación intensiva en nuestra clínica y el uso de tecnología de fisioterapia canina, logró volver a correr felizmente. Conoce todo el proceso.',
    ],
    detalle: [
        'Max llego a nosotros con un pronóstico difícil tras sufrir  un grave daño en sus extremedidades posteriores,enfrentando un paronama desalentador.',
        'Gracias a la terapia de rehabilitación intensiva en nuestra clinica y el uso de tecnologia de fisioteripia canina,logró volver a correr felizmente.',

    ],
    imagen: caso2,
    alt: 'Imagen Caso 2',
  },
];

export function Blogs() {

  const [casoactivo,SetCasoActivo] = useState(null);
  const cerrar = () => SetCasoActivo(null);

  useEffect(() => {
    if (!casoactivo) return;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') cerrar();
    };

    document.addEventListener("keydown",onKeyDown);
    const overflowOriginal = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown",onKeyDown);
      document.body.style.overflow = overflowOriginal;
    };

  }, [casoactivo]);

  return (
    <section className="blogs-seccion">
      <div className="blogs-container">
        {/* Título Principal */}
        <h1 className="blogs-main-title">
          NOTICIAS <span>IMPORTANTES</span>
        </h1>

        {/* Lista de casos */}
        <div className="blogs-list">
          {CASOS.map((caso) => (
            <article key={caso.id} className="blog-card">
              {/* Lado Izquierdo: Texto */}
              <div className="blog-content">
                <span className="blog-badge">{caso.categoria}</span>

                <h2 className="blog-title">{caso.titulo}</h2>

                <div className="blog-text">
                  {caso.parrafos.map((p, index) => (
                    <p key={index}>{p}</p>
                  ))}
                </div>

                <button
                type="button"
                className="blog-btn"
                onClick={() => SetCasoActivo(caso)}>
                  Ver Caso <span style={{fontSize: '10px'}}>▼</span>
                </button>
              </div>

              {/* Lado Derecho: Imagen */}
              <div className="blog-img-wrapper">
                <img
                  src={caso.imagen}
                  alt={caso.alt}
                  className="blog-img"
                />
              </div>
            </article>
          ))}
        </div>
      </div>

      {casoactivo && (
      <div className="modal-overlay" onClick={cerrar}>

        <div
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-titulo"
        onClick={(e) => e.stopPropagation()}>

          <button
          type="button"
          className="modal-close"
          onClick={cerrar}
          aria-label="cerrar">
            ✕
          </button>
          <img
              src={casoactivo.imagen}
              alt={casoactivo.alt}
              className="modal-img"
          />
        <div className="modal-body">
          <span className="blog-badge">{casoactivo.categoria}</span>
          <h2 id="modal-titulo" className="modal-title">
            {casoactivo.titulo}
          </h2>
          {casoactivo.detalle.map((p,i) => (
              <p key={i} >{p}</p>
              ))}
        </div>
        </div>
      </div>
      )}
    </section>
  );
}