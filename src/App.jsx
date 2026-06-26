import { useMemo } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './styles/global.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Colaboradores from './pages/Colaboradores';
import CentroOperacoes from './pages/CentroOperacoes';
import TurnoPage from './pages/TurnoPage';
import Indicadores from './pages/Indicadores';

const routeConfig = {
  '/dashboard': {
    title: 'Dashboard',
    subtitle: 'Visão geral de colaboradores e operações',
  },
  '/colaboradores': {
    title: 'Colaboradores',
    subtitle: 'Gestão da equipe e funções',
  },
  '/turno-a': {
    title: 'Turno A',
    subtitle: 'Operadores e postos do turno A',
    turno: 'A',
  },
  '/turno-b': {
    title: 'Turno B',
    subtitle: 'Operadores e postos do turno B',
    turno: 'B',
  },
  '/turno-c': {
    title: 'Turno C',
    subtitle: 'Operadores e postos do turno C',
    turno: 'C',
  },
  '/adm': {
    title: 'ADM',
    subtitle: 'Equipe administrativa e suporte',
    turno: 'ADM',
  },
  '/centro-operacoes': {
    title: 'Centro de Operações',
    subtitle: 'Sequência oficial dos postos da linha 2500',
  },
  '/indicadores': {
    title: 'Indicadores',
    subtitle: 'Métricas e desempenho por turno',
  },
};

function App() {
  const location = useLocation();
  const pageInfo = useMemo(
    () => routeConfig[location.pathname] ?? routeConfig['/dashboard'],
    [location.pathname],
  );

  return (
    <div className="app">
      <Sidebar />
      <main className="main">
        <Header title={pageInfo.title} subtitle={pageInfo.subtitle} />
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/colaboradores" element={<Colaboradores />} />
          <Route path="/turno-a" element={<TurnoPage turno="A" title="Operadores e postos do turno A" />} />
          <Route path="/turno-b" element={<TurnoPage turno="B" title="Operadores e postos do turno B" />} />
          <Route path="/turno-c" element={<TurnoPage turno="C" title="Operadores e postos do turno C" />} />
          <Route path="/adm" element={<TurnoPage turno="ADM" title="Equipe administrativa e suporte" />} />
          <Route path="/centro-operacoes" element={<CentroOperacoes />} />
          <Route path="/indicadores" element={<Indicadores />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
