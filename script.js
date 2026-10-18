document.addEventListener('DOMContentLoaded', () => {
    // 1. Top Scroll Progress Bar
    const progressBar = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = `${progress}%`;
    });

    // 2. 3D Interactive Tilt on Profile Photo Card
    const photoCard = document.getElementById('photo-tilt');
    if (photoCard) {
        photoCard.addEventListener('mousemove', (e) => {
            const rect = photoCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            photoCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        photoCard.addEventListener('mouseleave', () => {
            photoCard.style.transform = 'rotateX(0deg) rotateY(0deg)';
        });
    }

    // 3. Live Project Category Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.bento-card');

    filterButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            filterButtons.forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach((card) => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || filterValue === category) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // 4. Interactive Project Inspector Modal
    const projectData = {
        casadelmar: {
            title: 'Casa del Mar — Digital Menu & Landing Page',
            desc: 'A bespoke web implementation created for a hospitality client, focused on fast mobile access via QR codes and effortless browsing.',
            highlights: [
                'Built responsive layout architecture from scratch using semantic HTML5 and modern CSS3.',
                'Implemented dynamic multi-language switching using vanilla JavaScript without page reloads.',
                'Deployed and optimized assets on Vercel for instant mobile loading.'
            ],
            link: 'https://casa-del-mar.vercel.app/'
        },
        submanage: {
            title: 'SubManage — Subscription Management Platform',
            desc: 'A full-stack web application designed to give users complete visibility over recurring billing cycles and upcoming expenses.',
            highlights: [
                'Engineered the backend server with Python (Flask) to handle user requests and billing logic.',
                'Designed a normalized MySQL relational database schema supporting date-based payment predictions.',
                'Crafted an intuitive, mobile-friendly frontend dashboard.'
            ],
            link: 'https://github.com/panagiotispal'
        },
        mypocket: {
            title: 'MyPocket — Personal Finance Tracker',
            desc: 'A desktop application engineered for accurate personal income and expense management with complete local privacy.',
            highlights: [
                'Programmed modular object-oriented logic in C# (.NET) for budget calculations and category sorting.',
                'Integrated a local SQL database ensuring reliable data persistence.',
                'Designed a clean desktop interface focused on fast daily transaction entry.'
            ],
            link: 'https://github.com/panagiotispal/pocket_mg'
        },
        thesis: {
            title: 'Interactive Course Evaluation — Bachelor Thesis',
            desc: 'A gamified 3D application developed at the University of Ioannina to modernize the traditional student evaluation process.',
            highlights: [
                'Programmed custom 3D interaction mechanics and branching dialogue trees using C++ and Unreal Engine 5 Blueprints.',
                'Designed intuitive spatial UI prompts tailored for non-technical student users.',
                'Conducted structured user testing sessions to refine usability and engagement.'
            ],
            link: 'https://github.com/panagiotispal'
        }
    };

    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-description');
    const modalHighlights = document.getElementById('modal-highlights');
    const modalLink = document.getElementById('modal-link');
    const modalClose = document.getElementById('modal-close');

    document.querySelectorAll('.inspect-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            const key = btn.getAttribute('data-modal');
            const data = projectData[key];
            if (!data) return;

            modalTitle.textContent = data.title;
            modalDesc.textContent = data.desc;
            modalHighlights.innerHTML = data.highlights.map(item => `<li>${item}</li>`).join('');
            modalLink.href = data.link;

            modal.classList.add('open');
        });
    });

    modalClose.addEventListener('click', () => modal.classList.remove('open'));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('open');
    });

    // 5. Interactive Skill Chips
    const skillChips = document.querySelectorAll('.skill-chip');
    const spotlightTitle = document.getElementById('spotlight-title');
    const spotlightDesc = document.getElementById('spotlight-desc');

    skillChips.forEach((chip) => {
        chip.addEventListener('click', () => {
            skillChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            spotlightTitle.textContent = `SELECTED // ${chip.getAttribute('data-skill').toUpperCase()}`;
            spotlightDesc.textContent = chip.getAttribute('data-desc');
        });
    });

    // 6. One-Click Copy Email Button
    const copyBtn = document.getElementById('copy-email-btn');
    const copyText = document.getElementById('copy-text');
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const email = copyBtn.getAttribute('data-email');
            navigator.clipboard.writeText(email).then(() => {
                copyText.textContent = 'Copied to Clipboard! ✓';
                setTimeout(() => {
                    copyText.textContent = `Copy Email: ${email}`;
                }, 2500);
            });
        });
    }

    // 7. Scroll Reveal & Bento Cursor Spotlight
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    projectCards.forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
            card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        });
    });

    // 8. Hero Typewriter Cycling
    const phrases = ['web experiences.', 'responsive interfaces.', 'full-stack solutions.', 'clean UI architectures.'];
    const typewriterEl = document.getElementById('typewriter');
    let idx = 0;

    setInterval(() => {
        typewriterEl.style.opacity = '0';
        setTimeout(() => {
            idx = (idx + 1) % phrases.length;
            typewriterEl.textContent = phrases[idx];
            typewriterEl.style.opacity = '1';
        }, 300);
    }, 3200);
});