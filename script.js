document.addEventListener('DOMContentLoaded', function() {
    const firstVisit = localStorage.getItem('firstVisit');
    
    if (firstVisit === null) {
        switchApp('welcome');
        localStorage.setItem('firstVisit', 'false');
    } else {
        switchApp('quote');
    }
    const sidebarButtons = document.querySelectorAll('.app-button');
}); 

// Global variables
 let currentApp = 'welcome';
 let expenses = [];
 let todos = [];
 let notes = [];
 let timerInterval;
 let startTime = 0;
 let elapsedTime = 0;
 let isRunning = false;
 let lapTimes = [];
 let currentPoll = null;

 // Update switchApp function in script.js

 function goHome() {
    switchApp('welcome');
}

function switchApp(appName) {
    // Hide all app contents and welcome screen
    const allContents = document.querySelectorAll('.app-content, .welcome-screen');
    allContents.forEach(content => {
        content.classList.remove('active');
    });

    // Show selected content
    const selectedContent = document.getElementById(appName);
    if (selectedContent) {
        selectedContent.classList.add('active');
    }

    // Update active states
    const allButtons = document.querySelectorAll('.app-button, .nav-button');
    allButtons.forEach(button => {
        button.classList.remove('active');
    });

    const activeButtons = document.querySelectorAll(`[data-app="${appName}"]`);
    activeButtons.forEach(button => {
        button.classList.add('active');
    });

    currentApp = appName;
}

function goHome() {
    switchApp('welcome');
    const allContents = document.querySelectorAll('.app-content');
    allContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Show welcome screen
    document.getElementById('welcome').classList.add('active');
    
    // Update active states
    const allButtons = document.querySelectorAll('.app-button, .nav-button');
    allButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    currentApp = 'welcome';
}
document.addEventListener('DOMContentLoaded', function() {
    // Show welcome screen first
    switchApp('welcome');
    
    // Initialize all the event listeners
    initializeApp();
});

function initializeApp() {
    // Sidebar buttons
    const sidebarButtons = document.querySelectorAll('.app-button');
    sidebarButtons.forEach(button => {
        button.addEventListener('click', () => {
            const appName = button.getAttribute('data-app');
            switchApp(appName);
        });
    });

    // Top navigation buttons
    const navButtons = document.querySelectorAll('.nav-button');
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const appName = button.getAttribute('data-app');
            switchApp(appName);
        });
    });

    // Other initialization code...
    const rateSlider = document.getElementById('tts-rate');
    const rateValue = document.getElementById('rate-value');
    if (rateSlider && rateValue) {
        rateSlider.addEventListener('input', () => {
            rateValue.textContent = rateSlider.value;
        });
    }

    // Load saved data
    loadExpenses();
    loadTodos();
    loadNotes();
}

 // Quote Generator
