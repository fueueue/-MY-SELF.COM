// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    const nav = document.querySelector('nav ul');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
            
            // Animate the hamburger menu
            const bars = mobileMenu.querySelectorAll('.bar');
            bars.forEach((bar, index) => {
                if (nav.style.display === 'flex') {
                    bar.style.transform = index === 0 ? 'rotate(45deg) translate(5px, 5px)' : 
                                        index === 1 ? 'opacity: 0' : 
                                        'rotate(-45deg) translate(5px, -5px)';
                } else {
                    bar.style.transform = 'none';
                }
            });
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav.style.display === 'flex') {
                    nav.style.display = 'none';
                    const bars = mobileMenu.querySelectorAll('.bar');
                    bars.forEach(bar => {
                        bar.style.transform = 'none';
                    });
                }
            }
        });
    });
    
    // Active link highlighting
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav ul li a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // In a real application, you would send this data to a server
            // For now, just show a success message
            alert(`Thank you, ${name}! Your message has been sent successfully.`);
            contactForm.reset();
        });
    }
    
    // AI Chatbot functionality
    const chatContainer = document.querySelector('.ai-chatbot');
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    const closeChat = document.querySelector('.close-chat');
    
    // Show/hide chatbot
    document.addEventListener('click', function(e) {
        if (e.target.closest('.ai-chatbot') || e.target.closest('.whatsapp-float')) {
            return;
        }
        
        if (chatContainer.style.display === 'block' && !e.target.closest('.ai-chatbot')) {
            chatContainer.style.display = 'none';
        }
    });
    
    // Toggle chatbot visibility
    document.addEventListener('click', function(e) {
        if (e.target.closest('.whatsapp-float') || e.target.closest('.ai-chatbot')) {
            chatContainer.style.display = chatContainer.style.display === 'block' ? 'none' : 'block';
        }
    });
    
    // Close chat button
    if (closeChat) {
        closeChat.addEventListener('click', function() {
            chatContainer.style.display = 'none';
        });
    }
    
    // Send message function
    function sendMessage() {
        const message = userInput.value.trim();
        if (!message) return;
        
        // Add user message
        addMessage(message, 'user');
        
        // Clear input
        userInput.value = '';
        
        // Simulate AI response
        setTimeout(() => {
            const response = getAIResponse(message);
            addMessage(response, 'bot');
        }, 1000);
    }
    
    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Get AI response based on user input
    function getAIResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        
        // Predefined responses
        const responses = {
            'hello': 'Hello! How can I assist you today?',
            'hi': 'Hi there! What can I help you with?',
            'how are you': 'I\'m doing great, thanks for asking! How about you?',
            'what do you do': 'I\'m an AI assistant for DevSpark Labs. I can answer questions about our services, team, and more!',
            'who are you': 'I\'m your AI assistant at DevSpark Labs, here to help you with any questions you might have.',
            'what services do you offer': 'We offer software development, AI & machine learning, web development, mobile applications, cybersecurity, and data analytics services.',
            'who is the ceo': 'Our CEO and co-founder is Mesiah Karomo.',
            'who is the cto': 'Our CTO (Chief Technical Officer) is Frederick Thipungu.',
            'who is the cdo': 'Our CDO (Chief Directorate/Division Officer) is Andreas Mutungura.',
            'when was the company founded': 'DevSpark Labs was founded in 2025.',
            'what is your slogan': 'Our slogan is "Engineering Tomorrow\'s Algorithm".',
            'what is the company name': 'We are DevSpark Labs, powered by mR_smaRt96 Subsidiaries.',
            'thank you': 'You\'re welcome! Is there anything else I can help you with?',
            'bye': 'Goodbye! Feel free to reach out if you need anything else.',
            'contact': 'You can contact us via email at info@devsparklabs.com or call us at +264 81 273 5092. You can also chat with us on WhatsApp.',
            'whatsapp': 'You can reach our CDO directly on WhatsApp at +264 81 273 5092.',
            'location': 'We are based in Windhoek, Namibia.',
            'hours': 'We are available Monday through Friday, 8 AM to 6 PM local time.'
        };
        
        // Check for exact matches first
        for (const [key, response] of Object.entries(responses)) {
            if (lowerMessage.includes(key)) {
                return response;
            }
        }
        
        // Default response for unknown queries
        return 'I don\'t have information about that specific question. Could you please rephrase or ask something else? You can also contact us directly for more detailed information.';
    }
    
    // Send button click
    if (sendButton) {
        sendButton.addEventListener('click', sendMessage);
    }
    
    // Enter key press
    if (userInput) {
        userInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Initialize chatbot with welcome message
    if (chatMessages) {
        // Add welcome message when chat opens
        chatContainer.addEventListener('click', function() {
            if (chatContainer.style.display === 'block' && chatMessages.children.length === 1) {
                setTimeout(() => {
                    addMessage('Welcome to DevSpark Labs! I\'m here to help you with any questions about our company, services, or team.', 'bot');
                }, 500);
            }
        });
    }
    
    // WhatsApp floating button hover effect
    const whatsappFloat = document.querySelector('.whatsapp-float');
    if (whatsappFloat) {
        whatsappFloat.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        whatsappFloat.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
    
    // Add animation to service cards on scroll
    const serviceCards = document.querySelectorAll('.service-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
    
    // Add animation to team members on scroll
    const teamMembers = document.querySelectorAll('.team-member');
    const teamObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    teamMembers.forEach(member => {
        member.style.opacity = '0';
        member.style.transform = 'translateY(20px)';
        member.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        teamObserver.observe(member);
    });
});
