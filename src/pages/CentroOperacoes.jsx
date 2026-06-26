import { useContext, useMemo, useState } from 'react';
import { ColaboradoresContext } from '../context/ColaboradoresContext';
import './CentroOperacoes.css';

const sequenciaPostos = [
  'Clamp',
  'Ponte',
  'Cabeçote B',
  'Cabeçote C',
  'Mesa Quente',
  'Forradeira',
  'Slitter',
  'Empilhador',
  'Saída',
];

const turnos = ['Todos', 'A', 'B', 'C', 'ADM'];

const colorMap = {
  'Clamp': 'c-clamp',
  'Ponte': 'c-ponte',
  'Cabeçote B': 'c-cabeb',
  'Cabeçote C': 'c-cabec',
  'Mesa Quente': 'c-mesa',
  'Forradeira': 'c-forra',
  'Slitter': 'c-slitter',
  'Empilhador': 'c-empilh',
  'Saída': 'c-saida',
};

const statusClass = (situacao) => {
  if (!situacao) return 's-ausente';
  const s = situacao.toLowerCase();
  if (s.includes('operando')) return 's-operando';
  if (s.includes('trein')) return 's-treinamento';
  if (s.includes('férias') || s.includes('ferias')) return 's-ferias';
  return 's-ausente';
};

function CentroOperacoes() {
  const { colaboradores } = useContext(ColaboradoresContext);
  const [turnoFilter, setTurnoFilter] = useState('Todos');

  const cards = useMemo(() => {
    const base = sequenciaPostos.map((posto) => {
      const colaborador = colaboradores.find((item) => item.posto === posto) || null;
      return { posto, colaborador };
    });

    if (turnoFilter === 'Todos') return base;

    return base.map((item) => ({
      ...item,
      colaborador: item.colaborador?.turno === turnoFilter ? item.colaborador : null,
    }));
  }, [colaboradores, turnoFilter]);

  const totalColabs = colaboradores.length;
  const turnoCounts = colaboradores.reduce(
    (acc, cur) => {
      const t = cur.turno || 'ADM';
      if (t === 'A') acc.A += 1;
      if (t === 'B') acc.B += 1;
      if (t === 'C') acc.C += 1;
      if (t === 'ADM') acc.ADM += 1;
      return acc;
    },
    { A: 0, B: 0, C: 0, ADM: 0 },
  );

  const postosOcupados = cards.filter((c) => c.colaborador).length;
  const postosVagos = cards.length - postosOcupados;

  return (
    <section className="page-content centro-operacoes-view">
      <div className="panel panel-wide">
        <div className="centro-header">
          <div className="titles">
            <span>CENTRO DE OPERAÇÕES</span>
            <h2>Linha 2500</h2>
          </div>

          <div className="top-stats">
            <div className="stat-pill">Total: {totalColabs}</div>
            <div className="stat-pill">Turno A: {turnoCounts.A}</div>
            <div className="stat-pill">Turno B: {turnoCounts.B}</div>
            <div className="stat-pill">Turno C: {turnoCounts.C}</div>
            <div className="stat-pill">ADM: {turnoCounts.ADM}</div>
            <div className="stat-pill">Ocupados: {postosOcupados}</div>
            <div className="stat-pill">Vagos: {postosVagos}</div>
          </div>
        </div>

        <div className="toolbar-row">
          <div className="filter-buttons">
            {turnos.map((t) => (
              <button
                key={t}
                className={`filter-button ${turnoFilter === t ? 'active' : ''}`}
                onClick={() => setTurnoFilter(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="flow-wrap">
          <div className="flow-column">
            {cards.map(({ posto, colaborador }, idx) => (
              <div key={posto}>
                <div className={`posto-card`}>
                  <div className={`posto-left ${colorMap[posto] || ''}`}>
                    <div style={{fontSize:14, opacity:0.9}}>{posto.toUpperCase()}</div>
                    <div style={{fontSize:12, opacity:0.85}}>
                      {colaborador ? colaborador.funcao : null}
                    </div>
                  </div>

                  <div className="posto-body">
                    <div className="posto-info">
                      {colaborador ? (
                        <>
                          <strong>{colaborador.nome}</strong>
                          <div className="meta">Turno: {colaborador.turno} — Situação: {colaborador.situacao}</div>
                        </>
                      ) : (
                        <div className="empty-state">
                          <span className="material-icons" aria-hidden style={{color:'#e74c3c'}}>person_off</span> SEM COLABORADOR
                        </div>
                      )}
                    </div>

                    <div className="posto-status">
                      <div className={`status-dot ${statusClass(colaborador?.situacao)}`} title={colaborador?.situacao || 'Ausente'} />
                      <div style={{textAlign:'right', fontWeight:600}}>
                        {colaborador ? colaborador.funcao : ''}
                      </div>
                    </div>
                  </div>
                </div>

                {idx < cards.length - 1 && <div className="posto-connector">↓</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CentroOperacoes;
