import { Link } from 'react-router-dom'
import logoIcon from '../assets/favicon.svg'

const COLUMNS= [
    {
        title: 'Tienda',
        links: [
            {label: 'Servicios'},
            {label: 'Medicamentos'},
            {label: 'Vacunas'},
            {label: 'Carrito'},
        ],
    },
    {
        title: 'Veterinaria',
        links: [
            {label: 'Nosotros', to: '/nosotros'},
            {label: 'Blog', to: '/blogs'},
            {label: 'Contacto', to: '/contacto'}
        ],

    },
    {
        title: 'Cuenta',
        links: [
            {label: 'Ingresar', to: '/login'},
            {label: 'Registrar', to: '/registro'}
        ]

    },

]

export default function Footer(){
    return (
        <footer className="footer-dark">
            <div className="container py-4">
                <div className="row g-4">

                    <div className="col-12 col-lg-5">
                        <Link to="/" className="footer-brand d-inline-flex align-items-center gap-2 mb-3">
                            <span className="footer-brand-mark">
                                <img src={logoIcon}
                                     alt="iconPetcare"
                                />
                            </span>
                            <span className="footer-brand-name">Petcare</span>
                        </Link>

                        <p className="footer-text mb-4">
                            Atención veterinaria profesional con servicio de urgencias 24/7 para perros y gatos.
                        </p>

                        <p className="footer-phone mb-2">
                            <span className="footer-phone-label">Contacto: </span>
                            <a href="tel:+56912345678" className="footer-contact-link">
                                +56 9 12345678
                            </a>
                        </p>
                        <p className="footer-small mb-1">
                            <span className="footer-phone-label">Ubicación: </span>
                            <a href="https://www.google.com/maps/place/Duoc+UC:+Sede+San+Joaqu%C3%ADn/@-33.500552,-70.6196477,17z"
                            target="_blank"
                               rel="noopener noreferrer"
                               className="footer-contact-link"
                            >
                                Av. Vicuña Mackenna 4917, San Joaquin
                            </a>
                        </p>
                        <p className="footer-small mb-3">
                            <span className="footer-phone-label">Mail: </span>
                            <a href="mailto:contacto@petcare.cl" className="footer-contact-link">
                                contacto@petcare.cl
                            </a>
                        </p>
                        <p className="footer-hours mb-0">
                            <span className="footer-phone-label">Horarios: </span>
                            Lun-Vie 8:00-20:00 · Sáb-Dom 9:00-15:00 · Urgencias 24/7
                        </p>
                    </div>

                    {COLUMNS.map((col,i) => (
                    <nav
                        className={`col-6 col-md-4 col-lg-2 ${i === 0 ? 'offset-lg-1' : ''}`}
                        key={col.title}
                        aria-label={col.title}
                        >
                        <h3 className="footer-title mb-3">
                            {col.title}
                        </h3>
                        <ul className="list-unstyled mb-0">
                            {col.links.map(({label,to}) => (
                                <li className="mb-2" key={label}>
                                    {to ? (
                                        <Link to={to} className="footer-link">{label}</Link>
                                    ) : (
                                        <a href="#" className="footer-link">{label}</a>
                                    )}
                                </li>
                                ))}
                        </ul>
                    </nav>
                    ))}
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container py-3 d-flex flex-wrap justify-content-between gap-2 small">
                    <span>© 2026 Petcare · Todos los derechos reservados</span>
                    <span> Evaluacion 2 Abarca/Troncoso/Obreque </span>
                </div>
            </div>
        </footer>
    )
}
