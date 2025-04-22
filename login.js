document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('login-button');
    const agentIdInput = document.getElementById('agent-id');
    const passwordInput = document.getElementById('password');
    const agentIdError = document.getElementById('agent-id-error');
    const loginError = document.getElementById('login-error');

    function validateAgentId() {
        const agentId = agentIdInput.value;

        if (agentId.trim() === '') {
            loginButton.disabled = true;
            agentIdError.style.display = 'none';
        } else if (agentId.includes(' ')) {
            loginButton.disabled = true;
            agentIdError.style.display = 'block';
        } else {
            loginButton.disabled = false;
            agentIdError.style.display = 'none';
        }
    }

    agentIdInput.addEventListener('input', validateAgentId);

    loginButton.addEventListener('click', function() {
        const agentId = agentIdInput.value;
        const password = passwordInput.value;

        if (password === 'Astralis*2812') {
            // Set a session flag indicating the user is logged in
            sessionStorage.setItem('loggedIn', 'true');
            // Store the Agent ID in session storage
            sessionStorage.setItem('agentId', agentId);
            window.location.href = 'invite.html';
        } else {
            // Display error message
            loginError.style.display = 'block';
        }
    });

    // Initial validation check
    validateAgentId();
});
