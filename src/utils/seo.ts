import { Article, Category, Language, SiteSettings } from '../types';

export interface GeneratedSEO {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogType: string;
  ogImage: string;
  publishedTime: string;
  modifiedTime: string;
  author: string;
  section: string;
  tags: string[];
  schemaJsonLd: object;
}

/**
 * Truncates text cleanly at a word boundary within a maximum character limit
 */
export function truncateAtWordBoundary(text: string, maxLength: number = 155): string {
  const cleaned = text.replace(/\s+/g, ' ').trim();
  if (cleaned.length <= maxLength) return cleaned;
  
  const sub = cleaned.substring(0, maxLength);
  const lastSpace = sub.lastIndexOf(' ');
  if (lastSpace > maxLength * 0.75) {
    return `${sub.substring(0, lastSpace).trim()}...`;
  }
  return `${sub.trim()}...`;
}

/**
 * Strips markdown or markup tags from raw text
 */
export function cleanRawText(text: string): string {
  if (!text) return '';
  return text
    .replace(/#{1,6}\s+/g, '') // remove markdown headings
    .replace(/(\*\*|__)(.*?)\1/g, '$2') // remove bold
    .replace(/(\*|_)(.*?)\1/g, '$2') // remove italics
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // remove markdown links
    .replace(/`{1,3}.*?`{1,3}/g, '') // remove code
    .replace(/<[^>]*>/g, '') // remove html tags
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Programmatically generates dynamic meta title and meta description
 * tailored for high-ranking search engine indexing of cupping and physiotherapy topics
 */
export function generateArticleSEO(
  article: Article,
  language: Language,
  siteSettings: SiteSettings,
  category?: Category
): GeneratedSEO {
  const isEn = language === 'en';
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://drmahmoud-cupping.com';
  const articleUrl = `${baseUrl}/?tab=knowledge&article=${article.slug}`;

  // 1. Programmatic Meta Title Generation (50 - 65 characters)
  const rawTitle = isEn ? (article.titleEn || article.titleAr) : (article.titleAr || article.titleEn);
  const cleanTitle = cleanRawText(rawTitle);
  const doctorSuffixAr = 'د. محمود علي نبيه';
  const doctorSuffixEn = 'Dr. Mahmoud Ali Nabih';
  const brandSuffix = isEn ? doctorSuffixEn : doctorSuffixAr;
  
  let dynamicTitle = `${cleanTitle} | ${brandSuffix}`;
  if (dynamicTitle.length > 70) {
    // If too long, preserve key article title keywords and abbreviate brand
    dynamicTitle = `${truncateAtWordBoundary(cleanTitle, 55)} | ${brandSuffix}`;
  }

  // 2. Programmatic Meta Description Generation (140 - 160 characters target)
  const rawAnswer = isEn ? (article.shortAnswerEn || article.shortAnswerAr) : (article.shortAnswerAr || article.shortAnswerEn);
  const cleanAnswer = cleanRawText(rawAnswer);

  let dynamicDescription = '';
  if (cleanAnswer.length >= 120 && cleanAnswer.length <= 165) {
    dynamicDescription = cleanAnswer;
  } else if (cleanAnswer.length > 165) {
    dynamicDescription = truncateAtWordBoundary(cleanAnswer, 155);
  } else {
    // Answer is brief: enrich with authoritative clinical context
    const categoryName = category ? (isEn ? category.nameEn : category.nameAr) : (isEn ? 'Medical Cupping' : 'الحجامة الطبية');
    const enrichment = isEn
      ? ` | Clinical guide on ${categoryName} by Dr. Mahmoud Ali Nabih, licensed physiotherapy & Hijama specialist in Dammam, Saudi Arabia.`
      : ` | دليل طبي سريري في ${categoryName} بإشراف د. محمود علي نبيه، أخصائي الحجامة والعلاج الطبيعي بالدمام.`;
    
    const combined = `${cleanAnswer}${enrichment}`;
    dynamicDescription = truncateAtWordBoundary(combined, 160);
  }

  // 3. Programmatic Semantic Keywords Generation
  const baseCuppingKeywordsAr = [
    'الحجامة الطبية',
    'الحجامة الرطبة',
    'الحجامة الجافة',
    'العلاج الطبيعي',
    'الدمام',
    'مكافحة العدوى',
    'الهيئة السعودية للتخصصات الصحية',
    'دكتور محمود علي نبيه',
    'أخصائي حجامة'
  ];

  const baseCuppingKeywordsEn = [
    'Medical Cupping',
    'Hijama Therapy',
    'Wet Cupping',
    'Dry Cupping',
    'Physiotherapy Dammam',
    'Infection Control',
    'SCFHS Specialist',
    'Dr. Mahmoud Ali Nabih',
    'Evidence-Based Cupping'
  ];

  const specificTags = article.tags || [];
  const categoryTag = category ? (isEn ? category.nameEn : category.nameAr) : '';
  const combinedKeywordsList = [
    ...(isEn ? baseCuppingKeywordsEn : baseCuppingKeywordsAr),
    ...(categoryTag ? [categoryTag] : []),
    ...specificTags
  ];
  // Deduplicate
  const uniqueKeywords = Array.from(new Set(combinedKeywordsList)).join(', ');

  // 4. Featured Image resolution
  let ogImage = article.featuredImage || siteSettings.doctorPhotoUrl || '/dr-mahmoud.jpg';
  if (ogImage.startsWith('/')) {
    ogImage = `${baseUrl}${ogImage}`;
  }

  const categoryName = category ? (isEn ? category.nameEn : category.nameAr) : (isEn ? 'Medical Cupping' : 'الحجامة الطبية');
  const authorName = isEn 
    ? (article.authorNameEn || 'Dr. Mahmoud Ali Nabih Abdelghaney') 
    : (article.authorNameAr || 'د. محمود علي نبيه عبد الغني');

  // 5. Schema.org JSON-LD Structured Data for Medical Content & Rich Snippets
  const schemaJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalWebPage',
        '@id': `${articleUrl}#webpage`,
        url: articleUrl,
        name: dynamicTitle,
        description: dynamicDescription,
        inLanguage: isEn ? 'en-US' : 'ar-SA',
        aspect: 'Treatment',
        medicalAudience: [
          {
            '@type': 'MedicalAudience',
            audienceType: 'Patient'
          },
          {
            '@type': 'MedicalAudience',
            audienceType: 'Clinician'
          }
        ],
        about: [
          {
            '@type': 'MedicalTherapy',
            name: isEn ? 'Cupping Therapy (Hijama)' : 'الحجامة الطبية (Hijama)'
          },
          {
            '@type': 'MedicalTherapy',
            name: isEn ? 'Evidence-Based Physiotherapy' : 'العلاج الطبيعي والتأهيل الحركي'
          }
        ]
      },
      {
        '@type': 'ScholarlyArticle',
        '@id': `${articleUrl}#article`,
        headline: cleanTitle,
        description: dynamicDescription,
        image: ogImage,
        datePublished: article.publishedDate || '2024-08-01',
        dateModified: new Date().toISOString().split('T')[0],
        inLanguage: isEn ? 'en-US' : 'ar-SA',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': articleUrl
        },
        author: {
          '@type': 'Person',
          name: authorName,
          jobTitle: isEn ? 'Senior Physiotherapy Specialist & Cupping Expert' : 'أخصائي أول علاج طبيعي وخبير الحجامة الطبية',
          worksFor: {
            '@type': 'MedicalBusiness',
            name: isEn ? 'Al-Dawaa Cupping Center' : 'مركز الدواء الأمثل للحجامة',
            address: {
              '@type': 'PostalAddress',
              addressLocality: isEn ? 'Dammam' : 'الدمام',
              addressCountry: 'SA'
            }
          },
          hasCredential: {
            '@type': 'EducationalOccupationalCredential',
            credentialCategory: 'Professional Healthcare Registration',
            recognizedBy: {
              '@type': 'Organization',
              name: isEn ? 'Saudi Commission for Health Specialties (SCFHS)' : 'الهيئة السعودية للتخصصات الصحية'
            }
          }
        },
        publisher: {
          '@type': 'MedicalBusiness',
          name: isEn ? 'Dr. Mahmoud Ali Nabih Cupping & Physical Therapy' : 'عيادة د. محمود علي نبيه للحجامة والعلاج الطبيعي',
          logo: {
            '@type': 'ImageObject',
            url: `${baseUrl}/dr-mahmoud.jpg`
          }
        },
        articleSection: categoryName,
        keywords: uniqueKeywords,
        timeRequired: `PT${article.readingTimeMinutes || 5}M`
      }
    ]
  };

  return {
    title: dynamicTitle,
    description: dynamicDescription,
    keywords: uniqueKeywords,
    canonicalUrl: articleUrl,
    ogTitle: dynamicTitle,
    ogDescription: dynamicDescription,
    ogType: 'article',
    ogImage,
    publishedTime: article.publishedDate || '2024-08-01',
    modifiedTime: new Date().toISOString().split('T')[0],
    author: authorName,
    section: categoryName,
    tags: specificTags,
    schemaJsonLd
  };
}

