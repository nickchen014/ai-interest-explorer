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
        natural_sciences: {
            id: 'natural_sciences',
            name: '自然科學學群',
            description: '研究自然現象、物質特性與生命科學',
            relatedTraits: ['analytical', 'research', 'problem_solving'],
            careers: ['研究員', '科學家', '工程師', '教師'],
            subjects: ['物理', '化學', '生物', '地球科學']
        },
        social_sciences: {
            id: 'social_sciences',
            name: '社會科學學群',
            description: '研究人類社會行為與社會現象',
            relatedTraits: ['social', 'analytical', 'communication'],
            careers: ['心理學家', '社會學家', '人力資源', '顧問'],
            subjects: ['心理學', '社會學', '政治學', '經濟學']
        },
        arts_humanities: {
            id: 'arts_humanities',
            name: '藝術人文學群',
            description: '探索人類文化、藝術創作與人文思想',
            relatedTraits: ['creative', 'artistic', 'cultural'],
            careers: ['藝術家', '設計師', '作家', '策展人'],
            subjects: ['文學', '藝術', '哲學', '歷史']
        },
        // ... 更多學群
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

    // 關鍵字對應表
    keywordMapping: {
        '分析': ['analytical', 'research'],
        '創意': ['creative', 'innovative'],
        '溝通': ['social', 'communication'],
        '實作': ['practical', 'hands_on'],
        // ... 更多關鍵字對應
    }
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