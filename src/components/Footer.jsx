const COLUMNS= [
    {title: 'Tienda',links: ['Servicios','Medicamentos','Vacunas','Carrito']},
    {title: 'Veterinaria',links: ['Nosotros','Blog','Contacto']},
    {title: 'Tu cuenta',links: ['Ingresar','Registrarse']}
]

export default function Footer(){
    return(
        <footer className="bg-soft-blue border-top mt-5">
            <div className="container py-5">
                <div className="row g-4">
                    <div className="col-12 col-lg-4">
                        <p className="fs-5 mb-2"> Veterinaria <strong>PetCare</strong></p>
                        <p className="text-secondary mb-0">
                            Atención veterinaria profesional, contamos por servicios de emergencias 24/7
                        </p>
                    </div>

                    {COLUMNS.map((col) => (
                        <nav className="col-6 col-md-3 col-lg-2" key={col.title} aria-label={col.title}>
                            <h3 className="h6 fw-bold mb-3">{col.title}</h3>
                            <ul className="list-unstyled mb-0">
                                {col.links.map((label) => (
                                    <li className="mb-2" key={label}>
                                        <a href="#" className="link-secondary link-underline-opacity-0 link-underline-opacity-100-hover">
                                            {label}
                                        </a>
                                    </li>
                                    ))}
                            </ul>
                        </nav>
                    ))}

                    <div className="col-6 col-md-3 col-lg-2">
                        <h3 className="h6 fw-bold mb-3">Contacto</h3>
                        <ul className="list-unstyled text-secondary mb-0">
                            <li className="mb-2">Av.falsa 123</li>
                            <li className="mb-2">+56 9 12345678</li>
                            <li className="mb-2">contacto@proton.xd</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="border-top">
                <div className="container py-3 d-flex flex-wrap justify-content-between gap-2 small text-secondary">
                    <span>© 2026 todos los derechos reservados</span>
                    <span> Evaluacion Obreque/Abarca/Troncoso </span>
                </div>
            </div>
        </footer>

    )
}