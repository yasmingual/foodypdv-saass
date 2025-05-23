
# Changelog

## [3.1.0] - 2025-05-23
### Adicionado
- Implementado perfil de usuário com opção para edição de informações
- Adicionada funcionalidade de logout no sistema
- Criado menu de usuário no cabeçalho para acesso rápido ao perfil

## [3.0.2] - 2025-05-23
### Correções
- Corrigido erro de importação em SubscriptionSettings no componente Settings
- Corrigido erro de tipo em subscriptionUtils na função upgradeSubscription
- Ajustado o valor do plano standard para garantir conformidade com o tipo TenantType

## [3.0.1] - 2025-05-23
### Correções
- Corrigido erro de importação em componentes de configuração que usavam exportações nomeadas incorretamente

## [3.0.0] - 2025-05-22
### Adicionado
- Implementado sistema multi-tenant (SaaS) para permitir múltiplos restaurantes
- Adicionado sistema de assinatura com período de teste de 7 dias
- Criada landing page para apresentação do sistema
- Adicionados planos de assinatura mensal e anual
- Implementado alerta de assinatura para notificar sobre expiração

### Alterado
- Modificada arquitetura para isolamento de dados por restaurante
- Atualizado sistema de armazenamento para suportar múltiplos inquilinos

## [2.5.0] - 2025-05-15
### Adicionado
- Suporte a impressoras térmicas locais via USB
- Opção para selecionar tipo de conexão da impressora (rede/local)
- Detecção automática de impressoras no Windows

### Alterado
- Melhorada interface de configuração de impressoras
- Atualizada documentação de impressão

## [2.0.0] - 2025-05-01
### Adicionado
- Módulo completo de estoque
- Gestão de categorias de produtos
- Sistema de alertas para produtos com estoque baixo
- Relatórios de movimentação de estoque

### Alterado
- Reformulada interface do PDV
- Melhorado sistema de pedidos
