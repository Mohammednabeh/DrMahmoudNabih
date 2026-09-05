import { Category, Article, FAQItem, SiteSettings, ExperienceItem, QualificationItem, LicenseItem, SkillItem } from '../types';
import { articleImages } from './articleImages';
import drMahmoudDefaultPhoto from '../assets/images/dr_mahmoud_photo_1788368502061.jpg';

export { drMahmoudDefaultPhoto };

export const initialCategories: Category[] = [
  {
    id: 'cat-understanding',
    slug: 'understanding-cupping',
    nameAr: 'فهم الحجامة',
    nameEn: 'Understanding Cupping',
    descriptionAr: 'المفاهيم الأساسية، آليات العمل، وأنواع الحجامة الطبية المختلفة.',
    descriptionEn: 'Fundamental principles, mechanisms of action, and clinical cupping modalities.',
    iconName: 'HelpCircle'
  },
  {
    id: 'cat-history',
    slug: 'history-and-heritage',
    nameAr: 'التاريخ والتراث',
    nameEn: 'History and Heritage',
    descriptionAr: 'الجذور التاريخية للحجامة عبر الحضارات وفي التراث والطب النبوي.',
    descriptionEn: 'Historical roots across civilizations and Islamic traditional heritage.',
    iconName: 'BookOpen'
  },
  {
    id: 'cat-safety',
    slug: 'safety-and-professional-practice',
    nameAr: 'السلامة والممارسة المهنية',
    nameEn: 'Safety and Professional Practice',
    descriptionAr: 'بروتوكولات مكافحة العدوى، معايير التعقيم، وموانع الاستخدام الطبية.',
    descriptionEn: 'Infection control protocols, sterilization standards, and clinical contraindications.',
    iconName: 'ShieldCheck'
  },
  {
    id: 'cat-special',
    slug: 'special-considerations',
    nameAr: 'اعتبارات خاصة',
    nameEn: 'Special Considerations',
    descriptionAr: 'توقيت الجلسات، التقييم الفردي، والاعتبارات الصحية الخاصة بالمرأة.',
    descriptionEn: 'Session timing, individualized assessment, and considerations for women.',
    iconName: 'Clock'
  },
  {
    id: 'cat-health',
    slug: 'health-and-musculoskeletal-topics',
    nameAr: 'موضوعات صحية',
    nameEn: 'Health and Musculoskeletal Topics',
    descriptionAr: 'العلاقة التكميلية بين الحجامة وآلام الظهر والمفاصل والحالات الصحية الشائعة.',
    descriptionEn: 'Complementary role in back pain, musculoskeletal issues, and general health conditions.',
    iconName: 'Activity'
  }
];

