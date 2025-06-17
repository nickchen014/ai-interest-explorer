// 導入資料和分析工具
import { EXPLORATION_DATA, TraitAnalyzer } from './data.js';

// ========== API Key 安全性說明 ==========
// [安全建議] 正式環境請勿將 API Key 儲存在 localStorage 或前端，
// 應改由後端伺服器代理 API 請求以保護金鑰。

// ========== 狀態管理 ==========
const appState = {
    currentStage: 0,
    totalStages: 2,
    chatHistory: { 1: [], 2: [] },
    userTraits: [],
    suggestedGroups: [],
    suggestedModels: []
};

// ========== DOM 集中管理 ==========
const dom = {
    apiKeyInput: document.getElementById('apiKeyInput'),
    saveApiKeyButton: document.getElementById('saveApiKeyButton'),
    apiKeyStatus: document.getElementById('apiKeyStatus'),
    welcomeMessage: document.getElementById('welcomeMessage'),
    startButton: document.getElementById('startButton'),
    progressBar: document.getElementById('progressBar'),
    stage1: document.getElementById('stage1'),
    stage2: document.getElementById('stage2'),
    chatLog1: document.getElementById('chatLog1'),
    chatLog2: document.getElementById('chatLog2'),
    userInput1: document.getElementById('userInput1'),
    userInput2: document.getElementById('userInput2'),
    sendUserInput1Button: document.getElementById('sendUserInput1Button'),
    sendUserInput2Button: document.getElementById('sendUserInput2Button'),
    goToStage2Button: document.getElementById('goToStage2Button'),
    goToStage3Button: document.getElementById('goToStage3Button'),
    body: document.body
};

// ========== Toast 通知 ==========
function showNotification(message, type = 'info') {
    let toast = document.createElement('div');
    toast.className = `fixed z-50 top-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded shadow-lg text-white text-center transition-opacity duration-300 opacity-0 toast-${type}`;
    toast.style.background = type === 'success' ? '#16a34a' : type === 'error' ? '#dc2626' : '#2563eb';
    toast.textContent = message;
    dom.body.appendChild(toast);
    setTimeout(() => { toast.style.opacity = 1; }, 10);
    setTimeout(() => { toast.style.opacity = 0; }, 2500);
    setTimeout(() => { toast.remove(); }, 3000);
}

// ========== 載入中指示器 ==========
function setLoading(isLoading, stageNumber = null) {
    if (stageNumber) {
        const input = dom[`userInput${stageNumber}`];
        const button = dom[`sendUserInput${stageNumber}Button`];
        if (input) input.disabled = isLoading;
        if (button) {
            button.disabled = isLoading;
            if (isLoading) {
                button.innerHTML = '<span class="loader mr-2"></span>處理中...';
            } else {
                button.innerHTML = '傳送訊息';
            }
        }
    } else {
        dom.saveApiKeyButton.disabled = isLoading;
        if (isLoading) {
            dom.saveApiKeyButton.innerHTML = '<span class="loader mr-2"></span>驗證中...';
        } else {
            dom.saveApiKeyButton.innerHTML = '儲存 API 金鑰';
        }
    }
}
// loader 樣式（可加到 styles.css）
// .loader { border: 2px solid #f3f3f3; border-top: 2px solid #2563eb; border-radius: 50%; width: 1em; height: 1em; animation: spin 1s linear infinite; display: inline-block; vertical-align: middle; }
// @keyframes spin { 100% { transform: rotate(360deg); } }

// ========== Gemini API 物件 ==========
const geminiAPI = {
    async generateText(prompt) {
        const apiKey = localStorage.getItem('geminiApiKey');
        if (!apiKey) throw new Error('請先設定 Gemini API 金鑰');
        const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + apiKey, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({error: {message: '無法解析 API 錯誤回應'}}));
            throw new Error(errorData.error?.message || 'API 請求失敗');
        }
        const data = await response.json();
        if (!data.candidates?.[0]?.content?.parts?.[0]?.text) throw new Error('API 回應格式不正確');
        return data.candidates[0].content.parts[0].text;
    }
};

async function initGeminiAPI() {
    // 只做一次性測試
    try {
        await geminiAPI.generateText('test connection');
        return true;
    } catch (error) {
        throw error;
    }
}

