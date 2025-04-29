document.addEventListener('DOMContentLoaded', function() {
    // مؤشر التحميل
    setTimeout(function() {
        document.querySelector('.loader').classList.add('fade-out');
        setTimeout(function() {
            document.querySelector('.loader').style.display = 'none';
        }, 500);
    }, 1500);

    // مؤقت العد التنازلي للعرض الترويجي
    function initCountdown() {
        const countdownDate = new Date();
        countdownDate.setDate(countdownDate.getDate() + 3); // العرض لمدة 3 أيام
        
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        
        function updateCountdown() {
            const now = new Date();
            const diff = countdownDate - now;
            
            if (diff <= 0) {
                clearInterval(countdownInterval);
                document.querySelector('.offer-timer').innerHTML = '<div class="timer-title">انتهى العرض!</div>';
                return;
            }
            
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            daysEl.textContent = days.toString().padStart(2, '0');
            hoursEl.textContent = hours.toString().padStart(2, '0');
            minutesEl.textContent = minutes.toString().padStart(2, '0');
            secondsEl.textContent = seconds.toString().padStart(2, '0');
            
            // تأثير عند تغيير الثواني
            if (seconds === 59) {
                secondsEl.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    secondsEl.style.transform = 'scale(1)';
                }, 300);
            }
        }
        
        updateCountdown();
        const countdownInterval = setInterval(updateCountdown, 1000);
    }

    // تهيئة خلفية ثلاثية الأبعاد
    function init3DBackground() {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('3d-bg').appendChild(renderer.domElement);

        // إضافة أشكال هندسية
        const geometry = new THREE.IcosahedronGeometry(2, 0);
        const material = new THREE.MeshPhongMaterial({ 
            color: 0x6c5ce7,
            emissive: 0x6c5ce7,
            emissiveIntensity: 0.2,
            shininess: 100,
            transparent: true,
            opacity: 0.5,
            wireframe: true
        });
        const shapes = [];

        // إنشاء أشكال متعددة
        for (let i = 0; i < 10; i++) {
            const shape = new THREE.Mesh(geometry, material);
            shape.position.x = (Math.random() - 0.5) * 100;
            shape.position.y = (Math.random() - 0.5) * 100;
            shape.position.z = (Math.random() - 0.5) * 100;
            shape.rotation.x = Math.random() * Math.PI;
            shape.rotation.y = Math.random() * Math.PI;
            shape.scale.setScalar(Math.random() * 2 + 0.5);
            shapes.push(shape);
            scene.add(shape);
        }

        // إضاءة
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);

        camera.position.z = 30;

        // حركة الأشكال
        function animate() {
            requestAnimationFrame(animate);
            
            shapes.forEach(shape => {
                shape.rotation.x += 0.001;
                shape.rotation.y += 0.002;
                
                // حركة عائمة
                shape.position.y += Math.sin(Date.now() * 0.001 + shape.position.x) * 0.01;
                shape.position.x += Math.cos(Date.now() * 0.001 + shape.position.y) * 0.01;
            });

            renderer.render(scene, camera);
        }

        animate();

        // تكيف مع تغيير حجم النافذة
        window.addEventListener('resize', function() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    // تهيئة نموذج ثلاثي الأبعاد في القسم الرئيسي
    function init3DModel() {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(400, 400);
        document.getElementById('3d-model').appendChild(renderer.domElement);

        // إنشاء شكل معقد
        const geometry = new THREE.TorusKnotGeometry(3, 1, 100, 16);
        const material = new THREE.MeshPhongMaterial({ 
            color: 0x6c5ce7,
            emissive: 0xa29bfe,
            emissiveIntensity: 0.5,
            shininess: 100,
            specular: 0xffffff
        });
        const model = new THREE.Mesh(geometry, material);
        scene.add(model);

        // إضاءة
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);

        const pointLight = new THREE.PointLight(0xa29bfe, 1, 100);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        camera.position.z = 10;

        // تحريك النموذج عند تحريك الماوس
        document.addEventListener('mousemove', function(e) {
            model.rotation.x = (e.clientY / window.innerHeight) * 2;
            model.rotation.y = (e.clientX / window.innerWidth) * 2;
        });

        // حركة النموذج
        function animate() {
            requestAnimationFrame(animate);
            model.rotation.z += 0.005;
            renderer.render(scene, camera);
        }

        animate();
    }

    // تهيئة خريطة ثلاثية الأبعاد
    function init3DMap() {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(400, 300);
        document.getElementById('3d-map').appendChild(renderer.domElement);

        // إنشاء خريطة
        const geometry = new THREE.PlaneGeometry(10, 10, 10, 10);
        const material = new THREE.MeshPhongMaterial({ 
            color: 0x6c5ce7,
            wireframe: true,
            side: THREE.DoubleSide
        });
        const map = new THREE.Mesh(geometry, material);
        scene.add(map);

        // جعل الخريطة غير مستوية
        const positions = map.geometry.attributes.position;
        for (let i = 0; i < positions.count; i++) {
            positions.setZ(i, Math.random() * 2);
        }
        positions.needsUpdate = true;

        // إضاءة
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);

        camera.position.z = 15;
        camera.position.y = 5;
        camera.lookAt(0, 0, 0);

        // حركة الخريطة
        function animate() {
            requestAnimationFrame(animate);
            
            // حركة موجية
            const time = Date.now() * 0.001;
            const positions = map.geometry.attributes.position;
            
            for (let i = 0; i < positions.count; i++) {
                const x = positions.getX(i);
                const y = positions.getY(i);
                positions.setZ(i, Math.sin(x * 2 + time) * Math.cos(y * 2 + time) * 1.5);
            }
            
            positions.needsUpdate = true;
            map.rotation.z += 0.001;
            renderer.render(scene, camera);
        }

        animate();
    }

    // تهيئة جسيمات الخلفية
    function initParticles() {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#a29bfe"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#a29bfe",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }

    // كتابة متحركة
    function initTypingAnimation() {
        const typed = new Typed('.typing-animation', {
            strings: ['مواقع إلكترونية', 'متاجر إلكترونية', 'تطبيقات هاتف', 'أكواد QR', 'فيديوهات تسويقية'],
            typeSpeed: 50,
            backSpeed: 30,
            loop: true,
            backDelay: 1500
        });
    }

    // سلايدر معرض الأعمال
    function initPortfolioSlider() {
        const swiper = new Swiper('.portfolio-slider', {
            slidesPerView: 1,
            spaceBetween: 20,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                992: {
                    slidesPerView: 3,
                }
            }
        });
    }

    // سلايدر آراء العملاء
    function initTestimonialsSlider() {
        const swiper = new Swiper('.testimonials-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                992: {
                    slidesPerView: 2,
                }
            }
        });
    }

    // فلترة الباقات
    function initPricingFilter() {
        const tabs = document.querySelectorAll('.pricing-tab');
        const cards = document.querySelectorAll('.pricing-card');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const category = this.dataset.category;
                
                tabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                cards.forEach(card => {
                    if (category === 'all' || card.dataset.category.includes(category)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // فلترة معرض الأعمال
    function initPortfolioFilter() {
        const buttons = document.querySelectorAll('.filter-btn');
        const items = document.querySelectorAll('.portfolio-item');
        
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.dataset.filter;
                
                buttons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                items.forEach(item => {
                    if (filter === 'all' || item.dataset.category === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // عداد الأرقام
    function initCounter() {
        const counters = document.querySelectorAll('.stat-number');
        const speed = 200;
        
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-count');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(initCounter, 1);
            } else {
                counter.innerText = target;
            }
        });
    }

    // شريط التنقل المتحرك
    function initNavbar() {
        const navbar = document.querySelector('.navbar');
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // إغلاق القائمة عند النقر على رابط
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // زر العودة للأعلى
    function initBackToTop() {
        const backToTop = document.querySelector('.back-to-top');
        
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('active');
            }
        });
    }

    // تأثيرات التمرير
    function initScrollAnimations() {
        const elements = document.querySelectorAll('[data-aos]');
        
        function checkPosition() {
            elements.forEach(element => {
                const position = element.getBoundingClientRect();
                
                if (position.top < window.innerHeight - 100) {
                    element.classList.add('aos-animate');
                }
            });
        }
        
        window.addEventListener('load', checkPosition);
        window.addEventListener('scroll', checkPosition);
        checkPosition();
    }

    // إرسال النموذج إلى تلغرام
    function initContactForm() {
        const form = document.getElementById('contact-form');
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;
            const attachment = document.getElementById('attachment').files[0];
            
            // نص الرسالة
            let text = `طلب جديد من موقع كود برو:\n\n`;
            text += `الاسم: ${name}\n`;
            text += `البريد: ${email}\n`;
            text += `الهاتف: ${phone}\n`;
            text += `الخدمة: ${service}\n\n`;
            text += `الرسالة:\n${message}`;
            
            // إرسال إلى تلغرام (استبدل بمعلومات بوتك)
            const botToken = '7745292426:AAHUVULBrZsQUMUEtaP8Ms4uunrl-cRJJWs';
            const chatId = '6109264232';
            
            if (attachment) {
                const formData = new FormData();
                formData.append('chat_id', chatId);
                formData.append('caption', text);
                formData.append('photo', attachment);
                
                fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    if (data.ok) {
                        alert('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
                        form.reset();
                    } else {
                        alert('حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.');
                });
            } else {
                fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        chat_id: chatId,
                        text: text
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.ok) {
                        alert('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
                        form.reset();
                    } else {
                        alert('حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.');
                });
            }
        });
    }

    // تهيئة جميع الوظائف
    function init() {
        init3DBackground();
        init3DModel();
        init3DMap();
        initParticles();
        initTypingAnimation();
        initPortfolioSlider();
        initTestimonialsSlider();
        initPricingFilter();
        initPortfolioFilter();
        initCounter();
        initNavbar();
        initBackToTop();
        initScrollAnimations();
        initContactForm();
        initCountdown();
        
        // تأثيرات خاصة للعرض الترويجي
        const offerCard = document.querySelector('.offer-card');
        offerCard.addEventListener('mousemove', function(e) {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            offerCard.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
        
        offerCard.addEventListener('mouseenter', function() {
            offerCard.style.transition = 'none';
        });
        
        offerCard.addEventListener('mouseleave', function() {
            offerCard.style.transition = 'transform 0.5s ease';
            offerCard.style.transform = 'rotateY(0) rotateX(0)';
        });
    }

    setTimeout(init, 500);
});