import React, { useEffect } from 'react';
import ClipLoader from 'react-spinners/ClipLoader'; 
import { usePesquisaADM } from '../../hooks/usePesquisaADM';

const Treinamento = () => {

  const {
    handleSearch,
    handleSelectUnidadeTreinamento,
    valueUnidade,
    setValueUnidade,
    isLoading,
    resultados,
  } = usePesquisaADM();

  useEffect(() => {

  }, [])

  return (
    <div>
      <section>
      <h3 className='titulopesquisa'>Digite a unidade que deseja realizar o resumo:</h3>
      <form className='pesquisas' onSubmit={handleSearch}>
        <div className='pesquisa'>
        <input className='pesquisar'
            type="text" 
            placeholder="Pesquisa Geral" 
            value={valueUnidade}
            onChange={(e) => setValueUnidade(e.target.value)} 
        />
        </div>
        <button type="submit" disabled={isLoading}className='botaopesquisa'>
          {isLoading ? <ClipLoader size={15} /> : 'Procurar'}
        </button>
      </form>

      {resultados.length > 0 && (
        <div>
          <h2 className='unidades'>Unidades</h2>
          {resultados.map((unidade) => (
            <button className='unidade' key={unidade.Id} onClick={() => handleSelectUnidadeTreinamento(unidade.Id)}>
              {unidade.Nome}
            </button>
          ))}
        </div>
      )}
      </section>
    </div>
  );
};

export default Treinamento;
