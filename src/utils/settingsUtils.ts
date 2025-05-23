
// Utilitários para gerenciamento e persistência das configurações do sistema

// Tipo para as configurações gerais
export interface GeneralSettingsType {
  restaurantId: string;
  restaurantName: string;
  address: string;
  city: string;
  phone: string;
  cnpj: string;
  automaticBackup: boolean;
  notificationSound: boolean;
}

// Tipo para as configurações de aparência
export interface AppearanceSettingsType {
  theme: "light" | "dark" | "system";
  fontSize: "small" | "medium" | "large";
  animationsEnabled: boolean;
  colorScheme: string;
  fontFamily: "system" | "sans" | "serif" | "mono";
  sidebarPosition: "left" | "right";
  compactMode: boolean;
  preferredColorScheme: "purple" | "blue" | "green";
  sidebarSize: number[];
}

// Tipo para as configurações de impressão
export interface PrinterSettingsType {
  printerName: string;
  printerIP: string;
  printerPort: string;
  connectionType: "network" | "usb" | "windows";
  autoPrint: boolean;
  printCopies: string;
  paperSize: string;
  fontSize: string;
  fontFamily: string;
  showLogo: boolean;
  footerText: string;
  printItems: boolean;
  printPrices: boolean;
  printQRCode: boolean;
}

// Tipo para as configurações de integração
export interface IntegrationSettingsType {
  enableIfood: boolean;
  ifoodToken: string;
  enablePaymentGateway: boolean;
  paymentGatewayKey: string;
  enableWhatsapp: boolean;
  whatsappNumber: string;
  enableMercadoLivre: boolean;
  mercadoLivreKey: string;
  enableApiAccess: boolean;
  apiKey: string;
}

// Tipo para configuração de tenant
export interface TenantType {
  id: string;
  name: string;
  plan: "free" | "basic" | "premium";
  active: boolean;
  createdAt: string;
}

// Valores padrão para configurações gerais
export const defaultGeneralSettings: GeneralSettingsType = {
  restaurantId: "",
  restaurantName: "Restaurante Demo",
  address: "Av. Principal, 1000",
  city: "São Paulo",
  phone: "(11) 3000-0000",
  cnpj: "00.000.000/0001-00",
  automaticBackup: true,
  notificationSound: true
};

// Valores padrão para configurações de aparência
export const defaultAppearanceSettings: AppearanceSettingsType = {
  theme: "light",
  fontSize: "medium",
  animationsEnabled: true,
  colorScheme: "default",
  fontFamily: "system",
  sidebarPosition: "left",
  compactMode: false,
  preferredColorScheme: "purple",
  sidebarSize: [25],
};

// Valores padrão para configurações de impressão
export const defaultPrinterSettings: PrinterSettingsType = {
  printerName: "EPSON TM-T20",
  printerIP: "192.168.1.100",
  printerPort: "9100",
  connectionType: "windows",
  autoPrint: true,
  printCopies: "1",
  paperSize: "80mm",
  fontSize: "normal",
  fontFamily: "courier",
  showLogo: true,
  footerText: "Obrigado pela preferência! Volte sempre!",
  printItems: true,
  printPrices: true,
  printQRCode: false,
};

// Valores padrão para configurações de integração
export const defaultIntegrationSettings: IntegrationSettingsType = {
  enableIfood: false,
  ifoodToken: "",
  enablePaymentGateway: false,
  paymentGatewayKey: "",
  enableWhatsapp: false,
  whatsappNumber: "",
  enableMercadoLivre: false,
  mercadoLivreKey: "",
  enableApiAccess: false,
  apiKey: "sk_test_api_key_123456789",
};

// Valores padrão para tenant
export const defaultTenant: TenantType = {
  id: "default",
  name: "Restaurante Demo",
  plan: "free",
  active: true,
  createdAt: new Date().toISOString()
};

