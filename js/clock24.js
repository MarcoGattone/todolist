const currentTime = document.querySelector(".ora-esatta"),
content = document.querySelector(".content-sveglia"),
selectMenu = document.querySelectorAll("select"),
setAlarmBtn = document.querySelector(".imposta-sveglia");

let alarmTime, isAlarmSet,
ringtone = new Audio("ringtone.mp3");

for (let i = 23; i >= 0; i--) {
    let h = i < 10 ? "0" + i : i;
    let option = `<option value="${h}">${h}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i >= 0; i--) {
    let m = i < 10 ? "0" + i : i;
    let option = `<option value="${m}">${m}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

setInterval(() => {
    let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds();
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    currentTime.innerText = `${h}:${m}:${s}`;

    if (alarmTime === `${h}:${m}`) {
        ringtone.play();
        ringtone.loop = true;
    }
});

function setAlarm() {
    if (isAlarmSet) {
        alarmTime = "";
        ringtone.pause();
        content.classList.remove("disable");
        setAlarmBtn.innerText = "Imposta Sveglia";
        return isAlarmSet = false;
    }

    let time = `${selectMenu[0].value}:${selectMenu[1].value}`;
    if (time.includes("Hour") || time.includes("Minute")) {
        return alert("Selezionare un orario valido per impostare la sveglia!");
    }
    alarmTime = time;
    isAlarmSet = true;
    content.classList.add("disable");
    setAlarmBtn.innerText = "Elimina Sveglia";
}


setAlarmBtn.addEventListener("click", setAlarm);


//Avviso Messaggio
const timeRemaining = document.querySelector(".time-remaining");

function calculateTimeRemaining() {
    // Se non è impostata alcuna sveglia, esci dalla funzione
    if (!isAlarmSet) {
        timeRemaining.innerText = '';
    return;
    }

    let date = new Date();
    let alarmDate = new Date();
    let hours, minutes, seconds, timeDifference;

    alarmDate.setHours(...alarmTime.split(":"));
    timeDifference = alarmDate.getTime() - date.getTime();

    if (timeDifference <= 0) {
        timeRemaining.innerText = 'La sveglia sta suonando!';
        return;
    }

    hours = Math.floor((timeDifference % 86400000) / 3600000);
    minutes = Math.floor(((timeDifference % 86400000) % 3600000) / 60000);
    seconds = Math.floor((((timeDifference % 86400000) % 3600000) % 60000) / 1000);

    // Se le ore impostate sono superiori a 24, esci dalla funzione
    if (hours > 24) {
        return;
    }

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    timeRemaining.innerText = `La sveglia suonerà tra circa ${hours}:${minutes}`;
}

setInterval(calculateTimeRemaining, 1000);