 // Cria partículas flutuantes
 function createParticles() {
 	const colors = ['rgba(138, 43, 226, 0.3)', 'rgba(148, 0, 211, 0.3)', 'rgba(75, 0, 130, 0.3)'];

 	for (let i = 0; i < 15; i++) {
 		const particle = document.createElement('div');
 		particle.classList.add('particle');

 		// Posição e tamanho aleatórios
 		const size = Math.random() * 10 + 5;
 		const posX = Math.random() * window.innerWidth;
 		const posY = Math.random() * window.innerHeight;

 		particle.style.width = `${size}px`;
 		particle.style.height = `${size}px`;
 		particle.style.left = `${posX}px`;
 		particle.style.top = `${posY}px`;
 		particle.style.background = colors[Math.floor(Math.random() * colors.length)];

 		// Animação
 		particle.style.animation = `float ${Math.random() * 5 + 5}s ease-in-out infinite`;

 		document.body.appendChild(particle);
 	}
 }

 // Chama após o carregamento
 window.addEventListener('load', createParticles);
 document.querySelectorAll('a[href^="#"]').forEach(anchor => {
 	anchor.addEventListener('click', function(e) {
 		e.preventDefault();
 		document.querySelector(this.getAttribute('href')).scrollIntoView({
 			behavior: 'smooth'
 		});
 	});
 });
 const observer = new IntersectionObserver((entries) => {
 	entries.forEach(entry => {
 		if (entry.isIntersecting) {
 			entry.target.style.opacity = 1;
 			entry.target.style.transform = 'translateY(0)';
 		}
 	});
 });
 document.querySelectorAll('.grid').forEach((el) => {
 	observer.observe(el);
 });
 window.addEventListener('scroll', () => {
 	let sections = document.querySelectorAll('section');
 	let navLinks = document.querySelectorAll('.navbar a');
 	sections.forEach(sec => {
 		let top = window.scrollY;
 		let offset = sec.offsetTop - 150;
 		let height = sec.offsetHeight;
 		let id = sec.getAttribute('id');
 		if (top >= offset && top < offset + height) {
 			navLinks.forEach(links => {
 				links.classList.remove('active');
 				if (links.getAttribute('href') === '#' + id) {
 					links.classList.add('active');
 				}
 			});
 		}
 	});
 });
 window.onscroll = function() {
 	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
 		document.getElementById("backToTop").style.display = "block";
 	} else {
 		document.getElementById("backToTop").style.display = "none";
 	}
 };
 document.getElementById("backToTop").addEventListener("click", function() {
 	window.scrollTo({
 		top: 0,
 		behavior: 'smooth'
 	});
 });
 window.addEventListener('load', function() {
 	document.getElementById('loading').style.display = 'none';
 });