export const initialArticles: Article[] = [
  {
    id: 'art-1',
    slug: 'what-is-cupping-therapy',
    titleAr: 'ما هي الحجامة الطبية؟ المفاهيم الأساسية والتقييم السريري',
    titleEn: 'What is Medical Cupping Therapy? Core Principles & Clinical Evaluation',
    categoryId: 'cat-understanding',
    featuredImage: articleImages.dryCupping,
    shortAnswerAr: 'الحجامة ممارسة علاجية تكميلية تقليدية تُستخدم فيها كؤوس مصممة خصيصاً لخلق شفط محكم على مناطق مختارة من الجلد، وتُحدد تقنيتها وفقاً لتقييم مهني فردي لكل حالة.',
    shortAnswerEn: 'Cupping therapy is a traditional complementary modality using specialized cups to create controlled suction on targeted skin areas, tailored strictly according to individualized clinical assessment.',
    contentAr: `### ما هي الحجامة؟
الحجامة ممارسة علاجية تكميلية تقليدية تُستخدم فيها كؤوس مصممة خصيصاً لخلق شفط على الجلد. تختلف الطرق والتقنيات المستخدمة حسب نوع الحجامة والغرض من الجلسة والتقييم المهني للحالة.

### ماذا يحدث خلال جلسة الحجامة؟
يقوم الممارس المؤهل بوضع كؤوس مناسبة على مناطق مختارة من الجسم. حسب التقنية المستخدمة، يتم خلق الشفط بطريقة ميكانيكية أو بطريقة أخرى مدروسة ومسيطر عليها. الهدف من الشفط هو إحداث تأثير موضعي على الأنسجة في المنطقة المستهدفة لتحفيز التروية الدموية وتخفيف التوتر العضلي الموضعي.

### لماذا تُستخدم تقنيات مختلفة؟
لا توجد طريقة واحدة تناسب جميع الحالات. يتم اختيار الأسلوب المناسب وفقاً لعدة عوامل:
* **نوع الحجامة:** جافة، رطبة، أو مساجية متزحلقة.
* **المنطقة المستهدفة:** الظهر، لوح الكتف، الرقبة، أو غيرها.
* **الغرض من الجلسة:** وقائي، علاجي تكميلي، أو تأهيلي حركي.
* **التاريخ الصحي للشخص:** الأمراض المزمنة، الأدوية المتناولة، والعمليات الجراحية السابقة.
* **التقييم المهني:** رأي الممارس المؤهل بعد الفحص السريري الدقيق.

### مبدأ مهم يجب فهمه
الحجامة ليست إجراءً واحداً ثابتاً يناسب الجميع. كل جلسة تُصمم وفقاً للحالة الفردية، وما قد يكون مناسباً لشخص قد لا يكون مناسباً لآخر. التقييم المهني الفردي هو الأساس في تحديد الملاءمة والتقنية المناسبة.

### ملاحظة السلامة
الملاءمة تعتمد على الظروف الفردية والتقييم المهني. لا يمكن لأي شخص أن يقرر لنفسه ما إذا كانت الحجامة مناسبة دون استشارة ممارس مؤهل ومرخص.`,
    contentEn: `### What is Cupping Therapy?
Cupping therapy is a traditional complementary therapeutic modality utilizing specially designed cups to generate controlled negative pressure (suction) on selected dermal regions. Modalities and techniques vary depending on the session objective, patient history, and professional clinical evaluation.

### What Happens During a Session?
A qualified healthcare practitioner applies suitable cups to predetermined anatomical landmarks. Depending on the modality, suction is created mechanically or through controlled vacuum methods. The therapeutic objective is to induce local hyperemia, enhance microcirculation, and ease superficial myofascial tension.

### Why Are Different Techniques Utilized?
No single protocol applies universally. Technique selection is dictated by key variables:
* **Cupping Modality:** Dry, wet, or gliding/massage cupping.
* **Target Anatomical Zone:** Dorsal spine, scapular girdle, cervical region, or extremities.
* **Clinical Purpose:** Preventive maintenance, complementary symptom alleviation, or post-injury rehabilitation.
* **Medical Background:** Comorbidities, active pharmacotherapies, and surgical history.
* **Professional Assessment:** Clinical findings determined by a credentialed therapist.

### Fundamental Principle
Cupping is never a one-size-fits-all procedure. Every session must be tailored to the individual. What benefits one individual may be contraindicated for another.

### Safety Note
Suitability depends strictly on individual circumstances and licensed professional evaluation. Patients must never self-prescribe cupping without thorough clinical consultation.`,
    relatedArticleSlugs: ['types-of-cupping-therapy', 'safety-principles-in-cupping', 'how-to-prepare-for-cupping'],
    publishedDate: '2024-03-15',
    readingTimeMinutes: 4,
    status: 'published'
  },
  {
    id: 'art-2',
    slug: 'types-of-cupping-therapy',
    titleAr: 'أنواع الحجامة: الجافة، الرطبة، والمساجية والفروقات السريرية',
    titleEn: 'Types of Cupping: Dry, Wet, and Moving Cupping Compared',
    categoryId: 'cat-understanding',
    featuredImage: articleImages.wetCupping,
    shortAnswerAr: 'تتنوع أساليب الحجامة بين الجافة (بدون شقوق)، والرطبة (تتطلب شروط تعقيم طبية دقيقة وإجراءات احترازية للنزيف)، والمساجية (باستخدام زيوت طبية لتحريك الكأس على العضلات).',
    shortAnswerEn: 'Cupping modalities primarily encompass Dry Cupping (intact skin vacuum), Wet Cupping (micro-incisions requiring medical asepsis), and Moving/Massage Cupping (gliding cups along fascial lines).',
    contentAr: `### تنوع أساليب الحجامة
تتعدد أنواع الحجامة وتختلف في تقنياتها وأغراضها السريرية. من المهم فهم الفروقات بين هذه الأنواع لاختيار المناسب لكل حالة وفق التقييم المهني.

### الحجامة الجافة (Dry Cupping)
تعتمد الحجامة الجافة بشكل أساسي على خلق الشفط على الجلد دون إحداث أي شقوق أو جروح. تُعد الأكثر شيوعاً والأقل تعقيداً من حيث الإجراءات الوقائية.

![الحجامة الجافة: كوب حجامة يشفط الجلد السليم بدون دم، موضحاً تشكل قبة الشفط الفراغي لتنشيط التروية الدموية وإرخاء العضلات](${articleImages.dryCupping})

* **آلية العمل:** يتم سحب الجلد والأنسجة الرخوة السطحية داخل الكأس باستخدام مضخات ميكانيكية محكمة.
* **الآثار الجلدية المؤقتة:** قد تظهر علامات دائرية على الجلد نتيجة لزيادة تدفق الدم الموضعي، وتتلاشى تدريجياً خلال أيام.
* **التفاوت الفردي:** يختلف رد الفعل ومدى الارتياح العضلي من شخص إلى آخر.

### الحجامة الرطبة (Wet Cupping)
تتضمن الحجامة الرطبة خطوات إجرائية إضافية بعد مرحلة الشفط الأولي، حيث يتم إحداث خدوش سطحية دقيقة جداً ومحسوبة بالجلد لسحب كميات محدودة من الدم الموضعي المحتقن.

![الحجامة الرطبة: كوب حجامة يشفط الدم الموضعي مع قطعة قطن معقمة ومسحات مطهرة على صينية طبية معقمة](${articleImages.wetCupping})

* **مؤهلات الممارس:** يجب أن تُجرى حصراً بواسطة ممارس صحي مرخص ومؤهل.
* **البيئة المعقمة ومكافحة العدوى:** تستلزم أدوات معقمة ذات استخدام واحد لكل مريض والتخلص منها وفق بروتوكولات النفايات الطبية.
* **تقييم مخاطر النزيف:** الفحص المسبق لأي تاريخ مرضي لاضطرابات التخثر أو أدوية السيولة.
* **تحذير مهني:** لا يجوز الترويج للحجامة الرطبة كعلاج سحري أو نهائي للأمراض المزمنة.

### الحجامة المساجية أو المتحركة (Moving Cupping)
تعتمد هذه التقنية على تحريك الكأس بنعومة وانسيابية فوق مسارات العضلات باستخدام وسيط طبي (مثل زيت التدليك الطبي).
* تهدف إلى تخفيف الشد في الأنسجة العضلية الرخوة وتسهيل التصريف اللمفاوي السطحي.`,
    contentEn: `### Modality Overview
Cupping modalities diverge significantly in technique, physiological intent, and procedural safety mandates.

### Dry Cupping
Dry cupping relies on static negative pressure created over intact skin without any incisions.

![Dry Cupping: Medical suction cup pulling intact dermal tissue without incisions to promote localized hyperemic perfusion](${articleImages.dryCupping})

* **Mechanism:** Soft tissues and superficial fascia are pulled into the cup using a mechanical hand pump.
* **Transient Discoloration:** Circular ecchymotic rings often appear secondary to extravasation, typically clearing within days.
* **Clinical Utility:** Common for musculoskeletal stiffness and trigger-point modulation.

### Wet Cupping (Hijama)
Wet cupping introduces an additional procedural phase: superficial microscopic scarifications on the skin surface following initial vacuum, facilitating targeted local blood draw.

![Wet Cupping: Controlled negative suction drawing capillary blood with sterile cotton pad on surgical tray](${articleImages.wetCupping})

* **Strict Licensure:** Must only be administered by certified, licensed healthcare practitioners.
* **Infection Control:** Absolute requirement for single-use, pre-sterilized consumables and medical sharps disposal.
* **Hemostasis Screening:** Strict pre-screening for coagulopathies and antiplatelet/anticoagulant regimens.
* **Clinical Boundary:** Never presented as a standalone panacea for systemic illnesses.

### Moving (Gliding) Cupping
Cups are systematically glided over muscular planes lubricated with dermatologically safe oils. Highly favored for broad back extensor fascial release.`,
    relatedArticleSlugs: ['what-is-cupping-therapy', 'safety-principles-in-cupping', 'cupping-and-athletes'],
    publishedDate: '2024-03-18',
    readingTimeMinutes: 5,
    status: 'published'
  },
  {
    id: 'art-3',
    slug: 'cupping-and-athletes',
    titleAr: 'الحجامة والنشاط البدني والرياضيين: ما بين الآمال والحقائق',
    titleEn: 'Cupping Therapy for Athletes: Athletic Recovery Realities',
    categoryId: 'cat-understanding',
    featuredImage: articleImages.sportsCupping,
    shortAnswerAr: 'يلجأ بعض الرياضيين للحجامة كعنصر تكميلي ضمن روتين الاستشفاء العضلي إلى جانب العلاج الطبيعي والتغذية والراحة، ولا تعتبر بديلاً عن التأهيل الرياضي المتخصص.',
    shortAnswerEn: 'Athletes frequently incorporate cupping into broader recovery regimens alongside physical therapy, adequate sleep, and nutrition; it is an adjunct, not a replacement for active athletic rehab.',
    contentAr: `### لماذا يلجأ الرياضيون للحجامة؟
شهدت السنوات الأخيرة إقبالاً ملحوظاً من الرياضيين المحترفين والهواة على الحجامة الطبية كجزء من برامج الاستشفاء الرياضي (Athletic Recovery) وإدارة الإجهاد العضلي بعد التدريبات المكثفة.

![أدوات الاستشفاء الرياضي والتأهيل الحركي وكؤوس تحرير اللفافة العضلية المعتمدة للرياضيين](${articleImages.sportsCupping})

### الحجامة ضمن منظومة الاستشفاء المتكاملة
لا تعمل الحجامة بمعزل عن الركائز الأساسية للتعافي الرياضي. يستفيد الرياضيون منها عند دمجها بعناية مع:
* تمارين التمدد والتأهيل الحركي الموجه.
* التدليك الرياضي والعلاج اليدوي المتخصص.
* التغذية العلاجية المتوازنة والترطيب الكافي بالسوائل الكهرلية.
* ساعات النوم المنتظمة والراحة الإيجابية.

### اعتبارات سريرية هامة للرياضيين:
* **توقيت الجلسة:** يجب مواءمة موعد الجلسة مع جدول البطولات والتمارين الشاقة، لتفادي تأثير أي إجهاد موضعي مؤقت على المنافسات.
* **العلامات الجلدية:** ينبغي للرياضي إدراك أن التصبغات الجلدية المؤقتة طبيعية وتختلف مدة اختفائها من جسم لآخر.
* **واقعية التوقعات:** الحجامة ليست أداة سحرية تضمن تحسين الأرقام القياسية أو تسريع الشفاء من التمزقات الحادة للأربطة دون تدخل طبي.`,
    contentEn: `### Athletes and Cupping
High-performance athletes widely adopt cupping as an adjunct in recovery protocols to alleviate post-exertional muscular soreness and tissue tension.

![Athletic recovery tools, myofascial release cups, and physiotherapy equipment for active athletes](${articleImages.sportsCupping})

### An Integrated Recovery Ecosystem
Cupping yields optimal outcomes when situated within an evidence-based athletic recovery regimen:
* Targeted dynamic stretching and corrective exercise.
* Specialized sports physiotherapy and manual soft-tissue mobilization.
* Optimal hydration, electrolyte replenishment, and macronutrient timing.
* Restorative sleep hygiene.

### Critical Considerations for Athletes
* **Scheduling:** Sessions must be timed strategically relative to match fixtures and high-intensity loads to avoid transient post-session fatigue.
* **Skin Discoloration:** Athletes should anticipate circular ecchymoses that resolve spontaneously over 3 to 7 days.
* **Evidence-Based Expectations:** Cupping does not replace orthopedic repair for acute ligament tears or structural pathology.`,
    relatedArticleSlugs: ['what-is-cupping-therapy', 'cupping-and-back-pain', 'post-cupping-care'],
    publishedDate: '2024-03-22',
    readingTimeMinutes: 4,
    status: 'published'
  },
  {
    id: 'art-4',
    slug: 'history-and-evolution-of-cupping',
    titleAr: 'تاريخ الحجامة وتطور ممارستها عبر العصور والحضارات',
    titleEn: 'Historical Evolution of Cupping Across Civilizations',
    categoryId: 'cat-history',
    shortAnswerAr: 'تمتد ممارسة الحجامة لآلاف السنين؛ من استخدام قرون الحيوانات والكؤوس الفخارية في مصر القديمة والصين وبابل، وصولاً إلى الممارسة الطبية المنظمة في الهيئات الصحية الحديثة.',
    shortAnswerEn: 'Cupping history spans millennia—from animal horns and clay vessels in ancient Egypt, Mesopotamia, and China, to contemporary regulated medical practice under licensed health authorities.',
    contentAr: `### الجذور التاريخية
للحجامة تاريخ طويل يمتد عبر آلاف السنين، حيث مارستها أقدم الحضارات الإنسانية كجزء من أنظمتها العلاجية والطبية السائدة آنذاك.

### التطور في أدوات الحجامة
* **العصور الأولى:** استخدمت قرون الحيوانات المجوفة بعد إحداث ثقب صغير وسحب الهواء بالفم لخلق الشفط.
* **الحضارات الشرقية والمتوسطية:** تطورت الأدوات إلى الكؤوس الفخارية ثم الخيزران والكؤوس الزجاجية المسخنة باللهب لخلق التفريغ الهوائي.
* **العصر الحديث:** شهد نقلة نوعية مع ابتكار كؤوس بلاستيكية طبية معقمة ذات صمامات أحادية الاتجاه ومضخات شفط يدوية أو إلكترونية محكمة.

### التحول إلى الممارسة المهنية المقننة
في العصر الحالي، انتقلت الحجامة من الممارسات الشعبية العشوائية إلى أطر صحية وتنظيمية دقيقة، كما هو الحال في المملكة العربية السعودية تحت إشراف وزارة الصحة والمركز الوطني للطب البديل والتكميلي والهيئة السعودية للتخصصات الصحية.

### السياق العلمي والتاريخي
الاستخدام التاريخي المستمر يعكس عمق التراث الإنساني، لكنه وحده لا يشكل دليلاً كافياً على صحة كافة الادعاءات الطبية، إذ تظل الأبحاث السريرية والضوابط الطبية هي الفيصل في تقييم النتائج.`,
    contentEn: `### Ancient Origins
Cupping has been documented across millennia, prominently featuring in early medical papyri from ancient Egypt (Ebers Papyrus, c. 1550 BCE), traditional Chinese medicine scriptures, and Greco-Roman treatises by Hippocrates and Galen.

### Evolution of Instruments
* **Primitive Horns:** Hollowed animal horns were initially utilized to aspirate purulent fluids and stimulate counter-irritation.
* **Ceramic & Glass:** Transitioned to fired ceramic, bamboo, and later glass cups utilizing brief flame application to generate thermal vacuum.
* **Modern Clinical Devices:** Modern practice utilizes sterile, polycarbonate disposable cups with one-way valves and precise calibrated mechanical pumps.

### Institutionalization & Regulation
In contemporary healthcare—such as under the Saudi Commission for Health Specialties (SCFHS) and Ministry of Health regulations—cupping has evolved into an institutionalized, infection-controlled complementary clinical procedure.`,
    relatedArticleSlugs: ['cupping-in-islamic-heritage', 'safety-principles-in-cupping'],
    publishedDate: '2024-03-25',
    readingTimeMinutes: 4,
    status: 'published'
  },
  {
    id: 'art-5',
    slug: 'cupping-in-islamic-heritage',
    titleAr: 'الحجامة في التراث الإسلامي والطب النبوي: رؤية منهجية متزنة',
    titleEn: 'Cupping in Islamic Heritage & Prophetic Medicine',
    categoryId: 'cat-history',
    shortAnswerAr: 'تحظى الحجامة بمكانة رفيعة في التراث الإسلامي والسنة النبوية كإرشاد وقائي وتطبيبي، مع التأكيد العلمي على ضرورة ممارستها وفق الأصول الطبية الحديثة ومعايير الأمان الحيوي.',
    shortAnswerEn: 'Cupping holds an esteemed standing in Islamic tradition and Prophetic medicine as an encouraged wellness practice, which modern practitioners uphold through rigorous clinical standards.',
    contentAr: `### المكانة في التراث
تحتل الحجامة مكانة معتبرة في الثقافة والتراث الإسلامي، حيث وردت بشأنها نصوص نبوية شريفة تحث على التداوي بها ضمن سياق الرعاية البدنية والطب النبوي.

### التمييز المنهجي الضروري
من منظور مهني وأخلاقي متزن، ينبغي للممارس والباحث التمييز بين:
1. **النصوص النبوية الثابتة:** التي تؤكد مشروعية الحجامة وحثها على التداوي بالأسباب المشروعة.
2. **الاجتهادات التاريخية للعلماء والأطباء الأوائل:** مثل ابن سينا والرازي وابن القيم في تفسير منافعها وفق معارف زمانهم.
3. **المعايير الطبية السريرية المعاصرة:** التي تفرض التقييم الفردي، والتعقيم، وفهم فسيولوجيا الدورة الدموية وموانع النزيف.

### المبدأ التحريري المهني
لا يصح تحميل النصوص التراثية ادعاءات علاجية حديثة غير مثبتة (كالادعاء بأنها تشفي من كافة الأمراض المستعصية دون دواء). بل يُجمع بين الاسترشاد بالهدي النبوي وبين الأخذ بالعلوم الطبية الدقيقة وضوابط السلامة المعتمدة من الجهات الصحية الرسمية.`,
    contentEn: `### Heritage Significance
Cupping occupies an honored position within Islamic culture, referenced in authentic Prophetic traditions (Sunnah) advocating proactive bodily health and healthcare-seeking behavior.

### Methodological Distinction
A professional clinical stance requires distinguishing between:
1. **Authentic Religious Texts:** Establishing the ethical validity and commendation of cupping.
2. **Historical Medical Commentary:** Insights from historical scholars (e.g., Ibn Sina, Ibn al-Qayyim) framed within early physiological models.
3. **Modern Clinical Science:** Rigorous antiseptic protocols, contraindication screening, and evidence-guided pathophysiology.

### Balanced Editorial Stance
Tradition provides spiritual and historical resonance, but clinical application must remain firmly anchored in established medical safety, sterilization standards, and individualized healthcare evaluation.`,
    relatedArticleSlugs: ['history-and-evolution-of-cupping', 'timing-and-seasonality-in-cupping'],
    publishedDate: '2024-03-29',
    readingTimeMinutes: 4,
    status: 'published'
  },
  {
    id: 'art-6',
    slug: 'safety-principles-in-cupping',
    titleAr: 'مبادئ السلامة والتعقيم ومكافحة العدوى في الممارسة المهنية للحجامة',
    titleEn: 'Clinical Safety, Sterilization, and Infection Control in Cupping',
    categoryId: 'cat-safety',
    featuredImage: articleImages.cuppingTools,
    shortAnswerAr: 'السلامة هي الأولوية المطلقة: تشمل استخدام أدوات معقمة ذات استخدام وحيد، تطهير الجلد، الفحص المسبق لأدوية السيولة، والالتزام بمعايير مكافحة العدوى الرسمية.',
    shortAnswerEn: 'Patient safety is paramount: requiring 100% single-use sterile disposables, antiseptic skin preparation, pre-screening for anticoagulants, and strict adherence to official healthcare infection control.',
    contentAr: `### الأولوية القصوى: سلامة المراجع
تعتمد الممارسة المهنية الآمنة للحجامة على أسس علمية ووقائية صارمة تمنع حدوث أي مضاعفات وتضمن تجربة علاجية مريحة ومطابقة للمعايير الصحية المعتمدة.

![مستلزمات وأدوات الحجامة الطبية المعقمة ذات الاستخدام الواحد ومطهرات التعقيم والصينية الجراحية](${articleImages.cuppingTools})

### ركائز الأمان السريري:
* **الكفاءة والترخيص المهني:** ممارسة الإجراء حصراً من قِبل ممارسين مصنفين ومرخصين من الهيئات الصحية (مثل SCFHS في السعودية).
* **أخذ التاريخ المرضي بعناية:** سؤال المراجع عن أمراض الدم، السكري، أمراض القلب، الأدوية المسيلة، والعمليات الجراحية.
* **بيئة سريرية معقمة:** غرف علاجية مطابقة لمعايير وزارة الصحة مع أسرة مغطاة بمفارش طبية عازلة تُستبدل لكل مراجع.
* **الأدوات ذات الاستخدام الفردي:** استخدام كؤوس طبية وشفرات جراحية معقمة مختومة تُفتح أمام المراجع وتُتلف مباشرة في حاويات النفايات الطبية الحادة (Sharps Container).
* **تطهير الجلد السليم:** استخدام المحاليل المطهرة الطبية المعتمدة قبل الإجراء وبعده، ووضع ضمادات معقمة لحماية مواضع الشفط.`,
    contentEn: `### Clinical Imperative
Medical cupping demands strict adherence to institutional infection control to eliminate any potential cross-contamination or adverse incidents.

![Sterile single-use disposable cupping tools, packaged lancets, and antiseptic preparation tray](${articleImages.cuppingTools})

### Foundational Pillars of Clinical Safety
* **Credentialed Licensure:** Administered exclusively by healthcare specialists certified by official regulatory bodies (such as the SCFHS in Saudi Arabia).
* **Comprehensive Medical History:** Rigorous screening for bleeding tendencies, anticoagulant usage, cardiovascular stability, and metabolic disorders.
* **Aseptic Environment:** Clinical treatment suites compliant with Ministry of Health hygiene codes, utilizing disposable medical bed covers for each client.
* **Single-Use Consumables:** Sealed, gamma-sterilized disposable cups and surgical lancets opened immediately prior to the procedure and discarded directly into biohazard sharps containers.
* **Skin Antisepsis:** Medical-grade antiseptic application pre- and post-procedure with sterile dressing application.`,
    relatedArticleSlugs: ['contraindications-and-medical-evaluation', 'how-to-prepare-for-cupping', 'post-cupping-care'],
    publishedDate: '2024-04-02',
    readingTimeMinutes: 5,
    status: 'published'
  },
  {
    id: 'art-7',
    slug: 'contraindications-and-medical-evaluation',
    titleAr: 'موانع الحجامة والحالات التي تتطلب تقييماً طبياً خاصاً قبل الجلسة',
    titleEn: 'Contraindications and Pre-Procedure Medical Screening in Cupping',
    categoryId: 'cat-safety',
    featuredImage: articleImages.cuppingTools,
    shortAnswerAr: 'تُمنع الحجامة الرطبة في حالات اضطرابات النزيف الشديدة، تناول مميعات الدم دون موافقة الطبيب، العدوى الجلدية النشطة، والحمى الحادة، وتتطلب تقييماً خاصاً للحوامل ومرضى السكري.',
    shortAnswerEn: 'Cupping is contraindicated in severe bleeding disorders, unmonitored anticoagulant therapy, active skin infections, and acute fevers, requiring specialized caution in pregnancy and diabetes.',
    contentAr: `### مبدأ التقييم الفردي
لا يجوز تعميم الحجامة على جميع الأشخاص دون فحص؛ فسلامة الحالة تقتضي استبعاد أي موانع سريرية قد تعرض المراجع للخطر.

### حالات يُمنع فيها إجراء الحجامة أو تؤجل:
1. **اضطرابات النزيف وسيولة الدم:** مثل الهيموفيليا (الناعور) أو النقص الحاد في الصفائح الدموية، أو المرضى الذين يتناولون جرعات علاجية من مميعات الدم (مثل الوارفارين أو مضادات التخثر الحديثة) دون إذن واستشارة الطبيب المعالج.
2. **الأمراض والالتهابات الحادة:** مثل ارتفاع درجات الحرارة (الحمى)، أو حالات العدوى الجهازية النشطة، أو الإعياء الشديد وهبوط الدورة الدموية.
3. **المشاكل والأمراض الجلدية الموضعية:** يُمنع وضع الكؤوس فوق الجروح المفتوحة، الحروق، التقرحات، الأكزيما النشطة، الدوالي البارزة، أو الأورام الجلدية.

### فئات تتطلب عناية وتقييماً استثنائياً:
* **الحوامل:** تجنب منطقة البطن وأسفل الظهر تماماً، واقتصار الإجراء عند الضرورة القصوى على استشارة الطبيب المشرف.
* **مرضى السكري:** التأكد من انتظام مستويات السكر وسرعة التئام الجروح وتجنب الأطراف السفلية عند وجود اعتلال عصبي سكري.
* **كبار السن والأطفال:** تطبيق تقنيات خفيفة ولطيفة مع تقليل قوة الشفط والمدة.`,
    contentEn: `### Individual Assessment Standard
Prioritizing patient wellbeing requires vigilant exclusion of contraindications prior to initiating vacuum application.

### Absolute and Relative Contraindications:
1. **Coagulopathies & Anticoagulant Therapy:** Hemophilia, severe thrombocytopenia, or patients undergoing systemic therapeutic anticoagulation without primary physician clearance.
2. **Acute Febrile & Systemic Illnesses:** Active bacterial infections, high fever, hemodynamic instability, or severe hypotension.
3. **Local Dermal Pathology:** Never apply suction over active eczema, psoriasis plaques, open ulcerations, burns, thrombophlebitic varicose veins, or neoplastic lesions.

### Special Populations Requiring Caution:
* **Pregnancy:** Absolute avoidance of abdominal, pelvic, and lumbo-sacral regions.
* **Diabetes Mellitus:** Thorough appraisal of glycemic control and peripheral microvascular status, avoiding distal extremities in peripheral neuropathy.
* **Elderly & Pediatric Patients:** Reduced suction pressure and shortened application durations.`,
    relatedArticleSlugs: ['safety-principles-in-cupping', 'how-to-prepare-for-cupping', 'cupping-and-diabetes'],
    publishedDate: '2024-04-05',
    readingTimeMinutes: 5,
    status: 'published'
  },
  {
    id: 'art-8',
    slug: 'how-to-prepare-for-cupping',
    titleAr: 'كيف تستعد لجلسة الحجامة الطبية؟ إرشادات ما قبل الإجراء',
    titleEn: 'How to Prepare for a Medical Cupping Session: Pre-Visit Guidelines',
    categoryId: 'cat-safety',
    featuredImage: articleImages.cuppingTools,
    shortAnswerAr: 'التحضير السليم يشمل الإفصاح عن كافة الأدوية والحالات الصحية، تناول وجبة خفيفة قبل الجلسة بساعتين إلى 3 ساعات، شرب كمية كافية من الماء، وارتداء ملابس فضفاضة ومريحة.',
    shortAnswerEn: 'Proper preparation entails full disclosure of medications, having a light meal 2–3 hours beforehand, maintaining adequate hydration, and wearing comfortable, loose-fitting clothing.',
    contentAr: `### خطوات الاستعداد للجلسة
يساعد التحضير الصحيح لجلسة الحجامة على تحقيق أقصى فائدة وتجنب أي شعور بالدوار أو الإرهاق.

### 1. الإفصاح الطبي الكامل:
يجب إبلاغ الأخصائي بكافة التفاصيل الصحية التالية:
* جميع الأدوية والمكملات الغذائية المستخدمة حالياً.
* التاريخ المرضي مع ضغط الدم، السكري، وأمراض القلب أو النزيف.
* أي عمليات جراحية سابقة خاصة في المنطقة المراد علاجها.
* وجود أي حساسية جلدية أو تجارب سابقة مع الحجامة أو التبرع بالدم.

### 2. التغذية والترطيب:
* تجنب القدوم بمعدة ممتلئة تماماً (بعد وجبة ثقيلة مباشرة) أو على صيام طويل جداً قد يسبب هبوطاً في السكر. يُفضل تناول وجبة خفيفة ومغذية قبل موعد الجلسة بساعتين إلى ثلاث ساعات.
* شرب كميات كافية من الماء للحفاظ على ترطيب الأنسجة وتوازن الدورة الدموية.

### 3. الراحة والملابس:
* ارتداء ملابس قطنية فضفاضة ومريحة يسهل كشف المنطقة المستهدفة من خلالها.
* الحضور بحالة نفسية وجسدية هادئة وتجنب بذل مجهود عضلي مفرط قبل الجلسة مباشرة.`,
    contentEn: `### Preparation Checklist
Systematic pre-session preparation ensures a comfortable, clinically effective, and uneventful cupping experience.

### 1. Transparent Clinical Disclosure
Inform the specialist regarding:
* Complete inventory of current medications and herbal supplements.
* Underlying cardiovascular, metabolic, or hematological conditions.
* Prior surgeries or invasive interventions in the target anatomical zones.
* History of vasovagal episodes or syncope during phlebotomy.

### 2. Nutrition & Hydration
* Avoid arriving on a prolonged fast or immediately following a heavy, fatty meal. Consume a light, balanced meal 2 to 3 hours prior.
* Maintain adequate oral fluid intake to support hemodynamic stability.

### 3. Clothing & Comfort
* Wear comfortable, loose cotton attire that facilitates unobstructed access to the treated areas.
* Avoid strenuous athletic training immediately preceding the session.`,
    relatedArticleSlugs: ['post-cupping-care', 'safety-principles-in-cupping'],
    publishedDate: '2024-04-10',
    readingTimeMinutes: 4,
    status: 'published'
  },
  {
    id: 'art-9',
    slug: 'post-cupping-care',
    titleAr: 'العناية بعد الحجامة: نصائح التعافي والملاحظة السريرية',
    titleEn: 'Post-Cupping Care and Recovery Guidelines',
    categoryId: 'cat-safety',
    featuredImage: articleImages.dryCupping,
    shortAnswerAr: 'بعد الجلسة: خذ قسطاً من الراحة، حافظ على نظافة وجفاف مواضع الكؤوس، اشرب سوائل دافئة، تجنب الاستحمام بالماء الساخن أو التمرين الشديد لمدة 24 ساعة.',
    shortAnswerEn: 'Post-procedure care: Rest briefly, keep cupping sites clean and dry, stay hydrated with warm fluids, and avoid vigorous workouts or hot showers for 24 hours.',
    contentAr: `### مرحلة ما بعد الجلسة
تعتبر العناية اللاحقة جزءاً أساسياً من نجاح الإجراء لضمان التئام سريع وراحة مستمرة.

### الإرشادات الفورية بعد الجلسة:
* **الراحة:** البقاء في وضع مريح لبضع دقائق بعد انتهاء الجلسة للتأكد من استقرار ضغط الدم وتجنب الوقوف المفاجئ.
* **العناية بمواضع الكؤوس:** ترك الضمادات الطبية الخفيفة على مواضع التشريط لمدة تتراوح بين ساعتين إلى ثلاث ساعات، والحرص على بقاء المنطقة جافة ونظيفة تماماً.
* **الترطيب والتغذية:** شرب الماء والسوائل الدافئة لتعزيز التروية، وتناول وجبة صحية خفيفة وسهلة الهضم.

### ما يجب تجنبه لمدة 24 ساعة:
* تجنب الاستحمام بالماء الساخن جداً أو الساونا لمنع تهيج الجلد.
* الامتناع عن ممارسة التمارين الرياضية العنيفة أو رفع الأثقال للسماح للعضلات بالاسترخاء.
* تجنب حك أو فرك مواضع الكؤوس، وتوقع تلاشي التصبغات الدائرية خلال 3 إلى 7 أيام تلقائياً.

### متى تتواصل مع مقدم الرعاية؟
تواصل فوراً عند حدوث نزيف غير متوقف، أو علامات التهاب شديد (احمرار حارق متزايد، تورم مؤلم، أو حرارة موضعية).`,
    contentEn: `### Post-Care Protocol
Proper aftercare is an essential component of clinical therapy, facilitating skin healing and sustained comfort.

### Immediate Post-Procedure Care:
* **Rest:** Remain seated comfortably for 5–10 minutes post-session to ensure hemodynamic equilibrium and prevent orthostatic dizziness.
* **Skin Protection:** Keep sterile dressings in place for 2–3 hours. Maintain complete dryness and cleanliness of the area.
* **Hydration:** Consume warm fluids and water to promote circulation, followed by a light, balanced meal.

### Restrictions for the First 24 Hours:
* Avoid very hot showers, steam baths, saunas, and swimming pools.
* Refrain from vigorous athletic exertion, weightlifting, or intense cardio.
* Do not scratch treated areas. Circular ecchymoses fade naturally over several days.

### When to Contact Your Clinician:
Contact a healthcare professional immediately if unexpected persistent bleeding, increasing localized swelling, or severe progressive warmth occurs.`,
    relatedArticleSlugs: ['how-to-prepare-for-cupping', 'safety-principles-in-cupping'],
    publishedDate: '2024-04-14',
    readingTimeMinutes: 4,
    status: 'published'
  },
  {
    id: 'art-10',
    slug: 'timing-and-seasonality-in-cupping',
    titleAr: 'توقيت الحجامة: هل يوجد يوم محدد إلزامياً للجميع؟',
    titleEn: 'Timing and Seasonality in Cupping: Is There a Fixed Schedule?',
    categoryId: 'cat-special',
    shortAnswerAr: 'لا يوجد يوم أو ساعة واحدة إلزامية طبياً لجميع البشر؛ التوقيت العلاجي يحدده التقييم السريري والحاجة الفردية، بينما التواريخ التراثية تُحترم كخيار وقائي لمن يرغب.',
    shortAnswerEn: 'There is no universally mandatory day or hour for cupping; clinical timing depends on individual health needs, while traditional lunar dates serve as optional preventive preferences.',
    contentAr: `### حقيقة مسألة التوقيت
يتساءل الكثيرون عن المواعيد المفضلة للحجامة وما إذا كانت ملزمة لكل من يرغب في الخضوع للجلسة.

### التمييز بين الحالات الطبية والخيارات التراثية:
* **الحالات العلاجية والتأهيلية:** في حال وجود ألم عضلي حاد، أو تشنج في الظهر، أو برنامج تأهيل بدني محدد، فإن التوقيت يحدده التقييم السريري وجاهزية المريض وحالته الصحية في أي وقت من الشهر.
* **الحجامة الوقائية العامة:** في التراث الإسلامي يُستحب إجراؤها في الأيام الفردية من النصف الثاني للشهر القمري (17، 19، 21). يحرص كثير من المراجعين على هذه الأوقات لفضلها الروحي والتراثي، وهو اختيار محترم لمن كانت حالته مستقرة.

### الخلاصة المهنية:
لا يُشترط انتظار يوم محدد لتلقي الرعاية عند وجود شكوى صحية تتطلب تدخلاً، فالسلامة والملاءمة الفردية تسبق أي اعتبار زمني.`,
    contentEn: `### Understanding Timing
Public discourse frequently questions whether cupping must strictly adhere to specific calendar dates.

### Clinical Need vs. Traditional Timing:
* **Clinical / Rehabilitative Applications:** For patients managing myofascial discomfort, restricted range of motion, or physical therapy recovery, timing is dictated by symptoms and clinical indication at any point during the year.
* **Preventive Heritage Timing:** Traditional Islamic literature identifies lunar dates (17th, 19th, and 21st of the Hijri month) as preferred for routine wellness. This holds spiritual and cultural significance and is accommodated for stable individuals.

### Professional Summary:
Medical need and individual health assessment always supersede static scheduling.`,
    relatedArticleSlugs: ['cupping-in-islamic-heritage', 'cupping-for-women'],
    publishedDate: '2024-04-18',
    readingTimeMinutes: 4,
    status: 'published'
  },
  {
    id: 'art-11',
    slug: 'cupping-for-women',
    titleAr: 'الحجامة للنساء: الاعتبارات الخاصة والتوقيت الملائم',
    titleEn: 'Cupping for Women: Clinical Considerations and Optimal Timing',
    categoryId: 'cat-special',
    shortAnswerAr: 'تتطلب الحجامة للنساء مراعاة الدورة الشهرية (تجنب الحجامة الرطبة أثناء غزارة الطمث)، واستبعاد فقر الدم، والامتناع التام عن حجامة البطن وأسفل الظهر أثناء الحمل.',
    shortAnswerEn: 'Women considering cupping require individualized assessment of menstrual phases (avoiding wet cupping during heavy flow), anemia screening, and strict avoidance of abdominal/lumbar zones in pregnancy.',
    contentAr: `### اعتبارات فسيولوجية خاصة
تستفيد المرأة من الحجامة الطبية كعلاج تكميلي لتخفيف الإجهاد وآلام الظهر والكتفين، مع مراعاة العوامل الهرمونية والفسيولوجية الفريدة.

### نقاط سريرية رئيسية:
* **الدورة الشهرية:** يُفضل تجنب الحجامة الرطبة أثناء أيام الطمث الشديدة تفادياً لإجهاد الجسم أو زيادة فرصة الإرهاق وهبوط المؤشرات الحيوية، بينما يمكن إجراؤها بعد انتهاء الدورة.
* **الحمل:** يُحظر إجراء الحجامة على أسفل الظهر والبطن طوال فترة الحمل لمنع أي تحفيز لانقباضات الرحم، وتقتصر على حالات ضيقة جداً وبموافقة طبيب التوليد.
* **فحص الهيموجلوبين وفقر الدم:** نظراً لشيوع فقر الدم الناتج عن نقص الحديد لدى بعض النساء، يلزم التحقق من نسب الهيموجلوبين قبل إجراء الحجامة الرطبة.`,
    contentEn: `### Female Physiological Considerations
Women can safely benefit from cupping for stress reduction, tension headaches, and upper back tightness when tailored to hormonal and reproductive phases.

### Core Considerations:
* **Menstruation:** Wet cupping is generally deferred during peak menstrual flow to prevent transient weakness and fatigue; scheduling post-menses is preferred.
* **Pregnancy:** Absolute contraindication over the pelvic, abdominal, and lumbosacral areas to prevent reflex uterine contractions.
* **Anemia Screening:** Due to the prevalence of iron deficiency, evaluating hemoglobin status is mandatory prior to any procedure involving blood withdrawal.`,
    relatedArticleSlugs: ['timing-and-seasonality-in-cupping', 'cupping-and-hemoglobin'],
    publishedDate: '2024-04-22',
    readingTimeMinutes: 4,
    status: 'published'
  },
  {
    id: 'art-12',
    slug: 'cupping-and-back-pain',
    titleAr: 'الحجامة وآلام الظهر: المسببات الميكانيكية ودور الرعاية التكميلية',
    titleEn: 'Cupping Therapy and Back Pain: Mechanical Factors & Adjunctive Care',
    categoryId: 'cat-health',
    featuredImage: articleImages.backTherapy,
    shortAnswerAr: 'قد تساهم الحجامة في تخفيف التشنج العضلي وتحسين تدفق الدم في عضلات الظهر، لكنها لا تُغني عن الفحص الطبي واستبعاد الانزلاق الغضروفي أو الضغط العصبي.',
    shortAnswerEn: 'Cupping can support relief of paraspinal muscle spasms and enhance local perfusion, but must be paired with clinical assessment to rule out disc herniation or neurological impingement.',
    contentAr: `### شيوع آلام الظهر
تُعد آلام أسفل الظهر من أكثر الشكاوى الحركية انتشاراً، وتتراوح أسبابها بين الإجهاد العضلي الوضعي، وضعف عضلات الجذع، والانزلاقات الغضروفية.

![نموذج تشريحي للعمود الفقري والفقرات القطنية مع أدوات العلاج الطبيعي والتأهيل الحركي التكميلي لآلام الظهر](${articleImages.backTherapy})

### كيف تساعد الحجامة التكميلية؟
* تسهم قوى الشفط في زيادة التروية الدموية الدقيقة للعضلات المحيطة بالعمود الفقري.
* تساعد في إرخاء التقلصات العضلية الحادة وتحسين مرونة اللفافة العضلية (Myofascial Release).
* تعمل كعنصر داعم لبرامج العلاج الطبيعي والتمارين التصحيحية.

### متى يجب مراجعة الطبيب فوراً؟
إذا كان ألم الظهر مصحوباً بأعراض عصبية كالتنميل أو الخدر في الساقين، أو ضعف في قوة القدم، أو اضطراب في التحكم بالمثانة، فإن الحالة تتطلب فحصاً عصبياً وإشعاعياً عاجلاً ولا تكفي الحجامة وحدها.`,
    contentEn: `### Overview
Lower back pain stems from diverse etiologies: postural mechanical overload, core muscular imbalances, and structural disc pathology.

![Anatomical spine and lumbar vertebrae model with physical therapy rehabilitation equipment](${articleImages.backTherapy})

### Adjunctive Benefits of Cupping:
* Decompresses paraspinal myofascial layers and increases microcirculatory perfusion.
* Modulates local nociceptive tone, temporarily easing muscular spasm.
* Acts synergistically with active physical therapy strengthening protocols.

### Red Flags Requiring Immediate Medical Attention:
Presence of progressive radicular numbness, lower extremity motor deficit (foot drop), or cauda equina red flags requires urgent neurosurgical appraisal.`,
    relatedArticleSlugs: ['cupping-and-shoulder-pain', 'what-is-cupping-therapy'],
    publishedDate: '2024-04-26',
    readingTimeMinutes: 5,
    status: 'published'
  },
  {
    id: 'art-13',
    slug: 'cupping-and-shoulder-pain',
    titleAr: 'الحجامة وآلام الكتف ولوح الكتف: التقييم العضلي والمفصلي',
    titleEn: 'Cupping for Shoulder & Scapular Pain: Musculoskeletal Perspectives',
    categoryId: 'cat-health',
    featuredImage: articleImages.backTherapy,
    shortAnswerAr: 'تفيد الحجامة في تهدئة التوتر العضلي في منطقة أعلى الظهر وحول لوح الكتف الناتج عن الجلوس المكتبي، مع ضرورة تقييم أوتار الكفة المدورة بدقة.',
    shortAnswerEn: 'Cupping is beneficial in relieving periscapular and trapezius stiffness associated with desk work, alongside thorough assessment of rotator cuff integrity.',
    contentAr: `### آلام الكتف ولوح الكتف
يعاني العديد من الموظفين ومستخدمي الحاسوب من تيبس وألم مستمر بين لوحي الكتف وفي العضلة شبه المنحرفة (Trapezius).

### المنهجية التقييمية:
* **التفريق بين الألم العضلي وألم الأوتار:** يجب فحص أوتار الكتف (Rotator Cuff) واستبعاد الالتهابات الكلسية أو تمزق الأوتار.
* **التطبيق التكاملي:** دمج الحجامة الجافة أو المساجية مع تمارين استطالة الصدر وتقوية عضلات أعلى الظهر يعطي نتائج أكثر ديمومة واستقراراً.`,
    contentEn: `### Periscapular Discomfort
Prolonged desk postures and repetitive loads frequently manifest as chronic hypertonicity across the trapezius, levator scapulae, and rhomboid musculature.

### Clinical Assessment:
* Differentiating between postural myofascial trigger points and rotator cuff tendinopathy or cervical spine referred pain.
* Combining cupping with scapular stabilization drills yields sustainable postural relief.`,
    relatedArticleSlugs: ['cupping-and-back-pain', 'types-of-cupping-therapy'],
    publishedDate: '2024-04-30',
    readingTimeMinutes: 4,
    status: 'published'
  },
  {
    id: 'art-14',
    slug: 'cupping-and-smoking-cessation',
    titleAr: 'الحجامة والتدخين: حقائق علمية وتصحيح المفاهيم الخاطئة',
    titleEn: 'Cupping and Smoking: Scientific Facts & Myth Clarification',
    categoryId: 'cat-health',
    shortAnswerAr: 'الحجامة ليست علاجاً للإقلاع عن التدخين ولا تزيل نيكوتين السجائر من الجسم؛ التدخل الصحي الوحيد الفعّال هو التوقف عن التبغ ببرامج معتمدة.',
    shortAnswerEn: 'Cupping is not an addiction treatment or smoking detox; evidence-based behavioral and pharmacological smoking cessation programs remain the definitive solution.',
    contentAr: `### تصحيح المفاهيم الشائعة
يدّعي بعض المروجين بشكل غير علمي أن الحجامة تسحب سموم السجائر أو تجعل الشخص يكره التدخين تلقائياً.

### الحقيقة العلمية:
* الحجامة لا تُخلص الرئتين أو الدم من ترسبات النيكوتين والقطران.
* قد يشعر المدخن بنوع من الاسترخاء العام وتخفيف الشد العضلي، لكن هذا لا يمثل علاجاً لإدمان التبغ.
* الركيزة الحقيقية لحماية الصحة هي العزيمة والإقلاع الكامل عن التدخين بالاستعانة بالعيادات المتخصصة.`,
    contentEn: `### Deconstructing Common Misconceptions
Popular claims occasionally advertise cupping as an instant "detox" for tobacco carcinogens.

### Scientific Evidence:
* Cupping does not purge alveolar tar deposits or accelerate nicotine clearance from systemic receptors.
* While generalized relaxation may be experienced, it must not substitute for structured tobacco cessation therapies.`,
    relatedArticleSlugs: ['cupping-and-hemoglobin', 'safety-principles-in-cupping'],
    publishedDate: '2024-05-04',
    readingTimeMinutes: 4,
    status: 'published'
  },
  {
    id: 'art-15',
    slug: 'cupping-and-hemoglobin',
    titleAr: 'الحجامة والهيموجلوبين: محاذير هامة حول فقر الدم وتعداد الدم',
    titleEn: 'Cupping and Hemoglobin: Blood Counts and Anemia Precautions',
    categoryId: 'cat-health',
    shortAnswerAr: 'الحجامة الرطبة لا ترفع نسبة الهيموجلوبين في الدم، ويجب الحذر الشديد وفحص مستويات الدم لمن يعانون من الأنيميا أو التعب غير المبرر قبل أي إجراء.',
    shortAnswerEn: 'Wet cupping does not elevate serum hemoglobin; individuals with known or suspected anemia must verify complete blood counts before undergoing bloodletting.',
    contentAr: `### ما هو الهيموجلوبين ولماذا يهم؟
الهيموجلوبين بروتين حيوي في خلايا الدم الحمراء ينقل الأكسجين إلى كافة أنسجة الجسم وخلاياه.

### محاذير سريرية حاسمة:
* **خرافة رفع الهيموجلوبين:** لا يوجد سند علمي للادعاء بأن فقدان الدم عبر الحجامة الرطبة يعالج الأنيميا أو يرفع الهيموجلوبين بشكل مباشر.
* **خطر فقر الدم:** الأشخاص الذين لديهم هيموجلوبين منخفض (أقل من 10–11 g/dL) يجب عليهم الامتناع عن الحجامة الرطبة لتجنب تفاقم الدوار والضعف العام.`,
    contentEn: `### Hemoglobin Function
Hemoglobin is the primary iron-rich protein complex responsible for oxygen delivery across peripheral tissues.

### Key Clinical Clarifications:
* **The "Booster" Myth:** There is no evidence supporting claims that wet cupping acts as a primary cure for iron-deficiency anemia.
* **Screening Thresholds:** Individuals with marked anemia should avoid wet cupping to prevent worsening fatigue or symptomatic hypotension.`,
    relatedArticleSlugs: ['contraindications-and-medical-evaluation', 'cupping-for-women'],
    publishedDate: '2024-05-08',
    readingTimeMinutes: 4,
    status: 'published'
  },
  {
    id: 'art-16',
    slug: 'cupping-and-ibs',
    titleAr: 'الحجامة ومتلازمة القولون العصبي: إدارة التوتر والأعراض',
    titleEn: 'Cupping and Irritable Bowel Syndrome (IBS): Adjunct Modalities',
    categoryId: 'cat-health',
    shortAnswerAr: 'القولون العصبي اضطراب وظيفي معقد؛ قد تساعد الحجامة الجافة في تحفيز الاسترخاء وتخفيف التوتر العصبي الذي يفاقم نوبات القولون، دون أن تكون علاجاً نهائياً.',
    shortAnswerEn: 'IBS is a multifactorial disorder; cupping may assist by inducing parasympathetic relaxation and relieving stress-induced tension, serving as an adjunct to dietary care.',
    contentAr: `### فهم متلازمة القولون العصبي
القولون العصبي (IBS) اضطراب وظيفي في الجهاز الهضمي يرتبط ارتباطاً وثيقاً بالحالة النفسية، والتوتر، وحساسية الأمعاء.

### دور العلاج التكاملي:
* تساعد تقنيات الاسترخاء والشفط الخفيف في تنشيط الجهاز العصبي اللاودي (Parasympathetic)، مما قد يسهم في تهدئة التشنجات البطنية الناتجة عن التوتر العصبي.
* لا يمكن للحجامة أن تحل محل الحمية الغذائية المناسبة، وتعديل نمط الحياة، والأدوية الموصوفة من طبيب الجهاز الهضمي.`,
    contentEn: `### IBS Overview
Irritable Bowel Syndrome reflects dysregulation of the gut-brain axis, significantly modulated by psychological stressors and dietary triggers.

### Complementary Role:
* Mild parasympathetic stimulation via dry/moving cupping may alleviate perceived abdominal muscular guarding and somatic stress.
* It must never displace dietary management (such as low-FODMAP protocols) or gastroenterology oversight.`,
    relatedArticleSlugs: ['cupping-and-stress-relaxation', 'what-is-cupping-therapy'],
    publishedDate: '2024-05-12',
    readingTimeMinutes: 4,
    status: 'published'
  },
  {
    id: 'art-17',
    slug: 'cupping-and-gout',
    titleAr: 'الحجامة والنقرس: حدود الممارسة وأهمية العلاج الطبي لحمض اليوريك',
    titleEn: 'Cupping and Gout: Uric Acid Realities and Medical Boundaries',
    categoryId: 'cat-health',
    shortAnswerAr: 'الحجامة لا تسحب بلورات حمض اليوريك من المفاصل الملتهبة ولا تشفي النقرس؛ يُمنع تطبيق الكؤوس فوق المفصل الملتهب ويجب الالتزام بالعلاج الدوائي المنظم لليوريك.',
    shortAnswerEn: 'Cupping cannot extract uric acid crystals from inflamed joints; application over acutely inflamed joints is contraindicated and medical management is mandatory.',
    contentAr: `### طبيعة مرض النقرس
النقرس نوع من التهاب المفاصل ينتج عن تراكم بلورات حمض اليوريك (Uric Acid) داخل المحفظة المفصلية، وغالباً ما يصيب مفصل إصبع القدم الكبير أو الكاحل.

### التنبيهات السريرية:
* **ممنوع الكأس فوق المفصل الملتهب:** وضع كؤوس الحجامة مباشرة فوق مفصل مصاب بالتهاب نقرسي حاد قد يزيد الألم والالتهاب بشكل كبير.
* **الاعتماد على الفحص المخبري:** يتطلب النقرس أدوية تخفيض حمض اليوريك وضبط النظام الغذائي، ولا تعد الحجامة بديلاً عن ذلك.`,
    contentEn: `### Pathology of Gout
Gout is a metabolic inflammatory arthritis driven by supersaturation and deposition of monosodium urate crystals within synovial capsules.

### Direct Clinical Cautions:
* Never apply vacuum cups over an acutely erythematous, swollen gouty joint.
* Cupping does not substitute for xanthine oxidase inhibitors or nutritional purine restrictions.`,
    relatedArticleSlugs: ['contraindications-and-medical-evaluation', 'safety-principles-in-cupping'],
    publishedDate: '2024-05-16',
    readingTimeMinutes: 4,
    status: 'published'
  },
  {
    id: 'art-18',
    slug: 'cupping-and-diabetes',
    titleAr: 'الحجامة ومرض السكري: معايير السلامة والتئام الجروح',
    titleEn: 'Cupping and Diabetes Mellitus: Critical Safety Precautions',
    categoryId: 'cat-health',
    shortAnswerAr: 'تتطلب الحجامة لمرضى السكري حذراً بالغاً بسبب بطء التئام الجروح وزيادة قابلية العدوى؛ يجب ضبط السكر تماماً وتجنب وضع الكؤوس على الأقدام أو الساقين.',
    shortAnswerEn: 'Diabetic individuals face heightened risks of impaired microvascular wound healing and infection; tight glycemic control is mandatory and distal leg application must be avoided.',
    contentAr: `### تأثير السكري على الإجراءات الجلدية
يؤثر مرض السكري غير المنضبط سلباً على الدورة الدموية الطرفية وسرعة التئام الأنسجة ومناعة الجلد ضد البكتيريا.

### الاشتراطات الصارمة لمرضى السكري:
* التحقق من فحص السكر التراكمي (HbA1c) ومستويات سكر الدم قبل الإجراء.
* الالتزام بأعلى معايير التعقيم لتفادي أي عدوى بكتيرية ثانوية في مواضع التشريط.
* تجنب الأطراف السفلية والقدمين تماماً عند وجود أي علامات لاعتلال الأعصاب السكري أو ضعف النبض الشرياني.
* لا تغني الحجامة مطلقاً عن الإنسولين أو منظمات السكر الفموية.`,
    contentEn: `### Microvascular and Dermatological Considerations
Uncontrolled hyperglycemia compromises neutrophil function, microvascular perfusion, and cellular wound repair.

### Strict Procedural Criteria:
* Confirmation of recent glycemic stability and HbA1c appraisal.
* Ultra-meticulous antiseptic skin preparation.
* Avoidance of the feet and lower extremities to prevent diabetic foot ulceration.
* Cupping never substitutes for antidiabetic medications or insulin therapy.`,
    relatedArticleSlugs: ['safety-principles-in-cupping', 'contraindications-and-medical-evaluation'],
    publishedDate: '2024-05-20',
    readingTimeMinutes: 5,
    status: 'published'
  },
  {
    id: 'art-19',
    slug: 'cupping-and-hypertension',
    titleAr: 'الحجامة وارتفاع ضغط الدم: ضوابط المراقبة والمتابعة الطبية',
    titleEn: 'Cupping and Hypertension: Hemodynamic Monitoring Protocols',
    categoryId: 'cat-health',
    shortAnswerAr: 'ارتفاع ضغط الدم يحتاج التزاماً بالأدوية الطبية؛ قد تسهم الحجامة في تهدئة الجهاز العصبي وتقليل الشد، لكنها لا تُعد بديلاً عن أدوية الضغط ولا يجوز إجراؤها في أزمات الارتفاع الحاد.',
    shortAnswerEn: 'Hypertension requires strict pharmacological compliance; cupping may assist through general stress reduction, but never replaces antihypertensive regimens.',
    contentAr: `### ضغط الدم والرعاية التكميلية
يعد ارتفاع ضغط الدم عامل خطورة رئيسياً لصحة القلب والأوعية الدموية.

### الإجراءات الوقائية:
* قياس ضغط الدم قبل الجلسة؛ ويُمنع إجراء الحجامة إذا كان الضغط مرتفعاً بشكل حاد (مثل قراءات تتجاوز 180/110 mmHg).
* التأكيد على المريض بعدم التوقف عن تناول أدوية الضغط الموصوفة له بدعوى إجراء الحجامة.`,
    contentEn: `### Cardiovascular Context
Essential hypertension requires chronic lifestyle and pharmacological regulation to safeguard vascular health.

### Pre-Procedure Safeguards:
* Vital signs assessment prior to therapy. Cupping is contraindicated during acute hypertensive crises.
* Clear instructions that cupping must never justify pausing antihypertensive therapies.`,
    relatedArticleSlugs: ['safety-principles-in-cupping', 'contraindications-and-medical-evaluation'],
    publishedDate: '2024-05-24',
    readingTimeMinutes: 4,
    status: 'published'
  },
  {
    id: 'art-20',
    slug: 'cupping-and-autoimmune-conditions',
    titleAr: 'الحجامة وأمراض المناعة الذاتية: التعقيد الطبي وحدود التدخل',
    titleEn: 'Cupping and Autoimmune Conditions: Navigating Clinical Complexity',
    categoryId: 'cat-health',
    shortAnswerAr: 'أمراض المناعة الذاتية معقدة وتختلف باختلاف نشاط المرض؛ لا تُعيد الحجامة برمجة جهاز المناعة ويجب استشارة الطبيب المشرف قبل خضوع المريض لأي إجراء تكميلي.',
    shortAnswerEn: 'Autoimmune diseases are immunologically complex; cupping does not reset the immune system, and consultation with treating rheumatologists is essential.',
    contentAr: `### فهم أمراض المناعة الذاتية
تشمل حالات مثل الذئبة الحمراء، التصلب المتعدد، والتهاب المفاصل الروماتويدي، حيث يهاجم جهاز المناعة خلايا الجسم بالخطأ.

### الضوابط السريرية:
* **رفض الادعاءات المبالغ فيها:** لا تدّعي الممارسة المهنية أن الحجامة تشفي أمراض المناعة أو توقف نشاط الأجسام المضادة.
* **الحذر من الأدوية المثبطة للمناعة:** يتناول العديد من هؤلاء المرضى أدوية كورتيزون أو مثبطات حيوية، مما يجعلهم أكثر عرضة للعدوى وبطء التئام الجلد، مما يتطلب تقييماً فائق الدقة.`,
    contentEn: `### Immunological Background
Autoimmune disorders (e.g., SLE, MS, rheumatoid arthritis) involve complex immune dysregulation.

### Clinical Boundaries:
* Reject unsubstantiated assertions claiming cupping "resets" or cures autoantibody production.
* Many autoimmune patients receive immunosuppressive or biologic agents, mandating heightened vigilance regarding skin healing and infection risk.`,
    relatedArticleSlugs: ['safety-principles-in-cupping', 'contraindications-and-medical-evaluation'],
    publishedDate: '2024-05-28',
    readingTimeMinutes: 4,
    status: 'published'
  },
  {
    id: 'art-21',
    slug: 'cupping-and-fertility',
    titleAr: 'الحجامة وتأخر الإنجاب: الأسباب الطبية وأهمية التشخيص المتخصص',
    titleEn: 'Cupping and Fertility Concerns: The Need for Medical Diagnosis',
    categoryId: 'cat-health',
    shortAnswerAr: 'تأخر الإنجاب له أسباب تشريحية وهرمونية وجينية دقيقة لكلا الزوجين؛ الحجامة وحدها لا تعالج العقم ويجب الخضوع للتحاليل الطبية الشاملة لدى أطباء العقم والخصوبة.',
    shortAnswerEn: 'Subfertility involves complex endocrine, anatomical, and genetic factors for both partners; cupping is not a standalone fertility treatment and comprehensive medical testing is vital.',
    contentAr: `### نظرة موضوعية لتأخر الإنجاب
يتطلب تأخر الحمل تقييماً طبياً دقيقاً يشمل تحاليل السائل المنوي، تصوير الرحم والأنابيب، وفحص الهرمونات.

### دور الحجامة التكميلي المحتمل:
* قد تساعد في خفض مستويات التوتر العصبي وتحسين الدورة الدموية في منطقة الحوض لدى بعض الحالات المستقرة كإجراء تكميلي، دون أي ادعاء بأنها بديل عن علاجات المساعدة على الإنجاب (IVF) أو تصحيح الانسدادات العضوية.`,
    contentEn: `### Objective View on Subfertility
Fertility challenges require evidence-guided diagnostic workups (semen analysis, tubal patency tests, ovarian reserve profiles).

### Adjunctive Demarcation:
* While somatic stress reduction may positively influence autonomic tone, cupping cannot resolve anatomical tubal occlusions or severe male factor subfertility.`,
    relatedArticleSlugs: ['cupping-for-women', 'cupping-and-stress-relaxation'],
    publishedDate: '2024-06-01',
    readingTimeMinutes: 4,
    status: 'published'
  },
  {
    id: 'art-22',
    slug: 'cupping-and-stress-relaxation',
    titleAr: 'الحجامة والضغط النفسي والاسترخاء العصبي العضلي',
    titleEn: 'Cupping, Stress Management, and Neuromuscular Relaxation',
    categoryId: 'cat-health',
    shortAnswerAr: 'يُظهر العديد من الأشخاص شعوراً بالراحة والاسترخاء بعد الجلسة نتيجة لتحفيز المستقبلات الحسية في الجلد وإفراز الإندورفين، لكنها ليست علاجاً للاضطرابات النفسية السريرية.',
    shortAnswerEn: 'Many patients report deep somatic relaxation and tension relief secondary to cutaneous sensory stimulation and endorphin release, serving as a stress-relief modality.',
    contentAr: `### تأثير الحجامة على التوتر
يؤدي الإجهاد النفسي المستمر إلى زيادة إفراز هرمون الكورتيزول وتشنج مزمن في عضلات الرقبة وأعلى الظهر.

### الآليات المهدئة المقترحة:
* تحفيز المستقبلات الميكانيكية العصبية في الجلد يساعد في تهدئة الجهاز العصبي الودي.
* توفير بيئة هادئة ومريحة أثناء الجلسة يسهم في تحسين جودة النوم والراحة الذاتية.`,
    contentEn: `### Neuromuscular Tension Relief
Chronic psychological stress correlates with elevated sympathetic drive and sustained myofascial splinting across cervical and thoracic chains.

### Physiological Mechanisms:
* Cutaneous mechanoreceptor stimulation promotes downregulation of sympathetic output and enhances parasympathetic tone.
* Facilitates transient release of endogenous opioids (endorphins), enhancing perceived somatic wellbeing.`,
    relatedArticleSlugs: ['what-is-cupping-therapy', 'cupping-and-back-pain'],
    publishedDate: '2024-06-05',
    readingTimeMinutes: 4,
    status: 'published'
  },
  {
    id: 'art-23',
    slug: 'scientific-theories-and-mechanisms-of-cupping',
    titleAr: 'النظريات والآليات الحيوية المقترحة لتفسير تأثيرات الحجامة',
    titleEn: 'Scientific Hypotheses & Biological Mechanisms in Cupping',
    categoryId: 'cat-understanding',
    shortAnswerAr: 'يقترح الباحثون آليات حيوية متعددة تشمل زيادة التروية الدموية، تنشيط اللفافة العضلية، نظرية بوابة التحكم في الألم، وتحفيز الاستجابة المناعية الموضعية.',
    shortAnswerEn: 'Researchers propose several biological mechanisms including localized hyperemia, myofascial decompression, pain-gate modulation, and local immunomodulation.',
    contentAr: `### كيف تُفسر الأبحاث تأثير الحجامة؟
يطرح الباحثون وعلماء وظائف الأعضاء عدة فرضيات علمية لتفسير التأثيرات السريرية الملاحظة:
1. **التروية الموضعية والدورة الدموية:** يؤدي الشفط السلبي إلى تمدد الأوعية الدموية الدقيقة وزيادة تدفق الأكسجين وتصريف نواتج الأيض المتراكمة.
2. **نظرية بوابة الألم (Pain Gate Theory):** تحفيز النهايات العصبية الجلدية الكبيرة يثبط انتقال إشارات الألم في النخاع الشوكي.
3. **تعديل اللفافة العضلية (Fascial Decompression):** رفع طبقات اللفافة الملتصقة يُعيد مرونتها الحركية.
4. **التأثيرات المناعية ومضادات الأكسدة:** تحفيز إنتاج مضادات الأكسدة الذاتية في موضع الشفط.`,
    contentEn: `### Contemporary Hypotheses
Physiologists and integrative medicine researchers propose multifaceted hypotheses:
1. **Hyperemia & Microcirculation:** Negative pressure induces arteriolar vasodilation, improving oxygenation and clearance of local metabolic byproducts.
2. **Pain Gate Theory:** Robust cutaneous tactile input modulates nociceptive transmission at spinal dorsal horn neurons.
3. **Myofascial Decompression:** Tensile mechanical pull decompresses adherent fascial planes, restoring glide.
4. **Local Immunomodulation:** Stimulates localized cytokine expression and cellular repair cascades.`,
    relatedArticleSlugs: ['what-is-cupping-therapy', 'types-of-cupping-therapy', 'safety-principles-in-cupping'],
    publishedDate: '2024-06-10',
    readingTimeMinutes: 5,
    status: 'published'
  }
];

