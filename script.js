// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    initializeProductButtons();
    initializeSlideshow();
    initializeForms();
    highlightActiveNavLink();
});

// ============ OVERLAY DE SUCESSO ============
function showSuccessOverlay(message) {
    // Criar overlay se não existir
    let overlay = document.getElementById('success-overlay');
    
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'success-overlay';
        overlay.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(40, 167, 69, 0.95); display: flex; align-items: center; justify-content: center; z-index: 9999; opacity: 0; visibility: hidden; transition: opacity 0.3s ease, visibility 0.3s ease;';
        overlay.innerHTML = `
            <div style="text-align: center; color: white; animation: successAnimation 0.5s ease-out;">
                <div style="width: 100px; height: 100px; border: 5px solid white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; font-size: 60px; font-weight: bold; animation: checkmark 0.5s ease-out;">✓</div>
                <h1 style="font-size: 2.5rem; margin-bottom: 1rem;">Sucesso!</h1>
                <p id="success-message" style="font-size: 1.3rem;"></p>
            </div>
        `;
        document.body.appendChild(overlay);
    }
    
    document.getElementById('success-message').textContent = message;
    overlay.style.opacity = '1';
    overlay.style.visibility = 'visible';
    
    setTimeout(() => {
        overlay.style.opacity = '0';
        overlay.style.visibility = 'hidden';
    }, 3000);
}

// ============ BOTÕES DE PRODUTOS ============
function initializeProductButtons() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        if (!card.querySelector('.btn-add-cart')) {
            const productName = card.querySelector('h3')?.textContent || 'Produto';
            const button = document.createElement('button');
            button.className = 'btn btn-primary btn-block';
            button.textContent = 'Adicionar ao Pedido';
            button.style.marginTop = '0.5rem';
            button.onclick = function() {
                showSuccessOverlay(`${productName} adicionado ao pedido!`);
            };
            card.appendChild(button);
        }
    });
}


// ============ FORMULÁRIOS ============
function initializeForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação básica
            const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
            let valid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    valid = false;
                    input.style.borderColor = '#dc3545';
                    input.style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.1)';
                    setTimeout(() => {
                        input.style.borderColor = '';
                        input.style.boxShadow = '';
                    }, 2000);
                }
            });
            
            if (!valid) {
                alert('Por favor, preencha todos os campos obrigatórios!');
                return;
            }
            
            // Validação de senha (se existir)
            const senha = form.querySelector('input[name="senha"]');
            const senhaConfirma = form.querySelector('input[name="senha-confirma"]');
            
            if (senha && senhaConfirma) {
                if (senha.value !== senhaConfirma.value) {
                    alert('As senhas não coincidem!');
                    senhaConfirma.style.borderColor = '#dc3545';
                    return;
                }
            }
            
            // Sucesso
            showSuccessOverlay('Formulário enviado com sucesso!');
            setTimeout(() => {
                form.reset();
            }, 3000);
        });
    });
}

// ============ HIGHLIGHT LINK ATIVO ============
function highlightActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || href === `/${currentPage}`) {
            link.style.backgroundColor = '#FF8C00';
            link.style.borderBottomColor = 'white';
        }
    });
}

// ============ ANIMAÇÕES DE SCROLL ============
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.85) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
});

// Inicializar opacidade das seções
document.querySelectorAll('section').forEach(section => {
    section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

// ============ MENSAGEM DE BOAS-VINDAS ============
setTimeout(function() {
    if (document.querySelector('.hero')) {
        console.log('Bem-vindo ao Bistrô Estação 311! 🍔');
    }
}, 1000);