import {useEffect, useState} from "react";
import {Link} from "react-router-dom";


const MAX_CANTIDAD = 50;
const CANTIDADES = Array.from({length: MAX_CANTIDAD},(_,i) => i + 1);

const formatPrecio = (n) => `$${n.toLocaleString('es-CL')}`;

const leerCarrito = () => {
    try {
        return JSON.parse(localStorage.getItem('carrito') || '[]');
    }catch{
        return []
    }
};

export function Carrito(){
    const [items,setItems] = useState(leerCarrito)

    //localstorage guarda los cambios
    useEffect(() => {
        localStorage.setItem('carrito',JSON.stringify(items));
    }, [items]);

    const cambiarCantidad = (codigo, cantidad) => {
        setItems((prev) =>
            prev.map((i) => (i.codigo === codigo ? { ...i, cantidad}: i))
        );
    };

    const eliminar = (codigo) => {
        setItems((prev) => prev.filter((i) => i.codigo !== codigo));
    };

    const vaciar = () => setItems([]);

    const total = items.reduce((suma,i) =>suma + i.precio * i.cantidad,0)
    const totalUnidades = items.reduce((suma,i) => suma + i.cantidad,0)


    return(
        <section className="carrito-main">
            <div className="carrito-encabezado">
                <span className="carrito-badge"> Veterinaria PetCare </span>
                <h1 className="carrito-titulo">Tu carrito</h1>
            </div>

            {items.length === 0 ? (
                <div className="carrito-vacio">
                    <p>Tu carrito se encuentra vacio. </p>
                    <Link to="/productos" className="carrito-btn-primario">
                        Ver productos y servicios
                    </Link>
                </div>
                ) : (
                    <div className="carrito-layout">
                        <div className="carrito-tabla-wrap">
                            <div className="carrito-tabla-scroll">
                                <table className="carrito-tabla">
                                    <thead>
                                        <tr>
                                            <th>
                                                Productos
                                            </th>
                                            <th>
                                                Precio
                                            </th>
                                            <th>
                                                Cantidad
                                            </th>
                                            <th>
                                                Subtotal
                                            </th>
                                            <th className="text-center"> Quitar </th>
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
                                                <td className="carrito-c-precio" data-label="Precio Unitario">
                                                    {formatPrecio(p.precio)}
                                                </td>
                                                <td className="carrito-c-cantidad" data-label="Cantidad">
                                                    <select
                                                        className="carrito-select"
                                                        value={p.cantidad}
                                                        onChange={(e) =>
                                                            cambiarCantidad(p.codigo, Number(e.target.value))
                                                        }
                                                        aria-label={`Cantidad de ${p.nombre}`}
                                                        >
                                                            {CANTIDADES.map((n)=> (
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
                                                    aria-label={`Eliminar ${p.nombre}`}
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
                            <h2 className="carrito-resumen-titulo">Resumen</h2>
                            <div className="carrito-resumen-fila">
                                <span>Ítems distintos</span>
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

                            <button type="button" className="carrito-btn-primario carrito-btn-block">
                                Continuar con la compra
                            </button>
                            <button type="button" className="carrito-btn-secundario" onClick={vaciar}>
                                Vaciar carrito
                            </button>
                        </aside>
                    </div>
            )}
        </section>
    );

} // cierre global