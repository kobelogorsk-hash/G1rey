// Football Training Pro - Main Application Logic
// Adapted for teenagers 12-16 years old

class FootballTrainingApp {
    constructor() {
        this.currentUser = null;
        this.currentSection = 'home';
        this.activeWorkout = null;
        this.workoutTimer = null;
        this.workoutStartTime = null;
        this.currentExerciseIndex = 0;
        
        this.init();
    }

    init() {
        this.loadUserData();
        this.setupNavigation();
        this.setupFilters();
        this.setupSearch();
        this.setupModals();
        this.setupProfileForm();
        this.renderPrograms();
        this.renderExercises();
        this.updateStats();
        this.renderAchievements();
        this.renderWeekChart();
        this.renderHistory();
    }

    // Data Management
    loadUserData() {
        const savedData = localStorage.getItem('footballTrainingUser');
        if (savedData) {
            this.currentUser = JSON.parse(savedData);
            this.populateProfileForm();
        } else {
            this.currentUser = this.createDefaultUser();
        }
    }

    createDefaultUser() {
        return {
            name: '',
            age: '',
            level: 'beginner',
            position: 'all',
            goal: 'all',
            stats: {
                totalWorkouts: 0,
                totalTime: 0,
                currentStreak: 0,
                bestStreak: 0,
                totalPoints: 0,
                ballWorkouts: 0,
                cardioWorkouts: 0,
                coreWorkouts: 0,
                lastWorkoutDate: null
            },
            achievements: [],
            history: []
        };
    }

    saveUserData() {
        localStorage.setItem('footballTrainingUser', JSON.stringify(this.currentUser));
    }

