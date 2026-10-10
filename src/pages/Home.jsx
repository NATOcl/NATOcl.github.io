import { Link } from 'react-router-dom'

const SERVICIOS = [
  {
    titulo: 'Consulta General',
    descripcion: 'Revisiones completas y seguimiento personalizado para mantener a tu mascota en óptima salud todo el año.',
    icono: '🩺',
  },
  {
    titulo: 'Vacunación',
    descripcion: 'Esquemas de inmunización actualizados y desparasitación para proteger a tu mascota contra enfermedades.',
    icono: '💉',
  },
  {
    titulo: 'Diagnóstico',
    descripcion: 'Exámenes de laboratorio e imágenes avanzadas para detectar y tratar a tiempo cualquier padecimiento.',
    icono: '🔬',
  },
  {
    titulo: 'Cirugía',
    descripcion: 'Procedimientos quirúrgicos seguros con monitoreo continuo para cuidar la vida de tu mascota.',
    icono: '🏥',
  },
  {
    titulo: 'Odontología',
    descripcion: 'Limpieza y tratamiento dental especializado para mantener una boca sana y prevenir enfermedades.',
    icono: '🪥',
  },
  {
    titulo: 'Urgencias 24h',
    descripcion: 'Atención médica inmediata y especializada a cualquier hora para resolver emergencias graves.',
    icono: '🚨',
  },
]

const ESTADISTICAS = [
  { cifra: '15+', label: 'Años de experiencia' },
  { cifra: '80.000', label: 'Pacientes atendidos' },
  { cifra: '24/7', label: 'Urgencias Disponibles' },
  { cifra: '90%', label: 'Pacientes Satisfechos' },
]

const TESTIMONIOS = [
  {
    nombre: 'Ryu Hayabusa',
    mascota: 'Dueño de Manzanita (Bulldog)',
    iniciales: 'RH',
    estrellas: '★★★★★',
    texto: 'Excelente atención de urgencias. Salvaron a Manzanita a altas horas de la noche con una calidez y profesionalismo increíbles. ¡100% recomendados!',
  },
  {
    nombre: 'Valentina Pacheco',
    mascota: 'Dueña de Yuki (Gato Mestizo)',
    iniciales: 'VP',
    estrellas: '★★★★☆',
    texto: 'Gran equipo de veterinarios. Trataron muy bien a Yuki en su control, aunque la espera en recepción fue un poco más larga de lo previsto.',
  },
  {
    nombre: 'Georgina Gavilán',
    mascota: 'Dueña de Calceta (Gato Mestizo)',
    iniciales: 'GG',
    estrellas: '★★★★☆',
    texto: 'Muy buena experiencia con la atención médica de Calceta. Se nota el amor por los animales, solo mejoraría la puntualidad de las citas.',
  },
]

