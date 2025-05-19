
# Documentação do Sistema de Estoque

O FoodPOS inclui um sistema completo de gerenciamento de estoque que permite controlar seus insumos, ingredientes e outros itens necessários para o funcionamento do estabelecimento.

## Características Principais

### Gerenciamento de Itens

- **Cadastro de Itens**: Adicione novos itens com informações detalhadas como nome, categoria, quantidade, unidade de medida e preço de compra.
- **Edição de Itens**: Atualize qualquer informação dos itens já cadastrados.
- **Visualização de Detalhes**: Veja informações detalhadas sobre cada item, incluindo valor em estoque e última atualização.
- **Exclusão de Itens**: Remova itens que não são mais necessários.

### Controle de Estoque

- **Atualização de Quantidades**: Adicione ou remova quantidades dos itens em estoque.
- **Alertas de Estoque Baixo**: O sistema mostra alertas visuais para itens com estoque abaixo do mínimo configurado.
- **Filtros e Busca**: Encontre facilmente itens por nome ou categoria.
- **Visualização por Status**: Identifique rapidamente o status de cada item (Ok, Baixo, Crítico, Esgotado).

### Informações e Relatórios

- **Estatísticas Gerais**: Visualize o número total de itens, categorias, itens com estoque baixo e valor total do estoque.
- **Valor de Estoque**: Cálculo automático do valor de cada item e do estoque total com base no preço de compra.
- **Rastreamento de Atualizações**: Registro da última data de atualização de cada item.

## Como Usar

### 1. Acessando o Sistema de Estoque

A página de estoque pode ser acessada pelo menu lateral do FoodPOS clicando em "Estoque".

### 2. Adicionando Novos Itens

1. Clique no botão "Adicionar Item".
2. Preencha os campos necessários:
   - Nome do item
   - Categoria
   - Quantidade
   - Unidade de medida
   - Estoque mínimo (para alertas)
   - Preço de compra (opcional)
3. Clique em "Adicionar Item" para salvar.

### 3. Gerenciando o Estoque

#### Atualização de Quantidades

1. Nos botões de ação de cada item, clique no ícone "+" para adicionar ou "-" para remover.
2. Informe a quantidade a ser adicionada ou removida.
3. Confirme a operação.

#### Editando Informações

1. Clique no ícone de edição (lápis) ao lado do item desejado.
2. Atualize as informações necessárias.
3. Clique em "Salvar Alterações".

#### Visualizando Detalhes

1. Clique no ícone do olho para ver detalhes completos do item.
2. Observe informações como valor total em estoque e data da última atualização.

#### Excluindo Itens

1. Clique no ícone de lixeira ao lado do item que deseja excluir.
2. Confirme a exclusão no diálogo de confirmação.

### 4. Filtrando e Pesquisando

- Use a caixa de busca para encontrar itens pelo nome ou categoria.
- Use o botão "Filtrar" para exibir as categorias disponíveis e filtrar por uma categoria específica.

## Boas Práticas

1. **Mantenha o Estoque Atualizado**: Atualize o estoque sempre que receber novas mercadorias ou consumir itens.
2. **Configure os Mínimos Adequados**: Defina níveis de estoque mínimo realistas para cada item para evitar faltas.
3. **Faça Inventários Periódicos**: Compare regularmente o estoque físico com o estoque no sistema para garantir precisão.
4. **Observe os Alertas**: Preste atenção aos itens marcados como "Crítico" ou "Baixo" e planeje reposições.
5. **Categorize Corretamente**: Uma boa organização por categorias facilita a gestão e a localização de itens.

## Dicas

- Os itens com estoque abaixo do mínimo são destacados em amarelo (baixo) ou laranja (crítico).
- Itens com estoque zero são marcados como "Esgotado" em vermelho.
- O valor total do estoque é calculado multiplicando a quantidade pelo preço de compra de cada item.
- Você pode adicionar novas categorias ao sistema conforme necessário.