    // Navigation
    setupNavigation() {
        const navButtons = document.querySelectorAll('.nav-btn');
        navButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const section = btn.dataset.section;
                this.switchSection(section);
            });
        });
    }

    switchSection(sectionId) {
        // Update navigation buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.section === sectionId) {
                btn.classList.add('active');
            }
        });

        // Update sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');

        this.currentSection = sectionId;
    }

    // Programs
    setupFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.renderPrograms(btn.dataset.filter);
            });
        });
    }

    renderPrograms(filter = 'all') {
        const programsList = document.getElementById('programs-list');
        let filteredPrograms = programsData;

        if (filter !== 'all') {
            filteredPrograms = programsData.filter(p => p.type === filter);
        }

        programsList.innerHTML = filteredPrograms.map(program => `
            <div class="program-card" data-program-id="${program.id}">
                <div class="program-header">
                    <span class="program-type ${program.type}">${program.typeName}</span>
                    <span class="program-difficulty ${program.difficulty}">${program.difficultyName}</span>
                </div>
                <h4>${program.title}</h4>
                <p>${program.description}</p>
                <div class="program-meta">
                    <span>⏱️ ${program.duration} мин</span>
                    <span>🔥 ${program.calories} ккал</span>
                </div>
            </div>
        `).join('');

        // Add click handlers
        programsList.querySelectorAll('.program-card').forEach(card => {
            card.addEventListener('click', () => {
                const programId = parseInt(card.dataset.programId);
                this.showProgramDetails(programId);
            });
        });
    }

    showProgramDetails(programId) {
        const program = programsData.find(p => p.id === programId);
        if (!program) return;

        const workoutDetails = document.getElementById('workout-details');
        workoutDetails.innerHTML = `
            <div class="workout-header">
                <h2 class="workout-title">${program.title}</h2>
                <div class="workout-info">
                    <span>${program.typeName}</span>
                    <span>${program.difficultyName}</span>
                    <span>⏱️ ${program.duration} мин</span>
                    <span>🔥 ${program.calories} ккал</span>
                </div>
            </div>
            <p style="margin-bottom: 20px; font-size: 1.1rem;">${program.description}</p>
            
            <div class="exercise-list">
                <h3 style="margin-bottom: 15px; color: #667eea;">Упражнения:</h3>
                ${program.exercises.map((exercise, index) => `
                    <div class="exercise-item">
                        <h4>${index + 1}. ${exercise.name}</h4>
                        <p>⏱️ ${this.formatTime(exercise.duration)} | Подходы: ${exercise.sets} | Отдых: ${exercise.rest}с</p>
                    </div>
                `).join('')}
            </div>
            
            <button class="start-workout-btn" onclick="app.startWorkout(${program.id})">
                🚀 Начать тренировку
            </button>
        `;

        document.getElementById('workout-modal').classList.add('active');
    }

    // Exercises
    setupSearch() {
        const searchInput = document.getElementById('exercise-search');
        searchInput.addEventListener('input', (e) => {
            this.renderExercises(e.target.value);
        });
    }

    renderExercises(searchTerm = '') {
        const exercisesList = document.getElementById('exercises-list');
        let filteredExercises = exercisesData;

        if (searchTerm) {
            filteredExercises = exercisesData.filter(e => 
                e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                e.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        exercisesList.innerHTML = filteredExercises.map(exercise => `
            <div class="exercise-card" data-exercise-id="${exercise.id}">
                <div class="exercise-icon">${exercise.icon}</div>
                <h4>${exercise.name}</h4>
                <p>${exercise.description}</p>
                <div class="exercise-meta">
                    <span>${this.getDifficultyLabel(exercise.difficulty)}</span>
                </div>
            </div>
        `).join('');

        // Add click handlers
        exercisesList.querySelectorAll('.exercise-card').forEach(card => {
            card.addEventListener('click', () => {
                const exerciseId = parseInt(card.dataset.exerciseId);
                this.showExerciseDetails(exerciseId);
            });
        });
    }

    showExerciseDetails(exerciseId) {
        const exercise = exercisesData.find(e => e.id === exerciseId);
        if (!exercise) return;

        const exerciseDetails = document.getElementById('exercise-details');
        exerciseDetails.innerHTML = `
            <div class="workout-header">
                <div style="font-size: 4rem; margin-bottom: 10px;">${exercise.icon}</div>
                <h2 class="workout-title">${exercise.name}</h2>
            </div>
            
            <p style="margin-bottom: 20px; font-size: 1.1rem;">${exercise.description}</p>
            
            <div style="margin-bottom: 20px;">
                <h3 style="color: #667eea; margin-bottom: 10px;">💪 Задействованные мышцы:</h3>
                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                    ${exercise.muscles.map(m => `<span style="background: #f0f0f0; padding: 5px 15px; border-radius: 15px; font-size: 0.9rem;">${m}</span>`).join('')}
                </div>
            </div>
            
            <div>
                <h3 style="color: #667eea; margin-bottom: 15px;">📋 Инструкция:</h3>
                <ol style="line-height: 2;">
                    ${exercise.instructions.map(inst => `<li style="margin-bottom: 10px;">${inst}</li>`).join('')}
                </ol>
            </div>
        `;

        document.getElementById('exercise-modal').classList.add('active');
    }

    getDifficultyLabel(difficulty) {
        const labels = {
            easy: '🟢 Легкий',
            medium: '🟡 Средний',
            hard: '🔴 Сложный'
        };
        return labels[difficulty] || difficulty;
    }

    // Workout System
    startWorkout(programId) {
        const program = programsData.find(p => p.id === programId);
        if (!program) return;

        // Close modal
        document.getElementById('workout-modal').classList.remove('active');

        // Setup workout
        this.activeWorkout = {
            program: program,
            startTime: Date.now(),
            currentExerciseIndex: 0,
            exercises: program.exercises
        };

        // Start timer
        this.startTimer();
        
        this.showWorkoutMode();
    }

    startTimer() {
        // Clear any existing timer
        if (this.workoutTimer) {
            clearInterval(this.workoutTimer);
        }
        
        // Update timer every second
        this.workoutTimer = setInterval(() => {
            this.updateTimerDisplay();
        }, 1000);
    }

    updateTimerDisplay() {
        const timerElement = document.querySelector('.workout-timer');
        if (timerElement && this.activeWorkout) {
            const elapsedTime = Math.floor((Date.now() - this.activeWorkout.startTime) / 1000);
            timerElement.textContent = this.formatTime(elapsedTime);
        }
    }

    stopTimer() {
        if (this.workoutTimer) {
            clearInterval(this.workoutTimer);
            this.workoutTimer = null;
        }
    }

    showWorkoutMode() {
        const workoutDetails = document.getElementById('workout-details');
        const currentExercise = this.activeWorkout.exercises[this.activeWorkout.currentExerciseIndex];
        const totalTime = this.activeWorkout.exercises.reduce((sum, ex) => sum + (ex.duration * ex.sets), 0);
        const elapsedTime = Math.floor((Date.now() - this.activeWorkout.startTime) / 1000);

        workoutDetails.innerHTML = `
            <div class="workout-mode">
                <h2 class="workout-title">${this.activeWorkout.program.title}</h2>
                
                <div class="current-exercise">
                    <h3>Упражнение ${this.activeWorkout.currentExerciseIndex + 1} из ${this.activeWorkout.exercises.length}</h3>
                    <h2 style="font-size: 1.5rem; margin: 15px 0;">${currentExercise.name}</h2>
                    <p>⏱️ ${this.formatTime(currentExercise.duration)} | Подходы: ${currentExercise.sets} | Отдых: ${currentExercise.rest}с</p>
                </div>
                
                <div class="workout-timer">${this.formatTime(elapsedTime)}</div>
                
                <div style="margin-bottom: 20px;">
                    <p><strong>Прогресс:</strong> ${this.activeWorkout.currentExerciseIndex + 1} / ${this.activeWorkout.exercises.length}</p>
                    <div style="background: #f0f0f0; height: 10px; border-radius: 5px; overflow: hidden;">
                        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); height: 100%; width: ${((this.activeWorkout.currentExerciseIndex + 1) / this.activeWorkout.exercises.length) * 100}%; transition: width 0.3s ease;"></div>
                    </div>
                </div>
                
                <div class="workout-controls">
                    <button class="control-btn secondary" onclick="app.previousExercise()">⬅️ Назад</button>
                    <button class="control-btn primary" onclick="app.nextExercise()">Вперед ➡️</button>
                    <button class="control-btn secondary" onclick="app.finishWorkout()">✅ Завершить</button>
                </div>
            </div>
        `;

        document.getElementById('workout-modal').classList.add('active');
    }

    nextExercise() {
        if (this.activeWorkout.currentExerciseIndex < this.activeWorkout.exercises.length - 1) {
            this.activeWorkout.currentExerciseIndex++;
            this.showWorkoutMode();
        } else {
            this.finishWorkout();
        }
    }

    previousExercise() {
        if (this.activeWorkout.currentExerciseIndex > 0) {
            this.activeWorkout.currentExerciseIndex--;
            this.showWorkoutMode();
        }
    }

    finishWorkout() {
        // Stop timer
        this.stopTimer();
        
        const workoutDuration = Math.floor((Date.now() - this.activeWorkout.startTime) / 1000);
        const pointsEarned = Math.floor(this.activeWorkout.program.calories / 10) + 50;

        // Update user stats
        this.currentUser.stats.totalWorkouts++;
        this.currentUser.stats.totalTime += workoutDuration;
        this.currentUser.stats.totalPoints += pointsEarned;

        // Update type-specific stats
        const typeKey = `${this.activeWorkout.program.type}Workouts`;
        if (this.currentUser.stats[typeKey] !== undefined) {
            this.currentUser.stats[typeKey]++;
        }

        // Update streak
        const today = new Date().toDateString();
        const lastWorkout = this.currentUser.stats.lastWorkoutDate;
        
        if (lastWorkout) {
            const lastDate = new Date(lastWorkout);
            const diffDays = Math.floor((new Date(today) - lastDate) / (1000 * 60 * 60 * 24));
            
            if (diffDays === 1) {
                this.currentUser.stats.currentStreak++;
            } else if (diffDays > 1) {
                this.currentUser.stats.currentStreak = 1;
            }
        } else {
            this.currentUser.stats.currentStreak = 1;
        }

        if (this.currentUser.stats.currentStreak > this.currentUser.stats.bestStreak) {
            this.currentUser.stats.bestStreak = this.currentUser.stats.currentStreak;
        }

        this.currentUser.stats.lastWorkoutDate = today;

        // Add to history
        this.currentUser.stats.history.unshift({
            date: new Date().toLocaleDateString('ru-RU'),
            program: this.activeWorkout.program.title,
            duration: workoutDuration,
            points: pointsEarned,
            type: this.activeWorkout.program.type
        });

        // Check achievements
        this.checkAchievements();

        // Save and update UI
        this.saveUserData();
        this.updateStats();
        this.renderAchievements();
        this.renderHistory();
        this.renderWeekChart();

        // Show completion message
        document.getElementById('workout-details').innerHTML = `
            <div class="workout-mode">
                <div style="font-size: 4rem; margin-bottom: 20px;">🎉</div>
                <h2 class="workout-title">Тренировка завершена!</h2>
                <p style="font-size: 1.2rem; margin: 20px 0;">Отличная работа! Так держать!</p>
                
                <div style="background: #f8f9fa; padding: 20px; border-radius: 15px; margin: 20px 0;">
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
                        <div>
                            <p style="color: #666;">Время тренировки:</p>
                            <p style="font-size: 1.5rem; font-weight: bold; color: #667eea;">${this.formatTime(workoutDuration)}</p>
                        </div>
                        <div>
                            <p style="color: #666;">Заработано очков:</p>
                            <p style="font-size: 1.5rem; font-weight: bold; color: #667eea;">⭐ ${pointsEarned}</p>
                        </div>
                    </div>
                </div>
                
                <button class="start-workout-btn" onclick="app.stopTimer(); document.getElementById('workout-modal').classList.remove('active')">
                    Продолжить
                </button>
            </div>
        `;
    }

    checkAchievements() {
        const stats = this.currentUser.stats;
        
        achievementsData.forEach(achievement => {
            if (this.currentUser.achievements.includes(achievement.id)) return;

            let earned = false;
            
            switch (achievement.requirement.type) {
                case 'workouts':
                    earned = stats.totalWorkouts >= achievement.requirement.count;
                    break;
                case 'streak':
                    earned = stats.currentStreak >= achievement.requirement.count;
                    break;
                case 'ballWorkouts':
                    earned = stats.ballWorkouts >= achievement.requirement.count;
                    break;
                case 'cardioWorkouts':
                    earned = stats.cardioWorkouts >= achievement.requirement.count;
                    break;
                case 'coreWorkouts':
                    earned = stats.coreWorkouts >= achievement.requirement.count;
                    break;
                case 'points':
                    earned = stats.totalPoints >= achievement.requirement.count;
                    break;
            }

            if (earned) {
                this.currentUser.achievements.push(achievement.id);
                this.showAchievementNotification(achievement);
            }
        });
    }

    showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = 'success-message';
        notification.innerHTML = `
            <div style="font-size: 2rem; margin-bottom: 10px;">${achievement.icon}</div>
            <strong>Достижение разблокировано!</strong><br>
            ${achievement.name}
        `;
        
        document.querySelector('.content').prepend(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }

    // Profile
    setupProfileForm() {
        document.getElementById('save-profile').addEventListener('click', () => {
            this.saveProfile();
        });
    }

    populateProfileForm() {
        if (!this.currentUser) return;

        document.getElementById('athlete-name').value = this.currentUser.name || '';
        document.getElementById('athlete-age').value = this.currentUser.age || '';
        document.getElementById('athlete-level').value = this.currentUser.level || 'beginner';
        document.getElementById('athlete-position').value = this.currentUser.position || 'all';
        document.getElementById('training-goal').value = this.currentUser.goal || 'all';
    }

    saveProfile() {
        this.currentUser.name = document.getElementById('athlete-name').value;
        this.currentUser.age = document.getElementById('athlete-age').value;
        this.currentUser.level = document.getElementById('athlete-level').value;
        this.currentUser.position = document.getElementById('athlete-position').value;
        this.currentUser.goal = document.getElementById('training-goal').value;

        this.saveUserData();
        
        const successMsg = document.createElement('div');
        successMsg.className = 'success-message';
        successMsg.textContent = '✅ Профиль сохранен!';
        document.querySelector('#profile .profile-form').prepend(successMsg);
        
        setTimeout(() => successMsg.remove(), 3000);
    }

    // Stats & Progress
    updateStats() {
        if (!this.currentUser) return;

        const stats = this.currentUser.stats;

        // Home page stats
        document.getElementById('streak-days').textContent = stats.currentStreak;
        document.getElementById('completed-workouts').textContent = stats.totalWorkouts;
        document.getElementById('total-points').textContent = stats.totalPoints;

        // Profile stats
        document.getElementById('profile-total-workouts').textContent = stats.totalWorkouts;
        document.getElementById('profile-total-time').textContent = this.formatTime(stats.totalTime, true);
        document.getElementById('profile-streak').textContent = `${stats.currentStreak} дней`;
        document.getElementById('profile-best-streak').textContent = `${stats.bestStreak} дней`;
    }

    renderWeekChart() {
        const chartContainer = document.getElementById('week-chart');
        const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
        
        // Generate mock data based on history
        const workoutsByDay = {};
        days.forEach((day, index) => {
            workoutsByDay[index] = 0;
        });

        if (this.currentUser && this.currentUser.stats.history) {
            this.currentUser.stats.history.slice(0, 14).forEach(item => {
                const date = new Date(item.date.split('.').reverse().join('-'));
                const dayIndex = date.getDay() === 0 ? 6 : date.getDay() - 1;
                if (dayIndex >= 0 && dayIndex <= 6) {
                    workoutsByDay[dayIndex]++;
                }
            });
        }

        const maxWorkouts = Math.max(...Object.values(workoutsByDay), 1);

        chartContainer.innerHTML = days.map((day, index) => {
            const count = workoutsByDay[index];
            const height = (count / maxWorkouts) * 150;
            return `
                <div class="chart-bar">
                    <div class="bar" style="height: ${height}px;"></div>
                    <span class="bar-label">${day}</span>
                    <span class="bar-label" style="font-weight: bold;">${count}</span>
                </div>
            `;
        }).join('');
    }

    renderAchievements() {
        const achievementsList = document.getElementById('achievements-list');
        
        if (!this.currentUser) return;

        achievementsList.innerHTML = achievementsData.map(achievement => {
            const unlocked = this.currentUser.achievements.includes(achievement.id);
            return `
                <div class="achievement-badge ${unlocked ? '' : 'locked'}">
                    <div class="achievement-icon">${achievement.icon}</div>
                    <div class="achievement-name">${achievement.name}</div>
                </div>
            `;
        }).join('');
    }

    renderHistory() {
        const historyList = document.getElementById('history-list');
        
        if (!this.currentUser || !this.currentUser.stats.history || this.currentUser.stats.history.length === 0) {
            historyList.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📝</div>
                    <p>История тренировок пуста</p>
                    <p>Начни тренироваться, чтобы увидеть историю здесь!</p>
                </div>
            `;
            return;
        }

        historyList.innerHTML = this.currentUser.stats.history.slice(0, 10).map(item => `
            <div class="history-item">
                <div>
                    <div class="history-date">${item.date}</div>
                    <div class="history-workout">${item.program}</div>
                </div>
                <div class="history-points">+${item.points} ⭐</div>
            </div>
        `).join('');
    }

    // Modals
    setupModals() {
        document.getElementById('close-workout').addEventListener('click', () => {
            this.stopTimer();
            document.getElementById('workout-modal').classList.remove('active');
        });

        document.getElementById('close-exercise').addEventListener('click', () => {
            document.getElementById('exercise-modal').classList.remove('active');
        });

        // Close on outside click
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                if (e.target.id === 'workout-modal') {
                    this.stopTimer();
                }
                e.target.classList.remove('active');
            }
        });
    }

    // Utilities
    formatTime(seconds, hours = false) {
        if (hours && seconds >= 3600) {
            const h = Math.floor(seconds / 3600);
            const m = Math.floor((seconds % 3600) / 60);
            return `${h} ч ${m} мин`;
        }
        
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
}

// Initialize app when DOM is loaded
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new FootballTrainingApp();
});
