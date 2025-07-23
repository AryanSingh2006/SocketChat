document.addEventListener('DOMContentLoaded', async () => {
  try {
    const userlist = document.getElementById('userList');
    const chatSection = document.getElementById('chatSection');
    const chatWithUser = document.getElementById('chatWithUser');
    const messageArea = document.getElementById('messageArea');
    const messageForm = document.getElementById('messageForm');
    const messageBar = document.getElementById('messageBar')

    let currentChatUserId = null

    // Function to get user initials lettter of the username for pfp
    function getUserInitials(username) {
      return username.charAt(0).toUpperCase();
    }

    //fetched the data and shown the user in the sidebar
    const response = await fetch('/api/messages/users')
    const users = await response.json();
    for (let i = 0; i < users.length; i++) {
      const user = users[i]
      const li = document.createElement('li')
      li.setAttribute('data-userid', user._id);
      li.setAttribute('data-initial', getUserInitials(user.username)); // For CSS avatar
      li.textContent = user.username
      userlist.appendChild(li);
      
      //after clicking on any user
      li.addEventListener('click', async () => {
        // Remove active class from all users
        document.querySelectorAll('#userList li').forEach(item => {
          item.classList.remove('active');
        });
        
        // Add active class to clicked user
        li.classList.add('active');
        
        // Add active class to chat section to show it
        chatSection.classList.add('active');
        
        currentChatUserId = user._id
        chatWithUser.textContent = user.username
        await loadMessages(user._id)
      })
    }

    async function loadMessages(userId) {
      const res = await fetch(`/api/messages/${userId}`);
      const messages = await res.json();
      messageArea.innerHTML = "";

      for (let i = 0; i < messages.length; i++) {
        const msg = messages[i];
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        if (msg.senderId !== userId) {
          messageDiv.classList.add('own');
        }
        
        // Create avatar
        const avatar = document.createElement('div');
        avatar.classList.add('avatar');
        if (msg.senderId === userId) {
          const senderUser = users.find(u => u._id === userId);
          avatar.textContent = getUserInitials(senderUser ? senderUser.username : 'U');
        } else {
          avatar.textContent = 'Y'; // Your initial
        }
        
        // Create content container
        const messageContentDiv = document.createElement('div');
        messageContentDiv.classList.add('message-content');
        
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('content');
        contentDiv.textContent = msg.text;
        
        // Create time element (optional)
        const timeDiv = document.createElement('div');
        timeDiv.classList.add('time');
        const messageTime = new Date(msg.createdAt || Date.now());
        timeDiv.textContent = messageTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        // Append content and time to message content
        messageContentDiv.appendChild(contentDiv);
        messageContentDiv.appendChild(timeDiv);
        
        // Append elements to message
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContentDiv);
        
        messageArea.appendChild(messageDiv);
      }
      
      // Scroll to bottom
      messageArea.scrollTop = messageArea.scrollHeight;
    }

    messageForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const text = messageBar.value.trim();

      if (!text || !currentChatUserId) { // Fixed: check currentChatUserId instead of chatWithUser
        return;
      }
      
      try {
        await fetch(`/api/messages/send/${currentChatUserId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ text })
        });

        messageBar.value = "";
        await loadMessages(currentChatUserId);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    })
  } catch (error) {
    console.error("error: ", error);
  }
})