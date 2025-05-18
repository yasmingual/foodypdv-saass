
# Changelog

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
