let habits = [];
let ageGroup = "";

const ageSelect = document.getElementById('ageGroup');
const addBtn = document.getElementById('addBtn');

// Load from localStorage
if(localStorage.getItem('habits')) {
  habits = JSON.parse(localStorage.getItem('habits'));
  ageGroup = localStorage.getItem('ageGroup') || "";
  ageSelect.value = ageGroup;
  updateLayout();
  displayHabits();
}

// Event Listeners
ageSelect.addEventListener('change', updateLayout);
addBtn.addEventListener('click', addTask);

function updateLayout() {
  ageGroup = ageSelect.value;
  const title = document.getElementById('modeTitle');
  const tracker = document.getElementById('trackerBox');

  if(ageGroup === "1-8"){ title.innerHTML = "Kids Mode ⭐ Earn Stars!"; tracker.className = "tracker-box kids"; }
  else if(ageGroup === "8-13"){ title.innerHTML = "Pre-Teen Mode 🏆 Gain XP!"; tracker.className = "tracker-box preteens"; }
  else if(ageGroup === "13-18"){ title.innerHTML = "Teen Mode 🎯 Earn Points!"; tracker.className = "tracker-box teens"; }
  else { title.innerHTML = "Add tasks to get started"; tracker.className = "tracker-box"; }

  localStorage.setItem('ageGroup', ageGroup);
  updateProgress();
}

function addTask() {
  const input = document.getElementById('newTask');
  const task = input.value.trim();
  if(task !== "") {
    habits.push({name: task, done: false});
    input.value = "";
    saveHabits();
    displayHabits();
  }
}

function displayHabits() {
  const habitList = document.getElementById('habitList');
  habitList.innerHTML = "";
  habits.forEach((habit, index) => {
    habitList.innerHTML += `
      <div class="habit">
        <input type="checkbox" id="habit${index}" ${habit.done ? "checked" : ""} onchange="toggleTask(${index})">
        ${habit.name}
      </div>
    `;
  });
  updateProgress();
}

function toggleTask(index) {
  habits[index].done = !habits[index].done;
  saveHabits();
  updateProgress();
}

function updateProgress() {
  const completed = habits.filter(h => h.done).length;
  const total = habits.length;
  const percent = total ? Math.round((completed/total)*100) : 0;

  document.getElementById('progressText').innerHTML = `Progress: ${completed}/${total} tasks (${percent}%)`;

  const rewardDiv = document.getElementById('rewardText');
  rewardDiv.innerHTML = '';

  if(ageGroup === "1-8") {
    for(let i=0;i<completed;i++){
      const span = document.createElement('span');
      span.textContent = '⭐';
      rewardDiv.appendChild(span);
    }
  } else if(ageGroup === "8-13") {
    rewardDiv.innerHTML = `XP: ${completed*5}`;
  } else if(ageGroup === "13-18") {
    rewardDiv.innerHTML = `Points: ${completed*10}`;
  }
}

function saveHabits() {
  localStorage.setItem('habits', JSON.stringify(habits));
}

