
# Documentação do Sistema PDV

## Módulo de Produtos

### Visão Geral
O módulo de produtos permite o gerenciamento completo do catálogo de produtos do estabelecimento. Através dele, é possível visualizar, adicionar, editar e remover produtos, além de filtrar e pesquisar por itens específicos.

### Funcionalidades Implementadas

#### 1. Listagem de Produtos
- Exibe todos os produtos cadastrados em uma tabela organizada
- Mostra informações como ID, nome, categoria, preço, estoque e status
- Destaque visual para produtos sem estoque (vermelho) ou com estoque baixo (laranja)
- Badges para indicar categorias e status do produto

#### 2. Filtragem e Pesquisa
- Campo de busca para encontrar produtos por nome ou categoria
- Filtros por status:
  - Todos: exibe todos os produtos
  - Ativos: exibe apenas produtos ativos
  - Inativos: exibe apenas produtos inativos
  - Sem estoque: exibe produtos com estoque zero

#### 3. Ações de Gerenciamento
- **Adicionar Produto**: permite criar um novo produto (mostra notificação demonstrativa)
- **Editar Produto**: permite modificar um produto existente (mostra notificação demonstrativa)
- **Visualizar Produto**: permite ver detalhes de um produto (mostra notificação demonstrativa)
- **Excluir Produto**: remove um produto após confirmação em diálogo

#### 4. Feedback Visual
- Notificações toast para confirmar ações realizadas
- Diálogo de confirmação para ações destrutivas (exclusão)
- Indicadores visuais para status de produtos e níveis de estoque
- Badges coloridas para indicar status (ativo/inativo)

### Como Usar
1. **Adicionar Produto**: Clique no botão "Novo Produto" no canto superior direito
2. **Buscar Produto**: Digite o nome ou categoria no campo de busca
3. **Filtrar Produtos**: Use o dropdown "Filtrar por" para selecionar o status desejado
4. **Editar Produto**: Clique no ícone de lápis na linha do produto desejado
5. **Visualizar Detalhes**: Clique no ícone de lupa na linha do produto desejado
6. **Excluir Produto**: Clique no ícone de lixeira e confirme no diálogo exibido

### Correções Implementadas
- Substituição dos ícones SVG inline por componentes importados do lucide-react
- Correção do funcionamento dos botões de editar, visualizar e excluir
- Melhoria na visualização dos ícones para maior clareza de uso

### Próximos Passos para Implementação
- Criar página de detalhes do produto
- Implementar formulário de criação/edição de produtos
- Adicionar upload de imagens para produtos
- Conectar com API backend/Supabase para persistência de dados
- Implementar controle de permissões por usuário
