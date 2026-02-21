'use client';

import React, { createContext, useContext, useReducer, useCallback, useMemo } from 'react';
import {
  ConfiguratorStep,
  ConfiguratorState,
  ProductConfiguration,
  WoodTemplate,
  ProductSize,
  ResinConfig,
  Personalization,
  ResinRatio,
  ResinTransparency,
  PriceBreakdown,
  EMPTY_PRICE_BREAKDOWN,
} from '@/types/configurator';
import { woodTemplates } from '@/data/templates';
import { defaultResinColor, getColorById } from '@/data/resin-colors';
import { calculateConfiguredPrice, isConfigurationComplete } from '@/lib/pricing';

// Action types
type ConfiguratorAction =
  | { type: 'SET_STEP'; payload: ConfiguratorStep }
  | { type: 'SELECT_TEMPLATE'; payload: WoodTemplate }
  | { type: 'SELECT_SIZE'; payload: ProductSize }
  | { type: 'SET_RESIN_RATIO'; payload: ResinRatio }
  | { type: 'SET_RESIN_COLOR'; payload: string }
  | { type: 'SET_RESIN_TRANSPARENCY'; payload: ResinTransparency }
  | { type: 'SET_PERSONALIZATION'; payload: Personalization | null }
  | { type: 'SET_CONFIRMED_VARIATION'; payload: boolean }
  | { type: 'RESET_CONFIGURATION' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

// Initial configuration
const initialConfiguration: ProductConfiguration = {
  template: null,
  selectedSize: null,
  resin: null,
  personalization: null,
  confirmedVariation: false,
};

// Initial state
const initialState: ConfiguratorState = {
  currentStep: 1,
  configuration: initialConfiguration,
  availableTemplates: woodTemplates,
  selectedTemplateId: null,
  selectedSizeId: null,
  calculatedPrice: 0,
  priceBreakdown: null,
  isComplete: false,
  isLoading: false,
  error: null,
};

// Reducer function
function configuratorReducer(state: ConfiguratorState, action: ConfiguratorAction): ConfiguratorState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.payload };

    case 'SELECT_TEMPLATE': {
      const template = action.payload;
      const defaultSize = template.sizes[0] || null;
      const newConfig: ProductConfiguration = {
        ...state.configuration,
        template,
        selectedSize: defaultSize,
        // Initialize resin with default values when selecting template
        resin: state.configuration.resin || {
          ratio: 'medium',
          color: defaultResinColor,
          transparency: 'translucent',
        },
      };
      const priceBreakdown = calculateConfiguredPrice(newConfig);
      return {
        ...state,
        configuration: newConfig,
        selectedTemplateId: template.id,
        selectedSizeId: defaultSize?.id || null,
        priceBreakdown,
        calculatedPrice: priceBreakdown.total,
        isComplete: isConfigurationComplete(newConfig),
      };
    }

    case 'SELECT_SIZE': {
      const newConfig: ProductConfiguration = {
        ...state.configuration,
        selectedSize: action.payload,
      };
      const priceBreakdown = calculateConfiguredPrice(newConfig);
      return {
        ...state,
        configuration: newConfig,
        selectedSizeId: action.payload.id,
        priceBreakdown,
        calculatedPrice: priceBreakdown.total,
        isComplete: isConfigurationComplete(newConfig),
      };
    }

    case 'SET_RESIN_RATIO': {
      const currentResin = state.configuration.resin || {
        ratio: 'medium',
        color: defaultResinColor,
        transparency: 'translucent',
      };
      const newResin: ResinConfig = {
        ...currentResin,
        ratio: action.payload,
      };
      const newConfig: ProductConfiguration = {
        ...state.configuration,
        resin: newResin,
      };
      const priceBreakdown = calculateConfiguredPrice(newConfig);
      return {
        ...state,
        configuration: newConfig,
        priceBreakdown,
        calculatedPrice: priceBreakdown.total,
        isComplete: isConfigurationComplete(newConfig),
      };
    }

    case 'SET_RESIN_COLOR': {
      const color = getColorById(action.payload);
      if (!color) return state;

      const currentResin = state.configuration.resin || {
        ratio: 'medium',
        color: defaultResinColor,
        transparency: 'translucent',
      };
      const newResin: ResinConfig = {
        ...currentResin,
        color,
      };
      const newConfig: ProductConfiguration = {
        ...state.configuration,
        resin: newResin,
      };
      const priceBreakdown = calculateConfiguredPrice(newConfig);
      return {
        ...state,
        configuration: newConfig,
        priceBreakdown,
        calculatedPrice: priceBreakdown.total,
        isComplete: isConfigurationComplete(newConfig),
      };
    }

    case 'SET_RESIN_TRANSPARENCY': {
      const currentResin = state.configuration.resin || {
        ratio: 'medium',
        color: defaultResinColor,
        transparency: 'translucent',
      };
      const newResin: ResinConfig = {
        ...currentResin,
        transparency: action.payload,
      };
      const newConfig: ProductConfiguration = {
        ...state.configuration,
        resin: newResin,
      };
      return {
        ...state,
        configuration: newConfig,
        isComplete: isConfigurationComplete(newConfig),
      };
    }

    case 'SET_PERSONALIZATION': {
      const newConfig: ProductConfiguration = {
        ...state.configuration,
        personalization: action.payload,
      };
      const priceBreakdown = calculateConfiguredPrice(newConfig);
      return {
        ...state,
        configuration: newConfig,
        priceBreakdown,
        calculatedPrice: priceBreakdown.total,
        isComplete: isConfigurationComplete(newConfig),
      };
    }

    case 'SET_CONFIRMED_VARIATION': {
      const newConfig: ProductConfiguration = {
        ...state.configuration,
        confirmedVariation: action.payload,
      };
      return {
        ...state,
        configuration: newConfig,
        isComplete: isConfigurationComplete(newConfig),
      };
    }

    case 'RESET_CONFIGURATION':
      return {
        ...initialState,
        availableTemplates: state.availableTemplates,
      };

    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };

    case 'SET_ERROR':
      return { ...state, error: action.payload };

    default:
      return state;
  }
}

