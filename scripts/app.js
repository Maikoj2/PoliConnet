// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', initApp);

function initApp() {
    const demoBox = document.getElementById('interactiveBox');
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f1c40f'];
    let colorIndex = 0;
    const wrapper = document.querySelector('.wrapper');
    const registerLink = document.querySelector('.register-link');
    const loginLink = document.querySelector('.login-link');

    // Interactive demo functionality 
    if (demoBox && colors.length > 0) {
        demoBox.addEventListener('click', () => {
            // Change background color
            colorIndex = (colorIndex + 1) % colors.length;
            demoBox.style.background = colors[colorIndex];

            // Update text
            demoBox.querySelector('p').textContent = `Color Changed ${colorIndex + 1}/4!`;

            // Add animation effect
            demoBox.animate(
                [{ transform: 'scale(1.05)' }, { transform: 'scale(1)' }],
                { duration: 300, easing: 'ease-out' }
            );
        });
    }

    if (registerLink && wrapper) {
        registerLink.addEventListener('click', (e) => {
            e.preventDefault();
            wrapper.classList.add('active');
        });
    }

    if (loginLink && wrapper) {
        loginLink.addEventListener('click', (e) => {
            e.preventDefault();
            wrapper.classList.remove('active');
        });
    }

    // Capturar datos del formulario de login y registro

    // Selecciona ambos formularios por clase o id
    const loginForm = document.querySelector('.form-box.login form');
    const registerForm = document.querySelector('.form-box.register form');

    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Método 1: Usando FormData (requiere atributo name en inputs)
            const formData = new FormData(loginForm);
            const data = {};

            for (let [key, value] of formData.entries()) {
                data[key] = value;
            }

            // Método 2: Captura directa de inputs (backup si FormData falla)
            if (Object.keys(data).length === 0) {
                const usernameInput = loginForm.querySelector('input[name="username"]');
                const passwordInput = loginForm.querySelector('input[name="password"]');

                if (usernameInput && passwordInput) {
                    data.username = usernameInput.value.trim();
                    data.password = passwordInput.value.trim();
                }
            }

            // Validación básica
            if (!data.username || !data.password) {
                alert('Por favor completa todos los campos');
                return;
            }

            console.log('Login form data:', data);

            // Aquí puedes hacer un fetch/AJAX al backend
            // Ejemplo:
            // fetch('/api/login', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(data)
            // })
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Método 1: Usando FormData (requiere atributo name en inputs)
            const formData = new FormData(registerForm);
            const data = {};

            for (let [key, value] of formData.entries()) {
                data[key] = value;
            }

            // Método 2: Captura directa de inputs (backup si FormData falla)
            if (Object.keys(data).length === 0) {
                const usernameInput = registerForm.querySelector('input[name="username"]');
                const emailInput = registerForm.querySelector('input[name="email"]');
                const passwordInput = registerForm.querySelector('input[name="password"]');

                if (usernameInput && emailInput && passwordInput) {
                    data.username = usernameInput.value.trim();
                    data.email = emailInput.value.trim();
                    data.password = passwordInput.value.trim();
                }
            }

            // Validación básica
            if (!data.username || !data.email || !data.password) {
                alert('Por favor completa todos los campos');
                return;
            }

            // Validación de email básica
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Por favor ingresa un email válido');
                return;
            }

            console.log('Register form data:', data);

            // Aquí puedes hacer un fetch/AJAX al backend
            // Ejemplo:
            // fetch('/api/register', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(data)
            // })
        });
    }

    // Cargar y crear los avatares de creadores desde JSON local
    fetch('../data/teamData.json')
        .then(response => response.json())
        .then(creators => {
            const container = document.getElementById('creators-container');
            if (container && Array.isArray(creators) && creators.length > 0) {
                container.innerHTML = '';

                creators.forEach(creator => {

                    const link = document.createElement('a');
                    link.href = creator.url;
                    link.target = '_blank';
                    link.setAttribute('aria-label', `Perfil de ${creator.name}`);
                    link.className = 'social-icon';

                    const img = document.createElement('img');
                    img.src = creator.image;
                    img.alt = creator.name;
                    img.onerror = function () {
                        this.src = '../images/no-img.jpg';
                        this.onerror = null; // Prevenir loops infinitos
                    };

                    link.appendChild(img);
                    container.appendChild(link);
                });
            }
        })
        .catch(error => console.error('Error loading team data:', error));

    // Load team data (this should be in a separate JSON file)
    fetch('../data/teamContact.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('team-container');
            if (!container) return;

            data.forEach(member => {

                // Crear el elemento de imagen con manejo de error
                const img = document.createElement('img');
                img.src = member.image;
                img.alt = member.name;

                // Si la imagen no se puede cargar, usar la imagen por defecto
                img.onerror = function () {
                    this.src = '../images/no-img.jpg';
                    this.onerror = null; // Prevenir loops infinitos
                };

                // Crear el elemento del miembro del equipo
                const memberDiv = document.createElement('div');
                memberDiv.className = 'team-member';

                const h3 = document.createElement('h3');
                h3.textContent = member.name;

                const p = document.createElement('p');
                p.textContent = member.role || '';

                memberDiv.appendChild(img);
                memberDiv.appendChild(h3);
                memberDiv.appendChild(p);

                container.appendChild(memberDiv);
            });
        })
        .catch(error => console.error('Error loading team data:', error));
 
    


    // FAQ Accordion - Alternative Implementation
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const answer = item.querySelector('.faq-answer');
            const icon = item.querySelector('.toggle-icon');

            // Toggle this item
            item.classList.toggle('active');

            // Toggle icon
            icon.style.transform = item.classList.contains('active')
                ? 'rotate(180deg)'
                : 'rotate(0deg)';

            // Close others
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.toggle-icon').style.transform = 'rotate(0deg)';
                }
            });
        });
    });
    // Console message
    console.log('Application initialized successfully!');
}