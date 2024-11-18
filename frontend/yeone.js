document.getElementById('sendMessage').addEventListener('click', sendMessage);
document.getElementById('userInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

async function sendMessage() {
    const input = document.getElementById('userInput').value;
    if (!input) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    addMessage('user', input, time);
    document.getElementById('userInput').value = '';

    try {
        const response = await fetch('http://localhost:3000/cozy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query: input })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const responseTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        addMessage('bot', data.cozy, responseTime);
    } catch (error) {
        console.error('Error fetching fortune:', error);
        addMessage('bot', '답변을 불러오는 데 실패했습니다. 다시 시도해주세요.', time);
    }
}

function addMessage(sender, text, time) {
    const chatBox = document.getElementById('chatBox');
    const message = document.createElement('div');
    message.classList.add('message', sender);
    
    const messageContent = document.createElement('div');
    messageContent.innerText = text;
    message.appendChild(messageContent);
    
    const messageTime = document.createElement('div');
    messageTime.classList.add('message-time');
    messageTime.innerText = time;
    message.appendChild(messageTime);

    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;
}
