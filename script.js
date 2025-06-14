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

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    startButton.addEventListener('click', startExploration);
});

// Start the exploration process
function startExploration() {
    document.getElementById('welcomeMessage').classList.add('hidden');
    showStage(1);
    updateProgress(0);
    addAIMessage(1, "你好！讓我們開始探索你的經驗。請分享一個讓你印象深刻，或是特別有成就感的經驗。這個經驗可以是任何時候發生的，重要的是它對你來說很有意義。");
}

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
        
        // 分析使用者回應
        const traits = TraitAnalyzer.analyzeTraits(message);
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
    let aiResponse = '';
    
    // 使用 Canvas 環境中的 Gemini 來生成回應
    const prompt = generatePrompt(stageNumber, userMessage, traits);
    aiResponse = await window.gemini.generateText(prompt);
    
    addAIMessage(stageNumber, aiResponse);
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