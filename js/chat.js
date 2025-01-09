document.addEventListener("DOMContentLoaded", () => {
    const chatBox = document.getElementById("chatBox");
    const userInput = document.getElementById("userInput");
    const sendBtn = document.getElementById("sendBtn");
  
    const appendMessage = (message, sender) => {
      const messageDiv = document.createElement("div");
      messageDiv.classList.add("message", `${sender}-message`);
      
      const messageContent = document.createElement("div");
      messageContent.classList.add("message-content");
      messageContent.innerText = message;
  
      messageDiv.appendChild(messageContent);
      chatBox.appendChild(messageDiv);
      chatBox.scrollTop = chatBox.scrollHeight;
    };
  
    sendBtn.addEventListener("click", () => {
      const userMessage = userInput.value.trim();
      if (userMessage) {
        appendMessage(userMessage, "user");
        userInput.value = "";
        
        // Simulate a bot response
        setTimeout(() => {
          appendMessage(i18next.t("bot_assistance_message"), "bot");
        }, 1000);
      }
    });
  
    userInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        sendBtn.click();
      }
    });
  });
  