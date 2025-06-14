// 預設資料結構
const EXPLORATION_DATA = {
    // 特質清單
    traits: {
        analytical: {
            id: 'analytical',
            name: '分析思考',
            keywords: ['分析', '邏輯', '推理', '思考', '解決問題', '研究', '觀察'],
            description: '善於分析問題、邏輯推理、系統性思考',
            relatedTraits: ['critical_thinking', 'problem_solving', 'research']
        },
        creative: {
            id: 'creative',
            name: '創意思考',
            keywords: ['創意', '想像', '創新', '設計', '藝術', '創作', '發想'],
            description: '具有豐富想像力、創新思維、藝術感知',
            relatedTraits: ['artistic', 'innovative', 'design_thinking']
        },
        social: {
            id: 'social',
            name: '社交互動',
            keywords: ['溝通', '合作', '領導', '團隊', '社交', '表達', '傾聽'],
            description: '善於人際互動、團隊合作、溝通表達',
            relatedTraits: ['leadership', 'communication', 'empathy']
        },
        practical: {
            id: 'practical',
            name: '實務操作',
            keywords: ['實作', '動手', '技術', '執行', '操作', '製作', '實踐'],
            description: '擅長實際操作、技術應用、問題解決',
            relatedTraits: ['technical', 'hands_on', 'execution']
        },
        // ... 更多特質
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

    // 角色模型
    roleModels: {
        researcher: {
            id: 'researcher',
            name: '研究探索者',
            description: '熱衷於探索未知、追求真理的研究者',
            traits: ['analytical', 'research', 'curious'],
            learningGroups: ['natural_sciences', 'social_sciences'],
            keywords: ['研究', '實驗', '分析', '探索', '發現']
        },
        creator: {
            id: 'creator',
            name: '創意實踐家',
            description: '善於將創意轉化為實際作品的創作者',
            traits: ['creative', 'practical', 'innovative'],
            learningGroups: ['arts_humanities', 'engineering'],
            keywords: ['創作', '設計', '製作', '創新', '實踐']
        },
        communicator: {
            id: 'communicator',
            name: '溝通協調者',
            description: '擅長人際互動與團隊合作的溝通者',
            traits: ['social', 'empathy', 'leadership'],
            learningGroups: ['social_sciences', 'business'],
            keywords: ['溝通', '合作', '領導', '協調', '表達']
        },
        // ... 更多角色模型
    },

    // 移除原本的 keywordMapping，改用 AI 分析
    // keywordMapping 將由 Gemini 根據 traits 的 keywords 和 description 進行語意分析
};

// 特質分析工具
const TraitAnalyzer = {
    // 從文字中提取關鍵字
    extractKeywords(text) {
        const keywords = [];
        for (const [keyword, traits] of Object.entries(EXPLORATION_DATA.keywordMapping)) {
            if (text.includes(keyword)) {
                keywords.push(...traits);
            }
        }
        return [...new Set(keywords)]; // 去除重複
    },

    // 分析特質傾向
    analyzeTraits(text) {
        const keywords = this.extractKeywords(text);
        const traitScores = {};
        
        // 計算每個特質的得分
        keywords.forEach(traitId => {
            if (!traitScores[traitId]) {
                traitScores[traitId] = 0;
            }
            traitScores[traitId]++;
        });

        // 轉換為特質物件陣列並排序
        return Object.entries(traitScores)
            .map(([traitId, score]) => ({
                ...EXPLORATION_DATA.traits[traitId],
                score
            }))
            .sort((a, b) => b.score - a.score);
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
                    groupScores[group.id] += trait.score;
                }
            });
        });

        return Object.entries(groupScores)
            .map(([groupId, score]) => ({
                ...EXPLORATION_DATA.learningGroups[groupId],
                score
            }))
            .sort((a, b) => b.score - a.score);
    },

    // 根據特質推薦角色模型
    suggestRoleModels(traits) {
        const modelScores = {};
        
        traits.forEach(trait => {
            Object.values(EXPLORATION_DATA.roleModels).forEach(model => {
                if (model.traits.includes(trait.id)) {
                    if (!modelScores[model.id]) {
                        modelScores[model.id] = 0;
                    }
                    modelScores[model.id] += trait.score;
                }
            });
        });

        return Object.entries(modelScores)
            .map(([modelId, score]) => ({
                ...EXPLORATION_DATA.roleModels[modelId],
                score
            }))
            .sort((a, b) => b.score - a.score);
    }
};

// 導出資料和工具
export { EXPLORATION_DATA, TraitAnalyzer }; 