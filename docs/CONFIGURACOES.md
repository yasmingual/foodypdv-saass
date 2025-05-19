
# Documentação de Configurações do Sistema

## Visão Geral

Este documento detalha todas as opções de configuração disponíveis no sistema FoodPOS, organizadas por categorias.

## Configurações Gerais

### Informações do Estabelecimento
- **Nome do Estabelecimento**: Nome que aparecerá nos cupons e relatórios
- **Endereço**: Endereço físico do estabelecimento
- **Cidade**: Cidade onde o estabelecimento está localizado
- **Telefone**: Telefone de contato principal
- **CNPJ**: Número de documento do estabelecimento

### Notificações
- **Som de Notificação**: Ativar/desativar sons para novos pedidos e alertas
- **Backup Automático**: Realizar backup dos dados automaticamente

## Configurações de Impressão

### Configuração da Impressora
- **Nome da Impressora**: Identificador da impressora no sistema
- **Endereço IP**: Endereço IP da impressora de rede
- **Porta**: Porta de comunicação (padrão 9100)
- **Tamanho do Papel**: Largura do papel térmico (58mm ou 80mm)
- **Impressão Automática**: Ativar impressão automática ao finalizar pedidos
- **Número de Cópias**: Quantidade de cópias para cada impressão

### Layout do Cupom
- **Mostrar Logo**: Exibir logotipo do estabelecimento nos cupons
- **Tamanho da Fonte**: Configuração do tamanho das letras (pequena, normal, grande)
- **Texto do Rodapé**: Mensagem personalizada que aparece no rodapé do cupom
- **Imprimir Itens**: Mostrar lista detalhada de itens no cupom
- **Imprimir Preços**: Mostrar preços individuais dos itens
- **Imprimir QR Code**: Incluir QR Code para avaliação do cliente

## Configurações de Aparência

### Tema e Cor
- **Tema**: Escolher entre tema claro, escuro ou seguir configuração do sistema
- **Esquema de Cores**: Opções de cores principais (Roxo, Azul, Verde)
- **Animações**: Habilitar/desabilitar animações da interface

### Layout
- **Posição da Barra Lateral**: Posicionar a barra lateral à esquerda ou à direita
- **Largura da Barra Lateral**: Ajustar a largura da barra lateral (%)
- **Modo Compacto**: Reduzir espaçamento entre elementos para maximizar área útil
- **Tamanho da Fonte**: Configurar tamanho global da fonte (pequeno, médio, grande)
- **Fonte**: Escolher família de fonte (Padrão do Sistema, Sans-serif, Serif, Mono)

## Integrações

### Integrações de Delivery
- **iFood**: Integração com a plataforma iFood
- **Token de Acesso iFood**: Credencial para autenticação com a API

### Gateway de Pagamento
- **Gateway de Pagamento**: Ativar integração com gateway para pagamentos online
- **Chave da API**: Credencial para autenticação com o gateway

### Outras Integrações
- **WhatsApp**: Enviar notificações via WhatsApp
- **Número do WhatsApp**: Número que receberá as notificações
- **Mercado Livre**: Integração para gerenciamento de estoque

### API do Sistema
- **Acesso à API**: Permitir acesso externo à API do sistema
- **Chave da API**: Credencial para autenticar requisições externas

## Backup e Restauração

### Backup Automático
- **Backup Automático**: Ativar/desativar backups periódicos
- **Frequência**: Intervalo entre backups (horário, diário, semanal, mensal)
- **Horário**: Hora do dia para realizar o backup
- **Manter Backups**: Por quanto tempo armazenar backups antigos

### Armazenamento de Backup
- **Local de Armazenamento**: Onde os backups serão armazenados (local, nuvem, ambos)
- **Provedor de Nuvem**: Serviço de nuvem para armazenamento (AWS, Google Cloud, Azure, Dropbox)
- **Credenciais de Nuvem**: Informações de autenticação para o provedor escolhido

### Opções Avançadas
- **Banco de Dados**: Incluir banco de dados no backup
- **Arquivos de Upload**: Incluir arquivos enviados pelos usuários
- **Configurações**: Incluir configurações do sistema
- **Criptografar Backups**: Adicionar camada de segurança aos arquivos
- **Nível de Compressão**: Balanço entre tamanho do arquivo e tempo de processamento

### Backup Manual e Restauração
- **Backup Manual**: Criar um backup completo do sistema imediatamente
- **Restauração**: Recuperar o sistema a partir de um backup anterior

## Changelog de Implementação

### Versão 1.0.0 (19/05/2025)
- Implementação inicial do painel de configurações
- Adicionadas todas as seções principais (Geral, Impressão, Aparência, Integrações, Backup)
- Implementação de formulários com validação para todas as configurações
- Adicionada visualização de prévia para configurações de impressão
- Implementadas funcionalidades de backup manual e restauração
