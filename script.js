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
function handleStageUserInput(stageNumber) {
    const inputElement = document.getElementById(`userInput${stageNumber}`);
    const message = inputElement.value.trim();
    
    if (message) {
        addUserMessage(stageNumber, message);
        inputElement.value = '';
        
        // 分析使用者回應
        const traits = TraitAnalyzer.analyzeTraits(message);
        userTraits = [...userTraits, ...traits];
        
        // 根據階段處理回應
        setTimeout(() => {
            processAIResponse(stageNumber, message, traits);
        }, 1000);
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
function processAIResponse(stageNumber, userMessage, traits) {
    let aiResponse = '';
    
    if (stageNumber === 1) {
        // First stage: Experience reflection
        if (chatHistory[1].length <= 2) {
            // 根據特質生成追問
            const topTrait = traits[0];
            if (topTrait) {
                const traitKeywords = EXPLORATION_DATA.traits[topTrait.id].keywords;
                const randomKeyword = traitKeywords[Math.floor(Math.random() * traitKeywords.length)];
                aiResponse = `謝謝你的分享！我注意到你提到了一些關於「${randomKeyword}」的內容。能告訴我更多關於這個經驗的細節嗎？比如：\n1. 當時是什麼情況？\n2. 你做了什麼？\n3. 為什麼這個經驗對你來說特別重要？`;
            } else {
                aiResponse = "謝謝你的分享！能告訴我更多關於這個經驗的細節嗎？比如：\n1. 當時是什麼情況？\n2. 你做了什麼？\n3. 為什麼這個經驗對你來說特別重要？";
            }
        } else {
            // 分析累積的特質並準備進入下一階段
            const topTraits = userTraits
                .sort((a, b) => b.score - a.score)
                .slice(0, 3);
            
            suggestedGroups = TraitAnalyzer.suggestLearningGroups(topTraits);
            suggestedModels = TraitAnalyzer.suggestRoleModels(topTraits);
            
            const traitSummary = topTraits
                .map(trait => trait.name)
                .join('、');
            
            aiResponse = `從你的分享中，我觀察到你展現了「${traitSummary}」等特質。這些特質都很有價值，讓我們進入下一階段，一起探索這些特質如何形塑你的學習方向。`;
            document.getElementById('goToStage2Button').style.display = 'block';
        }
    } else if (stageNumber === 2) {
        // Second stage: Trait inference
        if (chatHistory[2].length <= 2) {
            // 根據分析結果提供建議
            const topGroup = suggestedGroups[0];
            const topModel = suggestedModels[0];
            
            aiResponse = `根據你分享的經驗，我觀察到你可能具有以下特質：\n` +
                `1. ${topGroup.name}相關：${topGroup.description}\n` +
                `2. 你可能適合的角色：${topModel.name} - ${topModel.description}\n\n` +
                `你覺得這些特質和方向符合你的自我認知嗎？或者你有不同的想法？`;
        } else {
            // 總結探索結果
            const finalSummary = generateFinalSummary();
            aiResponse = `謝謝你的分享！讓我們來總結一下這次的探索：\n\n${finalSummary}\n\n你覺得這個過程對你了解自己有什麼幫助嗎？或者還有什麼想探索的方向？`;
            document.getElementById('goToStage3Button').style.display = 'block';
        }
    }
    
    addAIMessage(stageNumber, aiResponse);
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