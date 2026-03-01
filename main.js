import { WEEKS_DATA } from './content.js';

class QuantumApp {
  constructor() {
    this.root = document.getElementById('app-root');
    this.sidebar = document.getElementById('sidebar');
    this.currentPage = 'home';
    this.currentWeek = 1;
    this.currentQuizIdx = 0;
    this.quizScore = 0;
    this.userProgress = this.loadProgress();
    this.currentTheme = this.loadTheme();
    this.init();
  }

  loadTheme() {
    return localStorage.getItem('quantum_theme') || 'default';
  }

  setTheme(themeName) {
    this.currentTheme = themeName;
    localStorage.setItem('quantum_theme', themeName);
    if (themeName === 'default') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', themeName);
    }
    this.toggleThemeDropdown(); // Close after selection
  }

  toggleThemeDropdown() {
    const dropdown = document.getElementById('theme-dropdown');
    if (dropdown) {
      dropdown.classList.toggle('show');
    }
  }

  init() {
    this.renderSidebar();
    this.handleRouting();
    window.addEventListener('popstate', () => this.handleRouting());

    // Theme Handler
    if (this.currentTheme && this.currentTheme !== 'default') {
      document.documentElement.setAttribute('data-theme', this.currentTheme);
    }

    // Close dropdown on outside click
    window.addEventListener('click', (e) => {
      if (!e.target.closest('.theme-selector')) {
        const dropdown = document.getElementById('theme-dropdown');
        if (dropdown && dropdown.classList.contains('show')) {
          dropdown.classList.remove('show');
        }
      }
    });
  }

  loadProgress() {
    const saved = localStorage.getItem('quantum_progress');
    return saved ? JSON.parse(saved) : {
      quizScores: {}, // weekIdx: bestScore
      completedWeeks: []
    };
  }

  saveProgress() {
    localStorage.setItem('quantum_progress', JSON.stringify(this.userProgress));
  }

  handleRouting() {
    const params = new URLSearchParams(window.location.search);
    const view = params.get('view') || 'home';
    const week = parseInt(params.get('week')) || 1;

    this.currentPage = view;
    this.currentWeek = week;
    this.render();
  }

  navigate(view, week = 1) {
    const url = new URL(window.location);
    url.searchParams.set('view', view);
    if (week) url.searchParams.set('week', week);
    window.history.pushState({}, '', url);
    this.handleRouting();
  }

  renderSidebar() {
    let html = `
            <div class="sidebar-group">
                <div class="sidebar-title">Foundation</div>
                <a class="sidebar-item ${this.currentPage === 'home' ? 'active' : ''}" onclick="app.navigate('home')">Overview</a>
                <a class="sidebar-item ${this.currentPage === 'dashboard' ? 'active' : ''}" onclick="app.navigate('dashboard')">Performance Dashboard</a>
            </div>
        `;

    WEEKS_DATA.forEach((data, idx) => {
      const wNum = data.week;
      const isWeekActive = this.currentWeek === wNum;
      html += `
                <div class="sidebar-group">
                    <div class="sidebar-title">Week ${wNum}</div>
                    <a class="sidebar-item ${isWeekActive && this.currentPage === 'notes' ? 'active' : ''}" onclick="app.navigate('notes', ${wNum})">Lecture Notes</a>
                    <a class="sidebar-item ${isWeekActive && this.currentPage === 'quiz' ? 'active' : ''}" onclick="app.navigate('quiz', ${wNum})">Practice Quiz (10)</a>
                    <a class="sidebar-item ${isWeekActive && this.currentPage === 'solutions' ? 'active' : ''}" onclick="app.navigate('solutions', ${wNum})">Assignment Solutions</a>
                </div>
            `;
    });

    this.sidebar.innerHTML = html;
  }

  render() {
    this.renderSidebar(); // Update active states
    this.root.innerHTML = '';

    switch (this.currentPage) {
      case 'home': this.renderHome(); break;
      case 'dashboard': this.renderDashboard(); break;
      case 'notes': this.renderNotes(); break;
      case 'quiz': this.renderQuiz(); break;
      case 'solutions': this.renderSolutions(); break;
      default: this.renderHome();
    }
  }

  renderHome() {
    this.root.innerHTML = `
            <div class="animate">
                <section class="hero">
                    <h1>Your Path to Quantum Mastery</h1>
                    <p style="max-width: 800px; margin: 0 auto;">Master NPTEL <b>noc21_cs103</b> with tailored lecture notes, assignment solutions, and 40+ strategic practice questions.</p>
                </section>
                <div class="dashboard-grid">
                    <div class="card" onclick="app.navigate('notes', 1)">
                        <h3>📚 Structured Notes</h3>
                        <p>Core concepts from every lecture condensed into actionable study materials.</p>
                    </div>
                    <div class="card" onclick="app.navigate('quiz', 1)">
                        <h3>🎯 Guided Quizzes</h3>
                        <p>10 questions per week with "Clues" to help you learn as you practice.</p>
                    </div>
                    <div class="card" onclick="app.navigate('dashboard')">
                        <h3>📊 Progress Tracker</h3>
                        <p>Visualize your improvement and see which weeks need more focus.</p>
                    </div>
                </div>
            </div>
        `;
  }

  renderDashboard() {
    const scores = this.userProgress.quizScores;
    const totalPossible = WEEKS_DATA.length * 10;
    let totalScored = 0;
    Object.values(scores).forEach(s => totalScored += s);

    const avg = totalScored > 0 ? Math.round((totalScored / totalPossible) * 100) : 0;

    let weekCards = WEEKS_DATA.map(w => {
      const score = scores[w.week] || 0;
      const percent = (score / 10) * 100;
      return `
                <div class="card">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                        <h4 style="margin:0">Week ${w.week}</h4>
                        <span style="color: var(--primary); font-weight:800">${score}/10</span>
                    </div>
                    <div class="progress-bar-container" style="margin-bottom:0">
                        <div class="progress-bar-fill" style="width: ${percent}%"></div>
                    </div>
                </div>
            `;
    }).join('');

    this.root.innerHTML = `
            <div class="animate">
                <h2 class="section-title">Performance Analytics</h2>
                <div class="dashboard-grid" style="margin-bottom: 3rem;">
                    <div class="card stat-card">
                        <div class="stat-value">${avg}%</div>
                        <div style="color: var(--text-muted)">Overall Readiness</div>
                    </div>
                    <div class="card stat-card">
                        <div class="stat-value">${totalScored}</div>
                        <div style="color: var(--text-muted)">Total Correct Answers</div>
                    </div>
                </div>
                <h3 style="margin-bottom: 1.5rem">Weekly Breakdown</h3>
                <div class="grid">
                    ${weekCards}
                </div>
            </div>
        `;
  }

  renderNotes() {
    const data = WEEKS_DATA.find(w => w.week === this.currentWeek);
    this.root.innerHTML = `
            <div class="animate">
                <div style="margin-bottom: 2rem">
                    <span style="color: var(--primary); font-weight: bold; text-transform: uppercase;">Week ${data.week} Lecture Notes</span>
                    <h2 style="font-size: 2.5rem; margin-top: 0.5rem">${data.title}</h2>
                </div>
                <div class="card" style="line-height: 2">
                    ${data.notes}
                </div>
                <div style="text-align: right">
                    <button class="btn btn-primary" onclick="app.navigate('quiz', ${data.week})">Take Week ${data.week} Quiz →</button>
                </div>
            </div>
        `;
  }

  renderSolutions() {
    const data = WEEKS_DATA.find(w => w.week === this.currentWeek);
    this.root.innerHTML = `
            <div class="animate">
                <div style="margin-bottom: 2rem">
                    <span style="color: var(--accent); font-weight: bold; text-transform: uppercase;">Week ${data.week} Solutions</span>
                    <h2 style="font-size: 2.5rem; margin-top: 0.5rem">Assignment Breakdown</h2>
                </div>
                <div class="card" style="border-left: 4px solid var(--accent)">
                    ${data.assignmentSolution}
                </div>
            </div>
        `;
  }

  renderQuiz() {
    this.currentQuizIdx = 0;
    this.quizScore = 0;
    this.displayQuizQuestion();
  }

  displayQuizQuestion() {
    const data = WEEKS_DATA.find(w => w.week === this.currentWeek);
    const questions = data.quiz;

    if (this.currentQuizIdx >= questions.length) {
      this.showQuizResult();
      return;
    }

    const q = questions[this.currentQuizIdx];
    const progress = ((this.currentQuizIdx) / questions.length) * 100;

    this.root.innerHTML = `
            <div class="animate">
                <div class="quiz-header">
                    <h3>Week ${data.week} Practice Quiz</h3>
                    <span style="color: var(--text-muted)">Question ${this.currentQuizIdx + 1} of ${questions.length}</span>
                </div>
                <div class="progress-bar-container">
                    <div class="progress-bar-fill" style="width: ${progress}%"></div>
                </div>
                
                <div class="card">
                    <div style="font-size: 1.4rem; font-weight: 500; margin-bottom: 2rem">${q.question}</div>
                    <div class="options">
                        ${q.options.map((opt, i) => `
                            <div class="option" id="opt-${i}" onclick="app.checkQuizAnswer(${i})">${opt}</div>
                        `).join('')}
                    </div>
                    
                    <div style="margin-top: 2rem;">
                        <button class="btn" style="background: rgba(129, 140, 248, 0.1); color: var(--secondary); border: 1px solid var(--secondary);" onclick="app.toggleClue()">💡 Stuck? Show Clue</button>
                    </div>
                    
                    <div class="clue-box" id="clue-box">
                        <strong>Clue:</strong> ${q.clue}
                    </div>

                    <div id="explanation-box" style="display:none; margin-top: 2rem; padding: 1.5rem; background: rgba(34, 197, 94, 0.05); border-radius: 12px; border: 1px solid var(--success);">
                        <strong>Explanation:</strong> ${q.explanation}
                    </div>
                    
                    <button class="btn btn-primary" id="next-btn" style="display:none; margin-top: 2rem; width: 100%" onclick="app.nextQuizQuestion()">Continue to Next Question →</button>
                </div>
            </div>
        `;
  }

  toggleClue() {
    const box = document.getElementById('clue-box');
    box.style.display = box.style.display === 'block' ? 'none' : 'block';
  }

  checkQuizAnswer(selectedIdx) {
    const data = WEEKS_DATA.find(w => w.week === this.currentWeek);
    const q = data.quiz[this.currentQuizIdx];
    const options = document.querySelectorAll('.option');

    // Disable all options
    options.forEach(el => el.style.pointerEvents = 'none');

    let isCorrect = Array.isArray(q.answer) ? q.answer.includes(selectedIdx) : selectedIdx === q.answer;

    if (isCorrect) {
      document.getElementById(`opt-${selectedIdx}`).classList.add('correct');
      if (Array.isArray(q.answer)) {
        q.answer.forEach(ans => {
          const el = document.getElementById(`opt-${ans}`);
          if (el) el.classList.add('correct');
        });
      }
      this.quizScore++;
    } else {
      document.getElementById(`opt-${selectedIdx}`).classList.add('wrong');
      if (Array.isArray(q.answer)) {
        q.answer.forEach(ans => {
          const el = document.getElementById(`opt-${ans}`);
          if (el) el.classList.add('correct');
        });
      } else {
        document.getElementById(`opt-${q.answer}`).classList.add('correct');
      }
    }

    document.getElementById('explanation-box').style.display = 'block';
    document.getElementById('next-btn').style.display = 'block';
  }

  nextQuizQuestion() {
    this.currentQuizIdx++;
    this.displayQuizQuestion();
  }

  showQuizResult() {
    const bestScore = this.userProgress.quizScores[this.currentWeek] || 0;
    if (this.quizScore > bestScore) {
      this.userProgress.quizScores[this.currentWeek] = this.quizScore;
      this.saveProgress();
    }

    this.root.innerHTML = `
            <div class="animate" style="text-align: center;">
                <div class="card stat-card">
                    <h2 class="section-title" style="margin-bottom:1rem">Quiz Complete!</h2>
                    <div class="stat-value" style="font-size: 5rem">${this.quizScore} / 10</div>
                    <p style="color: var(--text-muted); font-size: 1.2rem; margin-bottom: 2rem">
                        ${this.quizScore >= 8 ? "Excellent! You've mastered this week's content." : "Good effort! Keep studying the notes to improve."}
                    </p>
                    <div style="display: flex; gap: 1rem; justify-content: center;">
                        <button class="btn btn-primary" onclick="app.renderQuiz()">Try Again</button>
                        <button class="btn" style="border:1px solid var(--glass-border); color: var(--text-main)" onclick="app.navigate('dashboard')">View Dashboard</button>
                    </div>
                </div>
            </div>
        `;
  }
}

const app = new QuantumApp();
window.app = app;
