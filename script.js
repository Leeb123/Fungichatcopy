const messageInput = document.querySelector('#message-input');
const sendButton = document.querySelector('#send-button');
const chatContainer = document.querySelector('#chat-container');

sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keydown', handleKeyDown);

window.onload = function() {
    loadUserInfo();
    loadChatHistory();
};

function sendMessage() {
    const userMessage = messageInput.value.trim();
    if (userMessage !== '') {
        const username = getUsername();
        
        if (username) {
            appendUserMessage(username, userMessage);
            saveChatMessage(username, userMessage);
            getBotResponse(userMessage);
            messageInput.value = '';
            scrollChatToBottom();
        } else {
            alert('Please enter a username.');
        }
    }
}

function handleKeyDown(event) {
    if (event.keyCode === 13) { // Enter key
        event.preventDefault();
        sendMessage();
    }
}

function getUsername() {
    return document.querySelector('#username-input').value;
}

function loadUserInfo() {
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
        document.querySelector('#username-input').value = savedUsername;
    }
}

function loadChatHistory() {
    const chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
    chatHistory.forEach(({ username, message }) => {
        if (username && message) {
            appendUserMessage(username, message);
        }
    });
    scrollChatToBottom();
}

function saveChatMessage(username, message) {
    const chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
    chatHistory.push({ username, message });
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
}

function appendUserMessage(username, message) {
    const userMessageDiv = createMessageDiv(username, message, 'user-message');
    chatContainer.appendChild(userMessageDiv);
    scrollChatToBottom();
}

function appendBotMessage(message) {
    const botMessageDiv = createMessageDiv('Bot', message);
    chatContainer.appendChild(botMessageDiv);
    scrollChatToBottom();
}

function createMessageDiv(username, message, cssClass = '') {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', cssClass);
    messageDiv.textContent = `${username ? username + ': ' : ''}${message}`;
    
    if (cssClass === 'user-message') {
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => {
            messageDiv.remove();
            removeChatMessage(username, message);
        });
        messageDiv.appendChild(deleteButton);
    }
    
    return messageDiv;
}

function removeChatMessage(username, message) {
    const chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
    const updatedHistory = chatHistory.filter(item => item.username !== username || item.message !== message);
    localStorage.setItem('chatHistory', JSON.stringify(updatedHistory));
}

function getBotResponse(userMessage) {
    const botResponse = simulateBotResponse(userMessage);
    appendBotMessage(botResponse);
}

function simulateBotResponse(userMessage) {
    const responses = [
        // ... (your bot responses) ...
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

function scrollChatToBottom() {
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

