import { useEffect, useMemo } from 'react';
import { Article, Category, Language, SiteSettings } from '../types';
import { generateArticleSEO, applyDocumentSEO, GeneratedSEO } from '../utils/seo';

export function useArticleSEO(
  article: Article | null | undefined,
  language: Language,
  siteSettings: SiteSettings,
  category?: Category
): GeneratedSEO | null {
  const seo = useMemo(() => {
    if (!article) return null;
    return generateArticleSEO(article, language, siteSettings, category);
  }, [article, language, siteSettings, category]);

  useEffect(() => {
    if (!seo) return;
    const cleanup = applyDocumentSEO(seo);
    return cleanup;
  }, [seo]);

  return seo;
}
