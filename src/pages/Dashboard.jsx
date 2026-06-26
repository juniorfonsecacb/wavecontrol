import { useContext, useMemo } from 'react';
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

function Dashboard() {
  const { colaboradores } = useContext(ColaboradoresContext);
  const total = colaboradores.length;
  const turnoA = colaboradores.filter((colaborador) => colaborador.turno === 'A').length;
  const turnoB = colaboradores.filter((colaborador) => colaborador.turno === 'B').length;
  const turnoC = colaboradores.filter((colaborador) => colaborador.turno === 'C').length;
  const adm = colaboradores.filter((colaborador) => colaborador.turno === 'ADM').length;

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
      </div>

      <OperationCenter stations={stationSummary} />
    </section>
  );
}

export default Dashboard;
