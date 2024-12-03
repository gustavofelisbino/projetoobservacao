import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { pesquisaGeral } from '../../api/services/pesquisa';

export const usePesquisaADM = () => {
    const navigate = useNavigate();

    const [valueUnidade, setValueUnidade] = useState('');
    const [resultados, setResultados] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const params = {
        sort: [
            { property: "DataCriacao", direction: "desc" },
            { property: "Id", direction: "desc" },
        ],
        PesquisaGeral: valueUnidade,
        Status: [1, 3, 2, 5, 6],
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setResultados([]);
        setError(null); // Limpa erros anteriores

        if (!valueUnidade.trim()) {
            setError("O campo de busca não pode estar vazio.");
            return;
        }

        setIsLoading(true);
        try {
            const response = await pesquisaGeral(params);

            // Validação da resposta da API
            if (!response || !response.Content) {
                throw new Error("Resposta inválida da API.");
            }

            setResultados(response.Content);
        } catch (error) {
            console.error("Erro ao buscar unidades:", error);
            setError(
                error.response?.data?.message ||
                "Ocorreu um erro ao realizar a busca. Tente novamente."
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleSelectUnidadeTreinamento = (idUnidade) => {
        console.log("Unidade selecionada para treinamento:", idUnidade);
        navigate(`/resumos/${idUnidade}`);
    };
    
    const handleSelectUnidadeCancelamento = (idUnidade) => {
        console.log("Unidade selecionada para cancelamento:", idUnidade);
        navigate(`/cancelamento/${idUnidade}`);
    };
    
    const handleSelectUnidadeTicket = (idUnidade) => {
        console.log("Unidade selecionada para ticket:", idUnidade);
        navigate(`/Ticket/${idUnidade}`);
    };
    

    return {
        valueUnidade,
        setValueUnidade,
        resultados,
        setResultados,
        isLoading,
        setIsLoading,
        handleSearch,
        handleSelectUnidadeTreinamento,
        handleSelectUnidadeCancelamento,
        handleSelectUnidadeTicket,
        navigate,
        error, // Retorna o estado de erro para exibição
    };
};
