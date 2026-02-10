let timerInterval;
const trigger = document.querySelector('#settings_trigger');
const panel = document.querySelector('#settings_panel');

const openSettings = () => {
    panel.classList.toggle('active');
    trigger.classList.toggle('active');
}

// Close when clicking outside
document.addEventListener('click', (e) => {
    const settingsParent = document.querySelector('.settings-parent');

    if (!settingsParent.contains(e.target) && panel.classList.contains('active')) {
        openSettings();
    }

    /* explanation: 

        if( 
            clicked in the outside of settings-parent && 
            settings-panel is open
        ) {
            close the settings-panel
        }
    */
});

const updateLifeTimer = () => {
    const birthDateValue = dob_input.value;
    if (!birthDateValue) return;

    const DateOfBirth = new Date(birthDateValue);

    if (timerInterval) clearInterval(timerInterval);

    const set_DOB = () => {
        const currentDate = new Date();
        if (!DateOfBirth) return;

        const ageInMs = currentDate - DateOfBirth;

        if (ageInMs < 0) {
            resetTimer();
            return;
        }

        // Formula as per your request
        const Sec_In_ms = 1000;
        const Min_In_ms = Sec_In_ms * 60;
        const Hour_In_ms = Min_In_ms * 60;
        const Day_In_ms = Hour_In_ms * 24;
        const Year_In_ms = Day_In_ms * 365.25;
        const Month_In_ms = Day_In_ms * 30.4375;

        const yearsValue = Math.floor(ageInMs / Year_In_ms);
        const monthsValue = Math.floor((ageInMs % Year_In_ms) / Month_In_ms);
        const daysValue = Math.floor((ageInMs % Month_In_ms) / Day_In_ms);
        const hoursValue = Math.floor((ageInMs % Day_In_ms) / Hour_In_ms);
        const minutesValue = Math.floor((ageInMs % Hour_In_ms) / Min_In_ms);
        const secondsValue = Math.floor((ageInMs % Min_In_ms) / Sec_In_ms);

        // Updating UI with padStart for better look
        year.innerText = yearsValue.toString().padStart(2, '0');
        month.innerText = monthsValue.toString().padStart(2, '0');
        day.innerText = daysValue.toString().padStart(2, '0');
        hour.innerText = hoursValue.toString().padStart(2, '0');
        minute.innerText = minutesValue.toString().padStart(2, '0');
        second.innerText = secondsValue.toString().padStart(2, '0');
    };

    set_DOB();
    timerInterval = setInterval(set_DOB, 1000);
    openSettings();
};

const copyToClipboard = () => {
    const y = document.getElementById('year').innerText;
    const m = document.getElementById('month').innerText;
    const d = document.getElementById('day').innerText;
    
    const text = `Life Journey: ${y} Years, ${m} Months, ${d} Days.`;

    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    // Optional: Change button text temporarily
    const btn = event.currentTarget;
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="fa fa-check"></i> Copied!';
    btn.classList.add(`copy-success`);
    setTimeout(() => {
        btn.classList.remove('copy-success');
        btn.innerHTML = original;
    }, 2000);
};

// Reset timer function
const resetTimer = () => {
    const elements = ['year', 'month', 'day', 'hour', 'minute', 'second'];

    elements.forEach(id => {
        document.getElementById(id).innerText = '00';
    });
    
    document.getElementById('dob_input').value = '';
};