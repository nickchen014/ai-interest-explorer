// 導入資料和分析工具
import { EXPLORATION_DATA, TraitAnalyzer } from './data.js';

// Global variables
let currentStage = 0;
const totalStages = 2;
let chatHistory = {
    1: [],
    2: []
};
let userTraits = [];
let suggestedGroups = [];
let suggestedModels = [];

// DOM Elements
const apiKeyInput = document.getElementById('apiKeyInput');
const saveApiKeyButton = document.getElementById('saveApiKeyButton');
const apiKeyStatus = document.getElementById('apiKeyStatus');
const welcomeMessage = document.getElementById('welcomeMessage');
const startButton = document.getElementById('startButton');

// 初始化 Gemini API
async function initGeminiAPI() {
    const apiKey = localStorage.getItem('geminiApiKey');
    if (!apiKey) {
        throw new Error('請先設定 Gemini API 金鑰');
    }
    
    // 初始化 Gemini API
    window.gemini = {
        async generateText(prompt) {
            try {
                const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + apiKey, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: prompt
                            }]
                        }]
                    })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error?.message || 'API 請求失敗');
                }

                const data = await response.json();
                if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
                    throw new Error('API 回應格式不正確');
                }
                return data.candidates[0].content.parts[0].text;
            } catch (error) {
                console.error('Gemini API 錯誤:', error);
                throw error;
            }
        }
    };

    // 測試 API 連接
    try {
        await window.gemini.generateText('test connection');
        console.log('Gemini API 連接成功');
        return true;
    } catch (error) {
        console.error('Gemini API 連接測試失敗:', error);
        throw error;
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM Content Loaded');
    
    // 從 localStorage 讀取 API 金鑰
    const savedApiKey = localStorage.getItem('geminiApiKey');
    if (savedApiKey) {
        apiKeyInput.value = savedApiKey;
        apiKeyStatus.textContent = '已載入已儲存的 API 金鑰';
        apiKeyStatus.className = 'text-sm text-green-600';
        welcomeMessage.classList.remove('hidden');
        if (startButton) {
            startButton.disabled = false;
            startButton.title = '開始探索';
        }
    } else {
        apiKeyStatus.textContent = '請先輸入 Gemini API 金鑰';
        apiKeyStatus.className = 'text-sm text-yellow-600';
        welcomeMessage.classList.add('hidden');
        if (startButton) {
            startButton.disabled = true;
            startButton.title = '請先設定 API 金鑰';
        }
    }

    // 儲存 API 金鑰
    saveApiKeyButton.addEventListener('click', async () => {
        const apiKey = apiKeyInput.value.trim();
        if (apiKey) {
            localStorage.setItem('geminiApiKey', apiKey);
            apiKeyStatus.textContent = 'API 金鑰已儲存';
            apiKeyStatus.className = 'text-sm text-green-600';
            welcomeMessage.classList.remove('hidden');
            if (startButton) {
                startButton.disabled = false;
                startButton.title = '開始探索';
            }
            // 嘗試初始化 Gemini API
            try {
                await initGeminiAPI();
                alert('API 金鑰儲存成功，並已驗證。現在可以開始探索了！');
            } catch (error) {
                alert('API 金鑰儲存成功，但連接測試失敗：' + error.message + ' 請檢查您的金鑰是否正確。');
            }
        } else {
            apiKeyStatus.textContent = '請輸入有效的 API 金鑰';
            apiKeyStatus.className = 'text-sm text-red-600';
            welcomeMessage.classList.add('hidden');
            if (startButton) {
                startButton.disabled = true;
                startButton.title = '請先設定 API 金鑰';
            }
        }
    });

    // 開始按鈕事件監聽器
    if (startButton) {
        console.log('設置開始按鈕事件監聽器');
        // 確保移除舊的事件監聽器，避免重複綁定
        startButton.replaceWith(startButton.cloneNode(true));
        const newStartButton = document.getElementById('startButton'); // 重新獲取元素

        newStartButton.addEventListener('click', async () => {
            console.log('開始按鈕被點擊');
            try {
                // 初始化 API
                await initGeminiAPI();
                // 開始探索
                startExploration();
            } catch (error) {
                console.error('啟動失敗:', error);
                alert('啟動失敗：' + error.message);
            }
        });
    }
});

