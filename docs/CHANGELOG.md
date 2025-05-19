
# Changelog

Todas as alterações notáveis neste projeto serão documentadas neste arquivo.

## [Não lançado]

## [0.4.0] - 2025-05-19

### Adicionado
- Implementada área de configurações do sistema com opções robustas
- Adicionadas configurações gerais para informações do estabelecimento e notificações
- Adicionadas configurações detalhadas de impressão e personalização de layout do cupom
- Adicionadas configurações de aparência com opções de tema e layout
- Adicionadas configurações de integrações com serviços externos
- Adicionadas configurações de backup e restauração do sistema
- Criada documentação completa sobre as configurações disponíveis

### Modificado
- Atualizado o menu lateral para incluir link para configurações
- Refatoração dos componentes de OrderItems, OrderSummary e PaymentActions para melhorar a modularidade

## [0.3.0] - 2025-04-30

### Corrigido
- Corrigido problema onde os cards do caixa não eram atualizados após o recebimento dos pedidos pendentes
- Implementada atualização dinâmica dos dados de transações após o processamento de um pagamento

## [0.2.0] - 2025-04-15

### Corrigido
- Corrigidos problemas de layout na tela de recebimento, onde valores eram mostrados fora da área visível
- Adicionada rolagem e redução de padding para melhor visualização
- Limitada altura da lista de itens para evitar overflow
- Otimizado o layout dos métodos de pagamento

### Refatorado
- Refatorado o componente `PaymentDialog.tsx` para componentes menores e reutilizáveis:
  - `OrderItems`: para mostrar os itens do pedido
  - `OrderSummary`: para calcular e exibir os totais
  - `PaymentMethodSelector`: para seleção do método de pagamento
  - `PaymentActions`: para ações de impressão e finalização

## [0.1.0] - 2025-04-01

### Adicionado
- Lançamento inicial do sistema FoodPOS
- Implementação das funcionalidades básicas de PDV
- Implementação do Caixa para recebimento de pedidos
- Implementação do KDS para cozinha
