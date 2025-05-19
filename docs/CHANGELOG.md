
# Changelog

Todas as alterações notáveis neste projeto serão documentadas neste arquivo.

## [Não lançado]

### Adicionado
- Implementado exibição das imagens dos produtos no PDV
  - Integradas imagens do estoque na visualização dos produtos no PDV
  - Adicionado suporte para imagens em itens do pedido no módulo de caixa
- Implementada versão mobile do PDV com layout otimizado para dispositivos móveis
  - Adicionada navegação adaptada com botões maiores e interfaces mais amigáveis para toque
  - Separação de visualização de produtos e carrinho em abas distintas
  - Implementada detecção automática de dispositivo para redirecionar para a versão apropriada
  - Adicionado botão de acesso à versão mobile do PDV no menu lateral
- Implementado sistema completo de gerenciamento de estoque
  - Adicionada funcionalidade para cadastrar novos itens no estoque
  - Adicionada funcionalidade para editar informações dos itens
  - Adicionada funcionalidade para atualizar quantidades (adicionar/remover)
  - Adicionada funcionalidade para visualizar detalhes dos itens
  - Adicionada funcionalidade para filtrar por categoria e pesquisar itens
  - Adicionado sistema de alerta para itens com estoque baixo
  - Implementada persistência dos dados no localStorage
- Implementado sistema de produtos com persistência
  - Criado contexto de produtos separado do estoque para gerenciar catálogo de produtos
  - Integração entre o PDV e o catálogo de produtos
  - Produtos cadastrados na página Produtos são agora os únicos exibidos no PDV

### Corrigido
- Corrigido erro de compilação relacionado à tipagem em src/pages/Stock.tsx
- Corrigido erro na interface UpdateQuantityDialogProps com prop onSubmit renomeado para onUpdate
- Corrigido erro de importação em Settings.tsx que impedia a página de configurações de carregar
- Corrigido o sistema de impressão de cupom fiscal para mostrar apenas o cupom e não a tela inteira do sistema
- Corrigido o problema onde transações de pedidos pendentes não eram exibidas nos cards do caixa
- Removidos dados mockados do caixa, agora exibindo apenas dados reais baseados nos pedidos processados
- Removidos dados mockados do Dashboard, agora exibindo informações reais baseadas nos pedidos processados
- Corrigido problema de persistência no PDV, que agora exibe corretamente os produtos cadastrados no estoque e suas imagens
- Corrigido filtro no PDV para garantir que apenas produtos válidos e devidamente cadastrados sejam exibidos
- Corrigido o sistema do PDV para mostrar apenas produtos cadastrados na página de Produtos

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
