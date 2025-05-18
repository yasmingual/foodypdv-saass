
# Documentação do Sistema PDV

## Módulo de Caixa (Cashier)

### Visão Geral
O módulo de Caixa permite o gerenciamento completo do fluxo financeiro do estabelecimento. Através dele, é possível abrir o caixa, registrar transações, acompanhar o resumo de vendas e formas de pagamento, além de visualizar relatórios e turnos.

### Funcionalidades Implementadas

#### 1. Abertura de Caixa
- Botão "Abrir Caixa" que exibe um diálogo para iniciar as operações financeiras
- Campo para informar o valor inicial em caixa (com validação de entrada)
- Campo para identificação do operador responsável
- Feedback visual através de notificação toast após confirmação
- Botão muda para "Caixa Aberto" após confirmação e fica desabilitado

#### 2. Dashboard Financeiro
- Cards com informações resumidas:
  - Total de vendas do dia (valor e quantidade de transações)
  - Total de vendas em dinheiro (valor e quantidade de transações)
  - Total de vendas em cartão (valor e quantidade de transações)
  - Total de vendas em Pix (valor e quantidade de transações)

#### 3. Abas de Gerenciamento
- **Resumo**: exibe informações consolidadas das vendas
  - Resumo financeiro (total bruto, descontos, taxa de serviço, total líquido)
  - Gráfico de distribuição das formas de pagamento

- **Transações**: exibe todas as transações realizadas em uma tabela
  - Informações como ID, número do pedido, horário, tipo de pagamento, valor e status
  - Badges para indicar status da transação (concluída ou pendente)
  - Botões de ação para visualizar detalhes ou baixar comprovante

- **Relatórios**: área preparada para futura implementação de relatórios financeiros

- **Turnos**: área preparada para futura implementação de gestão de turnos

### Como Usar
1. **Abrir o Caixa**: Clique no botão "Abrir Caixa" no canto superior direito
   - Informe o valor inicial em caixa (apenas números e vírgula são aceitos)
   - O campo de operador já vem preenchido por padrão com "Administrador"
   - Clique em "Confirmar Abertura" para iniciar as operações

2. **Visualizar Resumo Financeiro**: Acesse a aba "Resumo" para ver:
   - Total bruto de vendas
   - Valores de descontos aplicados
   - Valor da taxa de serviço (10%)
   - Total líquido
   - Distribuição percentual das formas de pagamento com representação visual

3. **Consultar Transações**: Acesse a aba "Transações" para visualizar:
   - Lista completa de transações realizadas
   - Filtrar e ordenar transações (funcionalidade a ser implementada)
   - Acessar detalhes de uma transação específica através do botão de visualização
   - Baixar comprovante de transação através do botão de download

### Próximas Implementações Previstas
- Fechamento de caixa com balanço e relatório
- Sangria (retirada de valores do caixa)
- Suprimento (adição de valores ao caixa)
- Conciliação de valores físicos e sistema
- Relatórios financeiros detalhados por período
- Gestão de turnos com abertura e fechamento

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
- **Adicionar Produto**: abre um diálogo com formulário para criar um novo produto
- **Editar Produto**: abre um diálogo de edição com formulário completo para modificação dos dados
- **Visualizar Produto**: abre um diálogo com todos os detalhes do produto
- **Excluir Produto**: remove um produto após confirmação em diálogo

#### 4. Diálogos de Gerenciamento
- **Diálogo de Adição**:
  - Permite informar nome, categoria (selecionável da lista), preço, estoque e status
  - Exibe apenas categorias ativas no menu suspenso
  - Botões para cancelar ou salvar o novo produto
  - Exibe feedback em notificação toast após salvar
  
- **Diálogo de Edição**:
  - Permite editar nome, categoria (selecionável da lista), preço, estoque e status
  - Exibe apenas categorias ativas no menu suspenso
  - Botões para cancelar ou salvar as alterações
  - Exibe feedback em notificação toast após salvar
  
- **Diálogo de Visualização**:
  - Exibe todos os detalhes do produto selecionado
  - Formatação visual adequada para melhor leitura dos dados
  
- **Diálogo de Exclusão**:
  - Pede confirmação antes de remover o produto
  - Exibe mensagem de alerta sobre a ação ser irreversível

#### 5. Feedback Visual
- Notificações toast para confirmar ações realizadas
- Diálogo de confirmação para ações destrutivas (exclusão)
- Indicadores visuais para status de produtos e níveis de estoque
- Badges coloridas para indicar status (ativo/inativo)

### Como Usar
1. **Adicionar Produto**: Clique no botão "Novo Produto" no canto superior direito e preencha o formulário
   - Selecione uma categoria da lista suspensa de categorias ativas
   - Preencha os demais campos obrigatórios
   - Clique em Salvar
2. **Buscar Produto**: Digite o nome ou categoria no campo de busca
3. **Filtrar Produtos**: Use o dropdown "Filtrar por" para selecionar o status desejado
4. **Editar Produto**: Clique no ícone de lápis na linha do produto desejado e faça as alterações no diálogo que se abre
   - Você pode alterar a categoria selecionando uma nova opção na lista suspensa
5. **Visualizar Detalhes**: Clique no ícone de olho na linha do produto desejado para ver todos os detalhes
6. **Excluir Produto**: Clique no ícone de lixeira e confirme no diálogo exibido

### Integração com Categorias
- Os formulários de adicionar e editar produtos exibem automaticamente as categorias disponíveis e ativas
- Apenas categorias marcadas como ativas são exibidas nos menus suspensos
- A seleção de categoria é fácil e evita erros de digitação

### Correções Implementadas
- Substituição dos ícones SVG inline por componentes importados do lucide-react
- Substituição de componentes FormLabel por labels HTML padrão para resolver erros de contexto de formulário
- Correção do funcionamento dos diálogos de edição e visualização de produtos
- Melhoria na visualização dos ícones para maior clareza de uso
- Implementação completa do botão "Novo Produto" com diálogo para adicionar produtos

### Próximos Passos para Implementação
- Criar página de detalhes do produto
- Implementar formulário de criação/edição de produtos em páginas separadas
- Adicionar upload de imagens para produtos
- Conectar com API backend/Supabase para persistência de dados
- Implementar controle de permissões por usuário
- Refatorar o arquivo Products.tsx em componentes menores para melhorar a manutenibilidade
