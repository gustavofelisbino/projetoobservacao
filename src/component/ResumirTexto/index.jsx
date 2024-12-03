import { useResumo } from '../../hooks/useResumo'

const useSummarizeText = () => {

  const { observacao } = useResumo();
  
  const summarizeText = async (inputText) => {
    const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;;
    const API_URL = 'https://api.openai.com/v1/chat/completions';

    try {
      if (!inputText || inputText.trim() === '') {
        throw new Error('O texto de entrada não pode estar vazio.');
      }

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'Você é um assistente que resume textos.' },
            {
              role: 'user',
              content: `Com base nessas informações ${inputText}

                ME RESPONDA AS SEGUINTES QUESTÕES DE FORMA ESTRUTURADA EM TÓPICOS:
                - Qual foi o motivo principal para o cancelamento?
                - Por que você considera que esse é o motivo? 
                - Por que o cliente quis cancelar?
                - Quais as dores do cliente?
                - O que foi feito para tentar ajudar o cliente?
                - Por onde foram feitas as conversas? 
                - O que podemos fazer para que esse tipo de cancelamento não volte a ocorrer?
                - Quais os motivos secundários que levaram ao cancelamento?

                Por exemplo: 
                Qual foi o motivo principal para o cancelamento?
                Aqui o conteúdo do resumo
                Por que você considera que esse é o motivo? 
                Aqui o conteúdo do resumo

                Preciso que seja por tópicos e que seja obrigatoriamente com esses títulos e com o resumo embaixo

                CONSIDERE ESSES PARÂMETROS

                ⛔Cliente - Problemas pessoais

                - Cliente está passando por problemas de saúde que dificultam/impedem uso/implantação do sistema;
                - Cliente sofreu com algum desastre ambiental sério, o que inviabiliza a execução de seu trabalho;
                - Cliente teve problemas em suas família, levando o mesmo a não conseguir focar no uso/implantação do sistema (Faculdade, Filhos, Separação);
                - Cliente teve problemas com o sócio e relação entre ambos vem impedindo o avanço no uso;
                - Cliente está tendo problemas com o espaço onde atende os alunos, infraestrutura, descumprimento ou cancelamento de contrato de aluguel;

                ⛔Cliente - Problemas financeiros

                - Cliente está passando problemas com relação à sazonalidade negativa em seu negócio;
                - Cliente teve um prejuízo financeiro ao investir em determinada parte de seu negócio;
                - Cartão do cliente foi clonado/roubado;
                - Cliente não possuiu organização financeira e acabou confundindo datas de pagamentos, valores a pagar, limites de cartão de crédito;
                - Cliente teve problemas que fizeram sua renda baixar significativamente, dificultando o investimento no sistema;
                - 

                ⛔Cliente - Troca de proprietário

                - Houve uma mudança de proprietário no negócio e o novo proprietário não quer utilizar o sistema;
                - Houve uma mudança de proprietário no negócio e o novo proprietário já tem um sistema;
                - Negócio foi vendido para outra pessoa e o antigo proprietário do sistema não quis fazer uma cessão contratual;

                ⛔Cliente - Fechamento de empresa

                - Empresa deu baixa em seu CNPJ;
                - Cliente não trabalhará mais em seu modelo de negócio/mudou de nicho/saiu da área fitness;
                - Negócio ficará suspenso por um período de tempo;
                - Cliente entrou para uma franquia e precisa seguir o sistema e diretrizes estipulados pela marca;
                - Cliente mudou de cidade e ainda vai precisar se reestruturar na nova cidade, sem previsão de retomada;

                ⛔Cliente - Problemas/Falta de equipamentos

                - Cliente não possui catraca/leitor/câmera ou outros equipamentos relacionados ao controle de acesso (Caso tenha ocorrido após a contratação, visto que no momento da contratação existe um alinhamento para isso);
                - Cliente não possui computador/internet (Caso tenha ocorrido após a contratação, visto que no momento da contratação existe um alinhamento para isso);
                - Cliente não possui os materiais para execução do seu negócio (máquinas, halteres, uniformes, etc);
                - Cliente foi furtado/lesado e não terá mais seus equipamentos;
                - Catraca não funcionou da maneira como cliente desejava;
                - Cliente queria assistência presencial para equipamentos;
                - Cliente relata que a catraca ou equipamentos dele não funcionam com o sistema (Casos onde o problema é a infraestrutura do cliente);

                ⛔Cliente - Empresa não abrir

                - Cliente contratou o sistema para usar no seu negócio que iria abrir, entretanto, por algum motivo, a empresa não abriu.

                ⛔Cliente - Perfil

                - Cliente não é adepto a tecnologia, afirma que não gosta de usar e por conta disso acaba deixando de lado;
                - Cliente apresenta muita dificuldade com gestão e não consegue definir um fluxo/maneira de trabalho, sua necessidade em primeiro momento seria de uma consultoria empresarial para direcionar seu negócio;

                ⛔Cliente - Prioridade

                - Mesmo tendo informado na contratação que era uma prioridade, cliente alega que não vai priorizar a configuração e uso do sistema no momento, pois surgiram outras prioridades (Só se enquadra prioridade aqui se foi feito o alinhamento corretamente na venda, e o cliente afirma que não priorizará isso no momento após você ter argumentado que no momento do fechamento ele tinha informado que era prioridade);

                ⛔Contratação - Falta de alinhamento

                - No momento da contratação não foi passado sobre os pontos mais técnicos de determinado recurso que o cliente demonstrou ser relevante para continuar conosco;
                - No momento de fechamento não foi feito alinhamento de fechamento (Computador, Internet, Prioridade, Tempo, Preço, Fidelidade, Migração);
                - No momento da contratação foi informado que o sistema tinha um recurso que, na verdade, não tínhamos;
                - Passamos informações sobre como funciona um recurso de forma equivocada;
                - Não foi alinhado como funciona o processo de onboarding, gerando insatisfação para o cliente;
                - Cliente não apresentou uma necessidade indispensável na demo para ele, comunicando somente após fechar o contrato conosco (falta de alinhamento por parte do cliente)

                ⛔Produto - Problemas de migração

                - No momento de migrar os dados do cliente do antigo sistema, houve alguns dados que não puderam vir devido à diferença de sistemas (Se faltou clareza no fechamento, não devemos considerar como problemas de migração);
                - Não vieram os dados que foram alinhados que viria no momento da venda;
                - Não foi possível realizar a migração devido à diferença de backups, sendo necessário que o cliente começasse do zero;
                - Outro sistema não liberou os dados para migração;
                - Cliente apresentou descontentamento com a migração, mesmo estando de acordo com o que foi alinhado;

                ⛔Produto - Bug/Erros

                - Sistema apresentou problemas/erros que atrapalharam a usabilidade do cliente;
                - Cliente ficou insatisfeito com instabilidades que o sistema apresentou;

                ⛔Produto - Falta de recurso

                - Cliente precisava de determinado recurso que não temos hoje no sistema (mas não apontou a necessidade na venda);
                - Cliente precisava de determinado recurso que não temos hoje no sistema (mesmo sendo alinhado na venda que não teríamos tal recurso);
                - Cliente precisava de pequenas modificações em nosso recurso existente para atender sua necessidade (Não estamos falando de usabilidade, mas sim que nosso recurso não atende a regra de negócio do cliente);

                ⛔Produto - Não viu valor

                - Cliente tem uma dor a ser sanada, mas não viu o valor do sistema, não avançando na implantação;
                - Cliente não deu prioridade para implantar o sistema e acabou cancelando (mesmo alegando outros motivos, como desculpas);
                - Cliente não deixa claro o motivo, apenas diz que o sistema não é voltado para o negócio dele/para sua necessidade;
                - Cliente não chegou a usar o sistema, mas diz que não será bom para seu negócio;
                - Cliente alega que seus alunos não quiseram usar o app do aluno ou não se adaptaram ao mesmo;

                ⛔Produto - Usabilidade	

                - Sistema atende a necessidade do cliente, porém o mesmo acha trabalhoso da forma como o sistema funciona;
                - Cliente alega que o sistema é difícil de mexer e que por isso não conseguiu usar/implantar;
                - Cliente não soube aplicar o sistema no seu negócio;
                - Cliente preferiu voltar ao seu método antigo de trabalho, pois não se adaptou ao uso do Next Fit;
                - Cliente implantou sozinho o sistema se confundindo nas configurações, o que prejudicou sua usabilidade (só se aplica se não passou por nenhum processo de atendimento/ativação para a funcionalidade);

                ⛔Produto - Preço

                - Cliente cancelou, pois o valor do sistema aumentou;
                - Cliente acredita que o valor do sistema (ou de seus recursos pagos) não compensam na relação custo-benefício;
                - Cliente trocou de sistema, pois o outro é mais barato que o Next Fit (Se bancamos o preço e mesmo assim ele mudou, não é preço. Seria “não viu valor”);
                - Cliente não quer pagar valores adicionais para utilizar outros recursos do Next Fit (NFS-e, NFP, Campanhas, WhatsApp, etc.), porém precisa deles;
                - Cliente encontrou uma opção mais em conta, e ficaria conosco se bancasse o valor. Porém, o valor é muito abaixo do que praticamos;

                ⛔Atendimento - Problemas

                - O cliente ficou descontente com o tempo de resposta no atendimento do time;
                - O time passou informações de maneira equivocada;
                - Configurações incorretas foram aplicadas na conta do cliente com direcionamento do time;
                - Faltou profundidade em entender o problema do cliente
                - Cliente gostaria que tivéssemos atendimento presencial ou nos finais de semana também (mesmo tendo sido alinhado na venda que trabalhamos remotamente e em horário comercial);
                - Cliente alega que deveríamos ter um canal de telefonia para tirar dúvidas / não se adaptou com tirar dúvidas via WhatsApp/chat;
                - Faltou clareza ou profissionalismo nas informações repassadas;

                ⛔Implantação - Problemas

                - O cliente ficou descontente com o tempo de resposta no atendimento do time;
                - Cliente não gostou da forma que funciona o processo de implantação do sistema em seu negócio;
                - O time passou informações de maneira equivocada;
                - Configurações incorretas foram aplicadas na conta do cliente com direcionamento do time;
                - Tempo de espera para o treinamento não atendeu a expectativa do cliente;
                - Faltou profundidade em entender o problema do cliente;
                - Liberação do cliente não seguiu o tempo acordado;
                - Migração do cliente não seguiu o tempo acordado;
                - Faltou clareza para o cliente de como funcionava o processo de implantação;
                - Time não explicou corretamente como funciona os canais de atendimento;
                - Faltou clareza ou profissionalismo nas informações repassadas;

                ⛔CSM - Problemas

                - O time passou informações de maneira equivocada;
                - O cliente ficou descontente com o tempo de resposta no atendimento do time;
                - Demoramos ou não chamamos o cliente para um treinamento consultivo;
                - Não propomos negociação ao cliente quando deveríamos ter buscado alternativas;
                - Faltou clareza ou profissionalismo nas informações repassadas;

                ⛔Não categorizado

                - Clientes cancelados automaticamente que estão aguardando a categorização;
                - Cliente que não se enquadraram em nenhum dos motivos acima.

              `,
            },
          ],
          max_tokens: 4000,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        console.error('Detalhes do erro da API:', errorDetails);
        throw new Error(`Erro na API: ${response.status} - ${errorDetails.error?.message}`);
      }

      const data = await response.json();
      return data.choices[0].message.content.trim();
    } catch (error) {
      console.error('Erro ao acessar a API OpenAI:', error.message);
      throw error;
    }
  };

  return { summarizeText };

};

export default useSummarizeText;
