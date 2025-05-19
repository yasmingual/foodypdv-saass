
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

## Atualizações Recentes
A versão mais recente implementou um sistema completo de gerenciamento de produtos que se integra com o módulo do caixa e PDV, permitindo que apenas produtos oficialmente cadastrados no sistema possam ser vendidos, garantindo maior controle e consistência nos dados.
