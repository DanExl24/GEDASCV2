const API = import.meta.env.VITE_API_URL

export const getActivity = async () => {
  try {
    const response = await fetch(`${API}/api/estadisticas/actividadHoy`)

    if (!response.ok) {
      throw new Error('Error al obtener la actividad de hoy')
    }

    const data = await response.json()

    return data.aprendices
  } catch (error) {
    console.error(error)
    return []
  }
}
