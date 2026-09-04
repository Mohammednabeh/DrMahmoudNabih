export type Language = 'ar' | 'en';

export type PageTab = 
  | 'home'
  | 'about'
  | 'qualifications'
  | 'licenses'
  | 'experience'
  | 'knowledge'
  | 'faq'
  | 'contact';

export interface Category {
  id: string;
  nameAr: string;
  nameEn: string;
  slug: string;
  descriptionAr: string;
  descriptionEn: string;
  iconName: string;
}

export interface Article {
  id: string;
  slug: string;
  titleAr: string;
  titleEn: string;
  categoryId: string;
  category?: string;
  shortAnswerAr: string;
  shortAnswerEn: string;
  contentAr: string;
  contentEn: string;
  authorNameAr?: string;
  authorNameEn?: string;
  safetyWarningAr?: string;
  safetyWarningEn?: string;
  tags?: string[];
  featuredImage?: string;
  relatedArticleSlugs?: string[];
  publishedDate: string;
  readingTimeMinutes: number;
  status: 'published' | 'draft';
}

export interface SkillItem {
  id: string;
  nameAr: string;
  nameEn: string;
  category?: string;
}

export type FAQCategory = 'Credentials' | 'Experience' | 'Practice' | 'Contact' | 'Approach';

export interface FAQItem {
  id: string;
  questionAr: string;
  questionEn: string;
  answerAr: string;
  answerEn: string;
  category: FAQCategory;
  order: number;
  published: boolean;
}

export interface SiteSettings {
  heroHeadlineAr: string;
  heroHeadlineEn: string;
  heroSubtitleAr: string;
  heroSubtitleEn: string;
  heroDescriptionAr: string;
  heroDescriptionEn: string;
  contactPhone: string;
  contactEmailPrimary: string;
  contactEmailSecondary: string;
  locationAr: string;
  locationEn: string;
  linkedinUrl?: string;
  doctorPhotoUrl?: string;
  whatsappPhone?: string;
  bookingUrl?: string;
}

export interface ExperienceItem {
  id: string;
  titleAr: string;
  titleEn: string;
  organizationAr: string;
  organizationEn: string;
  locationAr: string;
  locationEn: string;
  periodAr: string;
  periodEn: string;
  isCurrent?: boolean;
  responsibilitiesAr: string[];
  responsibilitiesEn: string[];
}

export interface QualificationItem {
  id: string;
  titleAr: string;
  titleEn: string;
  institutionAr: string;
  institutionEn: string;
  yearAr: string;
  yearEn: string;
  year?: string;
  detailsAr?: string;
  detailsEn?: string;
  gradeAr?: string;
  gradeEn?: string;
  type: 'degree' | 'diploma' | 'certification' | 'workshop';
}

export interface LicenseItem {
  id: string;
  titleAr: string;
  titleEn: string;
  authorityAr: string;
  authorityEn: string;
  rankAr?: string;
  rankEn?: string;
  profileNumber?: string;
  number?: string;
  decisionDateAr?: string;
  decisionDateEn?: string;
  detailsAr?: string;
  detailsEn?: string;
  statusAr?: string;
  statusEn?: string;
  status?: string;
  score?: string;
  notesAr?: string;
  notesEn?: string;
}