/**
 * Injects or updates standard SEO elements in the document HEAD
 */
export function applyDocumentSEO(seo: GeneratedSEO): () => void {
  if (typeof document === 'undefined') return () => {};

  // Store original values for cleanup
  const originalTitle = document.title;
  
  // Helper to get or create a meta tag
  const setMetaTag = (attribute: 'name' | 'property', key: string, content: string): HTMLMetaElement => {
    let element = document.querySelector(`meta[${attribute}="${key}"]`) as HTMLMetaElement;
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attribute, key);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
    return element;
  };

  // Helper for canonical link
  const setCanonical = (url: string) => {
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  };

  // Helper for JSON-LD schema script
  const setSchemaScript = (schema: object) => {
    const scriptId = 'article-dynamic-json-ld';
    let script = document.getElementById(scriptId) as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema, null, 2);
  };

  // 1. Set Title
  document.title = seo.title;

  // 2. Set Standard Meta Tags
  setMetaTag('name', 'description', seo.description);
  setMetaTag('name', 'keywords', seo.keywords);
  setMetaTag('name', 'author', seo.author);

  // 3. Set Open Graph Meta Tags
  setMetaTag('property', 'og:title', seo.ogTitle);
  setMetaTag('property', 'og:description', seo.ogDescription);
  setMetaTag('property', 'og:type', seo.ogType);
  setMetaTag('property', 'og:url', seo.canonicalUrl);
  setMetaTag('property', 'og:image', seo.ogImage);
  setMetaTag('property', 'article:published_time', seo.publishedTime);
  setMetaTag('property', 'article:modified_time', seo.modifiedTime);
  setMetaTag('property', 'article:author', seo.author);
  setMetaTag('property', 'article:section', seo.section);

  // 4. Set Twitter Card Tags
  setMetaTag('name', 'twitter:card', 'summary_large_image');
  setMetaTag('name', 'twitter:title', seo.ogTitle);
  setMetaTag('name', 'twitter:description', seo.ogDescription);
  setMetaTag('name', 'twitter:image', seo.ogImage);

  // 5. Set Canonical Link
  setCanonical(seo.canonicalUrl);

  // 6. Set JSON-LD Schema
  setSchemaScript(seo.schemaJsonLd);

  // Return cleanup function to restore site default SEO
  return () => {
    document.title = originalTitle;
    const script = document.getElementById('article-dynamic-json-ld');
    if (script) {
      script.remove();
    }
  };
}

