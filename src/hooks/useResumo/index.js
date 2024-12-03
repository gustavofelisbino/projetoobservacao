import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { listagemCancel } from '../../api/services/listagemCancel';

export const useResumo = () => {
    const { idUnidade } = useParams();
    const navigate = useNavigate();

    const [observacoes, setObservacoes] = useState([]); // Agora armazena todas as observações como uma lista
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [mensagemFinal, setMensagemFinal] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const params = {
                fields: ["Observacao", "UsuarioCriacao.Nome", "CodigoCadastro", "DataCriacao"],
                filter: [
                    { "property": "CodigoCadastro", "operator": "equal", "value": idUnidade, "and": true },
                    { "property": "TiposStr", "operator": "equal", "value": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], "and": true }
                ],
                sort: [
                    { "property": "DataCriacao", "direction": "desc" }
                ]
            };
    
            setIsLoading(true);
            try {
                const response = await listagemCancel(params);
    
                if (response?.Content?.length > 0) {
                    console.log("Dados retornados da API:", response.Content);
    
                    setObservacoes(response.Content);
                } else {
                    setObservacoes([]);
                }

                const observacoesOrdenadas = response.Content.reverse();
                setObservacoes(observacoesOrdenadas);
                
            } catch (error) {
                console.error("Erro ao buscar dados:", error.message || error);
                setObservacoes([]);
            } finally {
                setIsLoading(false);
            }
        };
    
        fetchData();
    }, [idUnidade]);

    const gerarMensagemPadrao2 = () => {
        if (!observacoes.length) {
            console.warn("Nenhuma observação carregada!");
            return;
        }

        const mensagem = observacoes
            .map((obs) => `Observação: ${obs.Observacao}`)
            .join('\n\n'); // Junta todas as observações separadas por uma linha em branco

        setMensagemFinal(mensagem);
    };

    return {
        observacoes,
        setObservacoes,
        showModal,
        setShowModal,
        isLoading,
        mensagemFinal,
        setMensagemFinal,
        gerarMensagemPadrao2,
        navigate,
    };
};