const QUOTES = [
    // Famous Quotes (30)
    {text: "Be the change you wish to see in the world.", author: "Mahatma Gandhi"},
    {text: "Life is what happens when you're busy making other plans.", author: "John Lennon"},
    {text: "The only way to do great work is to love what you do.", author: "Steve Jobs"},
    {text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein"},
    {text: "Do one thing every day that scares you.", author: "Eleanor Roosevelt"},
    {text: "Well done is better than well said.", author: "Benjamin Franklin"},
    {text: "Whatever you are, be a good one.", author: "Abraham Lincoln"},
    {text: "The purpose of our lives is to be happy.", author: "Dalai Lama"},
    {text: "You only live once, but if you do it right, once is enough.", author: "Mae West"},
    {text: "Never let the fear of striking out keep you from playing the game.", author: "Babe Ruth"},
    
    // Anime Quotes (30)
    {text: "Believe in the me that believes in you!", author: "Kamina (Gurren Lagann)"},
    {text: "If you don't take risks, you can't create a future!", author: "Monkey D. Luffy (One Piece)"},
    {text: "It's not the face that makes someone a monster, it's the choices they make.", author: "Nami (One Piece)"},
    {text: "Hard work is worthless for those that don't believe in themselves.", author: "Naruto Uzumaki (Naruto)"},
    {text: "Knowing you're different is only the beginning.", author: "Lelouch (Code Geass)"},
    {text: "I am the hope of the universe!", author: "Goku (Dragon Ball Z)"},
    {text: "A true warrior doesn't need a sword.", author: "Kenshin Himura (Rurouni Kenshin)"},
    {text: "The world is not beautiful, therefore it is.", author: "Kino (Kino's Journey)"},
    {text: "People die when they are killed.", author: "Shirou Emiya (Fate Stay Night)"},
    {text: "Reject common sense to make the impossible possible.", author: "Simon (Gurren Lagann)"},
    
    // Movie Quotes (20)
    {text: "May the Force be with you.", author: "Star Wars"},
    {text: "I'll be back.", author: "Terminator"},
    {text: "You can't handle the truth!", author: "A Few Good Men"},
    {text: "My precious.", author: "Lord of the Rings"},
    {text: "Why so serious?", author: "The Dark Knight"},
    {text: "I'm king of the world!", author: "Titanic"},
    {text: "Life is like a box of chocolates.", author: "Forrest Gump"},
    {text: "You talking to me?", author: "Taxi Driver"},
    {text: "Keep your friends close, but your enemies closer.", author: "The Godfather"},
    {text: "I see dead people.", author: "The Sixth Sense"},
    
    // Funny Quotes (20)
    {text: "I'm not lazy, I'm on energy saving mode.", author: "Unknown"},
    {text: "I don't need a hairstylist, my pillow gives me a new hairstyle every morning.", author: "Unknown"},
    {text: "I'm not arguing, I'm just explaining why I'm right.", author: "Unknown"},
    {text: "I'm not short, I'm concentrated awesome.", author: "Unknown"},
    {text: "I don't make mistakes. I date them.", author: "Unknown"},
    {text: "I'm not procrastinating, I'm prioritizing my happiness.", author: "Unknown"},
    {text: "I don't need anger management. I need people to stop annoying me.", author: "Unknown"},
    {text: "I'm not weird, I'm limited edition.", author: "Unknown"},
    {text: "I'm not late, everyone else is just early.", author: "Unknown"},
    {text: "I'm not ignoring you, I'm just prioritizing my peace.", author: "Unknown"},
    
    // Add more quotes here to reach 100...
    {text: "The journey of a thousand miles begins with one step.", author: "Lao Tzu"},
    {text: "That's one small step for man, one giant leap for mankind.", author: "Neil Armstrong"},
    {text: "I have a dream.", author: "Martin Luther King Jr."},
    {text: "The only thing we have to fear is fear itself.", author: "Franklin D. Roosevelt"},
    {text: "Ask not what your country can do for you, ask what you can do for your country.", author: "John F. Kennedy"},
    {text: "I think, therefore I am.", author: "René Descartes"},
    {text: "The unexamined life is not worth living.", author: "Socrates"},
    {text: "Where there is love there is life.", author: "Mahatma Gandhi"},
    {text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci"},
    {text: "Less is more.", author: "Ludwig Mies van der Rohe"},
    {text: "I am become Death, the destroyer of worlds.", author: "J. Robert Oppenheimer"},
    {text: "Eureka!", author: "Archimedes"},
    {text: "Elementary, my dear Watson.", author: "Sherlock Holmes"},
    {text: "Houston, we have a problem.", author: "Apollo 13"},
    {text: "There's no place like home.", author: "The Wizard of Oz"},
    {text: "Carpe diem. Seize the day, boys.", author: "Dead Poets Society"},
    {text: "My mama always said life was like a box of chocolates.", author: "Forrest Gump"},
    {text: "I'm walking here!", author: "Midnight Cowboy"},
    {text: "You're gonna need a bigger boat.", author: "Jaws"},
    {text: "Here's looking at you, kid.", author: "Casablanca"},
    {text: "My precious.", author: "Lord of the Rings"},
    {text: "I'll be back.", author: "Terminator"},
    {text: "May the Force be with you.", author: "Star Wars"},
    {text: "There's no crying in baseball!", author: "A League of Their Own"},
    {text: "I'm the king of the world!", author: "Titanic"},
    {text: "Keep your friends close, but your enemies closer.", author: "The Godfather Part II"},
    {text: "I see dead people.", author: "The Sixth Sense"},
    {text: "I feel the need—the need for speed!", author: "Top Gun"},
    {text: "You can't handle the truth!", author: "A Few Good Men"},
    {text: "I'm just a girl, standing in front of a boy, asking him to love her.", author: "Notting Hill"},
    {text: "You had me at hello.", author: "Jerry Maguire"},
    {text: "To infinity and beyond!", author: "Toy Story"},
    {text: "I'm Batman.", author: "Batman"},
    {text: "You're killing me, Smalls!", author: "The Sandlot"},
    {text: "Life moves pretty fast. If you don't stop and look around once in a while, you could miss it.", author: "Ferris Bueller's Day Off"},
    {text: "I'm not bad. I'm just drawn that way.", author: "Who Framed Roger Rabbit"},
    {text: "Just keep swimming.", author: "Finding Nemo"},
    {text: "You is kind. You is smart. You is important.", author: "The Help"},
    {text: "I drink your milkshake!", author: "There Will Be Blood"},
    {text: "I'm the Dude. So that's what you call me.", author: "The Big Lebowski"},
    {text: "Why so serious?", author: "The Dark Knight"},
    {text: "I'm Spartacus!", author: "Spartacus"},
    {text: "I'm mad as hell, and I'm not going to take this anymore!", author: "Network"},
    {text: "I'm ready for my close-up.", author: "Sunset Boulevard"},
    {text: "I'm walking here!", author: "Midnight Cowboy"},
    {text: "I'm not bad. I'm just drawn that way.", author: "Who Framed Roger Rabbit"},
    {text: "I'm the king of the world!", author: "Titanic"},
    {text: "I'm just a girl, standing in front of a boy, asking him to love her.", author: "Notting Hill"},
    {text: "I'm Batman.", author: "Batman"},
    {text: "I'm Spartacus!", author: "Spartacus"},
    {text: "I'm mad as hell, and I'm not going to take this anymore!", author: "Network"},
    {text: "I'm ready for my close-up.", author: "Sunset Boulevard"},
    {text: "I'm walking here!", author: "Midnight Cowboy"},
    {text: "I'm not bad. I'm just drawn that way.", author: "Who Framed Roger Rabbit"}
];

// Store quote history in localStorage
let quoteHistory = JSON.parse(localStorage.getItem('quoteHistory')) || [];

function generateQuote() {
    // Get random quote
    const randomIndex = Math.floor(Math.random() * QUOTES.length);
    const randomQuote = QUOTES[randomIndex];
    
    // Display the quote
    document.getElementById('quote-result').innerHTML = `
        <div class="quote-text">"${randomQuote.text}"</div>
        <div class="quote-author">— ${randomQuote.author}</div>
    `;
    document.getElementById('password-result').innerHTML = `
        <div class="password-text">${password}</div>
    `;
    // Add to history
    addToHistory(randomQuote);
}

function copyPassword() {
    const passwordResult = document.getElementById('password-result');
    const passwordText = passwordResult.textContent.trim();
    
    if (passwordText && passwordText !== "Generated password will appear here") {
        navigator.clipboard.writeText(passwordText)
            .then(() => {
                const copyBtn = document.querySelector('.copy-btn');
                copyBtn.textContent = 'Copied!';
                setTimeout(() => {
                    copyBtn.textContent = 'Copy';
                }, 2000);
            })
            .catch(err => {
                console.error('Could not copy text: ', err);
                alert('Failed to copy password to clipboard');
            });
    }
}

function addToHistory(quote) {
    // Add new quote to beginning of history
    quoteHistory.unshift(quote);
    
    // Limit history to last 10 quotes
    if (quoteHistory.length > 10) {
        quoteHistory = quoteHistory.slice(0, 10);
    }
    
    // Save to localStorage
    localStorage.setItem('quoteHistory', JSON.stringify(quoteHistory));
    
    // Update history display
    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';
    
    quoteHistory.forEach((quote, index) => {
        const quoteElement = document.createElement('div');
        quoteElement.className = 'history-item';
        quoteElement.innerHTML = `
            <div class="history-quote">"${quote.text}"</div>
            <div class="history-author">— ${quote.author}</div>
        `;
        historyList.appendChild(quoteElement);
    });
}

// Initialize - generate first quote and load history
window.onload = function() {
    generateQuote();
    updateHistoryDisplay();
};


 // Password Generator
// Update generatePassword function
function generatePassword() {
    const length = parseInt(document.getElementById('password-length').value);
    const includeUppercase = document.getElementById('include-uppercase').checked;
    const includeLowercase = document.getElementById('include-lowercase').checked;
    const includeNumbers = document.getElementById('include-numbers').checked;
    const includeSymbols = document.getElementById('include-symbols').checked;

    let characters = '';
    let charSets = 0;
    
    if (includeUppercase) {
        characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        charSets++;
    }
    if (includeLowercase) {
        characters += 'abcdefghijklmnopqrstuvwxyz';
        charSets++;
    }
    if (includeNumbers) {
        characters += '0123456789';
        charSets++;
    }
    if (includeSymbols) {
        characters += '!@#$%^&*()_+-=[]{}|;:,.<>?';
        charSets++;
    }

    if (characters === '') {
        document.getElementById('password-result').textContent = 'Please select at least one character type!';
        document.getElementById('password-result').className = 'password-result';
        return;
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    const passwordResult = document.getElementById('password-result');
    passwordResult.innerHTML = password;
    passwordResult.className = 'password-result';
    
    // Update strength indicator
    updateStrengthIndicator(length, charSets);
}

// Add strength indicator function
function updateStrengthIndicator(length, charSets) {
    const strengthFill = document.getElementById('strength-fill');
    let strength = 0;
    
    // Length contributes up to 50% of strength
    strength += Math.min(length / 50 * 50, 50);
    
    // Character sets contribute up to 50% of strength
    strength += (charSets / 4) * 50;
    
    // Cap at 100%
    strength = Math.min(strength, 100);
    
    strengthFill.style.width = strength + '%';
    
    // Change color based on strength
    if (strength < 30) {
        strengthFill.style.backgroundColor = '#ff4444'; // Weak
    } else if (strength < 70) {
        strengthFill.style.backgroundColor = '#ffbb33'; // Medium
    } else {
        strengthFill.style.backgroundColor = '#00C851'; // Strong
    }
}

// Update copyPassword function
function copyPassword() {
    const passwordResult = document.getElementById('password-result');
    const passwordText = passwordResult.textContent.trim();
    
    if (passwordText && !passwordResult.classList.contains('empty')) {
        navigator.clipboard.writeText(passwordText)
            .then(() => {
                const copyBtn = document.querySelector('.copy-btn');
                copyBtn.textContent = 'Copied!';
                setTimeout(() => {
                    copyBtn.textContent = 'Copy';
                }, 2000);
            })
            .catch(err => {
                console.error('Could not copy text: ', err);
                alert('Failed to copy password to clipboard');
            });
    }
}

// Add event listener for range slider
document.getElementById('password-length').addEventListener('input', function() {
    document.getElementById('length-value').textContent = this.value;
});
 // Hex Color Generator
function generateHex() {
    const count = parseInt(document.getElementById('color-count').value) || 5;
    const colorGrid = document.getElementById('hex-result');
    colorGrid.innerHTML = '';
    
    // Generate specified number of color boxes
    for (let i = 0; i < count; i++) {
        // Generate random hex color (ensure 6 digits)
        const hex = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
        
        // Create color box element
        const colorBox = document.createElement('div');
        colorBox.className = 'color-box';
        colorBox.style.backgroundColor = hex;
        
        // Create hex code display
        const colorCode = document.createElement('div');
        colorCode.className = 'color-code';
        colorCode.textContent = hex.toUpperCase();
        colorCode.style.color = getContrastColor(hex); // Set text color for contrast
        
        // Add click to copy functionality
        colorBox.addEventListener('click', function() {
            navigator.clipboard.writeText(hex.toUpperCase())
                .then(() => showCopyFeedback('Copied: ' + hex.toUpperCase()))
                .catch(err => console.error('Could not copy text: ', err));
        });
        
        colorBox.appendChild(colorCode);
        colorGrid.appendChild(colorBox);
    }
}

// Keep this existing function
function getContrastColor(hex) {
    const r = parseInt(hex.substr(1, 2), 16);
    const g = parseInt(hex.substr(3, 2), 16);
    const b = parseInt(hex.substr(5, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? '#000000' : '#FFFFFF';
}

// Add this new function
function showCopyFeedback(message) {
    const feedback = document.createElement('div');
    feedback.className = 'copy-feedback';
    feedback.textContent = message;
    document.body.appendChild(feedback);
    
    // Show feedback
    setTimeout(() => feedback.classList.add('show'), 10);
    
    // Hide after 2 seconds
    setTimeout(() => {
        feedback.classList.remove('show');
        setTimeout(() => feedback.remove(), 300);
    }, 2000);
}

function showCopyFeedback(message) {
    const feedback = document.createElement('div');
    feedback.className = 'copy-feedback show';
    feedback.textContent = message;
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        feedback.classList.remove('show');
        setTimeout(() => feedback.remove(), 300);
    }, 2000);
}


// Wikipedia API configuration
const WIKI_API_URL = "https://en.wikipedia.org/w/api.php";

// Main generation function
async function generateAIParagraphs() {
    const topic = document.getElementById('paragraph-topic').value.trim();
    const count = parseInt(document.getElementById('paragraph-count').value);
    
    if (!topic) {
        alert('Please enter a topic!');
        return;
    }

    const resultBox = document.getElementById('paragraph-result');
    resultBox.innerHTML = `
        <div class="loading-spinner">
            <div class="spinner"></div>
            <div>Fetching information about ${topic}...</div>
        </div>
    `;

    try {
        const paragraphs = await fetchWikipediaContent(topic, count);
        
        let htmlContent = `<h3>${topic}</h3>`;
        paragraphs.forEach(para => {
            htmlContent += `<p>${para}</p>`;
        });
        
        resultBox.innerHTML = `
            <div class="generated-content">
                ${htmlContent}
                <div class="content-footer">
                    <small>Source: Wikipedia • ${new Date().toLocaleString()}</small>
                </div>
            </div>
        `;
    } catch (error) {
        console.error("Wikipedia fetch error:", error);
        resultBox.innerHTML = `
            <div class="error-message">
                Failed to fetch content: ${error.message}<br>
                Please try a different topic or try again later.
            </div>
        `;
    }
}

// Fetch content from Wikipedia API
async function fetchWikipediaContent(topic, count) {
    // First, search for the exact page
    const searchResponse = await fetch(
        `${WIKI_API_URL}?action=query&format=json&list=search&srsearch=${encodeURIComponent(topic)}&srlimit=1&origin=*`
    );
    
    if (!searchResponse.ok) {
        throw new Error(`Wikipedia search failed with status ${searchResponse.status}`);
    }
    
    const searchData = await searchResponse.json();
    
    if (searchData.query.search.length === 0) {
        throw new Error("No Wikipedia page found for this topic");
    }
    
    const pageTitle = searchData.query.search[0].title;
    
    // Now get the page content
    const contentResponse = await fetch(
        `${WIKI_API_URL}?action=query&format=json&prop=extracts&exintro=true&explaintext=true&titles=${encodeURIComponent(pageTitle)}&origin=*`
    );
    
    if (!contentResponse.ok) {
        throw new Error(`Wikipedia content fetch failed with status ${contentResponse.status}`);
    }
    
    const contentData = await contentResponse.json();
    const pages = contentData.query.pages;
    const pageId = Object.keys(pages)[0];
    const content = pages[pageId].extract;
    
    if (!content) {
        throw new Error("No content available for this page");
    }
    
    // Split into paragraphs and clean up
    let paragraphs = content.split('\n')
        .map(p => p.trim())
        .filter(p => p.length > 0);
    
    // Limit to requested number of paragraphs
    if (paragraphs.length > count) {
        paragraphs = paragraphs.slice(0, count);
    }
    
    return paragraphs;
}

// Enter key functionality
document.getElementById('paragraph-topic').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        generateAIParagraphs();
    }
});

