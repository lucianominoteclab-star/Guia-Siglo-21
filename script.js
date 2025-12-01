document.getElementById('chat-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const input = document.getElementById('user-input');
    const message = input.value;
    input.value = '';

    if (message.trim() === '') return;

    // 1. Mostrar el mensaje del usuario
    appendMessage(message, 'user');

    // 2. Mostrar un indicador de "escribiendo..."
    const thinkingMessage = appendMessage('Escribiendo...', 'system thinking');

    // 3. ******************************************************
    // ESTA SECCIÓN SE COMPLETA EN LA FASE 3 CON LA URL DEL BACKEND (CLOUD FUNCTION)
    // Actualmente, solo simula una respuesta.
    // ******************************************************

    setTimeout(() => {
        // Eliminar el mensaje de "escribiendo..."
        thinkingMessage.remove(); 
        
        // Respuesta simulada
        appendMessage('Lo siento, aún no estoy conectado a la IA de Google. ¡Completemos la Fase 3!', 'system');

    }, 1500); 

});

function appendMessage(text, className) {
    const messagesDiv = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.className = 'message ' + className;
    messageElement.textContent = text;
    messagesDiv.appendChild(messageElement);
    // Desplazar hacia el último mensaje
    messagesDiv.scrollTop = messagesDiv.scrollHeight; 
    return messageElement;
}
