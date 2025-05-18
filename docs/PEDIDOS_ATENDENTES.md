
# Documentação: Tela de Pedidos para Atendentes

## Visão Geral
A tela de Pedidos para Atendentes foi desenvolvida para permitir que garçons e atendentes visualizem os pedidos em aberto e finalizados, garantindo um atendimento eficiente aos clientes.

## Funcionalidades Principais

### 1. Visualização de Pedidos em Aberto
- Exibe todos os pedidos que estão nos status:
  - Pendentes (aguardando preparo)
  - Em Preparo (sendo preparados na cozinha)
  - Prontos (aguardando entrega ao cliente)
- Cada card de pedido mostra:
  - Número do pedido
  - Tipo (Mesa, Retirada, Delivery)
  - Identificador (número da mesa ou nome do cliente)
  - Horário do pedido
  - Status atual (com código de cores)
  - Lista de itens do pedido
  - Observações para cada item (quando existirem)

### 2. Visualização de Pedidos Finalizados
- Exibe histórico de pedidos que já foram entregues aos clientes
- Mantém o mesmo formato de card para consistência visual

### 3. Ações Disponíveis
- **Ver Detalhes**: Abre um diálogo com informações detalhadas do pedido
- **Entregar**: Para pedidos prontos, permite que o atendente marque como entregue
- A ação de entrega move o pedido automaticamente para a aba de "Finalizados"

### 4. Diálogo de Detalhes
- Informações completas sobre o pedido
- Tabela com itens, quantidades e observações
- Botão para marcar como entregue (quando aplicável)

## Fluxo de Trabalho

1. O atendente monitora a aba "Em Aberto" para visualizar novos pedidos
2. Quando um pedido aparece com status "Pronto", significa que a cozinha finalizou o preparo
3. O atendente entrega o pedido ao cliente e marca como "Entregue" no sistema
4. O pedido move-se para a aba "Finalizados"

## Códigos de Cores para Status

- **Pendente**: Amarelo (#F9D923)
- **Em Preparo**: Azul (#1E40AF)
- **Pronto**: Verde (#10B981)
- **Entregue**: Cinza (#6B7280)

## Integração com Outros Módulos

- **PDV**: Os pedidos criados no PDV são automaticamente exibidos nesta tela
- **KDS**: As atualizações de status feitas pela cozinha são refletidas em tempo real
- **Navegação**: Acesso rápido através do menu lateral (sidebar) com ícone de "Pedidos"
- **Contexto Global**: Compartilhamento de dados entre as páginas usando OrderContext

## Notas Importantes

- O sistema atualiza automaticamente os pedidos quando há mudança de status
- A tela é responsiva e se adapta a diferentes tamanhos de dispositivos
- Os pedidos são organizados por ordem cronológica, com os mais recentes no topo
- A área de pedidos pode ser acessada através do link "Pedidos" na barra lateral
