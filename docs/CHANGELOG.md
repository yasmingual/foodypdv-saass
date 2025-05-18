
# Changelog

## [0.8.0] - 2025-05-18
### Adicionado
- Implementação de observações para produtos no PDV:
  - Adicionado diálogo para inserção de observações ao adicionar produtos
  - Campo para informar observações como "Sem cebola", "Sem tomate", etc
  - Campo para editar observações para itens já adicionados ao carrinho
  - Produtos com mesma identificação, mas observações diferentes são listados separadamente
  - Feedback visual através de notificação toast ao adicionar item

## [0.7.0] - 2025-05-18
### Adicionado
- Implementada funcionalidade do botão "Abrir Caixa" na página de Caixa:
  - Adicionado diálogo para abertura de caixa
  - Campos para informar valor inicial em caixa e operador
  - Feedback visual através de notificação toast após abertura bem-sucedida
  - Validação de entrada para valor monetário
  - Botão fica desabilitado e muda para "Caixa Aberto" após ser aberto

## [0.6.0] - 2025-05-18
### Adicionado
- Menu suspenso (dropdown) de categorias nos formulários de produtos:
  - Adicionado seletor de categorias no formulário de adicionar novo produto
  - Adicionado seletor de categorias no formulário de editar produto
  - Apenas categorias ativas são exibidas nas opções

## [0.5.0] - 2025-05-18
### Adicionado
- Implementação completa da funcionalidade de adicionar produtos:
  - Adicionado diálogo com formulário para criar novos produtos
  - Adicionados campos para nome, categoria, preço, estoque e status
  - Botão para salvar o novo produto
  - Feedback visual através de notificação toast após sucesso

## [0.4.0] - 2025-05-18
### Corrigido
- Corrigido erro de renderização relacionado ao uso de componentes de formulário:
  - Substituídos componentes FormLabel por labels HTML padrão
  - O erro "Cannot destructure property 'getFieldState' of 'useFormContext(...)' as it is null" foi resolvido

## [0.3.0] - 2025-05-18
### Adicionado
- Implementação completa da funcionalidade de edição de produtos:
  - Adicionado diálogo de edição com formulário
  - Campos editáveis: nome, categoria, preço, estoque e status
  - Botão para salvar alterações
- Implementação da funcionalidade de visualização de produtos:
  - Adicionado diálogo para exibição detalhada das informações do produto

## [0.2.0] - 2025-05-18
### Corrigido
- Botões de ações na página de produtos agora funcionam corretamente:
  - Substituídos ícones SVG inline por componentes importados do lucide-react
  - Corrigido o funcionamento dos botões de editar, visualizar e excluir
  - Mantida a funcionalidade das notificações toast para cada ação

## [0.1.0] - 2025-05-18
### Adicionado
- Funcionalidade para os botões na página de produtos:
  - Botão "Novo Produto" agora exibe uma notificação de sucesso
  - Botões de edição agora permitem editar um produto e exibem uma notificação
  - Botões de visualização permitem ver os detalhes de um produto e exibem uma notificação
  - Botões de exclusão agora abrem um diálogo de confirmação antes de remover o produto
- Sistema de filtros funcional para produtos:
  - Filtrar por status (Todos, Ativos, Inativos, Sem estoque)
  - Pesquisa por nome ou categoria
- Diálogo de confirmação para exclusão de produtos
- Gerenciamento de estado para a lista de produtos
- Feedback visual através de notificações toast para ações do usuário

### Observações
- As funcionalidades de navegação para páginas de detalhes, edição e criação de produtos estão 
  comentadas no código, mas prontas para ser implementadas quando essas páginas forem criadas.
