import caso1 from "../assets/sanan2cat.jpg";
import caso2 from "../assets/maxfeliz.jpg";

const CASOS = [
  {
    id: 1,
    categoria: 'Dato Curioso',
    titulo: 'Síntomas Curiosos',
    parrafos: [
      'En esta oportunidad, nuestro equipo enfrentó un diagnóstico poco común en un felino doméstico que presentaba síntomas atípicos de intolerancia alimentaria.',
      'Conoce este dato curioso cuidar la nutrición de tu mascota desde el hogar.',
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
    imagen: caso2,
    alt: 'Imagen Caso 2',
  },
];

export function Blogs() {
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

                <a href="#" className="blog-btn">
                  Ver caso <span style={{ fontSize: '10px' }}>▼</span>
                </a>
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
    </section>
  );
}