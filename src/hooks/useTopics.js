import { useContext } from 'react';
import { TopicsContext } from '../pages/Dashboard/AIMentorPage';

export const useTopics = () => {
  const context = useContext(TopicsContext);
  if (!context) {
    throw new Error('useTopics must be used within an AIMentorPage component');
  }
  return context;
};