// SHA-256 хэш функц
async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

// Scroll Animation
function checkVisible() {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const isVisible = (rect.top <= window.innerHeight * 0.75);
        
        if (isVisible) {
            section.classList.add('visible');
        }
    });
}

// Parallax Effect
function parallaxScroll() {
    const parallaxElements = document.querySelectorAll('.project-item, .skill-item');
    parallaxElements.forEach(elem => {
        const distance = window.scrollY;
        const speed = elem.dataset.speed || 0.2;
        elem.style.transform = `translateY(${distance * speed}px)`;
    });
}

// Initialize Animations
window.addEventListener('scroll', () => {
    checkVisible();
    parallaxScroll();
});

window.addEventListener('load', checkVisible);

// Text Animation
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

document.addEventListener('DOMContentLoaded', function() {
    // Technical Skills Data
    const technicalSkills = [
        { name: "HTML, CSS, JavaScript", icon: "🌐", level: 90 },
        { name: "Python, PHP", icon: "🧠", level: 85 },
        { name: "MySQL, MongoDB", icon: "🗄️", level: 80 }
    ];

    // Soft Skills Data
    const softSkills = [
        { name: "Бусадтай нээлттэй харилцаж чаддаг", icon: "🗣️", level: 90 },
        { name: "Хувийн зохион байгуулалт сайтай", icon: "📅", level: 85 },
        { name: "Бүтээлч сэтгэлгээтэй", icon: "🎨", level: 85 },
        { name: "Суралцах чадвар өндөр", icon: "📚", level: 95 },
        { name: "Багийн тоглогч байж чаддаг", icon: "🤝", level: 90 }
    ];    // Initialize projects if not exists
    if (!localStorage.getItem('projects')) {
        const initialProjects = [
            {
                name: "Вэб дэлгүүр",
                description: "HTML, CSS, JavaScript ашиглан хэрэглэгчийн сагс болон төлбөрийн системтэй онлайн худалдааны платформ. Хэрэглэгчид зориулсан хялбар интерфэйс, төлбөрийн систем, бараа бүтээгдэхүүний хайлт болон сагсны системийг хэрэгжүүлсэн.",
                image: "https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3",
                icon: "🛒",
                techs: ["HTML", "CSS", "JavaScript"]
            },
            {
                name: "Калори тооцоолох апп",
                description: "Python болон MySQL ашигласан эрүүл мэндийн хэрэгсэл. Хэрэглэгч хоол хүнсний илчлэг тооцоолох, өдрийн хоолны дэглэм гаргах, эрүүл мэндийн зөвлөгөө авах боломжтой апп хөгжүүлсэн.",
                image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3",
                icon: "🥗",
                techs: ["Python", "MySQL"]
            },
            {
                name: "Онлайн сургалтын платформ",
                description: "PHP, MySQL ашиглан хэрэглэгч бүртгэл, хичээл нэмэх боломжтой онлайн сургалтын платформ. Багш нар хичээл, материал нэмэх, оюутнууд бүртгүүлэх, хичээл үзэх, даалгавар хийх боломжтой цогц систем.",
                image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3",
                icon: "📚",
                techs: ["PHP", "MySQL"]
            },
            {
                name: "Сурагчийн вэб сайт",
                description: "PHP, MySQL, HTML/CSS ашиглан сурагч бүр өөрийн хуваарь, дүн, зар мэдээлэл, файл татах боломжтой систем хөгжүүлсэн. Хэрэглэгчийн эрхийн удирдлага, мэдээллийн сангийн бүтэц, хайлтын систем зэрэг чухал функцуудыг амжилттай хэрэгжүүлсэн.",
                image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3",
                icon: "👩‍🎓",
                techs: ["PHP", "MySQL", "HTML", "CSS"]
            }
        ];
        localStorage.setItem('projects', JSON.stringify(initialProjects));
    }

    // Modal elements
    const modal = document.getElementById('adminLoginModal');
    const loginBtn = document.getElementById('adminLoginBtn');
    const closeBtn = document.querySelector('.close');
    const loginForm = document.getElementById('adminLoginForm');

    // Show modal
    loginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        modal.style.display = 'block';
    });

    // Close modal
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Login
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === 'admin123' && password === '12345') {
            localStorage.setItem('isAdmin', 'true');
            window.location.href = 'admin.html';
        } else {
            alert('Нэвтрэх нэр эсвэл нууц үг буруу байна!');
        }
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('id') !== 'adminLoginBtn') {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const target = document.querySelector(targetId);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Load content
    loadContent();

    // Update copyright year
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Check for saved user preference
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
        body.classList.add('dark-mode');
        darkModeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        // Update icon
        const icon = darkModeToggle.querySelector('i');
        if (body.classList.contains('dark-mode')) {
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('darkMode', 'disabled');
        }
    });

    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        body.classList.add('dark-mode');
        darkModeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        if (event.matches) {
            body.classList.add('dark-mode');
            darkModeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
        } else {
            body.classList.remove('dark-mode');
            darkModeToggle.querySelector('i').classList.replace('fa-sun', 'fa-moon');
        }
    });

    renderSkills();
});

