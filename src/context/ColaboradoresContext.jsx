import { createContext, useEffect, useState } from 'react'
import { supabase } from '../services/supabase'

export const ColaboradoresContext = createContext()

export function ColaboradoresProvider({ children }) {
  const [colaboradores, setColaboradores] = useState([])
  const [loading, setLoading] = useState(false)

  async function carregarColaboradores() {
    setLoading(true)

    const { data, error } = await supabase
      .from('colaboradores')
      .select('*')
      .order('nome')

    setLoading(false)

    if (error) {
      console.error('Erro ao carregar colaboradores:', error)
      return []
    }

    setColaboradores(data ?? [])
    return data ?? []
  }

  async function addColaborador(payload) {
    const { data, error } = await supabase
      .from('colaboradores')
      .insert(payload)
      .select('*')
      .single()

    if (error) {
      console.error('Erro ao adicionar colaborador:', error)
      return null
    }

    await carregarColaboradores()
    return data
  }

  async function updateColaborador(id, payload) {
    const { data, error } = await supabase
      .from('colaboradores')
      .update(payload)
      .eq('id', id)
      .select('*')
      .single()

    if (error) {
      console.error('Erro ao atualizar colaborador:', error)
      return null
    }

    await carregarColaboradores()
    return data
  }

  async function removeColaborador(id) {
    const { error } = await supabase
      .from('colaboradores')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Erro ao remover colaborador:', error)
      return false
    }

    await carregarColaboradores()
    return true
  }

  useEffect(() => {
    carregarColaboradores()
  }, [])

  return (
    <ColaboradoresContext.Provider
      value={{
        colaboradores,
        loading,
        carregarColaboradores,
        addColaborador,
        updateColaborador,
        removeColaborador,
      }}
    >
      {children}
    </ColaboradoresContext.Provider>
  )
}