// Context type
interface ConfiguratorContextType {
  state: ConfiguratorState;
  // Navigation
  setStep: (step: ConfiguratorStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  // Template & Size
  selectTemplate: (template: WoodTemplate) => void;
  selectSize: (size: ProductSize) => void;
  // Resin
  setResinRatio: (ratio: ResinRatio) => void;
  setResinColor: (colorId: string) => void;
  setResinTransparency: (transparency: ResinTransparency) => void;
  // Personalization
  setPersonalization: (personalization: Personalization | null) => void;
  // Confirmation
  setConfirmedVariation: (confirmed: boolean) => void;
  // Reset
  resetConfiguration: () => void;
  // Computed values
  canProceedToNext: boolean;
  canGoBack: boolean;
}

// Create context
const ConfiguratorContext = createContext<ConfiguratorContextType | undefined>(undefined);

// Provider component
export function ConfiguratorProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(configuratorReducer, initialState);

  // Navigation actions
  const setStep = useCallback((step: ConfiguratorStep) => {
    dispatch({ type: 'SET_STEP', payload: step });
  }, []);

  const nextStep = useCallback(() => {
    if (state.currentStep < 4) {
      dispatch({ type: 'SET_STEP', payload: (state.currentStep + 1) as ConfiguratorStep });
    }
  }, [state.currentStep]);

  const prevStep = useCallback(() => {
    if (state.currentStep > 1) {
      dispatch({ type: 'SET_STEP', payload: (state.currentStep - 1) as ConfiguratorStep });
    }
  }, [state.currentStep]);

  // Template & Size actions
  const selectTemplate = useCallback((template: WoodTemplate) => {
    dispatch({ type: 'SELECT_TEMPLATE', payload: template });
  }, []);

  const selectSize = useCallback((size: ProductSize) => {
    dispatch({ type: 'SELECT_SIZE', payload: size });
  }, []);

  // Resin actions
  const setResinRatio = useCallback((ratio: ResinRatio) => {
    dispatch({ type: 'SET_RESIN_RATIO', payload: ratio });
  }, []);

  const setResinColor = useCallback((colorId: string) => {
    dispatch({ type: 'SET_RESIN_COLOR', payload: colorId });
  }, []);

  const setResinTransparency = useCallback((transparency: ResinTransparency) => {
    dispatch({ type: 'SET_RESIN_TRANSPARENCY', payload: transparency });
  }, []);

  // Personalization action
  const setPersonalization = useCallback((personalization: Personalization | null) => {
    dispatch({ type: 'SET_PERSONALIZATION', payload: personalization });
  }, []);

  // Confirmation action
  const setConfirmedVariation = useCallback((confirmed: boolean) => {
    dispatch({ type: 'SET_CONFIRMED_VARIATION', payload: confirmed });
  }, []);

  // Reset action
  const resetConfiguration = useCallback(() => {
    dispatch({ type: 'RESET_CONFIGURATION' });
  }, []);

  // Computed values
  const canProceedToNext = useMemo(() => {
    switch (state.currentStep) {
      case 1:
        return state.configuration.template !== null && state.configuration.selectedSize !== null;
      case 2:
        return state.configuration.resin !== null;
      case 3:
        return state.configuration.resin?.color !== null;
      case 4:
        return true; // Personalization is optional
      default:
        return false;
    }
  }, [state.currentStep, state.configuration]);

  const canGoBack = state.currentStep > 1;

  const contextValue: ConfiguratorContextType = {
    state,
    setStep,
    nextStep,
    prevStep,
    selectTemplate,
    selectSize,
    setResinRatio,
    setResinColor,
    setResinTransparency,
    setPersonalization,
    setConfirmedVariation,
    resetConfiguration,
    canProceedToNext,
    canGoBack,
  };

  return (
    <ConfiguratorContext.Provider value={contextValue}>
      {children}
    </ConfiguratorContext.Provider>
  );
}

// Custom hook to use the configurator context
export function useConfigurator(): ConfiguratorContextType {
  const context = useContext(ConfiguratorContext);
  if (context === undefined) {
    throw new Error('useConfigurator must be used within a ConfiguratorProvider');
  }
  return context;
}

export default ConfiguratorContext;
