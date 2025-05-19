
# Documentação do Sistema PDV

## Visão Geral
Este sistema PDV (Ponto de Venda) foi desenvolvido para pequenos e médios estabelecimentos, com foco em restaurantes e lanchonetes. Ele oferece funcionalidades para gerenciamento de vendas, pedidos, estoque e relatórios.

## Módulos

### PDV (Ponto de Venda)
- Interface de vendas para atendentes
- Cadastro rápido de pedidos
- Seleção de produtos por categoria
- Adição de observações aos itens
- Impressão de comprovante para cozinha
- Versão responsiva para dispositivos móveis

### Caixa
- Recebimento de pagamentos
- Múltiplas formas de pagamento (dinheiro, cartões, PIX)
- Emissão de recibos e comprovantes
- Fechamento de turno com relatórios
- Sistema de turnos com abertura e fechamento
- Controle de operadores e valores iniciais/finais
- Integração com o sistema de produtos cadastrados

### KDS (Kitchen Display System)
- Exibição de pedidos para a cozinha
- Organização por tempo e prioridade
- Marcação de pedidos prontos
- Interface otimizada para ambiente de cozinha

### Produtos
- Cadastro completo de produtos
- Categorização
- Gestão de preços
- Controle de disponibilidade
- Upload de imagens

### Estoque
- Controle de entrada e saída
- Alertas de estoque baixo
- Integração com módulo de compras
- Histórico de movimentações

### Relatórios
- Vendas por período
- Produtos mais vendidos
- Desempenho de atendentes
- Análise de lucratividade
- Exportação em diversos formatos

### Turnos e Operações Financeiras
- Sistema de turnos com abertura e fechamento de caixa
- Registro de operadores por turno
- Controle de valores iniciais e finais
- Estatísticas por método de pagamento
- Relatórios de fechamento de caixa

## Tecnologias Utilizadas
- React + TypeScript para o frontend
- Tailwind CSS para estilização
- Armazenamento local para persistência de dados
- Interface responsiva para desktop e dispositivos móveis

## Sistema de Persistência de Dados
O sistema utiliza localStorage para manter os dados entre sessões:
- Todos os produtos são armazenados e gerenciados no ProductContext
- Pedidos são persistidos no OrderContext
- Itens de estoque são gerenciados pelo StockContext
- Informações de turnos e operações de caixa são mantidas no OrderContext

## Fluxo de Trabalho do Caixa

1. **Abertura de Turno**
   - O operador informa seu nome e o valor inicial em caixa
   - O sistema registra a data e hora de abertura
   - Após a abertura, o sistema permite receber pagamentos

2. **Processamento de Pagamentos**
   - Apenas pedidos com status "ready" aparecem para pagamento
   - O sistema calcula o valor total com base nos produtos cadastrados
   - O operador seleciona o método de pagamento
   - As transações são registradas e associadas ao turno atual

3. **Fechamento de Turno**
   - O operador informa o valor final em caixa
   - O sistema registra a data e hora de fechamento
   - São apresentados relatórios com estatísticas do turno
   - Após o fechamento, um novo turno precisa ser aberto para continuar operações

## Atualizações Recentes
A versão mais recente implementou um sistema completo de turnos no caixa, permitindo controle financeiro mais preciso com abertura e fechamento de caixa, além de garantir que apenas produtos oficialmente cadastrados no sistema possam ser vendidos.
