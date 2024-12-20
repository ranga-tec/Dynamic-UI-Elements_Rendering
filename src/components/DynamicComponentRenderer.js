import React from 'react';
import { componentRegistry } from './registry/ComponentRegistry';

const DynamicComponentRenderer = ({ componentType, props }) => {
  // Get component from registry
  const Component = componentRegistry[componentType];
  
  if (!Component) {
    console.warn(`Component ${componentType} not found in registry`);
    return null;
  }

  // Render component with provided props
  return <Component {...props} />;
};

export default DynamicComponentRenderer;