export function Home() {
  return (
    <>
      {/* ========== HERO / PORTADA ========== */}
      <section className="nosotros-hero py-5">
        <div className="container py-lg-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-7">
              <span className="badge rounded-pill nosotros-badge text-uppercase mb-3">
                Bienvenidos a PetCare
              </span>

              <h1 className="nosotros-title fw-bold mb-4">
                Pasión, experiencia y disponibilidad <em>24/7</em> para proteger a tu mascota.
              </h1>

              <p className="nosotros-text mb-4">
                Contamos con un equipo de profesionales apasionados y tecnología de vanguardia para garantizar la salud y el bienestar de los que más quieres cuando más lo necesitan.
              </p>

              <div className="d-flex flex-wrap gap-3">
                <Link to="/contacto" className="btn btn-teal btn-lg rounded-pill px-4">
                  Agendar consulta
                </Link>
                <Link to="/nosotros" className="btn btn-outline-secondary btn-lg rounded-pill px-4">
                  Conócenos
                </Link>
              </div>
            </div>

            <div className="col-lg-5 text-center">
              <div className="p-4 bg-white rounded-5 shadow-sm border">
                <span style={{ fontSize: '4rem' }}>🐾</span>
                <h3 className="valor-name h4 fw-bold mt-3 mb-2">Clínica Veterinaria</h3>
                <p className="valor-text mb-0">
                  Atención integral, hospitalización y centro de diagnóstico en San Joaquín.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SERVICIOS ========== */}
      <section className="valores py-5">
        <div className="container py-lg-4">
          <div className="text-center max-w-2xl mx-auto mb-5">
            <span className="badge rounded-pill nosotros-badge text-uppercase mb-3">
              Nuestros Servicios
            </span>
            <h2 className="valores-title fw-bold mb-3">
              Todo lo que tu mascota necesita en un solo lugar
            </h2>
            <p className="valor-text mx-auto" style={{ maxWidth: '600px' }}>
              Un equipo multidisciplinario listo para cuidar a tus compañeros de vida en cada etapa.
            </p>
          </div>

          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {SERVICIOS.map(({ titulo, descripcion, icono }) => (
              <div className="col" key={titulo}>
                <article className="valor-card card h-100 p-2">
                  <div className="card-body">
                    <div className="valor-icon mb-3 fs-3" style={{ backgroundColor: '#1a7a8a' }}>
                      {icono}
                    </div>
                    <h3 className="valor-name h5 fw-bold mb-2">{titulo}</h3>
                    <p className="valor-text mb-0">{descripcion}</p>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== ESTADÍSTICAS / EXPERIENCIA ========== */}
      <section className="py-5 text-white" style={{ backgroundColor: '#0f2a3a' }}>
        <div className="container py-lg-3">
          <div className="row row-cols-2 row-cols-md-4 g-4 text-center">
            {ESTADISTICAS.map(({ cifra, label }) => (
              <div className="col" key={label}>
                <div className="display-4 fw-bold text-info mb-1">{cifra}</div>
                <div className="small text-light">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIOS ========== */}
      <section className="equipo py-5">
        <div className="container py-lg-4">
          <div className="text-center mb-5">
            <span className="badge rounded-pill nosotros-badge text-uppercase mb-3">
              Testimonios
            </span>
            <h2 className="equipo-title fw-bold">Lo que dicen las familias</h2>
          </div>

          <div className="row row-cols-1 row-cols-md-3 g-4">
            {TESTIMONIOS.map(({ nombre, mascota, iniciales, estrellas, texto }) => (
              <div className="col" key={nombre}>
                <article className="equipo-card card h-100 p-3">
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                      <div className="text-warning mb-2">{estrellas}</div>
                      <p className="valor-text fst-italic mb-4">"{texto}"</p>
                    </div>

                    <div className="d-flex align-items-center gap-3 pt-3 border-top">
                      <div
                        className="rounded-circle text-white fw-bold d-flex align-items-center justify-content-center"
                        style={{ width: '42px', height: '42px', backgroundColor: '#1a7a8a', flexShrink: 0 }}
                      >
                        {iniciales}
                      </div>
                      <div>
                        <h4 className="equipo-name fw-bold mb-0">{nombre}</h4>
                        <span className="equipo-role">{mascota}</span>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA / CONTACTO ========== */}
      <section className="contacto py-5 text-center">
        <div className="container py-lg-4">
          <div className="mx-auto" style={{ maxWidth: '650px' }}>
            <span className="fs-1 d-block mb-2">🐾</span>
            <h2 className="contacto-title fw-bold mb-3">¿Listo para la próxima visita?</h2>
            <p className="contacto-lead mb-4">
              Agenda una cita en línea o llámanos directamente. Atención cercana y profesional garantizada.
            </p>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <Link to="/contacto" className="btn btn-teal btn-lg rounded-pill px-4">
                Reserva una cita
              </Link>
              <Link to="/registro" className="btn btn-outline-secondary btn-lg rounded-pill px-4">
                Crear Cuenta
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}