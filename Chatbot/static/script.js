const chatbox = document.getElementById('chatbox');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

// Function to send a message
async function sendMessage() {
    const message = userInput.value.trim();

    if (!message) return;

    // Add user's message to the chatbox
    addMessage('user', message);

    try {
        // Send message to the backend
        const response = await fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message }),
        });

        const data = await response.json();

        // Add chatbot's reply to the chatbox
        addMessage('bot', data.reply);
    } catch (error) {
        addMessage('bot', 'Error connecting to server. Please try again.');
    }

    // Clear the input field
    userInput.value = '';
}

// Function to add messages to the chatbox
function addMessage(sender, text) {
    const messageElement = document.createElement('p');
    messageElement.className = sender; // user or bot
    messageElement.textContent = text;
    chatbox.appendChild(messageElement);

    // Scroll to the latest message
    chatbox.scrollTop = chatbox.scrollHeight;
}

// Event listener for the send button
sendBtn.addEventListener('click', sendMessage);

// Event listener for the Enter key
userInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});