export const initialFAQ: FAQItem[] = [
  {
    id: 'faq-1',
    questionAr: 'ما هو الترخيص والتصنيف المهني المعتمد للدكتور محمود في المملكة العربية السعودية؟',
    questionEn: "What is Dr. Mahmoud's official license and classification in Saudi Arabia?",
    answerAr: 'الدكتور محمود علي نبيه مصنف ومرخص رسمياً كـ "أخصائي علاج طبيعي" (Specialist - Physiotherapy) من قِبل الهيئة السعودية للتخصصات الصحية (SCFHS) برقم ملف مهني: 22392609، وتاريخ صدور القرار: 27 فبراير 2023م (شعبان 1444هـ)، بعد اجتيازه بنجاح اختبار البرومتريك للتقييم المهني (Pearson VUE Prometric).',
    answerEn: "Dr. Mahmoud Ali Nabih is officially certified and registered as a 'Specialist - Physiotherapy' by the Saudi Commission for Health Specialties (SCFHS), Profile No. 22392609, decision date February 27, 2023 (Sha'ban 1444 AH), having successfully passed the Pearson VUE Prometric Physiotherapy Examination in February 2023.",
    category: 'Credentials',
    order: 1,
    published: true
  },
  {
    id: 'faq-2',
    questionAr: 'ما هي المؤهلات الأكاديمية والدرجات العلمية التي يحملها؟',
    questionEn: 'What academic degrees and postgraduate diplomas does he hold?',
    answerAr: 'يحمل د. محمود: \n1. بكالوريوس العلاج الطبيعي من كلية العلاج الطبيعي بجامعة القاهرة (2003–2008م بتقدير عام جيد جداً).\n2. دبلوم تطبيقات الليزر الطبي من المعهد القومي لليزر بجامعة القاهرة (2014م).\n3. دبلوم التدريب المهني في الإدارة السريرية للتغذية العلاجية من أكاديمية السادات للعلوم الإدارية (2022–2023م بواقع 180 ساعة تدريبية).',
    answerEn: 'Dr. Mahmoud holds:\n1. Bachelor of Science (B.Sc.) in Physical Therapy from the Faculty of Physical Therapy, Cairo University (2003–2008, Grade: Very Good).\n2. Postgraduate Diploma in Medical Laser Applications from the National Laser Science Institute, Cairo University (2014).\n3. Professional Training Diploma in Clinical Nutrition Management from the Sadat Academy for Management Sciences (2022–2023, 180 training hours).',
    category: 'Credentials',
    order: 2,
    published: true
  },
  {
    id: 'faq-3',
    questionAr: 'ما هي الشهادات المتخصصة التي حصل عليها في الحجامة والطب التكميلي؟',
    questionEn: 'What specialized certifications does he possess in Cupping Therapy?',
    answerAr: 'أتم د. محمود الدورة التخصصية المعتمدة في العلاج بالكؤوس (الحجامة الطبية) من النقابة العامة للعلاج الطبيعي بمصر عام 2008م (1429هـ)، بالإضافة إلى دورة متخصصة في الوخز بالإبر الصينية (Acupuncture) عام 2009م، مع أكثر من 8 ورش عمل متقدمة في تأهيل الكتف، والركبة، والشريط الحركي، والعلاج اليدوي.',
    answerEn: 'Dr. Mahmoud completed the certified Cupping Therapy (Hijama) Course accredited by the General Syndicate of Physical Therapy in Egypt in 2008 (1429 AH), along with specialized Acupuncture training in 2009 (1430 AH), complemented by 8+ advanced workshops in shoulder rehab, knee sports injuries, kinesiology taping, and manual therapy.',
    category: 'Credentials',
    order: 3,
    published: true
  },
  {
    id: 'faq-4',
    questionAr: 'كم تبلغ سنوات الخبرة السريرية للدكتور محمود وأين عمل؟',
    questionEn: 'How many years of clinical experience does Dr. Mahmoud have, and where has he practiced?',
    answerAr: 'يمتلك د. محمود أكثر من 15 عاماً من الخبرة السريرية المتواصلة (منذ عام 2008م). يعمل حالياً كـ "أخصائي حجامة وعلاج طبيعي أول" في مركز الدواء الأمثل للحجامة بالدمام (منذ أغسطس 2024م وحتى الآن). وقبل ذلك عمل كـ "أخصائي حجامة وعلاج طبيعي" في مركز تميز للحجامة بالمدينة المنورة (ديسمبر 2023م – يوليو 2024م). كما عمل لسنوات طويلة بمستشفى بسيون المركزي ومستشفى قطور المركزي والمراكز التخصصية في مصر.',
    answerEn: 'Dr. Mahmoud possesses over 15 years of continuous clinical experience (since 2008). He currently serves as Senior Hijama Specialist and Physical Therapist at Al-Dawaa Cupping Center in Dammam (August 2024 – Present). Prior to this, he practiced as Hijama Specialist and Physical Therapist at Tamayuz Hijama Center in Madinah (December 2023 – July 2024), preceded by extensive hospital tenures at Basion General Hospital and Central Qutour Hospital in Egypt.',
    category: 'Experience',
    order: 4,
    published: true
  },
  {
    id: 'faq-5',
    questionAr: 'أين عمل في المدينة المنورة قبل انتقاله إلى الدمام؟',
    questionEn: 'Where in Madinah did he practice before moving to Dammam?',
    answerAr: 'عمل كأخصائي حجامة وعلاج طبيعي في "مركز تميز للحجامة" بالمدينة المنورة خلال الفترة من ديسمبر 2023م وحتى يوليو 2024م (جمادى الأولى 1445هـ – محرم 1446هـ)، حيث تولى إدارة الجلسات السريرية وبرامج التأهيل ودمج الحجامة مع برامج العلاج الطبيعي للمرضى.',
    answerEn: 'He served as Hijama Specialist and Physical Therapist at Tamayuz Hijama Center in Madinah from December 2023 through July 2024 (Jumada al-Ula 1445 AH – Muharram 1446 AH), managing specialized clinical sessions and combining physical therapy modalities with cupping.',
    category: 'Experience',
    order: 5,
    published: true
  },
  {
    id: 'faq-6',
    questionAr: 'ما هي فلسفة الدكتور محمود في الممارسة السريرية والدمج بين الحجامة والعلاج الطبيعي؟',
    questionEn: 'What is his clinical approach to integrating cupping with physical therapy?',
    answerAr: 'يرتكز منهجه على التقييم السريري الدقيق المبني على أسس التشريح والميكانيكا الحيوية. لا تُمارس الحجامة كإجراء عشوائي، بل كتدخل تكميلي موجه يندمج مع تقنيات العلاج الطبيعي والتأهيل الحركي لتسريع التئام الأنسجة وتخفيف الشد العضلي والألم، مع إعطاء الأولوية المطلقة للسلامة والتشخيص الطبي المسبق.',
    answerEn: 'His methodology is founded on rigorous musculoskeletal and biomechanical assessment. Cupping is never applied indiscriminately, but rather as an evidence-informed adjunct integrated with manual therapy and therapeutic exercises to accelerate tissue recovery and relieve myofascial spasm while maintaining patient safety as the foundational priority.',
    category: 'Approach',
    order: 6,
    published: true
  },
  {
    id: 'faq-7',
    questionAr: 'هل يطرح الدكتور محمود الحجامة كبديل عن الطب الحديث أو الأدوية؟',
    questionEn: 'Does Dr. Mahmoud position cupping as a substitute for conventional medicine?',
    answerAr: 'قطعاً لا. يشدد الدكتور محمود دوماً على أن الحجامة ممارسة تكميلية تعمل بالتآزر مع الرعاية الطبية الحديثة، ولا تحل مطلقاً محل الفحص الطبي المتخصص أو التوقف عن الأدوية الموصوفة أو علاج الأمراض العضوية المزمنة دون متابعة الطبيب الاستشاري المعالج.',
    answerEn: 'Strictly no. Dr. Mahmoud consistently emphasizes that medical cupping is a complementary modality that functions synergistically alongside modern healthcare. It must never substitute for physician consultation, prescribed pharmacology, or conventional management of chronic medical conditions.',
    category: 'Approach',
    order: 7,
    published: true
  },
  {
    id: 'faq-8',
    questionAr: 'ما هي معايير مكافحة العدوى والتعقيم التي يلتزم بها؟',
    questionEn: 'What infection control and sterilization standards are practiced?',
    answerAr: 'يلتزم د. محمود بأعلى البروتوكولات المعتمدة من الهيئة السعودية للتخصصات الصحية ووزارة الصحة: استخدام كؤوس طبية معقمة ذات استخدام وحيد لكل مراجع وتُتلف فوراً، واستخدام أدوات تشريط جراحية معقمة ذات استخدام فردي، وتعقيم الجلد بالمطهرات المعتمدة قبل وبعد الجلسة، والتخلص الآمن من النفايات الطبية الحادة في حاويات معتمدة.',
    answerEn: 'He strictly adheres to guidelines mandated by the SCFHS and Ministry of Health: exclusively utilizing single-use pre-sterilized medical cups, disposable surgical lancets, medical-grade skin antiseptics, and immediate disposal in certified biohazard sharps containers.',
    category: 'Practice',
    order: 8,
    published: true
  },
  {
    id: 'faq-9',
    questionAr: 'ما هو الهدف من هذا الموقع والمركز المعرفي؟',
    questionEn: 'What is the purpose of this website and knowledge center?',
    answerAr: 'يهدف الموقع لتوثيق المؤهلات المعتمدة والخبرات السريرية للدكتور محمود علي نبيه في العلاج الطبيعي والحجامة الطبية، وتقديم مقالات تثقيفية موثوقة لرفع الوعي الصحي، وتسهيل التواصل المباشر وحجز الاستشارات السريرية.',
    answerEn: 'The platform aims to document the certified credentials and clinical experience of Dr. Mahmoud Ali Nabih in physiotherapy and medical cupping, offer reliable educational articles, and facilitate direct professional inquiries and consultations.',
    category: 'Contact',
    order: 9,
    published: true
  },
  {
    id: 'faq-10',
    questionAr: 'كيف يمكن التواصل المهني مع الدكتور محمود؟',
    questionEn: 'How can Dr. Mahmoud be reached for professional communication?',
    answerAr: 'عبر وسائل الاتصال المعتمدة في سيرته الذاتية: اتصال هاتفي ورسائل واتساب مباشرة على الرقم: 0540832104 (966+)، أو عبر البريد الإلكتروني: mahmoud@wshealthmail.com / drmnabih.87@gmail.com، أو من خلال زر حجز الاستشارة المباشر ونموذج التواصل المهني في هذا الموقع.',
    answerEn: 'Through verified contact channels from his curriculum vitae: Direct Mobile & WhatsApp: +966 54 083 2104, Emails: mahmoud@wshealthmail.com / drmnabih.87@gmail.com, or via the online consultation booking button and professional inquiry form on this platform.',
    category: 'Contact',
    order: 10,
    published: true
  }
];

