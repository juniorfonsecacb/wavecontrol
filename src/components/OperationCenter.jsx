function OperationCenter({ stations }) {
  return (
    <section className="panel operation-center">
      <div className="panel-header">
        <div>
          <span>Centro de Operações</span>
          <h2>Postos ativos</h2>
        </div>
        <span className="status-pill">Online</span>
      </div>

      <div className="station-grid">
        {stations.map((station) => (
          <div className="station-card" data-status={station.status} key={station.name}>
            <span>{station.name}</span>
            <strong>{station.owner}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

export default OperationCenter;
