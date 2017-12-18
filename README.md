# TRN-002 - PROPOR TREINAMENTOS ANUAIS #

## Descrição: ##

Processo com a finalidade de propor treinamentos que serão aplicados ao longo do ano
por um determinado departamento.

## FLUXO PRINCIPAL: ##

1 - Responsáveis pela abertura do planejamento de treinamentos(RH), indica a área e o departamento;

2 - O gestor da área recebe a solicitação para preencher a tabela de treinamentos, onde deverá ser inserido
as informações de todos os treinamentos que será aplicados pelo departamento ao longo do ano;

3 - A solicitação é encaminhada novamente para os responsáveis pela abertura do planejamentos de treinamentos(RH),
para a aprovação:

    3.1 - Caso aprovado, a solicitação avança;
    3.2 - Caso reprovada, a solicitação retorna ao gestor da área para atualização;
    3.3 - Caso cancelada, a solicitação é cancelada/finalizada.

4 - Após aprovado, a solicitação é encaminhada para a gerencia geral:

    3.1 - Caso aprovado, a solicitação avança;
    3.2 - Caso reprovada, a solicitação retorna ao gestor da área para atualização;
    3.3 - Caso cancelada, a solicitação é cancelada/finalizada.

5 - Após aprovada para a gerência geral, a solicitação fica em stand-by até a liberação da Previsão Orçamentária(TRN-003 - Estipular Orçamentos Anuais);

6 - Após liberação da P.O, a solicitação é novamente encaminhada ao gestor da área, para que ele possa adequar valores conforme
o orçamento disponível; 

7 - Após o remanejamento, a solicitação é novamente encaminhada ao RH para aprovação:

    3.1 - Caso aprovado, a solicitação avança;
    3.2 - Caso reprovada, a solicitação retorna ao gestor da área para atualização;
    3.3 - Caso cancelada, a solicitação é cancelada/finalizada.

8 - Após aprovado, a solicitação é encaminhada para a gerencia geral:

    3.1 - Caso aprovado, a solicitação avança;
    3.2 - Caso reprovada, a solicitação retorna ao gestor da área para atualização;
    3.3 - Caso cancelada, a solicitação é cancelada/finalizada.

9 - Após aprovação, o planejamento entra na fase de execução:

    9.1 - Ao atualizar o status de um(ou mais) treinamento(s), Será aberta solicitações de avaliação de reação(TRN-006)
    para os treinamentos com status "REALIZADO" para cada participante.:
        
        9.1.1 - Atualização de planejamento[Sim]: Solicitação é encaminhada ao gestor da área para atualização do planejamento(passo 6);
        9.1.2 - Atualização de planejamento[Não]: Somente caso todos os treinamentos estiverem com status definido(REALIZADO ou CANCELADO),
        solicitação é encaminhada para a gerencia geral tomar conhecimento;
        9.1.3 - Atualização de planejamento[indefinido]: Solicitação solicitação irá permanecer na fase de execução.

        FLUXO ALTERNATIVO: 

        Em caso de erro ao abrir a solicitação de avaliações de reação, a solicitação é encaminhada a equipe de
        processos para tratamento e correção do erro.

10 - Após a execução do treinamento, a solicitação é encaminhada para a gerência geral tomar conhecimento;

11 - A equipe de processos atualiza as informações(analytics), caso for necessário;

12 - Processo finalizado.