export const initialSiteSettings: SiteSettings = {
  heroHeadlineAr: 'د. محمود علي نبيه عبد الغني',
  heroHeadlineEn: 'Dr. Mahmoud Ali Nabih Abdelghaney',
  heroSubtitleAr: 'أخصائي علاج طبيعي مسجل (SCFHS) | خبير الحجامة الطبية والتأهيل الحركي',
  heroSubtitleEn: 'SCFHS Registered Physiotherapy Specialist | Hijama & Cupping Therapy Expert',
  heroDescriptionAr: 'أكثر من 15 عاماً من الخبرة السريرية في مستشفيات ومراكز المملكة العربية السعودية ومصر، نجمع فيها بين تقنيات الحجامة المعقمة وأحدث أساليب العلاج الطبيعي والتأهيل الحركي المبني على الأدلة.',
  heroDescriptionEn: 'Over 15 years of clinical expertise across premier healthcare facilities in Saudi Arabia and Egypt, bridging sterile medical cupping techniques with modern evidence-based physical therapy and rehabilitation.',
  contactPhone: '+966 54 083 2104',
  whatsappPhone: '+966 54 083 2104',
  bookingUrl: 'https://wa.me/966540832104?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%20%D9%88%D8%B1%D8%AD%D9%85%D8%A9%20%D8%A7%D9%84%D9%84%D9%87%20%D9%88%20%D8%A8%D8%B1%D9%83%D8%A7%D8%AA%D9%87%20%D8%AF%D9%83%D8%AA%D9%88%D8%B1%20%D9%85%D8%AD%D9%85%D9%88%D8%AF%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AD%D8%AC%D8%B2%20%D8%A7%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1%D8%A9.',
  contactEmailPrimary: 'mahmoud@wshealthmail.com',
  contactEmailSecondary: 'drmnabih.87@gmail.com',
  locationAr: 'الدمام، المملكة العربية السعودية',
  locationEn: 'Dammam, Saudi Arabia',
  linkedinUrl: '',
  doctorPhotoUrl: drMahmoudDefaultPhoto
};

