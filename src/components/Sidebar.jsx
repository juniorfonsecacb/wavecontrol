import { NavLink } from 'react-router-dom';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', to: '/dashboard' },
  { id: 'colaboradores', label: 'Colaboradores', to: '/colaboradores' },
  { id: 'centro-operacoes', label: 'Centro de Operações', to: '/centro-operacoes' },
  { id: 'turno-a', label: 'Turno A', to: '/turno-a' },
  { id: 'turno-b', label: 'Turno B', to: '/turno-b' },
  { id: 'turno-c', label: 'Turno C', to: '/turno-c' },
  { id: 'adm', label: 'ADM', to: '/adm' },
  { id: 'indicadores', label: 'Indicadores', to: '/indicadores' },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div>
          <span>Wave</span>
          <strong>Control</strong>
        </div>
        <p>Gestão da onduladeira</p>
      </div>

      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.to}
            className={({ isActive }) =>
              isActive ? 'menu-button active' : 'menu-button'
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
