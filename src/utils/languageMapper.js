// Utility function to map fields to CodeMirror languages
export const getLanguageForField = (field) => {
  if (!field) return 'javascript'; // default to javascript
  
  // Normalize the field to lowercase for comparison
  const normalizedField = field.toLowerCase();
  
  // AI/ML fields
  if (normalizedField.includes('ai') || 
      normalizedField.includes('machine learning') || 
      normalizedField.includes('artificial intelligence') ||
      normalizedField.includes('data science') ||
      normalizedField.includes('neural network') ||
      normalizedField.includes('deep learning')) {
    return 'python';
  }
  
  // Web development fields
  if (normalizedField.includes('web') || 
      normalizedField.includes('frontend') || 
      normalizedField.includes('backend') ||
      normalizedField.includes('full-stack') ||
      normalizedField.includes('javascript') ||
      normalizedField.includes('react') ||
      normalizedField.includes('angular') ||
      normalizedField.includes('vue') ||
      normalizedField.includes('html') ||
      normalizedField.includes('css')) {
    return 'javascript';
  }
  
  // Mobile development fields
  if (normalizedField.includes('mobile') || 
      normalizedField.includes('android') || 
      normalizedField.includes('ios') ||
      normalizedField.includes('flutter') ||
      normalizedField.includes('react native')) {
    return 'javascript'; // or could be java/kotlin for native Android, swift for iOS
  }
  
  // Python fields
  if (normalizedField.includes('python') || 
      normalizedField.includes('django') || 
      normalizedField.includes('flask')) {
    return 'python';
  }
  
  // Java fields
  if (normalizedField.includes('java') || 
      normalizedField.includes('spring')) {
    return 'javascript'; // CodeMirror doesn't have great Java support, using JavaScript for now
  }
  
  // C++ fields
  if (normalizedField.includes('c++') || 
      normalizedField.includes('cpp')) {
    return 'javascript'; // CodeMirror doesn't have great C++ support, using JavaScript for now
  }
  
  // Default to JavaScript for coding fields
  if (normalizedField.includes('program') || 
      normalizedField.includes('code') || 
      normalizedField.includes('develop')) {
    return 'javascript';
  }
  
  // For non-coding fields, return null to hide the code playground
  return null;
};

// Utility function to determine if a field is coding-related
export const isCodingField = (field) => {
  if (!field) return true; // Default to showing code playground
  
  const normalizedField = field.toLowerCase();
  
  // Non-coding fields that should hide the code playground
  const nonCodingFields = [
    'ui/ux', 'ui/ux design', 'user interface', 'user experience',
    'design', 'graphic design', 'visual design',
    'project management', 'product management',
    'business', 'marketing', 'sales',
    'documentation', 'technical writing',
    'research', 'analysis'
  ];
  
  // Check if the field matches any non-coding field
  return !nonCodingFields.some(nonCodingField => 
    normalizedField.includes(nonCodingField)
  );
};