// Start the exploration process
function startExploration() {
    console.log('開始探索流程');
    const welcomeMessage = document.getElementById('welcomeMessage');
    if (welcomeMessage) {
        welcomeMessage.classList.add('hidden');
    }
    
    showStage(1);
    updateProgress(0);
    addAIMessage(1, "你好！讓我們開始探索你的經驗。請分享一個讓你印象深刻，或是特別有成就感的經驗。這個經驗可以是任何時候發生的，重要的是它對你來說很有意義。");
}

// 暴露給全域，以便在 HTML 中直接呼叫
window.startExploration = startExploration;
window.handleStageUserInput = handleStageUserInput;
window.proceedToNextStage = proceedToNextStage;

// Show a specific stage
function showStage(stageNumber) {
    document.querySelectorAll('.stage').forEach(stage => {
        stage.classList.add('hidden');
    });
    document.getElementById(`stage${stageNumber}`).classList.remove('hidden');
    currentStage = stageNumber;
}

// Handle user input for each stage
async function handleStageUserInput(stageNumber) {
    const inputElement = document.getElementById(`userInput${stageNumber}`);
    const message = inputElement.value.trim();
    
    if (message) {
        addUserMessage(stageNumber, message);
        inputElement.value = '';
        
        // 使用 await 等待特質分析
        const traits = await TraitAnalyzer.analyzeTraits(message);
        userTraits = [...userTraits, ...traits];
        
        // 使用 await 等待 AI 回應
        await processAIResponse(stageNumber, message, traits);
    }
}

// Add a user message to the chat
function addUserMessage(stageNumber, message) {
    const chatLog = document.getElementById(`chatLog${stageNumber}`);
    const messageElement = document.createElement('div');
    messageElement.className = 'chat-message user-message';
    messageElement.textContent = message;
    chatLog.appendChild(messageElement);
    chatLog.scrollTop = chatLog.scrollHeight;
    
    // Store in chat history
    chatHistory[stageNumber].push({ role: 'user', content: message });
}

// Add an AI message to the chat
function addAIMessage(stageNumber, message) {
    const chatLog = document.getElementById(`chatLog${stageNumber}`);
    const messageElement = document.createElement('div');
    messageElement.className = 'chat-message ai-message';
    messageElement.textContent = message;
    chatLog.appendChild(messageElement);
    chatLog.scrollTop = chatLog.scrollHeight;
    
    // Store in chat history
    chatHistory[stageNumber].push({ role: 'ai', content: message });
}

// Process AI response based on the stage and user input
async function processAIResponse(stageNumber, userMessage, traits) {
    try {
        let aiResponse = '';
        
        // 使用 Gemini API 生成回應
        const prompt = generatePrompt(stageNumber, userMessage, traits);
        aiResponse = await window.gemini.generateText(prompt);
        
        addAIMessage(stageNumber, aiResponse);

        // 如果是第一階段，更新建議
        if (stageNumber === 1) {
            suggestedGroups = TraitAnalyzer.suggestLearningGroups(traits);
            suggestedModels = TraitAnalyzer.suggestRoleModels(traits);
            
            // 顯示前往下一階段的按鈕
            const nextButton = document.getElementById('goToStage2Button');
            if (nextButton) {
                nextButton.style.display = 'block';
            }
        }
    } catch (error) {
        console.error('AI 回應生成失敗:', error);
        addAIMessage(stageNumber, '抱歉，我現在無法回應。請確認 API 金鑰是否正確，或稍後再試。');
    }
}

