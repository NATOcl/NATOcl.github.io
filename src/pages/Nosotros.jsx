import Nosotrosimg from '../assets/nosotros.jpg'
import  corazonIcon from '../assets/Corazon.svg'
import  estrellaIcon from '../assets/Estrella.svg'
import  escudoIcon from '../assets/Escudo.svg'

import  hombreImg from '../assets/vetmasculino.jpg'
import  mujerImg from '../assets/vetfem.jpg'
import  jovenImg from '../assets/vetjoven.jpg'

const TEAM = [
    {name: 'Dr. Emilio Sapiain', role: 'Director Medico · Medicina Interna', photo: hombreImg},
    {name: 'Dra. Paola Rios', role: 'Odontologia y Dermatalogia', photo: mujerImg},
    {name: 'Dr. Luis Mora', role: 'Cirugía Veterinaria', photo: jovenImg},
]

const VALUES  = [
    {
        title: 'Compasión',
        text: 'loremdsad jkdasdkjs dkasjdka  jadska',
        color: '#1a7a8a',
        icon: corazonIcon,
    },
    {
        title: 'Excelencia',
        text: 'loremdsad jkdasdkjs dkasjdka  jadska',
        color: '#3b8fc7',
        icon: estrellaIcon,
    },
    {
        title: 'Confiaza',
        text: 'loremdsad jkdasdkjs dkasjdka  jadska',
        color: '#0f5c6b',
        icon: escudoIcon,
    },
]

export function Nosotros(){
    return(
        <>
        <section className="nosotros-hero py-5">
            <div className="container py-lg-5">
                <div className="row align-items-center g-5">
                    <div className="col-lg-6">
                        <span className="badge rounded-pill nosotros-badge text-uppercase md-3">
                            Quienes somos
                        </span>

                        <h1 className="nosotros-title fw-bold mb-4">
                            Fundada en 2012 dkjasdas olaaaaaaaaaaaaaaaa soy gay
                        </h1>

                        <p className="nosotros-text">
                            Lorem ipsum dolor sit amet, consectetur adipisicing eim.
                        </p>

                        <p className="nosotros-text">
                            Lorem ipsum dolor sit amet, consectetur adipisicing eim.
                        </p>

                        <a href="#" className="btn btn-teal btn-lg rounded-pill px-4 mt-3">
                            Agendar consulta
                        </a>
                    </div>

                    <div className="col-lg-6">
                        <img
                            src={Nosotrosimg}
                            alt="Instalaciones PetCare"
                            className="img-fluid w-100 nosotros-img"
                        />
                    </div>

                </div>
            </div>
        </section>

        <section className="valores py-5">
            <div className="container py-lg-4">
                <h2 className="valores-title text-center fw-bold mb-5"> Nuestros valores</h2>

                <div className="row row-cols-1 row-cols-md-3 g-4 justify-content-center">
                    {VALUES.map(({title,text,color,icon}) => (
                        <div className="col" key={title}>
                            <article className="valor-card card h-100 text-center">
                                <div className="card-body p-4">
                                    <span className="valor-icon mx-auto mb-3" style={{backgroundColor: color}}>
                                        <img src={icon} alt=""/>
                                    </span>
                                    <h3 className="valor-name h5 fw-bold">{title}</h3>
                                    <p className="valor-text mb-0">{text}</p>
                                </div>
                            </article>

                        </div>
                        ))}
                </div>
            </div>
        </section>

            <section className="equipo py-5">
                <div className="container py-lg-4">
                    <h2 className="equipo-title text-center fw-bold mb-5"> Nuestro equipo</h2>
                    <div className="row row-cols-1 row-cols-md-3 g-4 justify-content-center">
                        {TEAM.map(({name,role,photo}) => (
                            <div className="col" key={name}>
                                <article className="equipo-card card h-100 text-center">
                                    <div className="card-body p-4">
                                        <img src={photo}
                                             alt={name}
                                            className="equipo-foto rounded-circle mb-3"
                                        />
                                        <h3 className="equipo-name h6 fw-bold mb-1">{name}</h3>
                                        <p className="equipo-role mb-0">{role}</p>
                                    </div>

                                </article>

                            </div>
                            ))}
                    </div>
                </div>

            </section>

        </>
    )
}