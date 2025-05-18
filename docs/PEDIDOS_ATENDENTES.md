
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
  - Dados de entrega para pedidos de delivery

### 2. Visualização de Pedidos Finalizados
- Exibe histórico de pedidos que já foram entregues aos clientes
- Mantém o mesmo formato de card para consistência visual

### 3. Edição de Pedidos
- Possibilidade de adicionar novos itens a pedidos em status "Pendente" ou "Em Preparo"
- Interface intuitiva para seleção de produtos adicionais
- Suporte para adicionar quantidades e observações aos novos itens
- Não permite edição de pedidos já prontos ou entregues

### 4. Impressão de Cupons
- Possibilidade de imprimir cupom não fiscal para qualquer pedido
- Formato de cupom otimizado para impressoras térmicas
- Cupom inclui:
  - Dados do estabelecimento (nome, endereço, telefone, CNPJ)
  - Número do pedido e data/hora
  - Tipo de pedido (Mesa, Retirada, Delivery)
  - Detalhes específicos por tipo de pedido:
    - Mesa: número da mesa
    - Retirada: nome do cliente para retirada
    - Delivery: dados completos de entrega (nome, telefone, endereço)
  - Lista de itens com quantidade, preço e observações
  - Subtotal, taxa de serviço e valor total

### 5. Ações Disponíveis
- **Ver Detalhes**: Abre um diálogo com informações detalhadas do pedido
- **Imprimir**: Abre um diálogo com o cupom para impressão
- **Editar**: Para pedidos pendentes ou em preparo, permite adicionar novos itens
- **Entregar**: Para pedidos prontos, permite que o atendente marque como entregue
- A ação de entrega move o pedido automaticamente para a aba de "Finalizados"

### 6. Diálogo de Detalhes
- Informações completas sobre o pedido
- Tabela com itens, quantidades e observações
- Dados de entrega para pedidos tipo Delivery
- Botão para marcar como entregue (quando aplicável)
- Botão para editar pedido (quando aplicável)

### 7. Diálogo de Edição
- Lista de itens atuais do pedido
- Botão para adicionar novos itens
- Interface de seleção de produtos com filtros e busca

### 8. Diálogo de Impressão
- Visualização prévia do cupom a ser impresso
- Formatação específica para impressora térmica
- Botão para enviar para impressão
- Cabeçalho com dados do estabelecimento
- Detalhes do pedido conforme tipo (mesa, retirada ou delivery)
- Lista de itens com preços e observações
- Total com subtotal e taxas

### 9. Dados de Entrega para Delivery
- Integração com formulário de dados do cliente no PDV
- Exibição dos dados completos do cliente no diálogo de detalhes
- Informações essenciais como nome, telefone, endereço e ponto de referência
- Inclusão destes dados no cupom impresso

## Fluxo de Trabalho

1. O atendente monitora a aba "Em Aberto" para visualizar novos pedidos
2. Se necessário, pode adicionar itens a pedidos pendentes ou em preparo
3. Quando um pedido aparece com status "Pronto", significa que a cozinha finalizou o preparo
4. O atendente pode imprimir o cupom do pedido clicando no botão "Imprimir"
5. O atendente entrega o pedido ao cliente e marca como "Entregue" no sistema
6. O pedido move-se para a aba "Finalizados"

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
- **Impressão**: Possibilidade de imprimir cupons para todos os pedidos no formato adequado

## Notas Importantes

- O sistema atualiza automaticamente os pedidos quando há mudança de status
- A tela é responsiva e se adapta a diferentes tamanhos de dispositivos
- Os pedidos são organizados por ordem cronológica, com os mais recentes no topo
- Para pedidos de delivery, as informações do cliente são armazenadas e exibidas
- A área de pedidos pode ser acessada através do link "Pedidos" na barra lateral
- Os cupons impressos são formatados para impressoras térmicas padrão (80mm)
