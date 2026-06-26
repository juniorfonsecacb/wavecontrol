import { createContext, useEffect, useState } from 'react';
import initialColaboradores from '../data/colaboradores';

export const ColaboradoresContext = createContext(null);

const STORAGE_KEY = 'wavecontrol_colaboradores';

function generateId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function ColaboradoresProvider({ children }) {
  const [colaboradores, setColaboradores] = useState(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (error) {
        console.warn('Falha ao ler colaboradores do localStorage', error);
      }
    }

    return initialColaboradores.map((item) => ({
      id: item.id ?? generateId(),
      matricula: item.matricula ?? '',
      telefone: item.telefone ?? '',
      observacoes: item.observacoes ?? '',
      ...item,
    }));
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(colaboradores));
  }, [colaboradores]);

  const addColaborador = (colaborador) => {
    setColaboradores((current) => [
      { ...colaborador, id: generateId() },
      ...current,
    ]);
  };

  const updateColaborador = (id, updates) => {
    setColaboradores((current) =>
      current.map((item) => (item.id === id ? { ...item, ...updates } : item)),
    );
  };

  const removeColaborador = (id) => {
    setColaboradores((current) => current.filter((item) => item.id !== id));
  };

  return (
    <ColaboradoresContext.Provider
      value={{ colaboradores, addColaborador, updateColaborador, removeColaborador }}
    >
      {children}
    </ColaboradoresContext.Provider>
  );
}
