/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

  sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
//     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200}); 


/*===== WORK MODAL =====*/
const modal = document.getElementById('work-modal');
const modalClose = document.getElementById('modal-close');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');

const workData = {
    'work-vla': {
        title: 'HybridDriveVLA (CVPR 2026)',
        body: ` <p><strong>HybridDriveVLA: Vision-Language-Action Model with Visual CoT Reasoning and ToT Evaluation for Autonomous Driving.</strong></p>
        <p>We introduced a Vision-Language-Action reasoning-driven framework that:</p>
        <ul>
            <li>🔹 Anticipates future driving scenes using Visual Chain-of-Thought (V-CoT)</li>
            <li>🔹 Plan and Predict, multiple-sequence waypoints as candidate trajectories based respectively on Safety, Comfort, and Progress Aspects</li>
            <li>🔹 Explore and select the optimal waypoints among the predicted multiple-sequence waypoints via Tree-of-Thought Evaluation (ToT-E).</li>
        </ul>
        <p>This work moves autonomous driving from single-sequence waypoint prediction toward explorative, deliberative, and interpretable multimodal reasoning over multiple-sequence waypoints.</p>`
    },
    'work-pinn': {
        title: 'Physics-Informed Neural Network (Complex & Intelligent Systems,SCIE Q1)',
        body: `<p>Our paper, <strong>"Physics-informed neural network and momentum contrastive learning for battery state of health estimation,"</strong> addresses a critical challenge in the era of autonomous electric mobility that is ensuring the reliability and safety of Lithium-ion batteries under complex operating conditions.</p>
        <p>As Autonomous Vehicles (AVs) demand increasingly sophisticated power management strategies, traditional data-driven methods often fall short in generalization and physical consistency. Our work introduces a novel hybrid architecture that bridges this gap.</p>
        <p><strong>Key Innovations & Impact:</strong></p>
        <ul>
            <li>🔹 <strong>Physics-Aware AI:</strong> We successfully integrated Physics-Informed Neural Networks (PINN) with Momentum Contrastive Learning to enforce electrochemical principles while capturing robust degradation patterns.</li>
            <li>🔹 <strong>Precision for Autonomous Systems:</strong> The model achieves state-of-the-art accuracy (MAE of 0.095%), enabling the precise State of Health (SoH) estimation required for safe decision-making in autonomous EV navigation.</li>
            <li>🔹 <strong>Data Efficiency:</strong> By leveraging specific Physics-Guided Data Augmentation, we significantly improved performance even when labeled data is scarce.</li>
            <li>🔹 <strong>Real-Time Capability:</strong> Optimized for high-throughput inference, making it viable for deployment in onboard Battery Management Systems (BMS).</li>
        </ul>
        <p>This research represents a significant step forward in building the "safety-critical" infrastructure necessary for the mass adoption of autonomous electric vehicles.</p>
        <p>I would like to extend my gratitude to my co-authors Jiwoo Jung and Prof. Yunsick Sung, and to Dongguk University for their continued support.</p>`
    },
    'work-debate': {
        title: 'Debating Agent Router (Knowledge-Based Systems)',
        body: `<p>I’m thrilled to share that our paper, <strong>"Debating Agent Router in Mixture of Vision-Language Model Experts for Autonomous Driving,"</strong> has been successfully accepted for publication in Knowledge-Based Systems (SCIE Q1).</p>
        <p>In autonomous driving Visual Question Answering (VQA), traditional Mixture-of-Experts (MoE) routers rely on uninterpretable latent features from a single frame. Our work tackles this limitation by introducing a novel debate-based agentic router strategy that dynamically allocates computational resources based on progressive safety risk assessments.</p>
        <p><strong>Key Innovations & Impact:</strong></p>
        <ul>
            <li>🔹 <strong>Progressive Debate Routing:</strong> We designed a multi-agent framework where two debate agents iteratively update a discrete safety risk level (Low, Medium, High) using bounding-box evidence. A judge agent monitors the debate state to trigger routing only when reasoning is sufficient.</li>
            <li>🔹 <strong>Dynamic Expert Allocation:</strong> The system maps the adjudicated safety risk level directly to a Vision-Language expert hierarchy (e.g., 2B, 4B, 8B models), efficiently optimizing perception, planning, and prediction without unnecessary computation.</li>
            <li>🔹 <strong>Auditable & Interpretable Decisions:</strong> Unlike black-box MoE routers, our framework outputs a transparent routing trace that records the trigger step, selected expert, risk level, and referenced physical objects.</li>
            <li>🔹 <strong>State-of-the-Art Efficiency:</strong> Evaluated on the DriveLM-nuScenes benchmark, the framework achieved a superior ROUGE-L score (0.451) while significantly reducing computational overhead by frequently routing to moderately-sized experts for medium-risk cases.</li>
        </ul>
        <p>This advancement paves the way for transparent, safety-critical AI systems in autonomous driving. A huge thank you to my co-authors and supervisors for their incredible support!</p>`
    }
};

document.querySelectorAll('.work__card').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        const id = this.getAttribute('id');
        if(workData[id]) {
            modalTitle.innerHTML = workData[id].title;
            modalBody.innerHTML = workData[id].body;
            modal.classList.add('show-modal');
        }
    });
});

modalClose.addEventListener('click', () => {
    modal.classList.remove('show-modal');
});

window.addEventListener('click', (e) => {
    if(e.target === modal) {
        modal.classList.remove('show-modal');
    }
});
