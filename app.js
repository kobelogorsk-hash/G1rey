class FootballApp {
    constructor() {
        this.currentUser = this.loadUserData();
        this.activeWorkout = null;
        this.timerInterval = null;
        this.currentTime = 0;
        this.currentExerciseIndex = 0;
        this.isTimerRunning = false;
        
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupFilters();
        this.renderDailyProgram();
        this.renderSkills('all');
        this.renderWorkouts('all');
        this.updateProfileUI();
        this.updateStats();
        this.setupModalListeners();
        this.setupWorkoutControls();
        
        // Обновляем имя в шапке
        document.getElementById('user-name-display').textContent = this.currentUser.name;
    }

    loadUserData() {
        const saved = localStorage.getItem('footballUser');
        if (saved) return JSON.parse(saved);
        return {
            name: 'Girey',
            age: 14,
            goal: 'pro',
            stats: { workouts: 0, skills: 0, minutes: 0, core: 0 }
        };
    }

    saveUserData() {
        localStorage.setItem('footballUser', JSON.stringify(this.currentUser));
        this.updateStats();
    }

    setupNavigation() {
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tabId = e.target.dataset.tab;
                this.switchTab(tabId);
            });
        });
    }

    switchTab(tabId) {
        document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
        document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));
        
        document.getElementById(tabId).classList.add('active');
        document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
        
        if(tabId === 'progress') this.updateStats();
        if(tabId === 'profile') this.updateProfileUI();
    }

    setupFilters() {
        // Фильтр финтов
        document.querySelectorAll('#skills .filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setActiveFilter(e.target, '#skills');
                this.renderSkills(e.target.dataset.filter);
            });
        });

        // Фильтр тренировок
        document.querySelectorAll('#workouts .filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setActiveFilter(e.target, '#workouts');
                this.renderWorkouts(e.target.dataset.filter);
            });
        });
    }

    setActiveFilter(activeBtn, containerSelector) {
        document.querySelectorAll(`${containerSelector} .filter-btn`).forEach(b => b.classList.remove('active'));
        activeBtn.classList.add('active');
    }

    filterWorkouts(category) {
        this.switchTab('workouts');
        setTimeout(() => {
            const btn = document.querySelector(`#workouts .filter-btn[data-filter="${category}"]`);
            if(btn) btn.click();
        }, 100);
    }

    renderDailyProgram() {
        // Выбираем случайную тренировку или по прогрессу
        const workouts = appData.workouts;
        const daily = workouts[Math.floor(Math.random() * workouts.length)];
        
        const titleEl = document.getElementById('daily-program-title');
        titleEl.textContent = `${daily.title} (${daily.duration})`;
        
        const card = document.getElementById('daily-program-btn');
        card.onclick = () => this.startWorkoutMode(daily);
    }

    renderSkills(filter) {
        const grid = document.getElementById('skills-grid');
        grid.innerHTML = '';
        
        const filtered = filter === 'all' 
            ? appData.skills 
            : appData.skills.filter(s => s.level === filter);

        filtered.forEach(skill => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="card-img">${skill.icon}</div>
                <div class="card-body">
                    <h3 class="card-title">${skill.title}</h3>
                    <p class="card-desc">${skill.description}</p>
                    <div class="card-meta">
                        <span>${this.getLevelName(skill.level)}</span>
                        <span>Финт</span>
                    </div>
                </div>
            `;
            card.onclick = () => this.showSkillDetail(skill);
            grid.appendChild(card);
        });
    }

    renderWorkouts(filter) {
        const grid = document.getElementById('workouts-grid');
        grid.innerHTML = '';
        
        let filtered = appData.workouts;
        if (filter !== 'all') {
            filtered = appData.workouts.filter(w => w.category === filter);
        }

        filtered.forEach(workout => {
            const card = document.createElement('div');
            card.className = 'card';
            const icon = workout.category === 'ball' ? '⚽' : workout.category === 'cardio' ? '🏃' : '💪';
            
            card.innerHTML = `
                <div class="card-img">${icon}</div>
                <div class="card-body">
                    <h3 class="card-title">${workout.title}</h3>
                    <p class="card-desc">${workout.exercises.length} упражнений • ${workout.duration}</p>
                    <div class="card-meta">
                        <span>${this.getLevelName(workout.level)}</span>
                        <span>Тренировка</span>
                    </div>
                </div>
            `;
            card.onclick = () => this.showWorkoutDetail(workout);
            grid.appendChild(card);
        });
    }

    getLevelName(level) {
        const names = { 'beginner': 'Новичок', 'intermediate': 'Средний', 'advanced': 'Профи', 'expert': 'Эксперт' };
        return names[level] || level;
    }

    // --- МОДАЛЬНЫЕ ОКНА И ДЕТАЛИ ---

    setupModalListeners() {
        // Закрытие по крестику
        document.querySelectorAll('.close-modal').forEach(span => {
            span.onclick = () => {
                document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
                this.stopTimer();
            };
        });

        // Закрытие по клику вне окна
        window.onclick = (event) => {
            if (event.target.classList.contains('modal')) {
                event.target.style.display = 'none';
                this.stopTimer();
            }
        };

        // Кнопка "Начать практику" в деталях
        document.getElementById('start-detail-action').onclick = () => {
            const modal = document.getElementById('detail-modal');
            modal.style.display = 'none';
            
            if (this.pendingWorkout) {
                this.startWorkoutMode(this.pendingWorkout);
                this.pendingWorkout = null;
            } else if (this.pendingSkill) {
                // Для финта можно запустить режим практики (упрощенно как тренировка из 1 упражнения)
                const practiceSession = {
                    title: `Практика: ${this.pendingSkill.title}`,
                    exercises: [{ name: 'Отработка финта', time: 60, desc: 'Выполняй финт в ритме. 3 сек подготовка, 2 сек выполнение.', muscles: ['Техника'] }]
                };
                this.startWorkoutMode(practiceSession);
                this.pendingSkill = null;
            }
        };
    }

    showSkillDetail(skill) {
        this.pendingSkill = skill; // Сохраняем для запуска
        this.pendingWorkout = null;

        const modal = document.getElementById('detail-modal');
        document.getElementById('detail-title').textContent = skill.title;
        document.getElementById('detail-difficulty').textContent = this.getLevelName(skill.level);
        document.getElementById('detail-desc').textContent = skill.description;

        // Показываем шаги
        const stepsContainer = document.getElementById('detail-steps-container');
        const stepsList = document.getElementById('detail-steps-list');
        stepsContainer.style.display = 'block';
        stepsList.innerHTML = '';

        skill.steps.forEach((step, index) => {
            const div = document.createElement('div');
            div.className = 'step-item';
            div.innerHTML = `<span class="step-title">${index + 1}. ${step.title}</span>${step.text}`;
            stepsList.appendChild(div);
        });

        // Скрываем мышцы для финтов
        document.getElementById('detail-muscles-container').style.display = 'none';

        modal.style.display = 'flex';
    }

    showWorkoutDetail(workout) {
        this.pendingWorkout = workout;
        this.pendingSkill = null;

        const modal = document.getElementById('detail-modal');
        document.getElementById('detail-title').textContent = workout.title;
        document.getElementById('detail-difficulty').textContent = this.getLevelName(workout.level);
        document.getElementById('detail-desc').textContent = `Комплексная тренировка: ${workout.exercises.length} упражнений.`;

        // Скрываем шаги для тренировок
        document.getElementById('detail-steps-container').style.display = 'none';

        // Показываем мышцы (сбор всех мышц из упражнений)
        const musclesContainer = document.getElementById('detail-muscles-container');
        const musclesList = document.getElementById('detail-muscles-list');
        musclesContainer.style.display = 'block';
        musclesList.innerHTML = '';

        const allMuscles = new Set();
        workout.exercises.forEach(ex => {
            if(ex.muscles) ex.muscles.forEach(m => allMuscles.add(m));
        });

        allMuscles.forEach(muscle => {
            const span = document.createElement('span');
            span.className = 'muscle-tag';
            span.textContent = muscle;
            musclesList.appendChild(span);
        });

        modal.style.display = 'flex';
    }

    // --- ЛОГИКА ТРЕНИРОВКИ ---

    startWorkoutMode(workout) {
        this.activeWorkout = workout;
        this.currentExerciseIndex = 0;
        this.currentTime = 0;
        this.isTimerRunning = false;
        
        const modal = document.getElementById('workout-modal');
        document.getElementById('workout-title').textContent = workout.title;
        
        this.loadExercise(0);
        modal.style.display = 'flex';
        
        // Сброс таймера
        this.updateTimerDisplay();
        document.getElementById('toggle-timer').textContent = 'Старт';
    }

    loadExercise(index) {
        if (!this.activeWorkout) return;
        
        const exercise = this.activeWorkout.exercises[index];
        document.getElementById('current-exercise-name').textContent = exercise.name;
        document.getElementById('current-exercise-desc').textContent = exercise.desc;
        document.getElementById('exercise-timer').textContent = `${exercise.time} сек`;
        document.getElementById('current-rep').textContent = index + 1;
        document.getElementById('total-reps').textContent = this.activeWorkout.exercises.length;
        
        // Сброс локального таймера упражнения
        this.currentTime = exercise.time;
        this.updateTimerDisplay();
        this.stopTimer();
        document.getElementById('toggle-timer').textContent = 'Старт';
    }

    setupWorkoutControls() {
        // Таймер старта/стопа
        document.getElementById('toggle-timer').onclick = () => {
            if (this.isTimerRunning) {
                this.stopTimer();
                document.getElementById('toggle-timer').textContent = 'Старт';
            } else {
                this.startTimer();
                document.getElementById('toggle-timer').textContent = 'Пауза';
            }
        };

        // Следующее упражнение
        document.getElementById('next-exercise').onclick = () => {
            if (this.currentExerciseIndex < this.activeWorkout.exercises.length - 1) {
                this.currentExerciseIndex++;
                this.loadExercise(this.currentExerciseIndex);
            } else {
                alert('Тренировка завершена! Отличная работа!');
                this.finishWorkout();
            }
        };

        // НАЗАД (Исправлено)
        document.getElementById('prev-exercise').onclick = () => {
            if (this.currentExerciseIndex > 0) {
                this.stopTimer();
                this.currentExerciseIndex--;
                this.loadExercise(this.currentExerciseIndex);
                document.getElementById('toggle-timer').textContent = 'Старт';
            }
        };

        // ЗАВЕРШИТЬ (Исправлено)
        document.getElementById('finish-workout').onclick = () => {
            if(confirm('Закончить тренировку досрочно?')) {
                this.finishWorkout();
            }
        };
    }

    startTimer() {
        this.isTimerRunning = true;
        this.timerInterval = setInterval(() => {
            if (this.currentTime > 0) {
                this.currentTime--;
                this.updateTimerDisplay();
            } else {
                // Время вышло
                this.stopTimer();
                // Автопереход или звук
                if (this.currentExerciseIndex < this.activeWorkout.exercises.length - 1) {
                   if(confirm('Время вышло! Следующее упражнение?')) {
                       this.currentExerciseIndex++;
                       this.loadExercise(this.currentExerciseIndex);
                       this.startTimer(); // Автостарт следующего
                   }
                } else {
                    alert('Упражнение выполнено! Тренировка завершена!');
                    this.finishWorkout();
                }
            }
        }, 1000);
    }

    stopTimer() {
        this.isTimerRunning = false;
        clearInterval(this.timerInterval);
    }

    updateTimerDisplay() {
        const minutes = Math.floor(this.currentTime / 60);
        const seconds = this.currentTime % 60;
        document.getElementById('exercise-timer').textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    finishWorkout() {
        this.stopTimer();
        document.getElementById('workout-modal').style.display = 'none';
        
        // Обновление статистики
        this.currentUser.stats.workouts++;
        this.currentUser.stats.minutes += parseInt(this.activeWorkout.duration) || 15;
        if(this.activeWorkout.category === 'core') this.currentUser.stats.core++;
        
        this.saveUserData();
        this.activeWorkout = null;
        
        // Переход в прогресс
        this.switchTab('progress');
    }

    // --- ПРОФИЛЬ И ПРОГРЕСС ---

    updateProfileUI() {
        document.getElementById('profile-name').value = this.currentUser.name;
        document.getElementById('profile-age').value = this.currentUser.age;
        document.getElementById('profile-goal').value = this.currentUser.goal;
    }

    updateStats() {
        const s = this.currentUser.stats;
        document.getElementById('total-workouts').textContent = s.workouts;
        document.getElementById('total-skills').textContent = s.skills; // Нужно увеличивать при просмотре финта
        document.getElementById('total-minutes').textContent = s.minutes;
        
        // Уровень
        let level = 'Новичок';
        if (s.workouts > 5) level = 'Любитель';
        if (s.workouts > 15) level = 'Профи';
        if (s.workouts > 30) level = 'Легенда';
        document.getElementById('user-level').textContent = level;

        // Достижения
        this.renderAchievements();
    }

    renderAchievements() {
        const grid = document.getElementById('achievements-grid');
        grid.innerHTML = '';
        
        appData.achievements.forEach(ach => {
            let unlocked = false;
            if (ach.type === 'workouts' && this.currentUser.stats.workouts >= ach.req) unlocked = true;
            if (ach.type === 'minutes' && this.currentUser.stats.minutes >= ach.req) unlocked = true;
            if (ach.type === 'core' && this.currentUser.stats.core >= ach.req) unlocked = true;
            // Для навыков упрощенно считаем по количеству просмотров (можно доработать)
            
            const div = document.createElement('div');
            div.className = `achievement-card ${unlocked ? 'unlocked' : ''}`;
            div.innerHTML = `
                <div class="ach-icon">${ach.icon}</div>
                <h4>${ach.title}</h4>
                <p style="font-size:0.8rem; color:#aaa">${ach.desc}</p>
            `;
            grid.appendChild(div);
        });
    }
}

// Инициализация приложения
const app = new FootballApp();

// Обработчик формы профиля
document.getElementById('profile-form').addEventListener('submit', (e) => {
    e.preventDefault();
    app.currentUser.name = document.getElementById('profile-name').value;
    app.currentUser.age = document.getElementById('profile-age').value;
    app.currentUser.goal = document.getElementById('profile-goal').value;
    
    app.saveUserData();
    document.getElementById('user-name-display').textContent = app.currentUser.name;
    alert('Профиль сохранен!');
});
