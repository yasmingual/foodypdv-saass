



# Changelog

## [Pendente]
- Melhorar interface de gestão de categorias
- Implementar funcionalidade de busca de produtos
- Adicionar suporte para diferentes métodos de pagamento

## [Unreleased]
- Refatoração do código para melhorar manutenção
- Implementação de testes automatizados
- Exportação de relatórios em diferentes formatos

## [v0.5.0] - 2025-05-23
### Adicionado
- Sistema completo de planos de assinatura (teste grátis, mensal e anual)
- Landing page de apresentação do sistema com informações sobre planos
- Configurações de assinatura com gerenciamento de planos
- Alerta para assinaturas a expirar ou já expiradas
- Vários planos mensais e anuais com diferentes recursos

### Melhorado
- Experiência inicial com período de teste de 7 dias
- Interface de configurações com nova aba de assinatura
- Sistema de alerta para status de assinatura

## [v0.4.0] - 2025-05-23
### Adicionado
- Funcionalidade SaaS para múltiplos restaurantes
- Isolamento completo de dados por restaurante (pedidos, configurações, turnos)
- Sistema de gestão de restaurantes com diferentes planos
- Inicialização automática do sistema para novos restaurantes

### Melhorado
- Estrutura de armazenamento local para suportar multi-tenant
- Segmentação de configurações por restaurante
- Interface de administração adaptada para múltiplos restaurantes

## [v0.3.11] - 2025-05-19
### Adicionado
- Suporte para impressoras térmicas locais/USB conectadas diretamente ao computador
- Campo de seleção do tipo de conexão da impressora (Local/USB ou Rede TCP/IP)
- Instruções de configuração para impressoras como POS-80C
- Compatibilidade com driver de impressão Windows padrão

### Melhorado
- Interface de configuração da impressora para melhor usabilidade
- Descrições explicativas em cada campo de configuração
- Processo de teste de impressão para ser compatível com impressoras locais

## [v0.3.10] - 2025-05-19
### Adicionado
- Opção para configurar a família de fonte nos cupons impressos
- Persistência das configurações de impressão no localStorage
- Visualização em tempo real das alterações de fonte no preview do cupom

### Melhorado
- Integração completa das configurações do restaurante em todos os componentes de impressão
- Aplicação das configurações de impressão em todos os cupons e recibos gerados
- Interface de configuração da impressora com preview instantâneo das alterações

## [v0.3.9] - 2025-05-19
### Corrigido
- Correção para exibir corretamente o nome do estabelecimento no cupom de impressão
- Integração das configurações do estabelecimento em todos os locais de impressão
- Carregamento das configurações gerais nos componentes de cupom e recibo

## [v0.3.8] - 2025-05-19
### Corrigido
- Correção do botão de "Detalhes" na visualização de turnos
- Melhoria na exibição de detalhes do turno com estatísticas de transações
- Formatação de data e hora para melhor legibilidade
- Adição de feedback visual ao clicar no botão de detalhes

## [v0.3.7] - 2025-05-19
### Corrigido
- Erros de tipagem no componente de detalhes do turno
- Adaptação do diálogo para usar as propriedades corretas do tipo Shift
- Remoção de referências à propriedade 'notes' inexistente

## [v0.3.6] - 2025-05-19
### Adicionado
- Funcionalidade do botão "Detalhes" na visualização de turnos
- Diálogo detalhado de informações de turnos
- Nova aba de turnos na página de configurações
- Exibição completa de valores financeiros por turno

### Melhorado
- Interface de visualização do histórico de turnos
- Persistência dos dados entre abas de configurações

## [v0.3.5] - 2025-05-19
### Adicionado
- Persistência de configurações no localStorage
- Carregamento automático de configurações salvas
- Aplicação em tempo real das configurações de aparência
- Geração e salvamento automático de chaves de API

### Melhorado
- Interface de usuário para gerenciamento de configurações
- Experiência do usuário ao salvar e aplicar configurações

## [v0.3.4] - 2025-05-19
### Adicionado
- Campos para informar valores por forma de pagamento no fechamento de caixa (dinheiro, débito, crédito, PIX)
- Cálculo automático do valor total no fechamento com base nos valores informados
- Interface melhorada para fechamento de caixa com ícones para cada método

### Melhorado
- Design responsivo do diálogo de fechamento de caixa para mobile e desktop
- Experiência do usuário no processo de fechamento de turno

## [v0.3.3] - 2025-05-19
### Adicionado
- Transição automática de pedidos finalizados para "prontos para pagamento"
- Detalhes de duração do turno atual no painel do caixa
- Melhoria da visualização de informações do turno no caixa

### Corrigido
- Correção na transição de pedidos finalizados para o fluxo de pagamento
- Pedidos marcados como completos agora aparecem automaticamente na lista de pagamentos pendentes

## [v0.3.2] - 2025-05-19
### Adicionado
- Sistema de turnos no caixa com abertura e fechamento
- Controle de operadores por turno
- Estatísticas financeiras por turno
- Relatório de fechamento de caixa
- Verificação de turno ativo antes de processar pagamentos

### Corrigido
- Apenas pedidos com status "ready" (prontos) aparecem na lista de pagamentos pendentes
- Validação de valores monetários no caixa

## [v0.3.1] - 2025-05-19
### Alterado
- Atualizado o sistema do caixa para usar produtos cadastrados oficialmente
- Implementada persistência dos dados de pedidos no localStorage
- Integração entre módulo de caixa e catálogo de produtos
- Melhorada a exibição de produtos no cupom fiscal

## [v0.3.0] - 2025-05-18
### Adicionado
- Sistema de gerenciamento de produtos centralizado com persistência
- Apenas produtos oficialmente cadastrados no sistema aparecem no PDV
- Categorias de produtos são dinâmicas com base no catálogo
- Salvamento de todos os dados em localStorage para persistência

### Melhorado
- Interface do PDV mais responsiva e intuitiva
- Fluxo de criação de pedidos mais eficiente
- Exibição de produtos com imagens quando disponíveis

## [v0.2.0] - 2025-05-10
### Adicionado
- Módulo de gerenciamento de estoques
- Sistema de pedidos para restaurantes
- Interface de cozinha (KDS)
- Controle de mesas e pedidos
- Sistema de entrega

### Melhorado
- Desempenho geral do sistema
- Interface de usuário mais intuitiva

## [v0.1.0] - 2025-05-01
### Adicionado
- Versão inicial do sistema PDV
- Dashboard básico
- Cadastro de produtos simples
- Funcionalidade de vendas básicas



