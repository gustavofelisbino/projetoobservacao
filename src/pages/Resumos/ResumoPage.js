import '../../App.css';
import React, { useState } from 'react';
import { useResumo } from '../../hooks/useResumo';
import useSummarizeText from '../../component/ResumirTexto';

const ResumoPage = () => {
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedObservacoes, setSelectedObservacoes] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const { summarizeText } = useSummarizeText();

    const handleSelectObservacao = (e, observacao) => {
        if (e.target.checked) {
            setSelectedObservacoes((prev) => [...prev, observacao]);
        } else {
            setSelectedObservacoes((prev) => prev.filter((obs) => obs !== observacao));
        }
    };

    const { observacoes, isLoading } = useResumo();

    const handleSummarize = async () => {
        setLoading(true);
        setError('');
        setSummary('');

        try {
            if (selectedObservacoes.length === 0) {
                throw new Error('Selecione pelo menos uma observação para resumir.');
            }

            const observacoesTexto = selectedObservacoes.join('\n\n');
            const result = await summarizeText(observacoesTexto);
            setSummary(result);
        } catch (err) {
            setError(err.message || 'Erro ao gerar resumo.');
        } finally {
            setLoading(false);
        }
    };

    const handleEditToggle = () => {
        setIsEditing((prev) => {
            const newIsEditing = !prev;

            if (!prev) {
                setTimeout(() => {
                    const textarea = document.querySelector('.resumo-box-edit');
                    if (textarea) {
                        textarea.style.height = 'auto';
                        textarea.style.height = `${textarea.scrollHeight}px`;
                    }
                }, 0);
            }

            return newIsEditing;
        });
    };

    const handleSummaryChange = (e) => {
        setSummary(e.target.value);
    };

    const handleSummaryInput = (e) => {
        const textarea = e.target;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
        setSummary(textarea.value);
    };

    const handleToggleAllCheckboxes = (isChecked) => {
        if (isChecked) {
            const allObservacoes = observacoes.map((obs) => obs.Observacao);
            setSelectedObservacoes(allObservacoes);
        } else {
            setSelectedObservacoes([]);
        }
    };

    return (
        <div>
            <div>
                {isLoading ? (
                    <p>Carregando observações...</p>
                ) : (
                    <div className='resumo-page'>
                        <ul className="observacoes">
                            <h1 className="tituloobservacao">RESUMO DAS OBSERVAÇÕES</h1>
                            <div>
                                <label className="checkbox-geral">
                                <input
                                    type="checkbox"
                                    onChange={(e) => handleToggleAllCheckboxes(e.target.checked)}
                                />
                                Selecionar/Deselecionar Todos
                                </label>
                                <p className="contador-selecionadas">{selectedObservacoes.length} observações selecionada(s)</p>
                            </div>
                            {observacoes.map((obs, index) => (
                                <li key={index} className="observacao-item">
                                    <label className="observacao-label">
                                        <input
                                            type="checkbox"
                                            value={obs.Observacao}
                                            checked={selectedObservacoes.includes(obs.Observacao)}
                                            onChange={(e) => handleSelectObservacao(e, obs.Observacao)}
                                        />
                                        <span>
                                            <strong>Observação:</strong> {obs.Observacao}
                                        </span>
                                    </label>
                                    <div className='adicionais'>
                                        <p>
                                            <strong>Criado por:</strong> {obs.UsuarioCriacao?.Nome}
                                        </p>
                                        <p>
                                            <strong>Data:</strong> {obs.DataCriacao}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className='botaoresumo'>
                            <button className="resumir" onClick={handleSummarize} disabled={loading}>
                                {loading ? 'Resumindo...' : 'Resumir Selecionadas'}
                            </button>
                        </div>
                        <div className="resumo">
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            {summary && (
                                <>
                                    <h3>Texto Resumido</h3>
                                    {isEditing ? (
                                        <textarea
                                            className="resumo-box-edit"
                                            value={summary}
                                            onChange={handleSummaryChange}
                                            onInput={handleSummaryInput}
                                        ></textarea>
                                    ) : (
                                        <pre className="resumo-box">{summary}</pre>
                                    )}
                                </>
                            )}
                            {!summary && (
                                <p className="resumo-placeholder">
                                    O resumo será exibido aqui após ser gerado.
                                </p>
                            )}
                            {summary && (
                                <div className="botoes">
                                    <button className="post-button">Enviar ao ADM</button>
                                    <button className="post-button" onClick={handleEditToggle}>
                                        {isEditing ? 'Salvar Texto' : 'Editar Texto'}
                                    </button>
                                    <button
                                        className="post-button"
                                        onClick={() => navigator.clipboard.writeText(summary)}
                                    >
                                        Copiar Texto
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResumoPage;
