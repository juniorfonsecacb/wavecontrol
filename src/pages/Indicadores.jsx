import { useContext } from 'react';
import { ColaboradoresContext } from '../context/ColaboradoresContext';

function Indicadores() {
  const { colaboradores } = useContext(ColaboradoresContext);
  const total = colaboradores.length;
  const adm = colaboradores.filter((item) => item.turno === 'ADM').length;
  const turnos = ['A', 'B', 'C'].map((turno) => ({
    turno,
    count: colaboradores.filter((item) => item.turno === turno).length,
  }));

  return (
    <section className="page-content indicadores-view">
      <div className="summary-grid indicadores-grid">
        <article className="indicator-card">
          <span>Total Geral</span>
          <strong>{total}</strong>
          <p>Colaboradores em operação</p>
        </article>
        <article className="indicator-card">
          <span>ADM</span>
          <strong>{adm}</strong>
          <p>Suporte e gestão</p>
        </article>
      </div>

      <div className="panel panel-wide">
        <div className="panel-header">
          <div>
            <span>Indicadores</span>
            <h2>Distribuição por turno</h2>
          </div>
          <p>Visualize a composição dos turnos do sistema.</p>
        </div>

        <div className="progress-list">
          {turnos.map((item) => (
            <div className="progress-line" key={item.turno}>
              <div className="progress-label">
                <strong>Turno {item.turno}</strong>
                <span>{item.count} colaboradores</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${(item.count / total) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Indicadores;