// Função para obter o ID do restaurante atual
export function getCurrentRestaurantId(): string {
  try {
    const tenantInfo = localStorage.getItem('currentTenant');
    if (tenantInfo) {
      const tenant: TenantType = JSON.parse(tenantInfo);
      return tenant.id;
    }
  } catch (error) {
    console.error('Erro ao carregar informações do tenant:', error);
  }
  return defaultTenant.id;
}

// Função para definir o restaurante atual
export function setCurrentRestaurant(tenant: TenantType): void {
  try {
    localStorage.setItem('currentTenant', JSON.stringify(tenant));
    
    // Inicializar configurações para o novo tenant se não existirem
    const generalSettings = loadGeneralSettings();
    if (generalSettings.restaurantId !== tenant.id) {
      const newGeneralSettings = {...defaultGeneralSettings, restaurantId: tenant.id, restaurantName: tenant.name};
      saveGeneralSettings(newGeneralSettings);
    }
  } catch (error) {
    console.error('Erro ao salvar informações do tenant:', error);
  }
}

// Função para carregar as configurações gerais do localStorage
export function loadGeneralSettings(): GeneralSettingsType {
  try {
    const restaurantId = getCurrentRestaurantId();
    const key = `generalSettings_${restaurantId}`;
    const storedSettings = localStorage.getItem(key);
    if (storedSettings) {
      return JSON.parse(storedSettings);
    }
  } catch (error) {
    console.error('Erro ao carregar configurações gerais:', error);
  }
  const defaultSettings = {...defaultGeneralSettings, restaurantId: getCurrentRestaurantId()};
  return defaultSettings;
}

// Função para salvar as configurações gerais no localStorage
export function saveGeneralSettings(settings: GeneralSettingsType): void {
  try {
    const restaurantId = getCurrentRestaurantId();
    const key = `generalSettings_${restaurantId}`;
    localStorage.setItem(key, JSON.stringify({...settings, restaurantId}));
  } catch (error) {
    console.error('Erro ao salvar configurações gerais:', error);
  }
}

// Função para carregar as configurações de aparência do localStorage
export function loadAppearanceSettings(): AppearanceSettingsType {
  try {
    const restaurantId = getCurrentRestaurantId();
    const key = `appearanceSettings_${restaurantId}`;
    const storedSettings = localStorage.getItem(key);
    if (storedSettings) {
      return JSON.parse(storedSettings);
    }
  } catch (error) {
    console.error('Erro ao carregar configurações de aparência:', error);
  }
  return defaultAppearanceSettings;
}

// Função para salvar as configurações de aparência no localStorage
export function saveAppearanceSettings(settings: AppearanceSettingsType): void {
  try {
    const restaurantId = getCurrentRestaurantId();
    const key = `appearanceSettings_${restaurantId}`;
    localStorage.setItem(key, JSON.stringify(settings));
  } catch (error) {
    console.error('Erro ao salvar configurações de aparência:', error);
  }
}

// Função para carregar as configurações de impressão do localStorage
export function loadPrinterSettings(): PrinterSettingsType {
  try {
    const restaurantId = getCurrentRestaurantId();
    const key = `printerSettings_${restaurantId}`;
    const storedSettings = localStorage.getItem(key);
    if (storedSettings) {
      return JSON.parse(storedSettings);
    }
  } catch (error) {
    console.error('Erro ao carregar configurações de impressão:', error);
  }
  return defaultPrinterSettings;
}

// Função para salvar as configurações de impressão no localStorage
export function savePrinterSettings(settings: PrinterSettingsType): void {
  try {
    const restaurantId = getCurrentRestaurantId();
    const key = `printerSettings_${restaurantId}`;
    localStorage.setItem(key, JSON.stringify(settings));
  } catch (error) {
    console.error('Erro ao salvar configurações de impressão:', error);
  }
}

// Função para carregar as configurações de integração do localStorage
export function loadIntegrationSettings(): IntegrationSettingsType {
  try {
    const restaurantId = getCurrentRestaurantId();
    const key = `integrationSettings_${restaurantId}`;
    const storedSettings = localStorage.getItem(key);
    if (storedSettings) {
      return JSON.parse(storedSettings);
    }
  } catch (error) {
    console.error('Erro ao carregar configurações de integração:', error);
  }
  return defaultIntegrationSettings;
}