function loadContent() {
    // About content
    const personalInfo = {
        intro: "Сайн уу? Намайг Мөнхбат овогтой Гүнжилмаа гэдэг. Одоо 21настай. Би бол мэдээллийн технологийн чиглэлээр суралцаж буй, шинийг эрэлхийлэгч, бүтээлч сэтгэлгээтэй залуу үеийн төлөөлөгч юм. Суралцах хугацаандаа вэб болон мобайл хөгжүүлэлт, өгөгдлийн сангийн зохион байгуулалт, хэрэглэгчийн интерфэйсийн дизайн зэрэг чиглэлээр мэдлэг, туршлага хуримтлуулсан. Багаар ажиллах чадвар сайтай, аливаа асуудлыг шийдвэрлэхдээ бүтээлч, уян хатан ханддаг.",
        education: [
            "2010 – 2022: Хөвсгөл аймгийн Цэцэрлэг сумын Ерөнхий боловсролын бүрэн дунд сургуулийг амжилттай төгссөн.",
            "2022 оноос одоог хүртэл: ИЗОУИС – Үндэсний инженер, технологийн сургууль, Програм хангамж мэргэжлээр бакалаврын зэрэгт суралцаж байна"
        ],
        achievements: [
            "ИЗОУИС-ийн шилдэг 500 оюутны нэг – 3 жил дараалан Цэвэр \'A\' үнэлгээтэй, онц сурлагатан цом болон дурсгалын бэлэг",
            "2022-2023 намар: 3.74 голч дүн",
            "2022-2023 хавар: 4.00 – Сургуулийн хэмжээнд №1",
            "2023-2024 намар: 3.98",
            "2023-2024 хавар: 3.94",
            "2024-2025 намар: 3.96",
            "ИЗОУИС-ийн 30 жилийн ойн медаль",
            "Сургуулийн шатрын тэмцээн: Хүрэл медаль – 2 жил дараалан",
            "Волейболын тэмцээн: Алтан медаль, шилжин явах цом",
            "Мэргэжлийн хичээлийн уралдаан тэмцээнүүд: Топ 3 байрт удаа дараа шалгарсан"
        ],
        goal: "Би ирээдүйд олон улсын түвшний мэргэжилтэн болж, технологийн тусламжтайгаар нийгэмд үнэ цэнтэй хувь нэмэр оруулах зорилготой."
    };

    // Load home content from localStorage
    const welcomeText = localStorage.getItem('welcomeText');
    const nameText = localStorage.getItem('nameText');
    const motto = localStorage.getItem('motto');

    if (welcomeText) document.querySelector('.welcome-text').textContent = welcomeText;
    if (nameText) document.querySelector('.name-text').textContent = nameText;
    if (motto) document.querySelector('.motto').textContent = motto;

    // Fill about section
    document.querySelector('#aboutContent .intro').textContent = personalInfo.intro;
    document.querySelector('#aboutContent .timeline').innerHTML = personalInfo.education.map(edu => `<li>${edu}</li>`).join('');
    document.querySelector('#aboutContent .achievements-list').innerHTML = personalInfo.achievements.map(ach => `<li>${ach}</li>`).join('');
    document.querySelector('#aboutContent .future-goal').textContent = personalInfo.goal;    // Get skill containers
    const technicalSkillsContainer = document.getElementById('technicalSkills');
    const softSkillsContainer = document.getElementById('softSkills');
}