export const initialExperiences: ExperienceItem[] = [
  {
    id: 'exp-1',
    titleAr: 'أخصائي حجامة وعلاج طبيعي أول',
    titleEn: 'Senior Hijama Specialist / Physical Therapist',
    organizationAr: 'مركز الدواء الأمثل للحجامة (Al-Dawaa Cupping Center)',
    organizationEn: 'Al-Dawaa Cupping Center',
    locationAr: 'الدمام، المملكة العربية السعودية',
    locationEn: 'Dammam, Saudi Arabia',
    periodAr: 'أغسطس 2024م – حتى الآن (محرم 1446هـ – حتى الآن)',
    periodEn: 'August 2024 – Present (Muharram 1446 AH – Present)',
    isCurrent: true,
    responsibilitiesAr: [
      'تقديم جلسات الحجامة الطبية (الرطبة والجافة) بمعايير احترافية عالية في أحد أبرز المراكز المتخصصة في المنطقة الشرقية.',
      'تقييم شامل للحالات وتصميم خطط علاجية متكاملة تجمع بين الحجامة وتقنيات العلاج الطبيعي لتسريع التئام الأنسجة.',
      'إدارة سجلات المرضى الإلكترونية (EMR) بدقة عالية، وتوثيق الإجراءات العلاجية وفقاً لبروتوكولات الهيئة السعودية للتخصصات الصحية.',
      'تثقيف المرضى حول فوائد الحجامة الطبية، الرعاية اللاحقة للجلسة، وتعديلات نمط الحياة الصحية.',
      'الالتزام الصارم بمعايير مكافحة العدوى، التعقيم، والسلامة المهنية أثناء جميع الإجراءات السريرية.'
    ],
    responsibilitiesEn: [
      'Deliver professional medical Hijama (wet and dry cupping) sessions with high standards of care at a leading specialized center in the Eastern Province.',
      'Conduct comprehensive patient assessments and design integrated treatment plans combining cupping with physical therapy techniques.',
      'Manage electronic medical records (EMR) with high precision, documenting all procedures in compliance with SCFHS protocols.',
      'Educate patients on the benefits of medical cupping, post-session care, and healthy lifestyle modifications.',
      'Strictly adhere to infection control, sterilization, and occupational safety standards during all clinical procedures.'
    ]
  },
  {
    id: 'exp-2',
    titleAr: 'أخصائي حجامة وعلاج طبيعي',
    titleEn: 'Hijama Specialist / Physical Therapist',
    organizationAr: 'مركز تميز للحجامة (Tamayuz Hijama Center)',
    organizationEn: 'Tamayuz Hijama Center',
    locationAr: 'المدينة المنورة، المملكة العربية السعودية',
    locationEn: 'Madinah, Saudi Arabia',
    periodAr: 'ديسمبر 2023م – يوليو 2024م (جمادى الأولى 1445هـ – محرم 1446هـ)',
    periodEn: 'December 2023 – July 2024 (Jumada al-Ula 1445 AH – Muharram 1446 AH)',
    isCurrent: false,
    responsibilitiesAr: [
      'إجراء جلسات الحجامة المتخصصة والمصممة حسب احتياجات كل مريض لتسكين الآلام المزمنة، إزالة السموم، وتعزيز الدورة الدموية.',
      'دمج العلاج بالحجامة مع برامج التأهيل الطبيعي لتسريع التئام الأنسجة وتحقيق أفضل النتائج السريرية.',
      'إجراء تقييمات شاملة للمرضى، والحفاظ على دقة السجلات الطبية الإلكترونية، وتثقيف المرضى حول الرعاية اللاحقة.',
      'الالتزام التام بمعايير النظافة، التعقيم، وبروتوكولات السلامة المعتمدة من الهيئة السعودية للتخصصات الصحية (SCFHS).'
    ],
    responsibilitiesEn: [
      'Performed specialized Hijama (wet and dry cupping) therapy sessions tailored to individual patient needs for chronic pain relief and circulation enhancement.',
      'Integrated cupping therapy with physical therapy rehabilitation programs to accelerate tissue healing and optimize patient outcomes.',
      'Conducted comprehensive patient assessments, maintained accurate electronic medical records, and educated patients on post-Hijama care.',
      'Ensured strict adherence to hygiene, sterilization, and SCFHS safety protocols during all clinical procedures.'
    ]
  },
  {
    id: 'exp-3',
    titleAr: 'أخصائي علاج طبيعي',
    titleEn: 'Physiotherapy Specialist',
    organizationAr: 'مستشفى بسيون المركزي',
    organizationEn: 'Basion General Hospital',
    locationAr: 'محافظة الغربية، مصر',
    locationEn: 'Gharbia, Egypt',
    periodAr: 'سبتمبر 2018م – سبتمبر 2023م (ذو الحجة 1439هـ – ربيع الأول 1445هـ)',
    periodEn: 'September 2018 – September 2023 (Dhu al-Hijjah 1439 AH – Rabi al-Awwal 1445 AH)',
    isCurrent: false,
    responsibilitiesAr: [
      'إدارة مجموعة متنوعة من الحالات التي تتطلب تأهيل العظام، الأعصاب، والتأهيل ما بعد العمليات الجراحية.',
      'تطوير وتنفيذ خطط علاجية مبنية على الأدلة العلمية باستخدام العلاج اليدوي، العلاج الكهربائي، والتمارين العلاجية.',
      'التعاون مع الفرق الطبية متعددة التخصصات لضمان استمرارية الرعاية وتحقيق أعلى معدلات رضا المرضى.'
    ],
    responsibilitiesEn: [
      'Managed a diverse caseload of patients requiring orthopedic, neurological, and post-operative rehabilitation.',
      'Developed and implemented evidence-based treatment plans utilizing manual therapy, electrotherapy, and therapeutic exercises.',
      'Collaborated with multidisciplinary medical teams to ensure continuity of care and high patient satisfaction rates.'
    ]
  },
  {
    id: 'exp-4',
    titleAr: 'أخصائي علاج طبيعي أول',
    titleEn: 'Senior Physiotherapist',
    organizationAr: 'المركز المتخصص للعلاج الطبيعي (SPT)',
    organizationEn: 'Specialized Physical Therapy Center (SPT)',
    locationAr: 'كفر الشيخ، مصر',
    locationEn: 'Kafr El-Sheikh, Egypt',
    periodAr: 'أكتوبر 2010م – أغسطس 2018م (شوال 1431هـ – ذو الحجة 1439هـ)',
    periodEn: 'October 2010 – August 2018 (Shawwal 1431 AH – Dhu al-Hijjah 1439 AH)',
    isCurrent: false,
    responsibilitiesAr: [
      'قيادة جلسات العلاج الطبيعي للمرضى الذين يعانون من الإصابات الرياضية، الآلام المزمنة، واضطرابات الجهاز العضلي الهيكلي.',
      'الإشراف على العمليات اليومية للعيادة وتوجيه الأخصائيين الجدد للحفاظ على معايير عالية من الرعاية السريرية.'
    ],
    responsibilitiesEn: [
      'Led physical therapy sessions for patients with sports injuries, chronic pain, and musculoskeletal disorders.',
      'Mentored junior therapists and supervised daily clinic operations to maintain high standards of clinical care.'
    ]
  },
  {
    id: 'exp-5',
    titleAr: 'أخصائي علاج طبيعي',
    titleEn: 'Physiotherapist',
    organizationAr: 'مستشفى قطور المركزي (مديرية الشئون الصحية)',
    organizationEn: 'Central Qutour Hospital, Department of Health',
    locationAr: 'محافظة الغربية، مصر',
    locationEn: 'Gharbia, Egypt',
    periodAr: 'أكتوبر 2010م – أغسطس 2018م (شوال 1431هـ – ذو الحجة 1439هـ)',
    periodEn: 'October 2010 – August 2018 (Shawwal 1431 AH – Dhu al-Hijjah 1439 AH)',
    isCurrent: false,
    responsibilitiesAr: [
      'تقديم خدمات التأهيل للمرضى الداخليين والخارجيين، مع التركيز على استعادة الحركة وتقليل الألم وتحسين جودة الحياة.'
    ],
    responsibilitiesEn: [
      'Provided outpatient and inpatient rehabilitation services, focusing on mobility restoration and pain reduction.'
    ]
  },
  {
    id: 'exp-6',
    titleAr: 'أخصائي علاج طبيعي لتأهيل الأطفال',
    titleEn: 'Pediatric Rehabilitation Physiotherapist',
    organizationAr: 'مراكز الرعاية الطبية وتأهيل الأطفال (رعاية، الماجد، الأندلس)',
    organizationEn: 'Reaaya Center / El-Magd Center / El-Andalos Center',
    locationAr: 'الإسكندرية، مصر',
    locationEn: 'Alexandria, Egypt',
    periodAr: 'أكتوبر 2009م – أكتوبر 2010م (شوال 1430هـ – شوال 1431هـ)',
    periodEn: 'October 2009 – October 2010 (Shawwal 1430 AH – Shawwal 1431 AH)',
    isCurrent: false,
    responsibilitiesAr: [
      'التخصص في تأهيل وتطوير حالات الأطفال، وتصميم أنشطة علاجية مناسبة لأعمارهم وحالاتهم المرضية والنمائية.'
    ],
    responsibilitiesEn: [
      'Specialized in the rehabilitation and habilitation of pediatric cases, designing age-appropriate therapeutic activities.'
    ]
  },
  {
    id: 'exp-7',
    titleAr: 'طبيب امتياز',
    titleEn: 'Clinical Intern',
    organizationAr: 'المستشفيات الجامعية، جامعة القاهرة',
    organizationEn: 'Cairo University Teaching Hospital',
    locationAr: 'القاهرة، مصر',
    locationEn: 'Cairo, Egypt',
    periodAr: 'نوفمبر 2008م – أكتوبر 2009م (ذو القعدة 1429هـ – شوال 1430هـ)',
    periodEn: 'November 2008 – October 2009 (Dhu al-Qidah 1429 AH – Shawwal 1430 AH)',
    isCurrent: false,
    responsibilitiesAr: [
      'إكمال التدريب السريري المكثف في مختلف أقسام العلاج الطبيعي، واكتساب خبرة عملية في رعاية الحالات الحادة والمزمنة.'
    ],
    responsibilitiesEn: [
      'Completed intensive clinical rotations across physical therapy departments, gaining hands-on experience in acute and chronic care.'
    ]
  }
];

