/* Daily Habit Tracker logic */

const STORAGE_KEY = 'ease-habit-tracker-data';
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function loadHabits() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveHabits(habits) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
}

let habits = loadHabits();

const listEl = document.getElementById('habitList');
const formEl = document.getElementById('addHabitForm');
const inputEl = document.getElementById('habitInput');
const progressFill = document.getElementById('progressFill');
const progressLabel = document.getElementById('progressLabel');

function calcStreak(days) {
  let streak = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i]) streak++;
    else break;
  }
  return streak;
}

function calcWeeklyProgress() {
  if (habits.length === 0) return 0;
  const totalPossible = habits.length * DAYS.length;
  const totalChecked = habits.reduce(
    (sum, h) => sum + h.days.filter(Boolean).length,
    0
  );
  return Math.round((totalChecked / totalPossible) * 100);
}

function render() {
  listEl.innerHTML = '';

  if (habits.length === 0) {
    listEl.innerHTML = '<li class="ease-empty">No habits yet. Add one above to get started!</li>';
  }

  habits.forEach((habit, habitIndex) => {
    const li = document.createElement('li');
    li.className = 'ease-habit-item' + (habit.days.every(Boolean) ? ' ease-strike' : '');

    const info = document.createElement('div');
    info.className = 'ease-habit-info';

    const name = document.createElement('span');
    name.className = 'ease-habit-name';
    name.textContent = habit.name;

    const streak = document.createElement('span');
    streak.className = 'ease-habit-streak';
    const streakCount = calcStreak(habit.days);
    streak.textContent = streakCount > 0 ? `🔥 ${streakCount} day streak` : 'No streak yet';

    info.appendChild(name);
    info.appendChild(streak);

    const dayRow = document.createElement('div');
    dayRow.className = 'ease-day-row';

    DAYS.forEach((day, dayIndex) => {
      const box = document.createElement('div');
      box.className = 'ease-check' + (habit.days[dayIndex] ? ' checked' : '');
      box.textContent = day[0];
      box.title = day;
      box.addEventListener('click', () => {
        habits[habitIndex].days[dayIndex] = !habits[habitIndex].days[dayIndex];
        saveHabits(habits);
        render();
      });
      dayRow.appendChild(box);
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'ease-btn ease-btn-danger';
    deleteBtn.textContent = '✕';
    deleteBtn.title = 'Delete habit';
    deleteBtn.addEventListener('click', () => {
      habits.splice(habitIndex, 1);
      saveHabits(habits);
      render();
    });

    li.appendChild(info);
    li.appendChild(dayRow);
    li.appendChild(deleteBtn);
    listEl.appendChild(li);
  });

  const progress = calcWeeklyProgress();
  progressFill.style.width = progress + '%';
  progressLabel.textContent = `Weekly progress: ${progress}%`;
}

formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = inputEl.value.trim();
  if (!name) return;

  habits.push({
    name,
    days: new Array(DAYS.length).fill(false),
  });

  saveHabits(habits);
  inputEl.value = '';
  render();
});

render();