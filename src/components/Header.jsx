function Header({ title, subtitle }) {
  return (
    <header className="header">
      <div>
        <span className="eyebrow">Painel Operacional</span>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      <div className="user-card">
        <span>ADM</span>
        <strong>Junior Fonseca</strong>
      </div>
    </header>
  );
}

export default Header;
