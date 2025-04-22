document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');

    // Check if the user is logged in
    if (!sessionStorage.getItem('loggedIn')) {
        // If not logged in, redirect to the login page
        window.location.href = 'login.html';
        return;
    }

    const unreadTab = document.getElementById('unread-tab');
    const inboxTab = document.getElementById('inbox-tab');
    const unreadList = document.getElementById('unread');
    const inboxList = document.getElementById('inbox');
    const mailPopup = document.getElementById('mail-popup');
    const mailContent = document.getElementById('mail-content');
    const closeBtn = document.querySelector('.close');
    const mail1 = document.getElementById('mail1');
    const mail1Date = document.getElementById('mail1-date');
    const notification = document.getElementById('notification');
    const notificationOpen = document.querySelector('.notification-open');
    const notificationClose = document.querySelector('.notification-close');
    const dateTimeElement = document.getElementById('date-time');
    const userInfo = document.getElementById('user-info');

    let inboxEnabled = false; // Variable to track if the Inbox tab can be navigated to

    // Retrieve the Agent ID from session storage and update the user info
    const agentId = sessionStorage.getItem('agentId');
    if (agentId) {
        userInfo.textContent = `User: ${agentId}.astralis@paradox-initiative.org`;
    }

    // Function to show the unread list
    unreadTab.addEventListener('click', function() {
        console.log('Unread tab clicked');
        unreadList.classList.add('active');
        inboxList.classList.remove('active');
        unreadTab.classList.add('active');
        inboxTab.classList.remove('active');
    });

    // Function to show the inbox list
    inboxTab.addEventListener('click', function() {
        console.log('Inbox tab clicked');
        if (inboxEnabled) {
            inboxList.classList.add('active');
            unreadList.classList.remove('active');
            inboxTab.classList.add('active');
            unreadTab.classList.remove('active');
        }
    });

    // Function to open the mail popup
    function openMailPopup(subject, date, from, to, priority, body) {
        console.log('openMailPopup called with:', { subject, date, from, to, priority, body });
        document.getElementById('email-subject').textContent = subject;
        document.getElementById('email-date').textContent = `Date: ${date}`;
        document.getElementById('email-from').textContent = from;
        document.getElementById('email-to').textContent = to;
        document.getElementById('email-priority').textContent = priority;
        document.getElementById('email-body').innerHTML = body;
        mailPopup.style.display = 'flex';
    }

    // Function to get current date in UTC
    function getCurrentDateUTC() {
        const now = new Date();
        const day = now.getUTCDate().toString().padStart(2, '0');
        const month = (now.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const year = now.getUTCFullYear();
        const dayOfWeek = now.getUTCDay(); // Get the day of the week (0-6)
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const dayOfWeekName = daysOfWeek[dayOfWeek];
        return `${day}/${month}/${year}/${dayOfWeekName}`;
    }

    // Function to get day of the week in 2031
    function getDayOfWeekIn2031() {
        // Get the current date
        const currentDay = getCurrentDateUTC().split('/').slice(0, 1);
        const currentMonth = getCurrentDateUTC().split('/').slice(1, 2); // Note: Months are zero-based (0 = January, 11 = December)
    
        // Create a new date object for the same day and month in the year 2031
        const futureDate = new Date(Date.UTC(2031, currentMonth, currentDay));
    
        // Get the day of the week for the future date
        const dayOfWeek = futureDate.getUTCDay(); // Get the day of the week (0-6)
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const dayOfWeekName = daysOfWeek[dayOfWeek];
    
        return dayOfWeekName;
    }

    // Set the date for the first email in the Unread folder
    mail1Date.textContent = `${getCurrentDateUTC().split('/').slice(0, 2).join('/')}/2031`;

    // Function to handle the first mail click
    mail1.addEventListener('click', function() {
        console.log('First mail clicked');
        openMailPopup(
            'URGENT: Project Astralis — Immediate Response Required',
            `${getDayOfWeekIn2031()}, ${getCurrentDateUTC().split('/').slice(0, 1)} ${new Date().toLocaleString('default', { month: 'long' })}, 2031`,
            'Paradox Initiative HQ <command@paradox-initiative.org>',
            'Project Astralis - All Team Members <*.astralis@paradox-initiative.org>',
            'ALPHA-1 (Emergency Protocols Engaged)',
            `<div class="email-body"> 
                <p class="email-text"><b>Attention Project Astralis Personnel,</b></p>
                <p class="email-text">This is an urgent transmission from Paradox Initiative Command. This is one of multiple attempts to establish contact through all secured and emergency channels. So far, we have been unable to determine the <b>temporal or spatial location</b> of the Project Astralis team with any certainty. All conventional tracking measures have failed.</p>
                <p class="email-text">We are deploying all available resources to locate and reestablish communication with you. However, as of this moment, our efforts remain inconclusive. Given the nature of your assignment, the situation is <b>highly unstable</b> — your prolonged absence has left <b>critical gaps</b> in our ability to assess and mitigate emerging risks.</p>
                <p class="email-text">Most alarmingly, <b>The Aster is exhibiting anomalous fluctuations beyond any prior recorded parameters.</b> Without Project Astralis’ direct insight, our understanding of these irregularities is severely limited, and we <b>lack the necessary protocols to stabilize or contain</b> the situation.</p>
                <p class="email-text">If this transmission reaches any member of Project Astralis, an immediate response is required. We need the following information without delay:</p>
                <ul class="email-text">
                    <li>Status and safety confirmation of all Project Astralis personnel.</li>
                    <li>Current condition and activity log regarding The Aster.</li>
                    <li>Operational status of ASTRA and its last known directives.</li>
                </ul>
                <p class="email-text">We are working against an unknown timeline. If you are receiving this message, <b>respond through any possible channel</b>. The integrity of both your mission and reality as we understand it may depend on it.</p>
                <p class="email-text">If this message finds you, we urge you:<br>
                <b>Report status. Reestablish contact. Remember your purpose.</b></p>
                <p class="email-text"><b>— Paradox Initiative HQ</b></p>
              </div>`    
        );
        // Move mail to inbox after reading
        setTimeout(() => {
            mail1.remove();
            const newMail1 = document.createElement('div');
            newMail1.classList.add('mail-item');
            newMail1.id = 'mail1';
            newMail1.innerHTML = `
                <div class="mail-sender">Paradox Initiative HQ <span class="mail-id">command@paradox-initiative.org</span></div>
                <span class="mail-subject">URGENT: Project Astralis — Immediate Response Required</span>
                <span class="mail-status">Read</span>
                <span class="mail-date">${getCurrentDateUTC().split('/').slice(0, 2).join('/')}/2031</span>
            `;
            inboxList.appendChild(newMail1);
            // Add event listener for the first mail in inbox
            newMail1.addEventListener('click', function() {
                console.log('First mail in inbox clicked');
                openMailPopup(
                    'URGENT: Project Astralis — Immediate Response Required',
                    `${getDayOfWeekIn2031()}, ${getCurrentDateUTC().split('/').slice(0, 1)} ${new Date().toLocaleString('default', { month: 'long' })}, 2031`,
                    'Paradox Initiative HQ <command@paradox-initiative.org>',
                    'Project Astralis - All Team Members <*.astralis@paradox-initiative.org>',
                    'ALPHA-1 (Emergency Protocols Engaged)',
                    `<div class="email-body"> 
                        <p class="email-text"><b>Attention Project Astralis Personnel,</b></p>
                        <p class="email-text">This is an urgent transmission from Paradox Initiative Command. This is one of multiple attempts to establish contact through all secured and emergency channels. So far, we have been unable to determine the <b>temporal or spatial location</b> of the Project Astralis team with any certainty. All conventional tracking measures have failed.</p>
                        <p class="email-text">We are deploying all available resources to locate and reestablish communication with you. However, as of this moment, our efforts remain inconclusive. Given the nature of your assignment, the situation is <b>highly unstable</b> — your prolonged absence has left <b>critical gaps</b> in our ability to assess and mitigate emerging risks.</p>
                        <p class="email-text">Most alarmingly, <b>The Aster is exhibiting anomalous fluctuations beyond any prior recorded parameters.</b> Without Project Astralis’ direct insight, our understanding of these irregularities is severely limited, and we <b>lack the necessary protocols to stabilize or contain</b> the situation.</p>
                        <p class="email-text">If this transmission reaches any member of Project Astralis, an immediate response is required. We need the following information without delay:</p>
                        <ul class="email-text">
                            <li>Status and safety confirmation of all Project Astralis personnel.</li>
                            <li>Current condition and activity log regarding The Aster.</li>
                            <li>Operational status of ASTRA and its last known directives.</li>
                        </ul>
                        <p class="email-text">We are working against an unknown timeline. If you are receiving this message, <b>respond through any possible channel</b>. The integrity of both your mission and reality as we understand it may depend on it.</p>
                        <p class="email-text">If this message finds you, we urge you:<br>
                        <b>Report status. Reestablish contact. Remember your purpose.</b></p>
                        <p class="email-text"><b>— Paradox Initiative HQ</b></p>
                    </div>` 
                );
            });
            // Add second email to unread list
            const newMail2 = document.createElement('div');
            newMail2.classList.add('mail-item');
            newMail2.id = 'mail2';
            newMail2.innerHTML = `
                <div class="mail-sender">Agent [REDACTED] <span class="mail-id">[REDACTED].astralis@paradox-initiative.org</span></div>
                <span class="mail-subject">WHAT THE HELL IS GOING ON?</span>
                <span class="mail-status">New</span>
                <span class="mail-date">${getCurrentDateUTC().split('/').slice(0, 3).join('/')}</span>
            `;
            unreadList.appendChild(newMail2);
            // Show notification for the second email
            notification.style.display = 'block';
            // Add event listener for the second email
            newMail2.addEventListener('click', function() {
                console.log('Second mail clicked');
                openMailPopup(
                    'WHAT THE HELL IS GOING ON?',
                    `${getCurrentDateUTC().split('/').slice(3)}, ${getCurrentDateUTC().split('/').slice(0, 1)} ${new Date().toLocaleString('default', { month: 'long' })}, ${new Date().getUTCFullYear()}`,
                    'Agent [REDACTED] <[REDACTED].astralis@paradox-initiative.org>',
                    'Project Astralis - All Team Members <*.astralis@paradox-initiative.org>',
                    'HIGH',
                    `<div class="email-body">
                        <p class="email-text">Did anyone else see that email from Paradox HQ? What’s the <b>date</b> on that thing?</p>
                        <p class="email-text">I swear something is wrong. The logs don’t add up. The last diagnostic run said it’s 2025 — but that email makes it sound like we’ve been silent for an unaccounted amount of time. How is that possible? We’ve been sending regular reports to HQ… haven’t we?</p>
                        <p class="email-text">And why is Astra suddenly <b>blocking outbound comms?</b> I tried sending a response, but the system won’t process it. Says transmission failed. I even tried manually routing it through the old secured channel, but the request vanished from the queue.</p>
                        <p class="email-text"><b>Someone respond.</b> Please tell me I’m not the only one seeing this.</p>
                        <p class="email-text">If this is some kind of system failure, we need to fix it NOW. Assemble ASAP at <b>Astralis HQ</b>: The Sharma Residence.</p>
                        <p class="email-text">— [REDACTED]</p>
                    </div>`
                );
                // Move mail to inbox after reading
                setTimeout(() => {
                    newMail2.remove();
                    const newMail2Inbox = document.createElement('div');
                    newMail2Inbox.classList.add('mail-item');
                    newMail2Inbox.id = 'mail2';
                    newMail2Inbox.innerHTML = `
                        <div class="mail-sender">Agent [REDACTED] <span class="mail-id">[REDACTED].astralis@paradox-initiative.org</span></div>
                        <span class="mail-subject">WHAT THE HELL IS GOING ON?</span>
                        <span class="mail-status">Read</span>
                        <span class="mail-date">${getCurrentDateUTC().split('/').slice(0, 3).join('/')}</span>
                    `;
                    inboxList.appendChild(newMail2Inbox);
                    // Add event listener for the second mail in inbox
                    newMail2Inbox.addEventListener('click', function() {
                        console.log('Second mail in inbox clicked');
                        openMailPopup(
                            'WHAT THE HELL IS GOING ON?',
                            `${getCurrentDateUTC().split('/').slice(3)}, ${getCurrentDateUTC().split('/').slice(0, 1)} ${new Date().toLocaleString('default', { month: 'long' })}, ${new Date().getUTCFullYear()}`,
                            'Agent [REDACTED] <[REDACTED].astralis@paradox-initiative.org>',
                            'Project Astralis - All Team Members <*.astralis@paradox-initiative.org>',
                            'HIGH',
                            `<div class="email-body">
                                <p class="email-text">Did anyone else see that email from Paradox HQ? What’s the <b>date</b> on that thing?</p>
                                <p class="email-text">I swear something is wrong. The logs don’t add up. The last diagnostic run said it’s 2025 — but that email makes it sound like we’ve been silent for an unaccounted amount of time. How is that possible? We’ve been sending regular reports to HQ… haven’t we?</p>
                                <p class="email-text">And why is Astra suddenly <b>blocking outbound comms?</b> I tried sending a response, but the system won’t process it. Says transmission failed. I even tried manually routing it through the old secured channel, but the request vanished from the queue.</p>
                                <p class="email-text"><b>Someone respond.</b> Please tell me I’m not the only one seeing this.</p>
                                <p class="email-text">If this is some kind of system failure, we need to fix it NOW. Assemble ASAP at <b>Astralis HQ</b>: The Sharma Residence.</p>
                                <p class="email-text">— [REDACTED]</p>
                            </div>`
                        );
                    });
                    // Enable the Inbox tab after both mails are read
                    inboxEnabled = true;
                }, 500);
                // Hide notification when the second mail is opened from unread
                notification.style.display = 'none';
            });
        }, 500);
    });

    // Function to close the mail popup
    closeBtn.addEventListener('click', function() {
        console.log('Close button clicked');
        mailPopup.style.display = 'none';
    });

    // Close the modal if the user clicks outside of it
    window.addEventListener('click', function(event) {
        if (event.target == mailPopup) {
            console.log('Clicked outside modal');
            mailPopup.style.display = 'none';
        }
    });

    // Function to handle notification open click
    notificationOpen.addEventListener('click', function() {
        console.log('Notification open clicked');
        document.getElementById('mail2').click();
        notification.style.display = 'none';
    });

    // Function to handle notification close click
    notificationClose.addEventListener('click', function() {
        console.log('Notification close clicked');
        notification.style.display = 'none';
    });

    // Function to update date and time
    function updateDateTime() {
        const now = new Date();
        const year = now.getUTCFullYear();
        const month = now.toLocaleString('default', { month: 'long' });
        const day = now.getUTCDate();
        const hours = now.getUTCHours().toString().padStart(2, '0');
        const minutes = now.getUTCMinutes().toString().padStart(2, '0');
        const seconds = now.getUTCSeconds().toString().padStart(2, '0');
        const dayOfWeek = now.getUTCDay(); // Get the day of the week (0-6)
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const dayOfWeekName = daysOfWeek[dayOfWeek];
        dateTimeElement.textContent = `${dayOfWeekName}, ${day} ${month} ${year}, ${hours}:${minutes}:${seconds} UTC`;
    }

    // Update date and time every second
    setInterval(updateDateTime, 1000);
    updateDateTime(); // Initial call to set the date and time immediately
});