export const initialQualifications: QualificationItem[] = [
  {
    id: 'qual-1',
    type: 'degree',
    titleAr: 'بكالوريوس العلاج الطبيعي (B.Sc.)',
    titleEn: 'Bachelor of Science in Physical Therapy (B.Sc.)',
    institutionAr: 'كلية العلاج الطبيعي، جامعة القاهرة، مصر',
    institutionEn: 'Faculty of Physical Therapy, Cairo University, Egypt',
    yearAr: '2003م – 2008م (1424هـ – 1429هـ)',
    yearEn: '2003 – 2008 (1424 AH – 1429 AH)',
    detailsAr: 'التقدير العام: جيد جداً. تأهيل شامل في علوم التشريح، وظائف الأعضاء، الميكانيكا الحيوية، والعلاج اليدوي والتأهيلي.',
    detailsEn: 'Grade: Very Good. Comprehensive training in anatomical sciences, exercise physiology, biomechanics, and manual rehabilitation.'
  },
  {
    id: 'qual-2',
    type: 'diploma',
    titleAr: 'دبلوم التدريب المهني في الإدارة السريرية للتغذية العلاجية',
    titleEn: 'Professional Training Diploma in Clinical Nutrition Management',
    institutionAr: 'أكاديمية السادات للعلوم الإدارية، مصر',
    institutionEn: 'Sadat Academy for Management Sciences, Egypt',
    yearAr: 'يناير 2022م – يناير 2023م (جمادى الآخرة 1443هـ – جمادى الآخرة 1444هـ)',
    yearEn: 'Jan 2022 – Jan 2023 (Jumada al-Akhirah 1443 AH – 1444 AH)',
    detailsAr: 'برنامج تدريبي سريري مكثف بواقع 180 ساعة تدريبية، يتناول الأنظمة الغذائية العلاجية وإدارة الأمراض المزمنة.',
    detailsEn: 'Intensive clinical curriculum encompassing 180 verified training hours in therapeutic dietetics and chronic disease nutritional support.'
  },
  {
    id: 'qual-3',
    type: 'diploma',
    titleAr: 'دبلوم تطبيقات الليزر الطبي',
    titleEn: 'Diploma in Medical Laser Applications',
    institutionAr: 'المعهد القومي لعلوم الليزر، جامعة القاهرة، مصر',
    institutionEn: 'National Laser Science Institute, Cairo University, Egypt',
    yearAr: '2014م (1435هـ)',
    yearEn: '2014 (1435 AH)',
    detailsAr: 'تطبيقات الليزر العلاجي منخفض الشدة في تسريع التئام الأنسجة وإدارة الآلام العضلية والمفصلية.',
    detailsEn: 'Photobiomodulation and low-level laser therapy (LLLT) for tissue healing acceleration and musculoskeletal pain control.'
  },
  {
    id: 'qual-4',
    type: 'certification',
    titleAr: 'دورة العلاج بالكؤوس (الحجامة الطبية)',
    titleEn: 'Cupping Therapy (Hijama) Course',
    institutionAr: 'النقابة العامة للعلاج الطبيعي بمصر',
    institutionEn: 'General Syndicate of Physical Therapy, Egypt',
    yearAr: '2008م (1429هـ)',
    yearEn: '2008 (1429 AH)',
    detailsAr: 'اعتماد رسمي في أسس الحجامة الطبية الوقائية والعلاجية، المعايير التشريحية ومكافحة العدوى.',
    detailsEn: 'Official certified credential in clinical cupping mechanics, anatomical landmarks, and bio-safety protocols.'
  },
  {
    id: 'qual-5',
    type: 'certification',
    titleAr: 'دورة الوخز بالإبر الصينية (Acupuncture)',
    titleEn: 'Acupuncture Certification Course',
    institutionAr: 'النقابة العامة للعلاج الطبيعي بمصر',
    institutionEn: 'General Syndicate of Physical Therapy, Egypt',
    yearAr: '2009م (1430هـ)',
    yearEn: '2009 (1430 AH)',
    detailsAr: 'أسس مسارات الطاقة ونقاط الزناد العضلية في تسكين الألم والتأهيل الوظيفي.',
    detailsEn: 'Fundamentals of meridian points, myofascial trigger point deactivation, and neuromodulation.'
  },
  {
    id: 'qual-6',
    type: 'workshop',
    titleAr: 'تقييم وعلاج الكتف (نهج عملي مبني على الأدلة)',
    titleEn: 'Shoulder Assessment and Treatment (Evidence-Based)',
    institutionAr: 'Primephysio',
    institutionEn: 'Primephysio',
    yearAr: 'ديسمبر 2016م (ربيع الأول 1438هـ)',
    yearEn: 'December 2016 (Rabi al-Awwal 1438 AH)',
    detailsAr: 'أحدث بروتوكولات الفحص السريري والتأهيل الميكانيكي لإصابات أوتار ومفصل الكتف.',
    detailsEn: 'Evidence-based clinical diagnostics and rehabilitation protocols for rotator cuff and glenohumeral pathology.'
  },
  {
    id: 'qual-7',
    type: 'workshop',
    titleAr: 'ورشة عمل طريقة الشريط الحركي (Kinesiology Taping)',
    titleEn: 'Kinesiology Taping Method Workshop',
    institutionAr: 'النقابة العامة للعلاج الطبيعي بمصر',
    institutionEn: 'General Syndicate of Physical Therapy, Egypt',
    yearAr: '2010م (1431هـ)',
    yearEn: '2010 (1431 AH)',
    detailsAr: 'تقنيات التثبيت المرن لتعديل مسار العضلات وتخفيف الألم والتورم.',
    detailsEn: 'Neuromuscular elastic taping techniques for fascia decompression and lymphatic drainage.'
  },
  {
    id: 'qual-8',
    type: 'workshop',
    titleAr: 'ورشة عمل الإصابات الرياضية للركبة',
    titleEn: 'Knee Sports Injury Workshop',
    institutionAr: 'جامعة فاروس، الإسكندرية',
    institutionEn: 'Pharos University, Alexandria',
    yearAr: 'أغسطس 2010م (شعبان 1431هـ)',
    yearEn: 'August 2010 (Shaban 1431 AH)',
    detailsAr: 'تأهيل إصابات الرباط الصليبي والغضاريف الهلالية وإعادة الرياضيين إلى المنافسة.',
    detailsEn: 'Cruciate ligament and meniscal rehabilitation pathways and return-to-play protocols.'
  },
  {
    id: 'qual-9',
    type: 'workshop',
    titleAr: 'تقييم الأطفال وتقنيات البوتوكس',
    titleEn: 'Pediatric Evaluation & Botox Techniques',
    institutionAr: 'نقابة العلاج الطبيعي بالإسكندرية',
    institutionEn: 'Alexandria Physical Therapy Syndicate',
    yearAr: '2010م (1431هـ)',
    yearEn: '2010 (1431 AH)',
    detailsAr: 'تقييم الشلل الدماغي ومتابعة التأهيل الحركي المصاحب لحقن البوتوكس.',
    detailsEn: 'Cerebral palsy neuromotor assessment and post-botox rehabilitation programming.'
  },
  {
    id: 'qual-10',
    type: 'workshop',
    titleAr: 'دورة العلاج الوظيفي (Occupational Therapy)',
    titleEn: 'Occupational Therapy Course',
    institutionAr: 'نقابة العلاج الطبيعي غرب الدلتا',
    institutionEn: 'West Delta Physical Therapy Syndicate',
    yearAr: 'يوليو 2010م (رجب 1431هـ)',
    yearEn: 'July 2010 (Rajab 1431 AH)',
    detailsAr: 'استعادة مهارات الحياة اليومية وتأهيل الأطراف العلوية والوظائف الدقيقة.',
    detailsEn: 'Activities of daily living adaptation and upper extremity functional retraining.'
  },
  {
    id: 'qual-11',
    type: 'workshop',
    titleAr: 'ورشة عمل مكثفة لتأهيل الأطفال',
    titleEn: 'Intensive Workshop of Pediatric Habilitation',
    institutionAr: 'نقابة العلاج الطبيعي غرب الدلتا',
    institutionEn: 'West Delta Physical Therapy Syndicate',
    yearAr: 'أكتوبر 2010م (شوال 1431هـ)',
    yearEn: 'October 2010 (Shawwal 1431 AH)',
    detailsAr: 'تطبيقات عملية في تحفيز التطور الحركي للرضع والأطفال ذوي الاحتياجات الخاصة.',
    detailsEn: 'Practical habilitation strategies for pediatric neurodevelopmental milestones.'
  },
  {
    id: 'qual-12',
    type: 'workshop',
    titleAr: 'دورة الأشعة التشخيصية في العلاج الطبيعي',
    titleEn: 'Diagnostic Radiology Training Course',
    institutionAr: 'معهد الإسكندرية للأبحاث الطبية',
    institutionEn: 'Alexandria Medical Researches Institute',
    yearAr: '2009م (1430هـ)',
    yearEn: '2009 (1430 AH)',
    detailsAr: 'قراءة وتفسير صور الرنين المغناطيسي والأشعة السينية للجهاز العظمي والعضلي.',
    detailsEn: 'Interpretation of MRI, CT, and X-ray imaging for musculoskeletal clinical correlation.'
  },
  {
    id: 'qual-13',
    type: 'workshop',
    titleAr: 'دورة الإسعافات الأولية والإنعاش الأساسي',
    titleEn: 'First Aid Training Course',
    institutionAr: 'نقابة الأطباء، مصر',
    institutionEn: 'Medical Syndicate, Egypt',
    yearAr: '2008م (1429هـ)',
    yearEn: '2008 (1429 AH)',
    detailsAr: 'إدارة الطوارئ الطبية والإنعاش القلبي الرئوي والسلامة السريرية.',
    detailsEn: 'Cardiopulmonary resuscitation (CPR) and acute medical emergency management.'
  }
];

