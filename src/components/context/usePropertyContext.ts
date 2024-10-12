
import { useContext } from 'react';
import { PropertyContext, PropertyContextType } from './PropertyContext';



export const usePropertyContext = (): PropertyContextType => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('usePropertyContext must be used within a PropertyProvider');
  }
  return context;
};
