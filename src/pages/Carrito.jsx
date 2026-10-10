import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import { REGIONES} from "../utils/regiones.js";
import { FORM_VACIO, validarCompra, hayErrores, limpiarNombre } from "../utils/validacionesCompra.js";

const MAX_CANTIDAD = 50;
const CANTIDADES = Array.from({length: MAX_CANTIDAD},(_,i) => i + 1);

const formatPrecio = (n) => `$${n.toLocaleString('es-CL')}`;

const eliminar = (codigo) => {
    setItems((prev) => prev.filter((i) => i.codigo !== codigo));
};

const generarOrden = () => {
    const hoy = new Date();
    const fecha =
        `${hoy.getFullYear()}` +
        `${String(hoy.getMonth() + 1).padStart(2, "0")}`+
        `${String(hoy.getDate()).padStart(2, "0")}`;
    const nro = `${fecha}${Math.floor(Math.random() * 90) + 10}`;
    const codigo = `ORDER${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
    return {nro,codigo};
};

const leerCarrito = () => {
    try {
        return JSON.parse(localStorage.getItem('carrito') || '[]');
    }catch{
        return []
    }
};

function Campo ({id, label,requerido,error,children}) {
    return(
        <div className="registro-field">
            <label className="registro-label" htmlFor={id}>
                {label}
                {requerido && " *" }
            </label>
            {children}
            {error && (
                <p className="registro-error" role="alert">
                    {error}
                </p>
                )}
        </div>
    );
}

function ListaProductos({ items }) {
    return(
        <ul className="bolsa-lista">
            {items.map((p) => (
                <li key={p.codigo} className="boleta-items">
                    <div className="boleta-info">
                        <div className="boleta-nombre">{p.nombre}</div>
                        <div className="boleta-detalle">
                            {p.cantidad} x {formatPrecio(p.precio)}
                        </div>
                    </div>
                    <div className="boleta-subtotal">
                        {formatPrecio(p.precio * p.cantidad)}
                    </div>
                </li>
            ))}
        </ul>
    );
}

export function Carrito(){
    const [items,setItems] = useState(leerCarrito)
    const [paso,setPaso] = useState("carrito");
    const [form,setForm] = useState(FORM_VACIO);
    const [errores,setErrores] = useState({});
    const [orden,setOrden] = useState(null);


    useEffect(() => {
        localStorage.setItem("carrito", JSON.stringify(items));
    }, [items]);

    const cambiarCantidad = (codigo, cantidad) => {
        setItems((prev) =>
            prev.map((i) => (i.codigo === codigo ? {...i,cantidad} :i ))
        );
    };

    const vaciar = () => setItems([]);

    const total = items.reduce((suma,i) => suma + i.precio * i.cantidad,0);
    const totalUnidades = items.reduce((suma,i) => suma + i.cantidad,0);

    const irA = (nuevoPaso) => {
        setPaso(nuevoPaso);
        window.scrollTo({top:0});
    };

    const handleChange = (e) => {
        let { name, value } = e.target;
        if (name === "nombre" || name === "apellidos") value = limpiarNombre(value);
        setForm((prev) =>
            name === "region"
                ? {...prev,region: value,comuna: ""}
                : {...prev,[name]: value}
        );
        if (errores[name]) setErrores((prev) => ({ ...prev, [name]: undefined }));
    };

    const comunasDisponibles = form.region ? REGIONES[form.region] : [];

    const confirmarCompra = (e) => {
        e.preventDefault();
        const nuevosErrores = validarCompra(form);
        setErrores(nuevosErrores);
        if (hayErrores(nuevosErrores)) return;

        setOrden({
            ...generarOrden(),
            cliente: {...form},
            items: {...items},
            total,
            totalUnidades,
        });
        setItems([]);
        irA("exito")
    };

    if (paso === "exito" && orden) {
        const c = orden.cliente;
        return (
            <section className="carrito-main">
                <div className="registro-card checkout-card">
                    <p className="boleta-codigo">Codigo Orden: {orden.codigo}</p>

                    <h1 className="registro-card-title boleta-titulo">
                        <span className="boleta-check" aria-hidden="true">✓</span>
                        Se ha realizado la compra exitosamente
                    </h1>

                    <dl className="boleta-datps">
                        <div>
                            <dt>Nombre</dt>
                            <dd>{c.nombre} {c.apellidos}</dd>
                        </div>
                        <div>
                            <dt>Correo</dt>
                            <dd>{c.correo}</dd>
                        </div>
                        <div>
                            <dt>Direccion</dt>
                            <dd>
                                {c.calle}
                                {c.depto && `, ${c.depto}`}
                            </dd>
                        </div>
                        {c.indicaciones && (
                            <div>
                                <dt>Indicaciones para la entrega</dt>
                                <dt>{c.indicaciones}</dt>
                            </div>
                        )}
                    </dl>

                    <h2 className="checkout-subtitulo">Productos</h2>
                    <ListaProductos items={orden.items} />

                    <div className="boleta-total">
                        <span>Total pagado</span>
                        <span>{formatPrecio(orden.total)}</span>
                    </div>

                    <div className="checkout-acciones checkout-acciones-centro no-print">
                        <button
                        type="button"
                        className="checkout-btn checkout-btn-pdf"
                        onClick={() => window.print()}
                        >
                            Imprimir boleta
                        </button>
                    </div>

                    <p className="checkout-ayuda checkout-centro no-print">
                        <Link to="/productos">Seguir Comprando</Link>
                    </p>
                </div>
            </section>
        );
    }

    if (paso === "datos"){
        return (
            <section className="carrito-main">
                <div className="carrito-encabezado">
                    <span className="carrito-badge">Veterinaria Petcare</span>
                    <h1 className="carrito-titulo">Finalizar Compra</h1>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <form className="registro-card checkout-card" onSubmit={confirmarCompra} noValidate>
                    <h2 className="registro-card-title">DATOS DEL CLIENTE</h2>
                    <p className="checkout-ayuda">Los campos * son obligatorios.</p>

                    <div className="registro-row">
                        <Campo id="nombre" label="NOMBRE" requerido error={errores.nombre}>
                            <input
                            id="nombre"
                            name="nombre"
                            type="text"
                            autoComplete="given-name"
                            placeholder="pedro"
                            className={`registro-input ${errores.nombre ? "is-invalid" : ""}`}
                            value={form.nombre}
                            onChange={handleChange}
                            />
                        </Campo>
                        <Campo id="apellidos" label="APELLIDOS" requerido error={errores.apellidos}>
                            <input
                                id="apellidos"
                                name="apellidos"
                                type="text"
                                autoComplete="family-name"
                                placeholder="Hacker"
                                className={`registro-input ${errores.apellidos ? "is-invalid" : ""}`}
                                value={form.nombre}
                                onChange={handleChange}
                            />
                        </Campo>
                    </div>
                    <Campo id="correo" label="CORREO" requerido error={errores.correo}>
                        <input
                            id="correo"
                            name="correo"
                            type="email"
                            autoComplete="email"
                            placeholder="pedro.hacker@example.com"
                            className={`registro-input ${errores.email ? "is-invalid" : ""}`}
                            value={form.correo}
                            onChange={handleChange}
                        />
                    </Campo>

                    <h3 className="checkout-subtitulo">Dirreccion de entrega de los productos</h3>

                    <div className="registro-row">
                        <Campo id="calle" label="CALLE" requerido error={errores.calle}>
                            <input
                                id="calle"
                                name="calle"
                                type="text"
                                autoComplete="address-line1"
                                placeholder="Los Crisantemos 123"
                                className={`registro-input ${errores.calle ? "is-invalid" : ""}`}
                                value={form.calle}
                                onChange={handleChange}
                            />
                        </Campo>
                        <Campo id="depto" label="DEPARTAMENTO (OPCIONAL)" requerido error={errores.depto}>
                            <input
                                id="depto"
                                name="depto"
                                type="text"
                                autoComplete="address-line2"
                                placeholder="Depto 39"
                                className={`registro-input ${errores.depto ? "is-invalid" : ""}`}
                                value={form.depto}
                                onChange={handleChange}
                            />
                        </Campo>
                    </div>

                    <div className="registro-row">
                        <Campo id="region" label="REGION" requerido error={errores.region}>
                            <select
                                id="Region"
                                name="Region"
                                placeholder="Depto 39"
                                className={`registro-select ${errores.region ? "is-invalid" : ""}`}
                                value={form.region}
                                onChange={handleChange}
                            >
                                <option value="">--Selecciona la region --</option>
                                {Object.keys(REGIONES).map((r) => (
                                    <option key={r} value={r}>{r}</option>
                                ))}
                            </select>
                        </Campo>
                        <Campo id="comuna" label="COMUNA" requerido error={errores.comuna}>
                            <select
                                id="comuna"
                                name="comuna"
                                placeholder="Depto 39"
                                className={`registro-select ${errores.comuna ? "is-invalid" : ""}`}
                                value={form.comuna}
                                onChange={handleChange}
                            >
                                <option value="">
                                    {form.region ? "-- Seleccione la comuna --" : "-- Primero elija región --"}
                                </option>
                                {comunasDisponibles.map((c) => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </Campo>
                    </div>

                    <Campo id="indicaciones" label="INDICACIONES PARA LA ENTREGA (OPCIONAL)">
                        <textarea
                            name="indicaciones"
                            id="indicaciones"
                            placeholder="Ej: El martes no estaremos, pero puede dejarlo con el conserje."
                            rows={3}
                            value={form.indicaciones}
                            onChange={handleChange}
                        />
                    </Campo>

                    <h3 className="checkout-subtitulo">Resumean de tu compra</h3>
                    <ListaProductos items={items} />
                    <div className="boleta-total">
                        <span>Total a pagar</span>
                        <span>{formatPrecio(total)}</span>
                    </div>

                    <div className="checkout-acciones">
                        <button
                        type="button"
                        className="carrito-btn-secundario"
                        onClick={() => irA("carrito")}
                        >
                            Volver al carrito
                        </button>
                        <button type="submit" className="registro-button">
                            Confirmar Compra
                        </button>
                    </div>
                </form>
                </div>
            </section>
        );
    }

    return (
        <section className="carrito-main">
            <div className="carrito-encabezado">
                <span className="carrito-badge"> Veterinaria Petcare</span>
                <h1 className="carrito-titulo">Tu carrito</h1>
            </div>

            <div className="carrito-layout">
                <div className="carrito-tabla-wrap">
                    <div className="carrito-tabla-scroll">
                        <table className="carrito-tabla">
                            <thead>
                                <tr>
                                    <th>Productos</th>
                                    <th>Precio</th>
                                    <th>Cantidad</th>
                                    <th>Subtotal</th>
                                    <th className="text-center">Quitar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((p) => (
                                    <tr key={p.codigo}>
                                        <td className="carrito-c-nombre">
                                            <div className="carrito-nombre">{p.nombre}</div>
                                            <div className="carrito-codigo">
                                                {p.codigo} · {p.categoria}
                                            </div>
                                        </td>

                                        <td className="carrito-c-precio" data-label="Precio unitario">
                                            {formatPrecio(p.precio)}
                                        </td>
                                        <td className="carrito-c-cantidad" data-label="cantidad">
                                            <select
                                                className="carrito-select"
                                                value={p.cantidad}
                                                onChange={(e) =>
                                                    cambiarCantidad(p.codigo, Number(e.target.value))
                                                }
                                                aria-label={`Cantidad de ${p.nombre}`}
                                            >
                                                {CANTIDADES.map((n) => (
                                                    <option key={n} value={n}>{n}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="carrito-subtotal carrito-c-subtotal" data-label="Subtotal">
                                            {formatPrecio(p.precio * p.cantidad)}
                                        </td>
                                        <td className="text-center carrito-c-quitar">
                                            <button
                                                type="button"
                                                className="carrito-btn-eliminar"
                                                onClick={() => eliminar(p.codigo)}
                                            >
                                                ✕
                                            </button>
                                        </td>
                                    </tr>
                                    ))}
                                </tbody>
                        </table>
                    </div>
                </div>

                <aside className="carrito-resumen">
                    <h2 className="carrito-resumen-titulo">
                        <div className="carrito-resumen-fila">
                            <span>Items Distintos</span>
                            <span>{items.length}</span>
                        </div>
                        <div className="carrito-resumen-fila">
                            <span>Unidades</span>
                            <span>{totalUnidades}</span>
                        </div>
                        <div className="carrito-resumen-total">
                            <span>Total</span>
                            <span>{formatPrecio(total)}</span>
                        </div>

                        <button
                            type="button"
                            className="carrito-btn-primario carrito-btn-block"
                            onClick={() => irA("datos")}
                        >
                            Continuar con la compra
                        </button>
                        <button type="button" className="carrito-btn-secundario" onClick={vaciar}>
                            Vaciar carrito
                        </button>
                    </h2>
                </aside>
            </div>
        </section>
    );



}