// 生成給 Gemini 的提示
function generatePrompt(stageNumber, userMessage, traits) {
    const context = {
        stage: stageNumber,
        userMessage,
        traits: traits.map(t => t.name),
        chatHistory: chatHistory[stageNumber]
    };

    if (stageNumber === 1) {
        return `你是一個專業的興趣探索顧問，正在進行第一階段的經驗回溯對話。
使用者說：「${userMessage}」
目前分析出的特質傾向：${traits.map(t => t.name).join('、')}

請根據使用者的分享，生成一個自然的回應，重點是：
1. 展現同理心，理解使用者的經驗
2. 根據已分析出的特質，提出相關的追問
3. 引導使用者分享更多細節

請用中文回應，語氣要親切自然。`;
    } else {
        return `你是一個專業的興趣探索顧問，正在進行第二階段的特質推論對話。
使用者說：「${userMessage}」
目前分析出的特質：${traits.map(t => t.name).join('、')}
建議的學習方向：${suggestedGroups.map(g => g.name).join('、')}
建議的角色模型：${suggestedModels.map(m => m.name).join('、')}

請根據以上資訊，生成一個自然的回應，重點是：
1. 總結使用者的特質傾向
2. 解釋這些特質如何連結到學習方向
3. 提供具體的發展建議

請用中文回應，語氣要專業但親切。`;
    }
}

// Generate final summary of the exploration
function generateFinalSummary() {
    const topTraits = userTraits
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);
    const topGroup = suggestedGroups[0];
    const topModel = suggestedModels[0];
    
    return `1. 你的主要特質：${topTraits.map(t => t.name).join('、')}\n` +
           `2. 適合的學習方向：${topGroup.name}\n` +
           `3. 可能的發展角色：${topModel.name}\n\n` +
           `這些發現都是基於你分享的經驗所做的推論，你可以根據自己的感受和想法，選擇最適合的發展方向。`;
}

// Proceed to the next stage
function proceedToNextStage(nextStage) {
    if (nextStage <= totalStages) {
        showStage(nextStage);
        updateProgress((nextStage - 1) * (100 / totalStages));
        
        if (nextStage === 2) {
            // Start the second stage with a summary of the first stage
            const summary = generateStage1Summary();
            addAIMessage(2, `根據我們剛才的對話，我發現你分享了${summary}。讓我們一起來探索這些經驗背後的特質，看看它們如何指引你的學習方向。`);
        }
    }
}

// Generate a summary of stage 1
function generateStage1Summary() {
    const topTraits = userTraits
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);
    
    return `一些展現了「${topTraits.map(t => t.name).join('、')}」等特質的經驗`;
}

// Update the progress bar
function updateProgress(percentage) {
    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = `${percentage}%`;
    progressBar.textContent = `${Math.round(percentage)}%`;
}

// 特質分析工具
const TraitAnalyzer = {
    // 使用 Gemini 分析使用者輸入中的特質
    async analyzeTraits(text) {
        const prompt = `請分析以下使用者描述的經驗，並根據我們定義的特質資料庫進行語意比對。
使用者描述：「${text}」

特質資料庫：
${Object.entries(EXPLORATION_DATA.traits).map(([id, trait]) => 
    `- ${trait.name} (${id}): ${trait.description}
  關鍵字：${trait.keywords.join('、')}`
).join('\n')}

請根據使用者描述的行為、思考模式和感受，判斷最符合的幾個特質，並給出每個特質的相關程度（0-1分）。
請以 JSON 格式回傳，格式如下：
{
    "traits": [
        {
            "id": "特質ID",
            "score": 相關程度分數,
            "reason": "為什麼這個特質符合使用者描述"
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
                reason: trait.reason
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
        
        traits.forEach(trait => {
            Object.values(EXPLORATION_DATA.roleModels).forEach(model => {
                if (model.traits.includes(trait.id)) {
                    if (!modelScores[model.id]) {
                        modelScores[model.id] = 0;
                    }
                    // 使用特質分數加權計算
                    modelScores[model.id] += trait.score;
                }
            });
        });

        return Object.entries(modelScores)
            .map(([modelId, score]) => ({
                ...EXPLORATION_DATA.roleModels[modelId],
                score,
                matchingTraits: traits.filter(t => 
                    EXPLORATION_DATA.roleModels[modelId].traits.includes(t.id)
                )
            }))
            .sort((a, b) => b.score - a.score);
    }
}; 