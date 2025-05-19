
// Utilitários para gerenciamento e persistência das configurações do sistema

// Tipo para as configurações gerais
export interface GeneralSettingsType {
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

// Valores padrão para configurações gerais
export const defaultGeneralSettings: GeneralSettingsType = {
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

// Função para carregar as configurações gerais do localStorage
export function loadGeneralSettings(): GeneralSettingsType {
  try {
    const storedSettings = localStorage.getItem('generalSettings');
    if (storedSettings) {
      return JSON.parse(storedSettings);
    }
  } catch (error) {
    console.error('Erro ao carregar configurações gerais:', error);
  }
  return defaultGeneralSettings;
}

// Função para salvar as configurações gerais no localStorage
export function saveGeneralSettings(settings: GeneralSettingsType): void {
  try {
    localStorage.setItem('generalSettings', JSON.stringify(settings));
  } catch (error) {
    console.error('Erro ao salvar configurações gerais:', error);
  }
}

// Função para carregar as configurações de aparência do localStorage
export function loadAppearanceSettings(): AppearanceSettingsType {
  try {
    const storedSettings = localStorage.getItem('appearanceSettings');
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
    localStorage.setItem('appearanceSettings', JSON.stringify(settings));
  } catch (error) {
    console.error('Erro ao salvar configurações de aparência:', error);
  }
}

// Função para carregar as configurações de impressão do localStorage
export function loadPrinterSettings(): PrinterSettingsType {
  try {
    const storedSettings = localStorage.getItem('printerSettings');
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
    localStorage.setItem('printerSettings', JSON.stringify(settings));
  } catch (error) {
    console.error('Erro ao salvar configurações de impressão:', error);
  }
}

// Função para carregar as configurações de integração do localStorage
export function loadIntegrationSettings(): IntegrationSettingsType {
  try {
    const storedSettings = localStorage.getItem('integrationSettings');
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
    localStorage.setItem('integrationSettings', JSON.stringify(settings));
  } catch (error) {
    console.error('Erro ao salvar configurações de integração:', error);
  }
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
