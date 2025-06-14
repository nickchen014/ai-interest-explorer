// Global variables
let currentStage = 0;
const totalStages = 2;
let chatHistory = {
    1: [],
    2: []
};

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
        
        // Process AI response based on the stage
        setTimeout(() => {
            processAIResponse(stageNumber, message);
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
function processAIResponse(stageNumber, userMessage) {
    let aiResponse = '';
    
    if (stageNumber === 1) {
        // First stage: Experience reflection
        if (chatHistory[1].length <= 2) {
            aiResponse = "謝謝你的分享！能告訴我更多關於這個經驗的細節嗎？比如：\n1. 當時是什麼情況？\n2. 你做了什麼？\n3. 為什麼這個經驗對你來說特別重要？";
        } else {
            aiResponse = "我從你的分享中看到了一些有趣的特質。讓我們進入下一階段，一起探索這些特質如何形塑你的學習方向。";
            document.getElementById('goToStage2Button').style.display = 'block';
        }
    } else if (stageNumber === 2) {
        // Second stage: Trait inference
        if (chatHistory[2].length <= 2) {
            aiResponse = "根據你分享的經驗，我觀察到你可能具有以下特質：\n1. 善於觀察和思考\n2. 有解決問題的能力\n3. 願意分享和溝通\n\n你覺得這些特質符合你的自我認知嗎？或者你有不同的想法？";
        } else {
            aiResponse = "謝謝你的分享！我們已經完成了初步的探索。你覺得這個過程對你了解自己有什麼幫助嗎？";
            document.getElementById('goToStage3Button').style.display = 'block';
        }
    }
    
    addAIMessage(stageNumber, aiResponse);
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
    // This is a simple summary - in a real application, this would be more sophisticated
    return "一些很有意義的經驗";
}

// Update the progress bar
function updateProgress(percentage) {
    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = `${percentage}%`;
    progressBar.textContent = `${Math.round(percentage)}%`;
} 