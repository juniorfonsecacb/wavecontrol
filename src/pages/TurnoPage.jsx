import { useContext } from 'react';
import { ColaboradoresContext } from '../context/ColaboradoresContext';

function TurnoPage({ turno, title }) {
  const { colaboradores } = useContext(ColaboradoresContext);
  const turnoLabel = turno === 'ADM' ? 'ADM' : `Turno ${turno}`;
  const filtered = colaboradores.filter((colaborador) => colaborador.turno === turno);

  return (
    <section className="page-content turno-view">
      <div className="panel panel-wide">
        <div className="panel-header">
          <div>
            <span>{turnoLabel}</span>
            <h2>{title}</h2>
          </div>
          <p>{filtered.length} colaboradores alocados neste turno.</p>
        </div>

        <div className="grid-list">
          {filtered.map((colaborador) => (
            <article className="mini-card" key={colaborador.id}>
              <strong>{colaborador.nome}</strong>
              <span>{colaborador.funcao}</span>
              <small>{colaborador.posto} • {colaborador.linha}</small>
              <p>{colaborador.situacao}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TurnoPage;
