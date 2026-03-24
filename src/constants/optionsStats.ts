const API = import.meta.env.VITE_API_URL

export const getEstadisticas = async () => {
  try {
    const response = await fetch(`${API}/api/estadisticas/dashboard`)

    if (!response.ok) {
      throw new Error('Error al obtener estadísticas')
    }

    const data = await response.json()

    return [
      {
        label: 'Entradas hoy',
        value: data.entradasHoy,
        icon: '↓',
        trend: '↑ vs ayer',
        trendColor: 'text-verdeSena'
      },
      {
        label: 'Salidas hoy',
        value: data.salidasHoy,
        icon: '↑',
        trend: '↓ vs ayer',
        trendColor: 'text-orange-500'
      },
      {
        label: 'Este Mes',
        value: data.esteMes,
        icon: '👤',
        trend: 'activos ahora'
      },
      {
        label: 'Este Trimestre',
        value: data.trimestre,
        icon: '📅',
        trend: 'registros totales'
      }
    ]
  } catch (error) {
    console.error(error)
    return []
  }
}
