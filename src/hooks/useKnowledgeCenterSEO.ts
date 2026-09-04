import { useEffect, useMemo } from 'react';
import { Language } from '../types';
import { getKnowledgeCenterHubSEO, applyDocumentSEO, GeneratedSEO } from '../utils/seo';

export function useKnowledgeCenterSEO(
  language: Language, 
  totalArticlesCount: number, 
  enabled: boolean = true
): GeneratedSEO | null {
  const seo = useMemo(() => {
    if (!enabled) return null;
    return getKnowledgeCenterHubSEO(language, totalArticlesCount);
  }, [language, totalArticlesCount, enabled]);

  useEffect(() => {
    if (!enabled || !seo) return;
    const cleanup = applyDocumentSEO(seo);
    return cleanup;
  }, [seo, enabled]);

  return seo;
}
