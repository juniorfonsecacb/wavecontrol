import { useContext, useMemo } from 'react';
import {
  BarChart,
  Bar,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ColaboradoresContext } from '../context/ColaboradoresContext';
import CardResumo from '../components/CardResumo';
import OperationCenter from '../components/OperationCenter';

const stationList = [
  { name: 'Clamp', owner: 'Equipe A' },
  { name: 'Ponte', owner: 'Equipe B' },
  { name: 'Cabeçote B', owner: 'Equipe A' },
  { name: 'Cabeçote C', owner: 'Equipe C' },
  { name: 'Mesa Quente', owner: 'Equipe C' },
  { name: 'Forradeira', owner: 'ADM' },
  { name: 'Slitter', owner: 'Equipe B' },
  { name: 'Empilhador', owner: 'Equipe A' },
  { name: 'Saída', owner: 'ADM' },
];

const turnosMeta = [
  { key: 'A', label: 'Turno A', ideal: 17, color: '#2563eb' },
  { key: 'B', label: 'Turno B', ideal: 17, color: '#16a34a' },
  { key: 'C', label: 'Turno C', ideal: 17, color: '#f97316' },
  { key: 'ADM', label: 'ADM', ideal: 3, color: '#334155' },
];

const situacaoColors = {
  Ativo: '#16a34a',
  Afastado: '#f59e0b',
  Substituto: '#3b82f6',
};

function Dashboard() {
  const { colaboradores } = useContext(ColaboradoresContext);
  console.log('DASHBOARD', colaboradores);
  console.log('COLABORADORES:', colaboradores);
  const total = colaboradores.length;
  const turnoA = colaboradores.filter((colaborador) => colaborador.turno === 'A').length;
  const turnoB = colaboradores.filter((colaborador) => colaborador.turno === 'B').length;
  const turnoC = colaboradores.filter((colaborador) => colaborador.turno === 'C').length;
  const adm = colaboradores.filter((colaborador) => colaborador.turno === 'ADM').length;
  const ativos = colaboradores.filter((colaborador) => colaborador.situacao === 'Ativo').length;
  const afastados = colaboradores.filter((colaborador) => colaborador.situacao === 'Afastado').length;
  const substitutos = colaboradores.filter((colaborador) => colaborador.situacao === 'Substituto').length;

  const turnoData = useMemo(
    () => turnosMeta.map((item) => ({
      ...item,
      atual: colaboradores.filter((colaborador) => colaborador.turno === item.key).length,
    })),
    [colaboradores],
  );

  const situacaoData = useMemo(
    () => [
      { name: 'Ativos', value: ativos, color: situacaoColors.Ativo },
      { name: 'Afastados', value: afastados, color: situacaoColors.Afastado },
      { name: 'Substitutos', value: substitutos, color: situacaoColors.Substituto },
    ],
    [ativos, afastados, substitutos],
  );

  const funcaoData = useMemo(() => {
    const counts = colaboradores.reduce((acc, colaborador) => {
      const funcao = colaborador.funcao || 'Sem função';
      acc[funcao] = (acc[funcao] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);
  }, [colaboradores]);

  const stationSummary = useMemo(
    () => stationList.map((station) => ({
      ...station,
      status: colaboradores.some((colaborador) => colaborador.posto === station.name) ? 'Ocupado' : 'Disponível',
    })),
    [colaboradores],
  );

  return (
    <section className="dashboard-view">
      <div className="summary-grid">
        <CardResumo title="Total de colaboradores" value={total} subtitle="Equipe integrada" variant="primary" />
        <CardResumo title="Turno A" value={turnoA} subtitle="Operacional matutino" variant="blue" />
        <CardResumo title="Turno B" value={turnoB} subtitle="Operacional vespertino" variant="green" />
        <CardResumo title="Turno C" value={turnoC} subtitle="Operacional noturno" variant="orange" />
        <CardResumo title="ADM" value={adm} subtitle="Suporte e coordenação" variant="dark" />
        <CardResumo title="Ativos" value={ativos} subtitle="Em exercício" variant="primary" />
        <CardResumo title="Afastados" value={afastados} subtitle="Sem operação" variant="orange" />
        <CardResumo title="Substitutos" value={substitutos} subtitle="Cobertura temporária" variant="blue" />
      </div>

      <div className="dashboard-grid">
        <div className="panel panel-wide">
          <div className="panel-header">
            <div>
              <span>Inteligência Operacional</span>
              <h2>Colaboradores por Turno</h2>
            </div>
            <p>Distribuição atual da equipe entre os turnos da operação.</p>
          </div>
          <div className="chart-card">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={turnoData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="label" tickLine={false} axisLine={false} />
                <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="atual" radius={[10, 10, 0, 0]}>
                  {turnoData.map((entry) => (
                    <Cell key={entry.key} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel panel-wide">
          <div className="panel-header">
            <div>
              <span>Parâmetros de Saúde</span>
              <h2>Situação dos Colaboradores</h2>
            </div>
            <p>Visão consolidada do estado operacional da equipe.</p>
          </div>
          <div className="chart-card">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={situacaoData} dataKey="value" nameKey="name" innerRadius={70} outerRadius={110} paddingAngle={3}>
                  {situacaoData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="dashboard-grid dashboard-grid-compact">
        <div className="panel panel-wide">
          <div className="panel-header">
            <div>
              <span>Composição da Equipe</span>
              <h2>Colaboradores por Função</h2>
            </div>
            <p>Funções com maior presença na operação.</p>
          </div>
          <div className="chart-card">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={funcaoData} layout="vertical" margin={{ top: 8, right: 24, left: 12, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" allowDecimals={false} tickLine={false} axisLine={false} />
                <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} width={110} />
                <Tooltip />
                <Bar dataKey="value" radius={[0, 10, 10, 0]} fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel panel-wide">
          <div className="panel-header">
            <div>
              <span>Planejamento de Efetivo</span>
              <h2>Efetivo por Turno</h2>
            </div>
            <p>Comparativo entre o ideal e o atual da operação.</p>
          </div>
          <div className="effective-grid">
            {turnoData.map((item) => {
              const difference = item.atual - item.ideal;
              let status = 'Completo';
              let statusClass = 'status-complete';

              if (difference < -2) {
                status = 'Abaixo';
                statusClass = 'status-danger';
              } else if (difference < 0) {
                status = 'Faltando';
                statusClass = 'status-warning';
              }

              return (
                <div className="effective-card" key={item.key}>
                  <div className="effective-top">
                    <strong>{item.label}</strong>
                    <span className={`status-pill ${statusClass}`}>{status}</span>
                  </div>
                  <div className="effective-metrics">
                    <div>
                      <span>Ideal</span>
                      <strong>{item.ideal}</strong>
                    </div>
                    <div>
                      <span>Atual</span>
                      <strong>{item.atual}</strong>
                    </div>
                    <div>
                      <span>Diferença</span>
                      <strong className={difference < 0 ? 'difference-negative' : 'difference-positive'}>
                        {difference > 0 ? `+${difference}` : difference}
                      </strong>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <OperationCenter stations={stationSummary} />
    </section>
  );
}

export default Dashboard;
