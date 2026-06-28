import { useContext, useMemo, useState } from 'react';
import { ColaboradoresContext } from '../context/ColaboradoresContext';

const emptyForm = {
  nome: '',
  matricula: '',
  turno: 'A',
  funcao: '',
  linha: '',
  posto: '',
  situacao: 'Ativo',
  telefone: '',
  observacoes: '',
};

function Colaboradores() {
  const { colaboradores, addColaborador, updateColaborador, removeColaborador, loading } = useContext(ColaboradoresContext);
  const [searchField, setSearchField] = useState('nome');
  const [searchValue, setSearchValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formState, setFormState] = useState(emptyForm);

  const filtered = useMemo(() => {
    const query = searchValue.trim().toLowerCase();
    if (!query) return colaboradores;
    return colaboradores.filter((item) =>
      String(item[searchField] ?? '').toLowerCase().includes(query),
    );
  }, [colaboradores, searchField, searchValue]);

  const openModal = (colaborador) => {
    if (colaborador) {
      setEditingId(colaborador.id);
      setFormState(colaborador);
    } else {
      setEditingId(null);
      setFormState(emptyForm);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormState(emptyForm);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      nome: formState.nome,
      matricula: formState.matricula,
      turno: formState.turno,
      funcao: formState.funcao,
      linha: formState.linha,
      posto: formState.posto,
      situacao: formState.situacao,
      telefone: formState.telefone,
      observacoes: formState.observacoes,
    };

    if (editingId) {
      await updateColaborador(editingId, payload);
    } else {
      await addColaborador(payload);
    }

    closeModal();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza de que deseja excluir este colaborador?')) {
      await removeColaborador(id);
    }
  };

  return (
    <section className="page-content colaboradores-view">
      <div className="panel panel-wide">
        <div className="panel-header">
          <div>
            <span>Colaboradores</span>
            <h2>Equipe completa</h2>
          </div>
          <p>Lista geral com todos os colaboradores por turno, função e posto.</p>
        </div>

        <div className="toolbar-row">
          <div className="search-row">
            <select value={searchField} onChange={(event) => setSearchField(event.target.value)}>
              <option value="nome">Nome</option>
              <option value="turno">Turno</option>
              <option value="funcao">Função</option>
              <option value="posto">Posto</option>
            </select>
            <input
              type="search"
              placeholder="Buscar colaborador..."
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
            />
          </div>
          <button type="button" className="btn btn-primary" onClick={() => openModal()}>Novo Colaborador</button>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Matrícula</th>
                <th>Turno</th>
                <th>Função</th>
                <th>Linha</th>
                <th>Posto</th>
                <th>Situação</th>
                <th>Telefone</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="9">Carregando colaboradores...</td>
                </tr>
              ) : (
                filtered.map((colaborador) => (
                  <tr key={colaborador.id}>
                    <td>{colaborador.nome}</td>
                    <td>{colaborador.matricula}</td>
                    <td>{colaborador.turno}</td>
                    <td>{colaborador.funcao}</td>
                    <td>{colaborador.linha}</td>
                    <td>{colaborador.posto}</td>
                    <td>{colaborador.situacao}</td>
                    <td>{colaborador.telefone}</td>
                    <td>
                      <button type="button" className="btn btn-secondary" onClick={() => openModal(colaborador)}>Editar</button>
                      <button type="button" className="btn btn-danger" onClick={() => handleDelete(colaborador.id)}>Excluir</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-card">
            <div className="modal-header">
              <div>
                <span>{editingId ? 'Editar colaborador' : 'Novo colaborador'}</span>
                <h3>{editingId ? 'Atualize os dados do colaborador' : 'Preencha os dados do novo colaborador'}</h3>
              </div>
              <button type="button" className="modal-close" onClick={closeModal}>×</button>
            </div>

            <form className="form-grid" onSubmit={handleSubmit}>
              <label>
                Nome
                <input
                  name="nome"
                  value={formState.nome}
                  onChange={(event) => setFormState({ ...formState, nome: event.target.value })}
                  required
                />
              </label>

              <label>
                Matrícula
                <input
                  name="matricula"
                  value={formState.matricula}
                  onChange={(event) => setFormState({ ...formState, matricula: event.target.value })}
                />
              </label>

              <label>
                Turno
                <select
                  name="turno"
                  value={formState.turno}
                  onChange={(event) => setFormState({ ...formState, turno: event.target.value })}
                >
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="ADM">ADM</option>
                </select>
              </label>

              <label>
                Função
                <input
                  name="funcao"
                  value={formState.funcao}
                  onChange={(event) => setFormState({ ...formState, funcao: event.target.value })}
                  required
                />
              </label>

              <label>
                Linha
                <input
                  name="linha"
                  value={formState.linha}
                  onChange={(event) => setFormState({ ...formState, linha: event.target.value })}
                />
              </label>

              <label>
                Posto
                <input
                  name="posto"
                  value={formState.posto}
                  onChange={(event) => setFormState({ ...formState, posto: event.target.value })}
                  required
                />
              </label>

              <label>
                Situação
                <select
                  name="situacao"
                  value={formState.situacao}
                  onChange={(event) => setFormState({ ...formState, situacao: event.target.value })}
                >
                  <option value="Ativo">Ativo</option>
                  <option value="Afastado">Afastado</option>
                  <option value="Substituto">Substituto</option>
                </select>
              </label>

              <label>
                Telefone
                <input
                  name="telefone"
                  value={formState.telefone}
                  onChange={(event) => setFormState({ ...formState, telefone: event.target.value })}
                />
              </label>

              <label className="full-width">
                Observações
                <textarea
                  name="observacoes"
                  rows="3"
                  value={formState.observacoes}
                  onChange={(event) => setFormState({ ...formState, observacoes: event.target.value })}
                />
              </label>

              <div className="modal-actions full-width">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancelar</button>
                <button type="submit" className="btn btn-primary">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default Colaboradores;