/**
 * Programmatically generates general Knowledge Center Hub SEO
 */
export function getKnowledgeCenterHubSEO(language: Language, totalArticlesCount: number): GeneratedSEO {
  const isEn = language === 'en';
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://drmahmoud-cupping.com';
  const hubUrl = `${baseUrl}/?tab=knowledge`;

  const title = isEn
    ? `Medical Cupping Knowledge Center (${totalArticlesCount}+ Articles) | Dr. Mahmoud Ali Nabih`
    : `مركز المعرفة والتوعية بالحجامة الطبية (${totalArticlesCount}+ مقال طبي موثق) | د. محمود علي نبيه`;

  const description = isEn
    ? `Evidence-informed clinical repository with ${totalArticlesCount}+ articles on medical cupping mechanisms, infection control, and musculoskeletal rehabilitation by Dr. Mahmoud Ali Nabih.`
    : `مرجع طبي وسريري معتمد يضم أكثر من ${totalArticlesCount} مقالاً علمياً حول آليات الحجامة الطبية، معايير مكافحة العدوى، وتأهيل آلام الظهر والمفاصل بإشراف د. محمود علي نبيه.`;

  const keywords = isEn
    ? 'Medical Cupping, Hijama Center, Physiotherapy Dammam, Wet Cupping, Sterile Cupping, Musculoskeletal Care, Dr. Mahmoud Ali Nabih'
    : 'الحجامة الطبية, مركز المعرفة, الحجامة الرطبة, تعقيم الحجامة, علاج طبيعي الدمام, دكتور محمود علي نبيه, مكافحة العدوى';

  const schemaJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    description,
    url: hubUrl,
    inLanguage: isEn ? 'en-US' : 'ar-SA',
    about: {
      '@type': 'MedicalTherapy',
      name: isEn ? 'Evidence-Based Cupping Therapy' : 'الحجامة الطبية المبنية على الأدلة'
    },
    author: {
      '@type': 'Person',
      name: isEn ? 'Dr. Mahmoud Ali Nabih' : 'د. محمود علي نبيه'
    }
  };

  return {
    title,
    description,
    keywords,
    canonicalUrl: hubUrl,
    ogTitle: title,
    ogDescription: description,
    ogType: 'website',
    ogImage: `${baseUrl}/dr-mahmoud.jpg`,
    publishedTime: '2024-08-01',
    modifiedTime: new Date().toISOString().split('T')[0],
    author: isEn ? 'Dr. Mahmoud Ali Nabih' : 'د. محمود علي نبيه',
    section: isEn ? 'Knowledge Center' : 'مركز المعرفة',
    tags: ['Hijama', 'Cupping', 'Physiotherapy'],
    schemaJsonLd
  };
}