// Input validation
document.getElementById('paragraph-count').addEventListener('change', function() {
    this.value = Math.min(10, Math.max(1, parseInt(this.value) || 3));
});
 // Expense Tracker
function addExpense() {
    const description = document.getElementById('expense-description').value.trim();
    const amount = parseFloat(document.getElementById('expense-amount').value);

    if (!description || isNaN(amount) || amount <= 0) {
        alert('Please enter valid description and amount!');
        return;
    }

    const expense = {
        id: Date.now(),
        description: description,
        amount: amount,
        date: new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    };

    expenses.unshift(expense); // Add to beginning of array
    saveExpenses();
    displayExpenses();
    
    // Clear inputs
    document.getElementById('expense-description').value = '';
    document.getElementById('expense-amount').value = '';
    document.getElementById('expense-description').focus();
}
function sortExpenses() {
    const sortBy = document.getElementById('expense-sort').value;
    
    switch(sortBy) {
        case 'newest':
            expenses.sort((a, b) => b.id - a.id);
            break;
        case 'oldest':
            expenses.sort((a, b) => a.id - b.id);
            break;
        case 'highest':
            expenses.sort((a, b) => b.amount - a.amount);
            break;
        case 'lowest':
            expenses.sort((a, b) => a.amount - b.amount);
            break;
    }
    
    displayExpenses();
}

 function deleteExpense(id) {
     expenses = expenses.filter(expense => expense.id !== id);
     saveExpenses();
     displayExpenses();
 }

 function clearExpenses() {
     if (confirm('Are you sure you want to clear all expenses?')) {
         expenses = [];
         saveExpenses();
         displayExpenses();
     }
 }

 function displayExpenses() {
    const expenseList = document.getElementById('expense-list');
    const totalExpense = document.getElementById('total-expense');
    const expenseCount = document.getElementById('expense-count');

    if (expenses.length === 0) {
        expenseList.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📊</div>
                <p>No expenses recorded yet</p>
                <small>Add your first expense above</small>
            </div>
        `;
        totalExpense.textContent = '$0.00';
        expenseCount.textContent = '0';
        return;
    }

    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    totalExpense.textContent = `$${total.toFixed(2)}`;
    expenseCount.textContent = expenses.length;

    expenseList.innerHTML = expenses.map(expense => `
        <div class="expense-item">
            <div class="expense-details">
                <div class="expense-description">${expense.description}</div>
                <div class="expense-date">${expense.date}</div>
            </div>
            <div class="expense-amount">$${expense.amount.toFixed(2)}</div>
            <button class="delete-btn" onclick="deleteExpense(${expense.id})" title="Delete expense">
                ×
            </button>
        </div>
    `).join('');
}

 function saveExpenses() {
     try {
         localStorage.setItem('expenses', JSON.stringify(expenses));
     } catch (e) {
         console.log('LocalStorage not available');
     }
 }

 function loadExpenses() {
     try {
         const saved = localStorage.getItem('expenses');
         if (saved) {
             expenses = JSON.parse(saved);
             displayExpenses();
         }
     } catch (e) {
         console.log('LocalStorage not available');
     }
 }

 // Todo App
 function addTodo() {
     const todoInput = document.getElementById('todo-input');
     const text = todoInput.value.trim();

     if (!text) {
         alert('Please enter a task!');
         return;
     }

     const todo = {
         id: Date.now(),
         text: text,
         completed: false,
         date: new Date().toLocaleDateString()
     };

     todos.push(todo);
     saveTodos();
     displayTodos();
     todoInput.value = '';
 }

 function toggleTodo(id) {
     const todo = todos.find(t => t.id === id);
     if (todo) {
         todo.completed = !todo.completed;
         saveTodos();
         displayTodos();
     }
 }

 function deleteTodo(id) {
     todos = todos.filter(todo => todo.id !== id);
     saveTodos();
     displayTodos();
 }

 function clearTodos() {
     if (confirm('Are you sure you want to clear all tasks?')) {
         todos = [];
         saveTodos();
         displayTodos();
     }
 }

 function displayTodos() {
     const todoList = document.getElementById('todo-list');

     if (todos.length === 0) {
         todoList.innerHTML = '<p>No tasks added yet.</p>';
         return;
     }

     todoList.innerHTML = todos.map(todo => `
         <div class="todo-item ${todo.completed ? 'completed' : ''}">
             <input type="checkbox" ${todo.completed ? 'checked' : ''} 
                    onchange="toggleTodo(${todo.id})">
             <span>${todo.text}</span>
             <button class="delete-btn" onclick="deleteTodo(${todo.id})">Delete</button>
         </div>
     `).join('');
 }

 function saveTodos() {
     try {
         localStorage.setItem('todos', JSON.stringify(todos));
     } catch (e) {
         console.log('LocalStorage not available');
     }
 }

 function loadTodos() {
     try {
         const saved = localStorage.getItem('todos');
         if (saved) {
             todos = JSON.parse(saved);
             displayTodos();
         }
     } catch (e) {
         console.log('LocalStorage not available');
     }
 }

 // Text to Speech
 function speakText() {
     const text = document.getElementById('tts-text').value.trim();
     const rate = parseFloat(document.getElementById('tts-rate').value);

     if (!text) {
         alert('Please enter some text to speak!');
         return;
     }

     if ('speechSynthesis' in window) {
         const utterance = new SpeechSynthesisUtterance(text);
         utterance.rate = rate;
         speechSynthesis.speak(utterance);
     } else {
         alert('Text-to-speech is not supported in your browser.');
     }
 }

 function stopSpeech() {
     if ('speechSynthesis' in window) {
         speechSynthesis.cancel();
     }
 }

 // BMI Calculator
 function calculateBMI() {
     const weight = parseFloat(document.getElementById('bmi-weight').value);
     const height = parseFloat(document.getElementById('bmi-height').value);

     if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
         document.getElementById('bmi-result').textContent = 'Please enter valid weight and height!';
         return;
     }

     const bmi = weight / Math.pow(height / 100, 2);
     let category = '';

     if (bmi < 18.5) {
         category = 'Underweight';
     } else if (bmi < 25) {
         category = 'Normal weight';
     } else if (bmi < 30) {
         category = 'Overweight';
     } else {
         category = 'Obese';
     }

     document.getElementById('bmi-result').innerHTML = `
         <strong>Your BMI: ${bmi.toFixed(2)}</strong><br>
         <strong>Category: ${category}</strong><br><br>
         <small>BMI Categories:<br>
         Underweight: Below 18.5<br>
         Normal weight: 18.5-24.9<br>
        Overweight: 25-29.9<br>
        Obese: 30 and above</small>
     `;
 }

 // Loan Calculator
 function calculateLoan() {
     const amount = parseFloat(document.getElementById('loan-amount').value);
     const rate = parseFloat(document.getElementById('loan-rate').value) / 100 / 12;
     const term = parseFloat(document.getElementById('loan-term').value) * 12;

     if (isNaN(amount) || isNaN(rate) || isNaN(term) || amount <= 0 || rate <= 0 || term <= 0) {
         document.getElementById('loan-result').textContent = 'Please enter valid loan details!';
         return;
     }

     const monthlyPayment = amount * (rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
     const totalPayment = monthlyPayment * term;
     const totalInterest = totalPayment - amount;

     document.getElementById('loan-result').innerHTML = `
         <strong>Monthly Payment: ${monthlyPayment.toFixed(2)}</strong><br>
         <strong>Total Payment: ${totalPayment.toFixed(2)}</strong><br>
         <strong>Total Interest: ${totalInterest.toFixed(2)}</strong>
     `;
 }

 // Tip Calculator
 function calculateTip() {
     const billAmount = parseFloat(document.getElementById('bill-amount').value);
     const tipPercentage = parseFloat(document.getElementById('tip-percentage').value);
     const peopleCount = parseInt(document.getElementById('people-count').value);

     if (isNaN(billAmount) || isNaN(tipPercentage) || isNaN(peopleCount) || 
         billAmount <= 0 || tipPercentage < 0 || peopleCount <= 0) {
         document.getElementById('tip-result').textContent = 'Please enter valid bill details!';
         return;
     }

     const tipAmount = billAmount * (tipPercentage / 100);
     const totalAmount = billAmount + tipAmount;
     const perPerson = totalAmount / peopleCount;

     document.getElementById('tip-result').innerHTML = `
         <strong>Tip Amount: ${tipAmount.toFixed(2)}</strong><br>
         <strong>Total Amount: ${totalAmount.toFixed(2)}</strong><br>
         <strong>Per Person: ${perPerson.toFixed(2)}</strong>
     `;
 }

 // Fixed Deposit Calculator
 function calculateFD() {
     const principal = parseFloat(document.getElementById('fd-principal').value);
     const rate = parseFloat(document.getElementById('fd-rate').value) / 100;
     const term = parseFloat(document.getElementById('fd-term').value);

     if (isNaN(principal) || isNaN(rate) || isNaN(term) || principal <= 0 || rate <= 0 || term <= 0) {
         document.getElementById('fd-result').textContent = 'Please enter valid deposit details!';
         return;
     }

     const maturityAmount = principal * Math.pow(1 + rate, term);
     const interest = maturityAmount - principal;

     document.getElementById('fd-result').innerHTML = `
         <strong>Maturity Amount: ${maturityAmount.toFixed(2)}</strong><br>
         <strong>Interest Earned: ${interest.toFixed(2)}</strong><br>
         <strong>Total Return: ${((interest / principal) * 100).toFixed(2)}%</strong>
     `;
 }

 // Age Calculator
 function calculateAge() {
     const birthDate = new Date(document.getElementById('birth-date').value);
     const targetDate = document.getElementById('target-date').value ? 
                        new Date(document.getElementById('target-date').value) : 
                        new Date();

     if (isNaN(birthDate.getTime())) {
         document.getElementById('age-result').textContent = 'Please enter a valid birth date!';
         return;
     }

     if (birthDate > targetDate) {
         document.getElementById('age-result').textContent = 'Birth date cannot be in the future!';
         return;
     }

     const ageInMilliseconds = targetDate - birthDate;
     const ageInSeconds = Math.floor(ageInMilliseconds / 1000);
     const ageInMinutes = Math.floor(ageInSeconds / 60);
     const ageInHours = Math.floor(ageInMinutes / 60);
     const ageInDays = Math.floor(ageInHours / 24);
     const ageInWeeks = Math.floor(ageInDays / 7);
     const ageInMonths = Math.floor(ageInDays / 30.44);
     const ageInYears = Math.floor(ageInDays / 365.25);

     document.getElementById('age-result').innerHTML = `
         <strong>Age Details:</strong><br>
         <strong>${ageInYears} years</strong><br>
         ${ageInMonths} months<br>
         ${ageInWeeks} weeks<br>
         ${ageInDays} days<br>
         ${ageInHours} hours<br>
         ${ageInMinutes} minutes<br>
         ${ageInSeconds} seconds
     `;
 }

 // Stopwatch
 function startTimer() {
     if (!isRunning) {
         startTime = Date.now() - elapsedTime;
         timerInterval = setInterval(updateTimer, 10);
         isRunning = true;
     }
 }

 function pauseTimer() {
     if (isRunning) {
         clearInterval(timerInterval);
         isRunning = false;
     }
 }

 function resetTimer() {
     clearInterval(timerInterval);
     isRunning = false;
     elapsedTime = 0;
     startTime = 0;
     lapTimes = [];
     document.getElementById('timer-display').textContent = '00:00:00';
     document.getElementById('lap-times').innerHTML = '';
 }

 function lapTimer() {
     if (isRunning) {
         const lapTime = formatTime(elapsedTime);
         lapTimes.push(lapTime);
         const lapTimesDiv = document.getElementById('lap-times');
         lapTimesDiv.innerHTML += `<div>Lap ${lapTimes.length}: ${lapTime}</div>`;
     }
 }

 function updateTimer() {
     elapsedTime = Date.now() - startTime;
     document.getElementById('timer-display').textContent = formatTime(elapsedTime);
 }

 function formatTime(milliseconds) {
     const totalSeconds = Math.floor(milliseconds / 1000);
     const minutes = Math.floor(totalSeconds / 60);
     const seconds = totalSeconds % 60;
     const ms = Math.floor((milliseconds % 1000) / 10);

     return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${ms.toString().padStart(2, '0')}`;
 }

 // Notes App
 function addNote() {
     const title = document.getElementById('note-title').value.trim();
     const content = document.getElementById('note-content').value.trim();

     if (!title || !content) {
         alert('Please enter both title and content!');
         return;
     }

     const note = {
         id: Date.now(),
         title: title,
         content: content,
         date: new Date().toLocaleDateString()
     };

     notes.push(note);
     saveNotes();
     displayNotes();
     
     // Clear inputs
     document.getElementById('note-title').value = '';
     document.getElementById('note-content').value = '';
 }

 function deleteNote(id) {
     notes = notes.filter(note => note.id !== id);
     saveNotes();
     displayNotes();
 }

 function clearNotes() {
     if (confirm('Are you sure you want to clear all notes?')) {
         notes = [];
         saveNotes();
         displayNotes();
     }
 }

 function displayNotes() {
     const notesList = document.getElementById('notes-list');

     if (notes.length === 0) {
         notesList.innerHTML = '<p>No notes added yet.</p>';
         return;
     }

     notesList.innerHTML = notes.map(note => `
         <div class="note-item">
             <div class="note-title">${note.title}</div>
             <div class="note-content">${note.content}</div>
             <div style="margin-top: 10px; display: flex; justify-content: space-between; align-items: center;">
                 <small>${note.date}</small>
                 <button class="delete-btn" onclick="deleteNote(${note.id})">Delete</button>
             </div>
         </div>
     `).join('');
 }

 function saveNotes() {
     try {
         localStorage.setItem('notes', JSON.stringify(notes));
     } catch (e) {
         console.log('LocalStorage not available');
     }
 }

 function loadNotes() {
     try {
         const saved = localStorage.getItem('notes');
         if (saved) {
             notes = JSON.parse(saved);
             displayNotes();
         }
     } catch (e) {
         console.log('LocalStorage not available');
     }
 }

 // Poll System
 function createPoll() {
     const question = document.getElementById('poll-question').value.trim();
     const optionsText = document.getElementById('poll-options').value.trim();

     if (!question || !optionsText) {
         alert('Please enter both question and options!');
         return;
     }

     const options = optionsText.split('\n').filter(option => option.trim()).map(option => ({
         text: option.trim(),
         votes: 0
     }));

     if (options.length < 2) {
         alert('Please enter at least 2 options!');
         return;
     }

     currentPoll = {
         question: question,
         options: options,
         totalVotes: 0
     };

     displayPoll();
 }

 function vote(optionIndex) {
     if (currentPoll) {
         currentPoll.options[optionIndex].votes++;
         currentPoll.totalVotes++;
         displayPoll();
     }
 }

 function displayPoll() {
     const pollContainer = document.getElementById('poll-container');

     if (!currentPoll) {
         pollContainer.innerHTML = '<p>Create a poll to get started!</p>';
         return;
     }

     let pollHTML = `
         <h3>${currentPoll.question}</h3>
         <div style="margin: 20px 0;">
             ${currentPoll.options.map((option, index) => `
                 <div class="poll-option" onclick="vote(${index})">
                     ${option.text}
                 </div>
             `).join('')}
         </div>
         <div class="poll-results">
             <h4>Results (${currentPoll.totalVotes} votes):</h4>
             ${currentPoll.options.map(option => {
                 const percentage = currentPoll.totalVotes > 0 ? 
                                  (option.votes / currentPoll.totalVotes * 100).toFixed(1) : 0;
                 return `
                     <div class="poll-result-item">
                         <div>${option.text}: ${option.votes} votes (${percentage}%)</div>
                         <div class="poll-bar" style="width: ${percentage}%;"></div>
                     </div>
                 `;
             }).join('')}
         </div>
     `;

     pollContainer.innerHTML = pollHTML;
 }

 // Dictionary (Simple implementation with basic definitions)
// Dictionary - Using DictionaryAPI
async function lookupWord() {
    const word = document.getElementById('dictionary-word').value.trim().toLowerCase();
    const resultDiv = document.getElementById('dictionary-result');
    const loadingDiv = document.getElementById('dictionary-loading');
    const errorDiv = document.getElementById('dictionary-error');
    
    // Hide previous results and errors
    resultDiv.style.display = 'none';
    errorDiv.style.display = 'none';
    
    if (!word) {
        errorDiv.textContent = 'Please enter a word to look up!';
        errorDiv.style.display = 'block';
        return;
    }

    // Show loading spinner
    loadingDiv.style.display = 'block';
    
    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        
        if (!response.ok) {
            throw new Error('Word not found in dictionary');
        }
        
        const data = await response.json();
        
        // Hide loading spinner
        loadingDiv.style.display = 'none';
        
        // Display results
        displayDictionaryResults(data[0]);
    } catch (error) {
        // Hide loading spinner
        loadingDiv.style.display = 'none';
        
        // Show error
        errorDiv.textContent = error.message;
        errorDiv.style.display = 'block';
        resultDiv.style.display = 'none';
    }
}

function displayDictionaryResults(data) {
    const resultDiv = document.getElementById('dictionary-result');
    
    let html = `
        <div class="definition-result">
            <div class="word-title">${data.word}</div>
            <div class="phonetic">${data.phonetic || ''}</div>
    `;
    
    // Add each meaning
    data.meanings.forEach(meaning => {
        html += `
            <div class="part-of-speech">
                <em>${meaning.partOfSpeech}</em>
            </div>
            <div class="definitions">
                <ol>
        `;
        
        // Add first 3 definitions
        meaning.definitions.slice(0, 3).forEach((def, index) => {
            html += `
                <li>
                    <div class="definition">${def.definition}</div>
                    ${def.example ? `<div class="example"><em>Example: ${def.example}</em></div>` : ''}
                </li>
            `;
        });
        
        html += `
                </ol>
            </div>
        `;
    });
    
    html += `
            <div class="source">
                <small>Source: DictionaryAPI</small>
            </div>
        </div>
    `;
    
    resultDiv.innerHTML = html;
    resultDiv.style.display = 'block';
}

// Add event listener for Enter key
document.getElementById('dictionary-word').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        lookupWord();
    }
});