// ========== 初始化 ==========
document.addEventListener('DOMContentLoaded', async () => {
    // 讀取 API 金鑰
    const savedApiKey = localStorage.getItem('geminiApiKey');
    if (savedApiKey) {
        dom.apiKeyInput.value = savedApiKey;
        dom.apiKeyStatus.textContent = '已載入已儲存的 API 金鑰';
        dom.apiKeyStatus.className = 'text-sm text-green-600';
        dom.welcomeMessage.classList.remove('hidden');
        dom.startButton.disabled = false;
        dom.startButton.title = '開始探索';
    } else {
        dom.apiKeyStatus.textContent = '請先輸入 Gemini API 金鑰';
        dom.apiKeyStatus.className = 'text-sm text-yellow-600';
        dom.welcomeMessage.classList.add('hidden');
        dom.startButton.disabled = true;
        dom.startButton.title = '請先設定 API 金鑰';
    }
    // 儲存 API 金鑰
    dom.saveApiKeyButton.addEventListener('click', async () => {
        const apiKey = dom.apiKeyInput.value.trim();
        if (apiKey) {
            setLoading(true);
            localStorage.setItem('geminiApiKey', apiKey);
            dom.apiKeyStatus.textContent = 'API 金鑰已儲存';
            dom.apiKeyStatus.className = 'text-sm text-green-600';
            dom.welcomeMessage.classList.remove('hidden');
            dom.startButton.disabled = false;
            dom.startButton.title = '開始探索';
            try {
                await initGeminiAPI();
                showNotification('API 金鑰儲存成功，並已驗證。', 'success');
            } catch (error) {
                showNotification('API 金鑰儲存成功，但連接測試失敗：' + error.message, 'error');
            } finally {
                setLoading(false);
            }
        } else {
            dom.apiKeyStatus.textContent = '請輸入有效的 API 金鑰';
            dom.apiKeyStatus.className = 'text-sm text-red-600';
            dom.welcomeMessage.classList.add('hidden');
            dom.startButton.disabled = true;
            dom.startButton.title = '請先設定 API 金鑰';
        }
    });
    // 開始按鈕
    dom.startButton.replaceWith(dom.startButton.cloneNode(true));
    const newStartButton = document.getElementById('startButton');
    newStartButton.addEventListener('click', async () => {
        try {
            await initGeminiAPI();
            startExploration();
        } catch (error) {
            showNotification('啟動失敗：' + error.message, 'error');
        }
    });
});

// ========== 聊天訊息處理 ==========
function addChatMessage(stageNumber, message, role) {
    const chatLog = dom[`chatLog${stageNumber}`];
    const messageElement = document.createElement('div');
    messageElement.className = `chat-message ${role}-message`;
    messageElement.textContent = message;
    chatLog.appendChild(messageElement);
    chatLog.scrollTop = chatLog.scrollHeight;
    // 存入歷史
    appState.chatHistory[stageNumber].push({ role, content: message });
}

// ========== 探索流程 ==========
function startExploration() {
    dom.welcomeMessage.classList.add('hidden');
    showStage(1);
    updateProgress(0);
    addChatMessage(1, "你好！讓我們開始探索你的經驗。請分享一個讓你印象深刻，或是特別有成就感的經驗。這個經驗可以是任何時候發生的，重要的是它對你來說很有意義。", 'ai');
}
window.startExploration = startExploration;
window.handleStageUserInput = handleStageUserInput;
window.proceedToNextStage = proceedToNextStage;

function showStage(stageNumber) {
    [dom.stage1, dom.stage2].forEach(stage => stage.classList.add('hidden'));
    dom[`stage${stageNumber}`].classList.remove('hidden');
    appState.currentStage = stageNumber;
}

async function handleStageUserInput(stageNumber) {
    const inputElement = dom[`userInput${stageNumber}`];
    const message = inputElement.value.trim();
    if (message) {
        addChatMessage(stageNumber, message, 'user');
        inputElement.value = '';
        setLoading(true, stageNumber);
        try {
            const traits = await TraitAnalyzer.analyzeTraits(message);
            appState.userTraits = [...appState.userTraits, ...traits];
            await processAIResponse(stageNumber, message, traits);
        } catch (error) {
            addChatMessage(stageNumber, '抱歉，處理您的輸入時發生錯誤。請稍後再試。', 'ai');
            showNotification('特質分析或 AI 回應失敗：' + error.message, 'error');
        } finally {
            setLoading(false, stageNumber);
        }
    }
}

