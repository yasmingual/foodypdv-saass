
# Changelog

## [Pendente]
- Melhorar interface de gestão de categorias
- Implementar funcionalidade de busca de produtos
- Adicionar suporte para diferentes métodos de pagamento
- Integração com impressora térmica para impressão de pedidos

## [Unreleased]
- Refatoração do código para melhorar manutenção
- Implementação de testes automatizados
- Exportação de relatórios em diferentes formatos

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
