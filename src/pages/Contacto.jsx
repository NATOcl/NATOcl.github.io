import {useState} from "react";
import ubicacionIcon from '../assets/Ubicacion.svg'
import telefonoIcon from '../assets/Telefono.svg'
import correoIcon from '../assets/Correo.svg'

const INFO = [
    {label: 'Dirección', value: 'Av. Falsa 123, Santiago', icon: ubicacionIcon},
    {label: 'Teléfono', value: '+56 9 12345678', icon: telefonoIcon },
    {label: 'Correo', value: 'contacto@petcare.cl', icon: correoIcon},
]

const HORARIOS = [
    {dia: 'Lunes-Viernes',hora: '8:00-20:00'},
    {dia: 'Sabado-Domingo',hora: '9:00-15:00'},
    {dia: 'Urgencias',hora: '24 horas / 7 días', destacado: true},
]

export function Contacto(){
    const [form,setForm] = useState({
        nombre: '',
        telefono: '',
        mascota: '',
        especie: '',
        motivo: '',
    })

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        //mas adelante validaciones
    }

    return(
        <section className="contacto py-5">
            <div className="container py-lg-4">
                <div className="row g-5 align-items-start">
                    <div className="col-lg-6">

                        <span className="badge rounded-pill nosotros-badge text-uppercase mb-3">
                            Contacto
                        </span>

                        <h1 className="contacto-title fw-bold mb-3">
                            Estamos aquí para ayudarte
                        </h1>

                        <p className="contato-lead mb-4">
                            Agenda tu cita o contáctanos con cualquier duda. Nuestro equipo
                            responde en menos de 2 horas en horario de atención.
                        </p>

                        <ul className="list-unstyled mb-4">
                            {INFO.map(({label,value,icon}) => (
                                <li className="d-flex align-items-start gap-3 mb-3" key={label}>
                                    <span className="contactoIcon">
                                        <img src={icon} alt=""/>
                                    </span>
                                    <div>
                                        <div className="contacto-label">{label}</div>
                                        <div className="contato-value">{value}</div>
                                    </div>

                                </li>
                                ))}
                        </ul>

                        <div className="horarios rounded-4 p-4">
                            <h2 className="horarios-title fw-bold mb-3">Horarios de atención</h2>
                            {HORARIOS.map(({dia,hora,destacado}) => (
                                <div className="d-flex justify-content-between mb-2" key={dia}>
                                    <span className="horario-dia">{dia}</span>
                                    <span className={destacado ? 'horario-urgencia' : 'horario-hora'}>
                                        {hora}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="contacto-from-card card p-4 p-md-5">
                            <h2 className="contacto-from-title fw-bold mb-4">Solicitar cita</h2>
                            <form className="contacto-form" onSubmit={handleSubmit}>
                                <div className="row g-3">
                                    <div className="col-sm-6">
                                        <label htmlFor="nombre" className="form-label fw-bold small">
                                            Tu nombre
                                        </label>
                                        <input 
                                            id="nombre"
                                            name="nombre"
                                            type="text"
                                            className="form-control"
                                            placeholder="Ana Garcia"
                                            value={form.nombre}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    
                                    <div className="col-sm-6">
                                        <label htmlFor="telefono" className="form-label fw-bold small">
                                            Teléfono
                                        </label>
                                        <input
                                            id="telefono"
                                            name="telefono"
                                            type="tel"
                                            className="form-control"
                                            placeholder="+56 9 12345678"
                                            value={form.telefono}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="col-sm-6">
                                        <label htmlFor="mascota" className="form-label fw-bold small">
                                            Nombre de tu mascota
                                        </label>
                                        <input
                                            id="mascota"
                                            name="mascota"
                                            type="text"
                                            className="form-control"
                                            placeholder="Luna"
                                            value={form.mascota}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="col-sm-6">
                                        <label htmlFor="especie" className="form-label fw-bold small">
                                            Especie
                                        </label>
                                        <input
                                            id="especie"
                                            name="especie"
                                            type="text"
                                            className="form-control"
                                            placeholder="Perro/Gato/Otro"
                                            value={form.especie}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="col-12">
                                        <label htmlFor="motivo" className="form-label fw-bold small">
                                            Motivo de consulta
                                        </label>
                                        <textarea
                                            id="motivo"
                                            name="motivo"
                                            rows="3"
                                            className="form-control"
                                            placeholder="Describe brevemente el motivo de la consulta"
                                            value={form.motivo}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="col-12">
                                        <button
                                            type="submit"
                                            className="btn btm-teal btn-lg rounded-pill w-100"
                                        >
                                            solicitar cita
                                        </button>
                                    </div>
                                    
                                </div>
                            </form>

                        </div>
                    </div>

                </div>

            </div>
        </section>
    )
}