async function processAIResponse(stageNumber, userMessage, traits) {
    try {
        const prompt = generatePrompt(stageNumber, userMessage, traits);
        const aiResponse = await geminiAPI.generateText(prompt);
        addChatMessage(stageNumber, aiResponse, 'ai');
        if (stageNumber === 1) {
            appState.suggestedGroups = TraitAnalyzer.suggestLearningGroups(traits);
            appState.suggestedModels = TraitAnalyzer.suggestRoleModels(traits);
            const nextButton = dom.goToStage2Button;
            if (nextButton) nextButton.style.display = 'block';
        }
    } catch (error) {
        addChatMessage(stageNumber, '抱歉，我現在無法回應。請確認 API 金鑰是否正確，或稍後再試。', 'ai');
        showNotification('AI 回應生成失敗：' + error.message, 'error');
    }
}

// ========== Prompt 生成查找表 ==========
const promptTemplates = {
    1: (context) => `你是一個專業的興趣探索顧問，正在進行第一階段的經驗回溯對話。\n使用者說：「${context.userMessage}」\n目前分析出的特質傾向：${context.traits.join('、')}\n\n請根據使用者的分享，生成一個自然的回應，重點是：\n1. 展現同理心，理解使用者的經驗\n2. 根據已分析出的特質，提出相關的追問\n3. 引導使用者分享更多細節\n\n請用中文回應，語氣要親切自然。`,
    2: (context) => `你是一個專業的興趣探索顧問，正在進行第二階段的特質推論對話。\n使用者說：「${context.userMessage}」\n目前分析出的特質：${context.traits.join('、')}\n建議的學習方向：${context.suggestedGroups.map(g => g.name).join('、')}\n建議的角色模型：${context.suggestedModels.map(m => m.name).join('、')}\n\n請根據以上資訊，生成一個自然的回應，重點是：\n1. 總結使用者的特質傾向\n2. 解釋這些特質如何連結到學習方向\n3. 提供具體的發展建議\n\n請用中文回應，語氣要專業但親切。`
};
function generatePrompt(stageNumber, userMessage, traits) {
    const context = {
        stage: stageNumber,
        userMessage,
        traits: traits.map(t => t.name),
        chatHistory: appState.chatHistory[stageNumber],
        suggestedGroups: appState.suggestedGroups,
        suggestedModels: appState.suggestedModels
    };
    if (promptTemplates[stageNumber]) {
        return promptTemplates[stageNumber](context);
    }
    return '未知階段的提示。';
}

// ========== 其他流程與工具 ==========
function generateFinalSummary() {
    const topTraits = appState.userTraits.sort((a, b) => b.score - a.score).slice(0, 3);
    const topGroup = appState.suggestedGroups[0];
    const topModel = appState.suggestedModels[0];
    return `1. 你的主要特質：${topTraits.map(t => t.name).join('、')}\n` +
           `2. 適合的學習方向：${topGroup?.name || ''}\n` +
           `3. 可能的發展角色：${topModel?.name || ''}\n\n` +
           `這些發現都是基於你分享的經驗所做的推論，你可以根據自己的感受和想法，選擇最適合的發展方向。`;
}
function proceedToNextStage(nextStage) {
    if (nextStage <= appState.totalStages) {
        showStage(nextStage);
        updateProgress((nextStage - 1) * (100 / appState.totalStages));
        if (nextStage === 2) {
            const summary = generateStage1Summary();
            addChatMessage(2, `根據我們剛才的對話，我發現你分享了${summary}。讓我們一起來探索這些經驗背後的特質，看看它們如何指引你的學習方向。`, 'ai');
        }
    }
}
function generateStage1Summary() {
    const topTraits = appState.userTraits.sort((a, b) => b.score - a.score).slice(0, 3);
    return `一些展現了「${topTraits.map(t => t.name).join('、')}」等特質的經驗`;
}
function updateProgress(percentage) {
    dom.progressBar.style.width = `${percentage}%`;
    dom.progressBar.textContent = `${Math.round(percentage)}%`;
} 