export const EXPLORATION_DATA = {
    // 預設資料結構
    traits: {
        // --- 分析思考維度 ---
        logical_reasoning: {
            id: 'logical_reasoning',
            name: '邏輯推理',
            description: '善於依據事實和規則進行演繹和歸納，找出因果關係。',
            keywords: ['邏輯', '推理', '歸納', '演繹', '因果', '條理'],
            relatedTraits: ['critical_thinking', 'systematic_thinking'],
            hollandType: 'I' // Investigative
        },
        critical_thinking: {
            id: 'critical_thinking',
            name: '批判性思考',
            description: '能夠客觀評估資訊，提出質疑，並形成獨立見解。',
            keywords: ['批判', '質疑', '評估', '辨別', '獨立思考', '反思'],
            relatedTraits: ['logical_reasoning', 'analytical'],
            hollandType: 'I'
        },
        systematic_thinking: {
            id: 'systematic_thinking',
            name: '系統思考',
            description: '能夠從整體角度分析問題，理解系統中各要素的關聯。',
            keywords: ['系統', '整體', '關聯', '架構', '脈絡', '整合'],
            relatedTraits: ['logical_reasoning', 'analytical'],
            hollandType: 'I'
        },

        // --- 創意思考維度 ---
        ideation: {
            id: 'ideation',
            name: '點子發想',
            description: '能夠產生大量、多元且新穎的想法與可能性。',
            keywords: ['點子', '發想', '腦力激盪', '聯想', '原創性', '靈感'],
            relatedTraits: ['divergent_thinking', 'innovative'],
            hollandType: 'A' // Artistic
        },
        aesthetic_sense: {
            id: 'aesthetic_sense',
            name: '美感鑑賞',
            description: '對美、和諧與設計有敏銳的直覺和判斷力。',
            keywords: ['美感', '設計', '藝術', '鑑賞', '和諧', '品味'],
            relatedTraits: ['artistic', 'creative'],
            hollandType: 'A'
        },
        divergent_thinking: {
            id: 'divergent_thinking',
            name: '發散思考',
            description: '能夠從多個角度思考問題，產生多樣化的解決方案。',
            keywords: ['發散', '多元', '創新', '突破', '想像', '創意'],
            relatedTraits: ['ideation', 'creative'],
            hollandType: 'A'
        },

        // --- 社交互動維度 ---
        communication: {
            id: 'communication',
            name: '溝通表達',
            description: '能清晰、有條理地傳達自己的思想與情感。',
            keywords: ['溝通', '表達', '演說', '寫作', '說明', '傾聽'],
            relatedTraits: ['social', 'leadership'],
            hollandType: 'S' // Social
        },
        empathy: {
            id: 'empathy',
            name: '同理心',
            description: '能夠理解並關懷他人的感受、觀點與處境。',
            keywords: ['同理', '關懷', '體貼', '換位思考', '感受'],
            relatedTraits: ['social', 'helping'],
            hollandType: 'S'
        },
        leadership: {
            id: 'leadership',
            name: '領導能力',
            description: '善於激勵他人、協調團隊，並帶領團隊達成目標。',
            keywords: ['領導', '激勵', '協調', '團隊', '決策', '影響力'],
            relatedTraits: ['communication', 'strategic'],
            hollandType: 'E' // Enterprising
        },

        // --- 實務操作維度 ---
        hands_on: {
            id: 'hands_on',
            name: '動手實作',
            description: '享受親自動手解決問題、建造或修理事物。',
            keywords: ['動手', '實作', '修理', '建造', '操作', '工藝'],
            relatedTraits: ['practical', 'technical'],
            hollandType: 'R' // Realistic
        },
        technical: {
            id: 'technical',
            name: '技術應用',
            description: '善於運用專業技術和工具解決實際問題。',
            keywords: ['技術', '專業', '工具', '應用', '操作', '實務'],
            relatedTraits: ['hands_on', 'practical'],
            hollandType: 'R'
        },
        practical: {
            id: 'practical',
            name: '實務導向',
            description: '注重實際效果，善於將理論轉化為實踐。',
            keywords: ['實務', '實踐', '應用', '執行', '效率', '實用'],
            relatedTraits: ['hands_on', 'technical'],
            hollandType: 'R'
        },

        // --- 工作風格維度 ---
        organizational: {
            id: 'organizational',
            name: '組織規劃',
            description: '善於規劃流程、管理時程、整合資源以達成目標。',
            keywords: ['組織', '規劃', '整合', '時間管理', '專案管理', '效率'],
            relatedTraits: ['systematic_thinking', 'leadership'],
            hollandType: 'C' // Conventional
        },
        detail_oriented: {
            id: 'detail_oriented',
            name: '細節導向',
            description: '注重細節的準確性與完整性，有耐心處理繁瑣事務。',
            keywords: ['細心', '精確', '耐心', '嚴謹', '校對', '品質'],
            relatedTraits: ['analytical', 'conventional'],
            hollandType: 'C'
        },
        adaptability: {
            id: 'adaptability',
            name: '適應變通',
            description: '能夠在變動或不確定的環境中保持彈性並快速調整。',
            keywords: ['適應', '彈性', '變通', '靈活', '應變'],
            relatedTraits: ['problem_solving', 'entrepreneurial'],
            hollandType: 'E'
        }
    },

    // 角色模型 - 基於 Holland RIASEC 理論
    roleModels: {
        // --- R (Realistic) 實務型 ---
        practical_builder: {
            id: 'practical_builder',
            name: '實務建構者',
            hollandCodes: ['R', 'I'],
            description: '享受運用具體技術和工具，親手打造、修理或操作事物，並從解決實際問題中獲得成就感。',
            traits: ['hands_on', 'practical', 'technical', 'problem_solving'],
            learningGroups: ['engineering', 'biological_resources', 'earth_environmental_sciences'],
            keywords: ['實作', '技術', '建造', '修理', '操作', '解決問題']
        },
        technical_innovator: {
            id: 'technical_innovator',
            name: '技術創新者',
            hollandCodes: ['R', 'A'],
            description: '善於結合技術與創意，開發新工具或改進現有技術，追求實用與創新的平衡。',
            traits: ['technical', 'innovative', 'practical', 'creative'],
            learningGroups: ['engineering', 'information', 'architecture_design'],
            keywords: ['創新', '技術', '開發', '改進', '實用', '創意']
        },

        // --- I (Investigative) 研究型 ---
        knowledge_explorer: {
            id: 'knowledge_explorer',
            name: '知識探究者',
            hollandCodes: ['I', 'A'],
            description: '對世界充滿好奇，熱衷於透過分析、研究和思考來探索事物背後的原理與真相。',
            traits: ['logical_reasoning', 'critical_thinking', 'research', 'curious'],
            learningGroups: ['mathematics_physics_chemistry', 'life_sciences', 'social_psychology'],
            keywords: ['研究', '探索', '分析', '思考', '發現', '求知']
        },
        analytical_researcher: {
            id: 'analytical_researcher',
            name: '分析研究者',
            hollandCodes: ['I', 'C'],
            description: '善於運用系統化的方法進行研究，注重數據分析和邏輯推理，追求精確的研究結果。',
            traits: ['analytical', 'systematic_thinking', 'detail_oriented', 'research'],
            learningGroups: ['mathematics_physics_chemistry', 'life_sciences', 'information'],
            keywords: ['分析', '研究', '數據', '邏輯', '系統', '精確']
        },

        // --- A (Artistic) 藝術型 ---
        aesthetic_creator: {
            id: 'aesthetic_creator',
            name: '美感創造者',
            hollandCodes: ['A', 'S'],
            description: '善於透過文字、影像、聲音或設計等形式來表達情感與創意，並重視作品的獨創性與美感。',
            traits: ['aesthetic_sense', 'ideation', 'creative', 'expressive'],
            learningGroups: ['arts', 'architecture_design', 'mass_communication'],
            keywords: ['創作', '美感', '設計', '藝術', '表達', '創意']
        },
        innovative_designer: {
            id: 'innovative_designer',
            name: '創新設計師',
            hollandCodes: ['A', 'I'],
            description: '善於結合創意與技術，設計新穎且實用的產品或解決方案，追求美感與功能的平衡。',
            traits: ['creative', 'innovative', 'technical', 'aesthetic_sense'],
            learningGroups: ['architecture_design', 'arts', 'information'],
            keywords: ['設計', '創新', '創意', '技術', '美感', '實用']
        },

        // --- S (Social) 社交型 ---
        empathetic_helper: {
            id: 'empathetic_helper',
            name: '關懷助人者',
            hollandCodes: ['S', 'A'],
            description: '樂於與人互動，善於傾聽、同理與支持他人，並從幫助他人成長與解決困難中獲得滿足。',
            traits: ['empathy', 'communication', 'helping', 'social'],
            learningGroups: ['social_psychology', 'education', 'medicine_health'],
            keywords: ['關懷', '助人', '傾聽', '同理', '支持', '互動']
        },
        educational_mentor: {
            id: 'educational_mentor',
            name: '教育引導者',
            hollandCodes: ['S', 'I'],
            description: '善於傳授知識、引導學習，並能根據學習者的需求調整教學方式，促進他人成長。',
            traits: ['communication', 'teaching', 'empathy', 'analytical'],
            learningGroups: ['education', 'social_psychology', 'foreign_languages'],
            keywords: ['教育', '引導', '教學', '溝通', '啟發', '成長']
        },

        // --- E (Enterprising) 企業型 ---
        strategic_leader: {
            id: 'strategic_leader',
            name: '策略領導者',
            hollandCodes: ['E', 'C'],
            description: '喜歡挑戰與影響他人，善於透過領導、說服與管理來達成目標，並追求成就與影響力。',
            traits: ['leadership', 'strategic', 'communication', 'organizational'],
            learningGroups: ['management', 'finance_economics', 'law_political_science'],
            keywords: ['領導', '策略', '管理', '影響力', '決策', '目標']
        },
        entrepreneurial_innovator: {
            id: 'entrepreneurial_innovator',
            name: '創業創新者',
            hollandCodes: ['E', 'A'],
            description: '善於發現機會、承擔風險，並能將創意轉化為可行的商業模式，追求創新與成長。',
            traits: ['entrepreneurial', 'innovative', 'strategic', 'adaptability'],
            learningGroups: ['management', 'finance_economics', 'information'],
            keywords: ['創業', '創新', '機會', '風險', '商業', '成長']
        },

        // --- C (Conventional) 事務型 ---
        system_organizer: {
            id: 'system_organizer',
            name: '系統組織者',
            hollandCodes: ['C', 'R'],
            description: '偏好在有組織、有條理的環境中工作，善於處理數據、規劃流程，並確保事務的精確與效率。',
            traits: ['organizational', 'detail_oriented', 'systematic_thinking', 'practical'],
            learningGroups: ['management', 'finance_economics', 'information'],
            keywords: ['組織', '系統', '規劃', '效率', '精確', '流程']
        },
        analytical_manager: {
            id: 'analytical_manager',
            name: '分析管理者',
            hollandCodes: ['C', 'I'],
            description: '善於運用數據分析和管理系統，優化組織運作，確保效率和品質。',
            traits: ['analytical', 'organizational', 'systematic_thinking', 'detail_oriented'],
            learningGroups: ['management', 'information', 'finance_economics'],
            keywords: ['分析', '管理', '系統', '數據', '效率', '品質']
        }
    },

    // 學群對應表
    learningGroups: {
        information: {
            id: 'information',
            name: '資訊學群',
            description: '研究資訊科技、電腦科學與數位應用',
            relatedTraits: ['analytical', 'logical', 'innovative', 'problem_solving'],
            coreFields: [
                { name: '資訊工程', description: '研究電腦系統、軟體開發與資訊處理' },
                { name: '資訊管理', description: '結合資訊科技與管理知識，優化組織運作' },
                { name: '數位媒體', description: '研究數位內容創作、多媒體技術與互動設計' }
            ],
            careers: ['軟體工程師', '系統分析師', '資料科學家', '資訊安全專家'],
            subjects: ['程式設計', '資料結構', '演算法', '網路技術']
        },
        engineering: {
            id: 'engineering',
            name: '工程學群',
            description: '研究工程技術、系統設計與實務應用',
            relatedTraits: ['practical', 'analytical', 'systematic', 'problem_solving'],
            coreFields: [
                { name: '機械工程', description: '研究機械系統設計、製造與控制' },
                { name: '電機工程', description: '研究電力系統、電子電路與控制系統' },
                { name: '化學工程', description: '研究化學製程、材料開發與工業應用' }
            ],
            careers: ['工程師', '研發人員', '專案經理', '技術顧問'],
            subjects: ['工程數學', '材料科學', '熱力學', '控制系統']
        },
        mathematics_physics_chemistry: {
            id: 'mathematics_physics_chemistry',
            name: '數理化學群',
            description: '研究基礎科學理論與應用',
            relatedTraits: ['analytical', 'logical', 'research', 'critical_thinking'],
            coreFields: [
                { name: '數學', description: '研究數學理論、應用數學與統計分析' },
                { name: '物理', description: '研究物質與能量的基本性質與規律' },
                { name: '化學', description: '研究物質的組成、結構與變化' }
            ],
            careers: ['研究員', '教師', '分析師', '顧問'],
            subjects: ['高等數學', '物理學', '化學', '統計學']
        },
        medicine_health: {
            id: 'medicine_health',
            name: '醫藥衛生學群',
            description: '研究醫學、藥學與健康照護',
            relatedTraits: ['empathy', 'analytical', 'practical', 'careful'],
            coreFields: [
                { name: '醫學', description: '研究疾病診斷、治療與預防' },
                { name: '藥學', description: '研究藥物開發、製劑與臨床應用' },
                { name: '護理', description: '研究健康照護、疾病護理與健康促進' }
            ],
            careers: ['醫師', '藥師', '護理師', '醫療研究員'],
            subjects: ['解剖學', '生理學', '藥理學', '病理學']
        },
        life_sciences: {
            id: 'life_sciences',
            name: '生命科學學群',
            description: '研究生命現象、生物科技與基因工程',
            relatedTraits: ['analytical', 'research', 'curious', 'systematic'],
            coreFields: [
                { name: '生物科技', description: '研究生物技術應用與基因工程' },
                { name: '分子生物', description: '研究生物分子結構與功能' },
                { name: '生物資訊', description: '結合生物學與資訊科技' }
            ],
            careers: ['研究員', '生物科技工程師', '實驗室技術員', '產品開發專員'],
            subjects: ['分子生物學', '基因工程', '生物化學', '細胞生物學']
        },
        biological_resources: {
            id: 'biological_resources',
            name: '生物資源學群',
            description: '研究農業、漁業與自然資源管理',
            relatedTraits: ['practical', 'analytical', 'environmental', 'systematic'],
            coreFields: [
                { name: '農業科學', description: '研究農業生產與永續發展' },
                { name: '水產養殖', description: '研究水產資源開發與管理' },
                { name: '森林資源', description: '研究森林生態與資源管理' }
            ],
            careers: ['農業技術員', '水產養殖專家', '森林資源管理員', '環境顧問'],
            subjects: ['農業科學', '水產養殖', '森林資源', '環境科學']
        },
        earth_environmental_sciences: {
            id: 'earth_environmental_sciences',
            name: '地球與環境學群',
            description: '研究地球科學、環境保護與永續發展',
            relatedTraits: ['analytical', 'environmental', 'research', 'systematic'],
            coreFields: [
                { name: '地質科學', description: '研究地球構造與地質現象' },
                { name: '環境工程', description: '研究環境保護與污染控制' },
                { name: '氣象科學', description: '研究大氣現象與氣候變遷' }
            ],
            careers: ['地質學家', '環境工程師', '氣象學家', '環境顧問'],
            subjects: ['地質學', '環境科學', '氣象學', '海洋科學']
        },
        architecture_design: {
            id: 'architecture_design',
            name: '建築與設計學群',
            description: '研究空間規劃、建築設計與環境營造',
            relatedTraits: ['creative', 'practical', 'artistic', 'systematic'],
            coreFields: [
                { name: '建築學', description: '研究建築設計與空間規劃' },
                { name: '都市規劃', description: '研究都市發展與空間規劃' },
                { name: '工業設計', description: '研究產品設計與使用者體驗' }
            ],
            careers: ['建築師', '都市規劃師', '工業設計師', '室內設計師'],
            subjects: ['建築設計', '都市規劃', '工業設計', '景觀設計']
        },
        arts: {
            id: 'arts',
            name: '藝術學群',
            description: '研究藝術創作、設計與文化表現',
            relatedTraits: ['creative', 'artistic', 'expressive', 'innovative'],
            coreFields: [
                { name: '視覺藝術', description: '研究繪畫、雕塑與多媒體藝術' },
                { name: '表演藝術', description: '研究音樂、舞蹈與戲劇表演' },
                { name: '設計藝術', description: '研究平面設計、數位藝術與應用設計' }
            ],
            careers: ['藝術家', '設計師', '策展人', '藝術教育工作者'],
            subjects: ['藝術史', '創作理論', '設計原理', '藝術評論']
        },
        social_psychology: {
            id: 'social_psychology',
            name: '社會與心理學群',
            description: '研究人類行為、社會現象與心理發展',
            relatedTraits: ['empathy', 'analytical', 'social', 'research'],
            coreFields: [
                { name: '心理學', description: '研究人類心理與行為' },
                { name: '社會學', description: '研究社會結構與社會現象' },
                { name: '社會工作', description: '研究社會服務與福利政策' }
            ],
            careers: ['心理師', '社會工作者', '研究員', '人力資源專員'],
            subjects: ['心理學', '社會學', '社會工作', '諮商理論']
        },
        mass_communication: {
            id: 'mass_communication',
            name: '大眾傳播學群',
            description: '研究媒體傳播、新聞報導與數位內容',
            relatedTraits: ['creative', 'social', 'expressive', 'innovative'],
            coreFields: [
                { name: '新聞學', description: '研究新聞採訪與報導' },
                { name: '廣告學', description: '研究廣告策略與創意表現' },
                { name: '數位傳播', description: '研究新媒體與數位內容' }
            ],
            careers: ['記者', '廣告企劃', '公關專員', '數位內容創作者'],
            subjects: ['新聞學', '廣告學', '傳播理論', '數位媒體']
        },
        foreign_languages: {
            id: 'foreign_languages',
            name: '外語學群',
            description: '研究外國語言、文學與文化',
            relatedTraits: ['linguistic', 'cultural', 'analytical', 'social'],
            coreFields: [
                { name: '英語', description: '研究英語語言與文學' },
                { name: '日語', description: '研究日語語言與文化' },
                { name: '翻譯學', description: '研究語言翻譯與口譯' }
            ],
            careers: ['翻譯師', '語言教師', '國際業務', '文化顧問'],
            subjects: ['語言學', '文學', '翻譯理論', '文化研究']
        },
        humanities_philosophy_history: {
            id: 'humanities_philosophy_history',
            name: '文史哲學群',
            description: '研究人文思想、歷史文化與哲學理論',
            relatedTraits: ['analytical', 'critical_thinking', 'cultural', 'research'],
            coreFields: [
                { name: '歷史學', description: '研究歷史發展與文化變遷' },
                { name: '哲學', description: '研究思想理論與價值觀' },
                { name: '文學', description: '研究文學創作與文化研究' }
            ],
            careers: ['研究員', '教師', '文化工作者', '出版編輯'],
            subjects: ['歷史學', '哲學', '文學', '文化研究']
        },
        education: {
            id: 'education',
            name: '教育學群',
            description: '研究教育理論、教學方法與教育行政',
            relatedTraits: ['social', 'empathy', 'systematic', 'creative'],
            coreFields: [
                { name: '教育學', description: '研究教育理論與實踐' },
                { name: '特殊教育', description: '研究特殊教育需求與教學' },
                { name: '教育行政', description: '研究教育政策與行政' }
            ],
            careers: ['教師', '教育行政人員', '教育顧問', '教育研究員'],
            subjects: ['教育學', '教育心理學', '課程設計', '教育行政']
        },
        law_political_science: {
            id: 'law_political_science',
            name: '法政學群',
            description: '研究法律、政治與公共政策',
            relatedTraits: ['analytical', 'logical', 'critical_thinking', 'social'],
            coreFields: [
                { name: '法律學', description: '研究法律理論與實務' },
                { name: '政治學', description: '研究政治制度與國際關係' },
                { name: '公共行政', description: '研究政府運作與公共政策' }
            ],
            careers: ['律師', '公務員', '政治顧問', '國際關係專員'],
            subjects: ['法學', '政治學', '公共行政', '國際關係']
        },
        management: {
            id: 'management',
            name: '管理學群',
            description: '研究企業管理、組織運作與策略規劃',
            relatedTraits: ['leadership', 'analytical', 'strategic', 'social'],
            coreFields: [
                { name: '企業管理', description: '研究企業經營與管理' },
                { name: '人力資源', description: '研究人才管理與組織發展' },
                { name: '行銷管理', description: '研究市場策略與品牌管理' }
            ],
            careers: ['管理顧問', '人力資源專員', '行銷經理', '專案經理'],
            subjects: ['管理學', '行銷學', '人力資源管理', '策略管理']
        },
        finance_economics: {
            id: 'finance_economics',
            name: '財經學群',
            description: '研究財務金融、經濟理論與商業分析',
            relatedTraits: ['analytical', 'logical', 'strategic', 'numerical'],
            coreFields: [
                { name: '財務金融', description: '研究投資理財與金融市場' },
                { name: '經濟學', description: '研究經濟理論與政策' },
                { name: '會計學', description: '研究財務會計與審計' }
            ],
            careers: ['財務分析師', '會計師', '投資顧問', '經濟研究員'],
            subjects: ['財務管理', '經濟學', '會計學', '統計學']
        },
        recreation_sports: {
            id: 'recreation_sports',
            name: '遊憩與運動學群',
            description: '研究運動科學、休閒活動與健康促進',
            relatedTraits: ['practical', 'social', 'energetic', 'systematic'],
            coreFields: [
                { name: '運動科學', description: '研究運動生理與訓練' },
                { name: '休閒管理', description: '研究休閒活動規劃與管理' },
                { name: '體育教育', description: '研究體育教學與運動指導' }
            ],
            careers: ['運動教練', '休閒活動規劃師', '體育教師', '健康顧問'],
            subjects: ['運動生理學', '休閒管理', '體育教學', '健康促進']
        }
    },

    // 移除原本的 keywordMapping，改用 AI 分析
    // keywordMapping 將由 Gemini 根據 traits 的 keywords 和 description 進行語意分析
};

