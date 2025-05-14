// Нэвтэрсэн эсэхийг шалгах
if (!localStorage.getItem('isAdmin')) {
    window.location.href = 'index.html';
}

// Цэс сонгох үед тухайн хэсгийг харуулах
document.querySelectorAll('.admin-nav a[data-section]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const sectionId = this.getAttribute('data-section') + 'Section';
        
        // Бүх хэсгийг нуух
        document.querySelectorAll('.admin-section').forEach(section => {
            section.style.display = 'none';
        });
        
        // Сонгосон хэсгийг харуулах
        document.getElementById(sectionId).style.display = 'block';
    });
});

// Гарах товч
document.getElementById('logoutBtn').addEventListener('click', function(e) {
    e.preventDefault();
    localStorage.removeItem('isAdmin');
    window.location.href = 'index.html';
});

// Мэдэгдэл харуулах функц
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `message ${type}-message`;
    notification.textContent = message;
    
    // Remove existing notifications
    document.querySelectorAll('.message').forEach(msg => msg.remove());
    
    // Add new notification
    document.querySelector('.admin-main').insertAdjacentElement('afterbegin', notification);
    
    // Remove after animation
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Бүх контентуудыг ачаалах
function loadAllContent() {
    // Load home content
    document.getElementById('welcomeText').value = localStorage.getItem('welcomeText') || 'Сайн байна уу,';
    document.getElementById('nameText').value = localStorage.getItem('nameText') || 'Намайг Гүнжилмаа гэдэг';
    document.getElementById('motto').value = localStorage.getItem('motto') || '✨ Технологиор дамжуулан амьдралыг хялбарчилъя ✨';

    // Load about content
    const aboutContent = localStorage.getItem('aboutContent');
    if (aboutContent) {
        document.getElementById('aboutContent').value = aboutContent;
    }

    // Холбоо барих мэдээлэл
    const contactEmail = localStorage.getItem('contactEmail');
    const contactPhone = localStorage.getItem('contactPhone');
    if (contactEmail) document.getElementById('contactEmail').value = contactEmail;
    if (contactPhone) document.getElementById('contactPhone').value = contactPhone;

    // Ур чадварууд
    loadSkills();
    
    // Төслүүд
    loadProjects();
}

// Нүүр хуудасны контент хадгалах
function saveHomeContent() {
    const welcomeText = document.getElementById('welcomeText').value;
    const nameText = document.getElementById('nameText').value;
    const motto = document.getElementById('motto').value;
    
    localStorage.setItem('welcomeText', welcomeText);
    localStorage.setItem('nameText', nameText);
    localStorage.setItem('motto', motto);
    
    showNotification('Нүүр хуудасны мэдээлэл амжилттай хадгалагдлаа!');
    
    // Refresh main page content if it's open
    if (window.opener && !window.opener.closed) {
        window.opener.location.reload();
    }
}

// Контент хадгалах
function saveContent(section) {
    const content = document.getElementById(section + 'Content').value;
    localStorage.setItem(section + 'Content', content);
    alert('Амжилттай хадгалагдлаа!');
}

// Ур чадварууд удирдах хэсэг
const skillForm = document.getElementById('skillForm');
const skillsList = document.getElementById('skillsList');

skillForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('skillName').value;
    const level = document.getElementById('skillLevel').value;
    
    const skillsData = JSON.parse(localStorage.getItem('skills') || '[]');
    skillsData.push({ name, level });
    localStorage.setItem('skills', JSON.stringify(skillsData));
    
    loadSkills();
    skillForm.reset();
});

function loadSkills() {
    const skillsData = JSON.parse(localStorage.getItem('skills') || '[]');
    skillsList.innerHTML = skillsData.map((skill, index) => `
        <div class="skill-item">
            <h3>${skill.name}</h3>
            <div class="skill-bar-container">
                <div class="skill-bar" style="width: ${skill.level}%"></div>
            </div>
            <span class="skill-level">${skill.level}%</span>
            <button onclick="deleteSkill(${index})">Устгах</button>
        </div>
    `).join('');
}

function deleteSkill(index) {
    const skillsData = JSON.parse(localStorage.getItem('skills') || '[]');
    skillsData.splice(index, 1);
    localStorage.setItem('skills', JSON.stringify(skillsData));
    loadSkills();
}

// Төслүүд удирдах хэсэг
const projectForm = document.getElementById('projectForm');
const projectsList = document.getElementById('projectsList');

projectForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('projectName').value;
    const description = document.getElementById('projectDesc').value;
    const image = document.getElementById('projectImage').value;
    const link = document.getElementById('projectLink').value;
    
    const projectsData = JSON.parse(localStorage.getItem('projects') || '[]');
    projectsData.push({ name, description, image, link });
    localStorage.setItem('projects', JSON.stringify(projectsData));
    
    loadProjects();
    projectForm.reset();
});

function loadProjects() {
    const projectsData = JSON.parse(localStorage.getItem('projects') || '[]');
    projectsList.innerHTML = projectsData.map((project, index) => `
        <div class="project-item">
            ${project.image ? `<img src="${project.image}" alt="${project.name}">` : ''}
            <div class="project-info">
                <h3>${project.name}</h3>
                <p>${project.description}</p>
                ${project.link ? `<a href="${project.link}" target="_blank" class="project-link">Дэлгэрэнгүй</a>` : ''}
                <button onclick="deleteProject(${index})">Устгах</button>
            </div>
        </div>
    `).join('');
}

function deleteProject(index) {
    const projectsData = JSON.parse(localStorage.getItem('projects') || '[]');
    projectsData.splice(index, 1);
    localStorage.setItem('projects', JSON.stringify(projectsData));
    loadProjects();
}

// Зургийн URL шалгах
function isValidImageUrl(url) {
    return url.match(/\.(jpeg|jpg|gif|png|webp)$/) != null;
}

// Зургийн preview харуулах
function showImagePreview(input) {
    const url = input.value;
    const previewContainer = document.getElementById('imagePreview');
    
    if (!previewContainer) {
        const container = document.createElement('div');
        container.id = 'imagePreview';
        container.style.marginTop = '10px';
        input.parentNode.appendChild(container);
    }
    
    if (url && isValidImageUrl(url)) {
        const img = new Image();
        img.onload = function() {
            document.getElementById('imagePreview').innerHTML = `
                <img src="${url}" alt="Preview" style="max-width: 200px; max-height: 200px; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            `;
        };
        img.onerror = function() {
            document.getElementById('imagePreview').innerHTML = '<p style="color: #721c24;">Зургийг ачаалж чадсангүй.</p>';
        };
        img.src = url;
    } else {
        document.getElementById('imagePreview').innerHTML = '';
    }
}

// Холбоо барих мэдээлэл хадгалах
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('contactEmail').value;
    const phone = document.getElementById('contactPhone').value;
    
    localStorage.setItem('contactEmail', email);
    localStorage.setItem('contactPhone', phone);
    alert('Холбоо барих мэдээлэл амжилттай хадгалагдлаа!');
});

// Хуудас ачаалагдахад бүх өгөгдлийг дуудах
document.addEventListener('DOMContentLoaded', function() {
    loadAllContent();
});
