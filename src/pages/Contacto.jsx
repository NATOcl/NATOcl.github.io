import {useState} from "react";
import ubicacionIcon from '../assets/Ubicacion.svg'
import telefonoIcon from '../assets/Telefono.svg'
import correoIcon from '../assets/Correo.svg'

import {ESPECIES, MAX_MOTIVO, VALIDADORES, validarFormulario} from "../utils/validacionescontacto.js";

const INFO = [
    {label: 'Dirección', value: 'Av. Vicuña Mackenna 4917, San Joaquin', icon: ubicacionIcon},
    {label: 'Teléfono', value: '+56 9 12345678', icon: telefonoIcon },
    {label: 'Correo', value: 'contacto@petcare.cl', icon: correoIcon},
]

const HORARIOS = [
    {dia: 'Lunes-Viernes',hora: '8:00-20:00'},
    {dia: 'Sabado-Domingo',hora: '9:00-15:00'},
    {dia: 'Urgencias',hora: '24 horas / 7 días', destacado: true},
]

const FORM_INCIAL = {
    nombre: '',
    telefono: '',
    mascota: '',
    especie: '',
    especieOtra: '',
    motivo: '',
}
//

function MensajeError({texto}){
    return texto ? <div className="invalid-feedback">{texto}</div>: null
}

export function Contacto(){
    const [form,setForm] = useState(FORM_INCIAL)
    const [errors, setErrors] = useState({})
    const [enviado, setEnviado] = useState(false)

    const claseCampo = (campo, base = 'form-control') =>
        errors[campo] ? `${base} is-invalid` :base

    const handleChange = (e) => {
        const {name, value} = e.target

        setForm(prev => {
            const next = {...prev, [name]: value}
            if (name === 'especie' && value !== 'Otro') next.especieOtra = ''
            return next
        })

        setErrors(prev => {
            const next = {...prev}

            if (name === 'especie' && value !== 'Otro') delete next.especieOtra

            const mensaje = VALIDADORES[name](value)
            if (mensaje) next[name] = mensaje
            else delete next[name]
            return next
        })

        setEnviado(false)
    }

    const handleBlur = (e) => {
        const {name, value} = e.target
        setErrors(prevState => {
            const next = {...prevState}
            const mensaje = VALIDADORES[name](value)
            if (mensaje) next[name] = mensaje
            else delete next[name]
            return next
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const  nuevosErrores = validarFormulario(form)
        setErrors(nuevosErrores)

        if (Object.keys(nuevosErrores).length === 0){
            const datos = {
                ...form,
                especie: form.especie === 'Otro'
                    ? form.especieOtra.trim()
                    : form.especie,
            }
            setEnviado(true)
            setForm(FORM_INCIAL)
        }
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
                            Estamos aqui para ayudarte
                        </h1>
                        <p className="contacto-lead mb-4">
                            Agenda tu cita o contáctanos con cualquier duda
                        </p>
                        <ul className="list-unstyled mb-4">
                            {INFO.map(({label, value,icon}) => (
                                <li className="d-flex align-items-start gap-3 mb-3">
                                    <span className="contactoIcon">
                                        <img src={icon}
                                             alt=""/>
                                    </span>
                                    <div>
                                        <div className="contacto-label">{label}</div>
                                        <div className="contacto-value">{value}</div>
                                    </div>
                                </li>
                                )
                            )}
                        </ul>

                        <div className="horario rounded-4 p-4">
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
                    <div className="contacto-form-card card p-4 p-md-5">
                    <h2 className="contacto-form-title fw-bold mb-4"> Solicitar cita</h2>

                    <form className="contacto-form" onSubmit={handleSubmit} noValidate>

                        {enviado && (
                            <div className="alert alert-success" role="alert">
                                ¡Listo! recibimos tu solicitud y te contacteremos pronto
                            </div>
                        )}

                        <div className="row g-3">
                            <div className="col-sm-6">
                                <label htmlFor="nombre" className="form-label fw-bold small">Tu nombre</label>
                                <input
                                    id="nombre"
                                    name="nombre"
                                    type="text"
                                    className={claseCampo('nombre')}
                                    placeholder="Ana Garcia"
                                    value={form.nombre}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <MensajeError texto={errors.nombre} />
                            </div>

                            <div className="col-sm-6">
                                <label htmlFor="telefono" className="form-label fw-bold small">Teléfono</label>
                                <input
                                    id="telefono"
                                    name="telefono"
                                    type="text"
                                    className={claseCampo('telefono')}
                                    placeholder="+56 9 1234 56789"
                                    value={form.telefono}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <MensajeError texto={errors.telefono} />
                            </div>

                            <div className="col-sm-6">
                                <label htmlFor="mascota" className="form-label fw-bold small">Nombre de tu mascota</label>
                                <input
                                    id="mascota"
                                    name="mascota"
                                    type="text"
                                    className={claseCampo('mascota')}
                                    placeholder="Luna"
                                    value={form.mascota}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <MensajeError texto={errors.mascota} />
                            </div>

                            <div className="col-sm-6">
                                <label htmlFor="especie" className="form-label fw-bold small">Especie</label>
                                <select
                                    id="especie"
                                    name="especie"
                                    className={claseCampo('especie', 'form-select')}
                                    value={form.especie}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                <option value="">Selecciona una opción</option>
                                    {ESPECIES && ESPECIES.map(({value,label}) => (
                                            <option key={value} value={value}>{label}</option>
                                        ))}
                                </select>
                                <MensajeError texto={errors.especie}/>
                                {form.especie === 'Otro' && (
                                    <>
                                        <input

                                            id="especieOtra"
                                            name="especieOtra"
                                            type="text"
                                            className={`${claseCampo('especieOtra')} mt-2`}
                                            placeholder="Por favor, especifica la especie"
                                            value={form.especieOtra}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            autoFocus
                                        />
                                        <MensajeError texto={errors.especieOtra}/>
                                    </>
                                )}
                            </div>

                            <div className="col-12">
                                <label htmlFor="motivo" className="form-label fw-bold small">Motivo de consulta</label>
                                <textarea
                                    id="motivo"
                                    name="motivo"
                                    rows="3"
                                    maxLength={MAX_MOTIVO}
                                    className={claseCampo('motivo')}
                                    placeholder="Describe el motivo de tu consulta"
                                    value={form.motivo}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <MensajeError texto={errors.motivo}/>
                                <div className="contador text-end small text-muted mt-1">
                                    {form.motivo.length}/{MAX_MOTIVO}
                                </div>
                            </div>

                            <div className="col-12">
                                <button type="submit" className="btn btn-teal btn-lg rounded-pill w-100">
                                    Solicitar cita →
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
