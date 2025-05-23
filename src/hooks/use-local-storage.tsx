
import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Função para obter valor inicial do localStorage ou usar initialValue
  const readValue = (): T => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Erro ao ler ${key} do localStorage:`, error);
      return initialValue;
    }
  };

  // Estado para armazenar o valor atual
  const [storedValue, setStoredValue] = useState<T>(readValue);

  // Função para atualizar o valor no localStorage e no estado
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Permitir que o valor seja uma função como em useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Salvar no estado
      setStoredValue(valueToStore);
      
      // Salvar no localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        
        // Disparar evento para outros componentes que usam o mesmo localStorage
        const event = new Event('local-storage');
        window.dispatchEvent(event);
      }
    } catch (error) {
      console.warn(`Erro ao salvar ${key} no localStorage:`, error);
    }
  };

  // Ouvir mudanças em outros componentes que podem usar o mesmo localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setStoredValue(readValue());
    };
    
    // Adicionar ouvinte para mudanças no localStorage
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('local-storage', handleStorageChange);
    
    // Limpar ouvintes ao desmontar
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('local-storage', handleStorageChange);
    };
  }, []);

  return [storedValue, setValue] as const;
}
