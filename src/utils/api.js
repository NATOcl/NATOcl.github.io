const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

export function leerSesion() {
    try {
        return JSON.parse(localStorage.getItem('petcare_session') || 'null');
    } catch {
        return null;
    }
}

export async function api(path, { method = 'GET', body, auth = true } = {}) {
    const token = auth ? leerSesion()?.token : null;

    const res = await fetch(`${API_URL}/api/v1${path}`, {
        method,
        headers: {
            ...(body ? { 'Content-Type': 'application/json' } : {}),
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
        let detalle = '';
        try { detalle = await res.text(); } catch { /* sin cuerpo */ }
        const error = new Error(detalle || `Error ${res.status}`);
        error.status = res.status;
        throw error;
    }

    if (res.status === 204) return null;
    const texto = await res.text();
    return texto ? JSON.parse(texto) : null;
}