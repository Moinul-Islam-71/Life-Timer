let timerInterval; // টাইমার ট্র্যাকিং করার জন্য গ্লোবাল ভেরিয়েবল

const trigger = document.querySelector('#settings_trigger');
const panel = document.querySelector('#settings_panel');
const dob_input = document.querySelector('#dob_input');

// সেটিংস প্যানেল ওপেন/ক্লোজ করার ফাংশন
const openSettings = () => {
    panel.classList.toggle('active');
    trigger.classList.toggle('active');
    
    // UI class toggle logic (যদি CSS এ থাকে)
    if(panel.classList.contains('active')) {
        panel.style.display = 'flex';
    } else {
        panel.style.display = 'none';
    }
}

// বাইরে ক্লিক করলে সেটিংস বন্ধ হবে
document.addEventListener('click', (e) => {
    const settingsParent = document.querySelector('.settings-parent');
    if (!settingsParent.contains(e.target) && panel.classList.contains('active')) {
        openSettings();
    }
});

// লাইফ টাইমার আপডেট করার মেইন ফাংশন
const updateLifeTimer = () => {
    const birthDateValue = dob_input.value;
    if (!birthDateValue) {
        alert("Please select your birth date!");
        return;
    }

    const DateOfBirth = new Date(birthDateValue);
    
    // আগের কোনো টাইমার চললে সেটা বন্ধ করে নতুনটা শুরু হবে
    if (timerInterval) clearInterval(timerInterval);

    const set_DOB = () => {
        const currentDate = new Date();
        const ageInMs = currentDate - DateOfBirth;

        if (ageInMs < 0) {
            alert("Birth date cannot be in the future!");
            resetTimer();
            return;
        }

        // সময়ের ক্যালকুলেশন
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

        // UI আপডেট (ID ধরে)
        document.getElementById('year').innerText = yearsValue.toString().padStart(2, '0');
        document.getElementById('month').innerText = monthsValue.toString().padStart(2, '0');
        document.getElementById('day').innerText = daysValue.toString().padStart(2, '0');
        document.getElementById('hour').innerText = hoursValue.toString().padStart(2, '0');
        document.getElementById('minute').innerText = minutesValue.toString().padStart(2, '0');
        document.getElementById('second').innerText = secondsValue.toString().padStart(2, '0');
    };

    set_DOB(); // সাথে সাথে একবার রান হবে
    timerInterval = setInterval(set_DOB, 1000); // প্রতি সেকেন্ডে আপডেট হবে
    openSettings(); // ক্যালকুলেট হওয়ার পর প্যানেল বন্ধ হবে
};

// কপি করার ফাংশন
const copyToClipboard = () => {
    const y = document.getElementById('year').innerText;
    const m = document.getElementById('month').innerText;
    const d = document.getElementById('day').innerText;

    const text = `Life Journey: ${y} Years, ${m} Months, ${d} Days.`;
    
    navigator.clipboard.writeText(text).then(() => {
        const btn = event.currentTarget;
        const original = btn.innerHTML;
        btn.innerHTML = '<i class="fa fa-check"></i> Copied!';
        btn.classList.add(`copy-success`);
        
        setTimeout(() => {
            btn.classList.remove('copy-success');
            btn.innerHTML = original;
        }, 2000);
    });
};

// রিসেট টাইমার ফাংশন (যেটা তোমার কাজ করছিল না)
const resetTimer = () => {
    // ১. চলমান ইন্টারভ্যাল বন্ধ করা
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }

    // ২. সব ভ্যালু ০ করা
    const elements = ['year', 'month', 'day', 'hour', 'minute', 'second'];
    elements.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerText = '00';
    });

    // ৩. ইনপুট ফিল্ড ক্লিয়ার করা
    if (dob_input) {
        dob_input.value = '';
    }
    
    console.log("Timer has been reset!");
};