export const initialLicenses: LicenseItem[] = [
  {
    id: 'lic-1',
    titleAr: 'تسجيل وتصنيف الهيئة السعودية للتخصصات الصحية (SCFHS)',
    titleEn: 'Saudi Commission for Health Specialties (SCFHS) Licensure',
    authorityAr: 'الهيئة السعودية للتخصصات الصحية بالمملكة العربية السعودية',
    authorityEn: 'Saudi Commission for Health Specialties (KSA)',
    rankAr: 'أخصائي - علاج طبيعي (Specialist - Physiotherapy)',
    rankEn: 'Specialist - Physiotherapy',
    profileNumber: '22392609',
    number: '22392609',
    decisionDateAr: '27 فبراير 2023م (سارٍ ومسجل)',
    decisionDateEn: 'February 27, 2023 (Active / Registered)',
    detailsAr: 'تصنيف رسمي مهني كأخصائي علاج طبيعي صادر بموجب الأنظمة المعتمدة للممارسة الصحية في المملكة العربية السعودية.',
    detailsEn: 'Official professional classification and registration permitting independent physical therapy and therapeutic cupping practice.',
    statusAr: 'سارٍ ومسجل رسمياً',
    statusEn: 'Active & Verified',
    status: 'Active',
    notesAr: 'ترخيص معتمد ساري المفعول يتيح الممارسة السريرية المستقلة والتأهيل في المنشآت الطبية المعتمدة.',
    notesEn: 'Statutory medical licensure authorizing clinical practice and rehabilitation in accredited healthcare institutions.'
  },
  {
    id: 'lic-2',
    titleAr: 'اختبار البرومتريك المهني السعودي (Saudi Prometric Exam)',
    titleEn: 'Saudi Prometric Licensure Exam (Pearson VUE)',
    authorityAr: 'بيرسون فيو بالتعاون مع الهيئة السعودية (Pearson VUE / SCFHS)',
    authorityEn: 'Pearson VUE / SCFHS',
    rankAr: 'اجتياز معتمد (Passed)',
    rankEn: 'Passed with Distinction',
    profileNumber: 'Verified Candidate',
    number: 'SCFHS-PROMETRIC-71',
    score: '71% (Passed)',
    decisionDateAr: 'فبراير 2023م',
    decisionDateEn: 'February 2023',
    detailsAr: 'اجتياز اختبار الكفاءة والتقييم السريري الشامل الموحد لممارسي العلاج الطبيعي بنتيجة 71%.',
    detailsEn: 'Passed unified clinical competency evaluation with a score of 71%, meeting SCFHS standards.',
    statusAr: 'ناجح ومعتمد (71%)',
    statusEn: 'Passed (Score: 71%)',
    status: 'Passed',
    notesAr: 'اختبار معياري سريري محوسب يختبر المعارف الطبية المتقدمة والتشريح والفسيولوجيا وإدارة الحالات السريرية.',
    notesEn: 'Standardized clinical evaluation assessing advanced medical knowledge, pathology, anatomy, and clinical management.'
  },
  {
    id: 'lic-3',
    titleAr: 'ترخيص مزاولة المهنة - وزارة الصحة المصرية',
    titleEn: 'Egyptian Ministry of Health Practice License',
    authorityAr: 'وزارة الصحة والسكان، جمهورية مصر العربية',
    authorityEn: 'Ministry of Health & Population, Egypt',
    rankAr: 'أخصائي علاج طبيعي مرخص',
    rankEn: 'Licensed Physiotherapy Specialist',
    profileNumber: 'MOH-EG-PT-2009',
    number: 'MOH-EG-PT-2009',
    decisionDateAr: '2009م (مسجل نظامياً)',
    decisionDateEn: '2009 (Fully Licensed)',
    detailsAr: 'ترخيص حكومي رسمي يخول ممارسة مهنة العلاج الطبيعي والتأهيل الطبي في كافة المنشآت الصحية والمستشفيات.',
    detailsEn: 'Statutory medical practice license authorizing clinical physical therapy in Egyptian healthcare facilities.',
    statusAr: 'مرخص ومسجل رسمياً',
    statusEn: 'Licensed Specialist',
    status: 'Licensed',
    notesAr: 'استيفاء كافة سنوات التدريب الإكلينيكي وسنة الامتياز بنجاح بمستشفيات جامعة القاهرة.',
    notesEn: 'Fulfilled comprehensive clinical residency and internship year at Cairo University Hospitals.'
  },
  {
    id: 'lic-4',
    titleAr: 'عضوية النقابة العامة للعلاج الطبيعي بمصر',
    titleEn: 'General Syndicate of Physical Therapy Membership, Egypt',
    authorityAr: 'النقابة العامة للعلاج الطبيعي، مصر',
    authorityEn: 'General Syndicate of Physical Therapy, Egypt',
    rankAr: 'عضو عامل / أخصائي مسجل',
    rankEn: 'Full Active Member / Registered Specialist',
    profileNumber: 'SYNDICATE-PT-EG',
    number: 'SYNDICATE-PT-EG',
    decisionDateAr: '2008م - حتى الآن',
    decisionDateEn: '2008 - Present',
    detailsAr: 'عضوية مهنية كاملة ومستمرة وسجل مهني ناصع في سجلات النقابة العامة للعلاج الطبيعي.',
    detailsEn: 'Continuous active professional membership in good standing since graduation.',
    statusAr: 'عضو عامل نشط',
    statusEn: 'Active Member',
    status: 'Active',
    notesAr: 'التزام كامل بآداب ومواثيق المهنة وأخلاقيات الممارسة الطبية والتأهيلية.',
    notesEn: 'Full compliance with professional medical ethics, continuous professional development, and practice standards.'
  }
];

