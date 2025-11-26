import { getLanguageForField, isCodingField } from './languageMapper';

describe('languageMapper', () => {
  describe('getLanguageForField', () => {
    it('should return python for AI/ML fields', () => {
      expect(getLanguageForField('Artificial Intelligence')).toBe('python');
      expect(getLanguageForField('Machine Learning')).toBe('python');
      expect(getLanguageForField('Data Science')).toBe('python');
    });

    it('should return javascript for web development fields', () => {
      expect(getLanguageForField('Web Development')).toBe('javascript');
      expect(getLanguageForField('Frontend')).toBe('javascript');
      expect(getLanguageForField('JavaScript')).toBe('javascript');
      expect(getLanguageForField('React')).toBe('javascript');
    });

    it('should return javascript for mobile development fields', () => {
      expect(getLanguageForField('Mobile App Development')).toBe('javascript');
      expect(getLanguageForField('Android')).toBe('javascript');
      expect(getLanguageForField('iOS')).toBe('javascript');
    });

    it('should return python for Python fields', () => {
      expect(getLanguageForField('Python')).toBe('python');
      expect(getLanguageForField('Django')).toBe('python');
    });

    it('should return javascript for general programming fields', () => {
      expect(getLanguageForField('Programming')).toBe('javascript');
      expect(getLanguageForField('Coding')).toBe('javascript');
    });

    it('should return null for non-coding fields', () => {
      expect(getLanguageForField('UI/UX Design')).toBeNull();
      expect(getLanguageForField('Graphic Design')).toBeNull();
      expect(getLanguageForField('Project Management')).toBeNull();
    });

    it('should return javascript as default for unknown fields', () => {
      expect(getLanguageForField('')).toBe('javascript');
      expect(getLanguageForField(null)).toBe('javascript');
    });
  });

  describe('isCodingField', () => {
    it('should return true for coding fields', () => {
      expect(isCodingField('Web Development')).toBe(true);
      expect(isCodingField('Programming')).toBe(true);
      expect(isCodingField('Python')).toBe(true);
    });

    it('should return false for non-coding fields', () => {
      expect(isCodingField('UI/UX Design')).toBe(false);
      expect(isCodingField('Project Management')).toBe(false);
      expect(isCodingField('Graphic Design')).toBe(false);
    });

    it('should return true as default for unknown fields', () => {
      expect(isCodingField('')).toBe(true);
      expect(isCodingField(null)).toBe(true);
    });
  });
});