// 特質分析工具
export const TraitAnalyzer = {
    // 使用 Gemini 分析使用者輸入中的特質
    async analyzeTraits(text) {
        const prompt = `請分析以下使用者描述的經驗，並根據我們定義的特質資料庫進行語意比對。
使用者描述：「${text}」

特質資料庫：
${Object.entries(EXPLORATION_DATA.traits).map(([id, trait]) => 
    `- ${trait.name} (${id}): ${trait.description}
  關鍵字：${trait.keywords.join('、')}
  Holland 類型：${trait.hollandType}`
).join('\n')}

請根據使用者描述的行為、思考模式和感受，判斷最符合的幾個特質，並給出每個特質的相關程度（0-1分）。
請以 JSON 格式回傳，格式如下：
{
    "traits": [
        {
            "id": "特質ID",
            "score": 相關程度分數,
            "reason": "為什麼這個特質符合使用者描述",
            "hollandType": "對應的 Holland 類型"
        }
    ]
}`;

        try {
            const response = await window.gemini.generateText(prompt);
            const analysis = JSON.parse(response);
            
            // 將分析結果轉換為特質物件陣列
            return analysis.traits.map(trait => ({
                ...EXPLORATION_DATA.traits[trait.id],
                score: trait.score,
                reason: trait.reason,
                hollandType: trait.hollandType
            })).sort((a, b) => b.score - a.score);
        } catch (error) {
            console.error('特質分析失敗:', error);
            return [];
        }
    },

    // 根據特質推薦學群
    suggestLearningGroups(traits) {
        const groupScores = {};
        
        traits.forEach(trait => {
            Object.values(EXPLORATION_DATA.learningGroups).forEach(group => {
                if (group.relatedTraits.includes(trait.id)) {
                    if (!groupScores[group.id]) {
                        groupScores[group.id] = 0;
                    }
                    // 使用特質分數加權計算
                    groupScores[group.id] += trait.score;
                }
            });
        });

        return Object.entries(groupScores)
            .map(([groupId, score]) => ({
                ...EXPLORATION_DATA.learningGroups[groupId],
                score,
                matchingTraits: traits.filter(t => 
                    EXPLORATION_DATA.learningGroups[groupId].relatedTraits.includes(t.id)
                )
            }))
            .sort((a, b) => b.score - a.score);
    },

    // 根據特質推薦角色模型
    suggestRoleModels(traits) {
        const modelScores = {};
        
        // 計算每個特質的 Holland 類型分布
        const hollandScores = {};
        traits.forEach(trait => {
            if (!hollandScores[trait.hollandType]) {
                hollandScores[trait.hollandType] = 0;
            }
            hollandScores[trait.hollandType] += trait.score;
        });

        // 根據 Holland 類型分數和特質匹配度計算角色模型分數
        Object.values(EXPLORATION_DATA.roleModels).forEach(model => {
            const score = model.hollandCodes.reduce((total, code) => 
                total + (hollandScores[code] || 0), 0) / model.hollandCodes.length;
            
            // 計算特質匹配度
            const traitMatchScore = traits.reduce((total, trait) => 
                total + (model.traits.includes(trait.id) ? trait.score : 0), 0) / model.traits.length;

            modelScores[model.id] = (score + traitMatchScore) / 2;
        });

        return Object.entries(modelScores)
            .map(([modelId, score]) => ({
                ...EXPLORATION_DATA.roleModels[modelId],
                score,
                matchingTraits: traits.filter(t => 
                    EXPLORATION_DATA.roleModels[modelId].traits.includes(t.id)
                ),
                hollandMatch: EXPLORATION_DATA.roleModels[modelId].hollandCodes
                    .map(code => ({ type: code, score: hollandScores[code] || 0 }))
            }))
            .sort((a, b) => b.score - a.score);
    }
}; 