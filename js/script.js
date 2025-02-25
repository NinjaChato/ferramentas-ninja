// script.js
// Adicione interações JavaScript aqui se necessário
document.addEventListener('DOMContentLoaded', function() {
    // Exemplo de interação
    const cards = document.querySelectorAll('.feature-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = '0 4px 15px rgba(37, 99, 235, 0.3)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = 'none';
        });
    });
});