export const initialSkills: SkillItem[] = [
  { id: 'sk-1', nameAr: 'الحجامة الطبية المعقمة (الرطبة والجافة)', nameEn: 'Aseptic Medical Cupping (Wet & Dry)' },
  { id: 'sk-2', nameAr: 'بروتوكولات مكافحة العدوى والتعقيم الطبي', nameEn: 'Infection Control & Clinical Sterilization Protocols' },
  { id: 'sk-3', nameAr: 'تأهيل آلام العمود الفقري وأسفل الظهر', nameEn: 'Spinal Rehabilitation & Low Back Pain Management' },
  { id: 'sk-4', nameAr: 'العلاج اليدوي وتحريك المفاصل والأنسجة', nameEn: 'Manual Therapy & Joint Mobilization' },
  { id: 'sk-5', nameAr: 'تقنيات الشريط الحركي الطبي (Kinesio Taping)', nameEn: 'Kinesiology & Neuromuscular Taping' },
  { id: 'sk-6', nameAr: 'الإبر الصينية ونقاط الزناد العضلية (Acupuncture)', nameEn: 'Medical Acupuncture & Myofascial Trigger Point Therapy' },
  { id: 'sk-7', nameAr: 'تأهيل الإصابات الرياضية وإصابات الملاعب', nameEn: 'Sports Injury Rehabilitation & Return-to-Play' },
  { id: 'sk-8', nameAr: 'إعادة التأهيل بعد الجراحات العظمية والمفصلية', nameEn: 'Post-Orthopedic Surgical Rehabilitation' },
  { id: 'sk-9', nameAr: 'تطبيقات الليزر العلاجي منخفض الشدة (LLLT)', nameEn: 'Low-Level Laser Therapy (LLLT) Applications' },
  { id: 'sk-10', nameAr: 'التغذية الإكلينيكية وإدارة الأمراض المزمنة', nameEn: 'Clinical Nutrition & Metabolic Health Support' },
  { id: 'sk-11', nameAr: 'تفسير الأشعة التشخيصية والرنين المغناطيسي', nameEn: 'Diagnostic Radiology & MRI Musculoskeletal Interpretation' },
  { id: 'sk-12', nameAr: 'التواصل السريري والتثقيف الصحي للمرضى', nameEn: 'Patient Clinical Communication & Health Literacy Education' }
];

export const personalInfo = {
  dobAr: '19 سبتمبر 1987م (رمضان 1408هـ)',
  dobEn: 'September 19, 1987 (Ramadan 1408 AH)',
  nationalityAr: 'مصري',
  nationalityEn: 'Egyptian',
  maritalStatusAr: 'متزوج',
  maritalStatusEn: 'Married',
  languagesAr: [
    { name: 'العربية', level: 'اللغة الأم / ممتاز' },
    { name: 'الإنجليزية', level: 'جيد جداً (TOEFL 500)' }
  ],
  languagesEn: [
    { name: 'Arabic', level: 'Native / Excellent' },
    { name: 'English', level: 'Very Good (TOEFL 500)' }
  ],
  techSkillsAr: [
    'أنظمة السجلات الطبية الإلكترونية (EMR)',
    'برامج إدارة العيادات والمراكز الصحية',
    'حزمة مايكروسوفت أوفيس (Word, Excel, PowerPoint)'
  ],
  techSkillsEn: [
    'Electronic Medical Records (EMR) Systems',
    'Clinic & Patient Management Software',
    'Microsoft Office Suite (Word, Excel, PowerPoint)'
  ]
};