// Função para salvar as configurações de integração no localStorage
export function saveIntegrationSettings(settings: IntegrationSettingsType): void {
  try {
    const restaurantId = getCurrentRestaurantId();
    const key = `integrationSettings_${restaurantId}`;
    localStorage.setItem(key, JSON.stringify(settings));
  } catch (error) {
    console.error('Erro ao salvar configurações de integração:', error);
  }
}

// Função para carregar a lista de restaurantes
export function loadRestaurants(): TenantType[] {
  try {
    const storedRestaurants = localStorage.getItem('restaurants');
    if (storedRestaurants) {
      return JSON.parse(storedRestaurants);
    }
  } catch (error) {
    console.error('Erro ao carregar lista de restaurantes:', error);
  }
  // Se não existir, cria com o restaurante padrão
  const defaultRestaurants = [defaultTenant];
  localStorage.setItem('restaurants', JSON.stringify(defaultRestaurants));
  return defaultRestaurants;
}

// Função para salvar a lista de restaurantes
export function saveRestaurants(restaurants: TenantType[]): void {
  try {
    localStorage.setItem('restaurants', JSON.stringify(restaurants));
  } catch (error) {
    console.error('Erro ao salvar lista de restaurantes:', error);
  }
}

// Função para adicionar um novo restaurante
export function addRestaurant(name: string, plan: TenantType['plan'] = 'free'): TenantType {
  const restaurants = loadRestaurants();
  const newId = `restaurant_${Date.now()}`;
  
  const newRestaurant: TenantType = {
    id: newId,
    name,
    plan,
    active: true,
    createdAt: new Date().toISOString()
  };
  
  restaurants.push(newRestaurant);
  saveRestaurants(restaurants);
  
  // Inicializar configurações para o novo restaurante
  const newGeneralSettings = {...defaultGeneralSettings, restaurantId: newId, restaurantName: name};
  const currentRestaurantId = getCurrentRestaurantId();
  
  // Temporariamente mudar para o novo restaurante para salvar as configurações iniciais
  setCurrentRestaurant(newRestaurant);
  saveGeneralSettings(newGeneralSettings);
  
  // Restaurar o restaurante anterior
  const currentRestaurant = restaurants.find(r => r.id === currentRestaurantId);
  if (currentRestaurant) {
    setCurrentRestaurant(currentRestaurant);
  }
  
  return newRestaurant;
}

// Função para aplicar as configurações de aparência
export function applyAppearanceSettings(settings: AppearanceSettingsType): void {
  // Aplicar tema
  if (settings.theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else if (settings.theme === 'light') {
    document.documentElement.classList.remove('dark');
  } else if (settings.theme === 'system') {
    // Detectar preferência do sistema
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  // Aplicar tamanho da fonte
  document.documentElement.dataset.fontSize = settings.fontSize;

  // Aplicar família de fonte
  document.documentElement.dataset.fontFamily = settings.fontFamily;

  // Aplicar modo compacto
  if (settings.compactMode) {
    document.documentElement.classList.add('compact-mode');
  } else {
    document.documentElement.classList.remove('compact-mode');
  }
}

// Inicializar o sistema com o restaurante padrão se não houver configuração
export function initializeSystem(): TenantType {
  let restaurants = loadRestaurants();
  
  // Se não houver restaurantes, criar o padrão
  if (restaurants.length === 0) {
    restaurants = [defaultTenant];
    saveRestaurants(restaurants);
  }
  
  // Verificar se há um restaurante atual selecionado
  const currentTenant = localStorage.getItem('currentTenant');
  
  if (!currentTenant) {
    // Se não, selecionar o primeiro
    setCurrentRestaurant(restaurants[0]);
    return restaurants[0];
  } else {
    // Se sim, retornar o atual
    return JSON.parse(currentTenant);
  }
}