// Global skills arrays
const technicalSkills = [
    { name: 'HTML, CSS, JavaScript', level: 90, icon: '🌐' },
    { name: 'Python, PHP', level: 85, icon: '🧠' },
    { name: 'MySQL, MongoDB', level: 80, icon: '🗄️' }
];

const softSkills = [
    { name: "Бусадтай нээлттэй харилцаж чаддаг", icon: "🗣️", level: 90 },
    { name: "Хувийн зохион байгуулалт сайтай", icon: "📅", level: 85 },
    { name: "Бүтээлч сэтгэлгээтэй", icon: "🎨", level: 85 },
    { name: "Суралцах чадвар өндөр", icon: "📚", level: 95 },
    { name: "Багийн тоглогч байж чаддаг", icon: "🤝", level: 90 }
];

// Render skills in UI
function renderSkills() {
     const renderSkillItem = (skill) => `
            <div class="skill-item">
                <span class="skill-icon">${skill.icon}</span>
                <div class="skill-info">
                    <span class="skill-name">${skill.name}</span>
                    <div class="skill-progress">
                        <div class="skill-progress-bar" style="width: ${skill.level}%"></div>
                    </div>
                </div>
            </div>
        `;

        // Render technical skills
        const technicalSkillsContainer = document.getElementById('technicalSkills');
        if (technicalSkillsContainer) {
            technicalSkillsContainer.innerHTML = technicalSkills
                .map(renderSkillItem)
                .join('');
        }

        // Render soft skills
        const softSkillsContainer = document.getElementById('softSkills');
        if (softSkillsContainer) {
            softSkillsContainer.innerHTML = softSkills
                .map(renderSkillItem)
                .join('');
        }

        // Add animation observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1
        });

        // Observe all skill items
        document.querySelectorAll('.skill-item').forEach(item => {
            observer.observe(item);
        });
    }

    renderSkills();
    
    // Load projects
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    const projectsContainer = document.getElementById('projectsContent');
    projectsContainer.innerHTML = projects.map(project => `
        <div class="project-card">
            <div class="project-header">
                <span class="project-icon">${project.icon}</span>
                <h3>${project.name}</h3>
            </div>
            ${project.image ? `<div class="project-image"><img src="${project.image}" alt="${project.name}"></div>` : ''}
            <div class="project-content">
                <p class="project-description">${project.description}</p>
                <div class="project-techs">
                    ${project.techs.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');

    // Load contact info
    const contactEmail = localStorage.getItem('contactEmail');
    const contactPhone = localStorage.getItem('contactPhone');
    if (contactEmail) {
        document.getElementById('contactEmail').textContent = 'munkhbatgvnjee@gmail.com';
        document.getElementById('contactEmail').href = 'mailto:munkhbatgvnjee@gmail.com';
    }
    if (contactPhone) {
        document.getElementById('contactPhone').textContent = contactPhone;
    }

    // Check if user is logged in
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const adminLoginBtn = document.getElementById('adminLoginBtn');
    if (isAdmin) {
        adminLoginBtn.textContent = 'Удирдлага';
        adminLoginBtn.href = 'admin.html';
    }