// =========================================================
// PRINCE KUMAR PORTFOLIO — GALLERY & CERTIFICATES DATA
// =========================================================
// Yaha aap apni nayi photos aur certificates add kar sakte hain!
//
// STEP-BY-STEP GUIDE:
// 1. Apni photo/certificate ko 'assets/images/gallery/' ya 'assets/images/certificates/' folder me copy karein.
// 2. Niche GALLERY_PHOTOS array me ek naya block add karein:
//    {
//        title: "Certificate Ya Photo Ka Title",
//        category: "Certificates", // Options: "Certificates", "Personal", "College Life", "Tech & Hackathons"
//        date: "2026",
//        image: "assets/images/certificates/my-cert.jpg"
//    },
// 3. VS Code terminal me:
//    git add .
//    git commit -m "Add new certificate/photo"
//    git push
// =========================================================

const GALLERY_PHOTOS = [
    // CERTIFICATES
    {
        title: "Google for Developers & EduSkills — AI-ML Virtual Internship",
        category: "Certificates",
        date: "Jul – Sep 2025",
        image: "assets/images/certificates/cert-google-aiml-internship.png"
    },
    {
        title: "AWS Academy & EduSkills — Cloud Virtual Internship",
        category: "Certificates",
        date: "Oct – Dec 2025",
        image: "assets/images/certificates/cert-aws-cloud-internship.png"
    },
    {
        title: "NIT Jalandhar & MeitY — Drone Innovation, Vision & Applications (DIVA)",
        category: "Certificates",
        date: "Sep 2025",
        image: "assets/images/certificates/cert-nit-jalandhar-drone-diva.png"
    },
    {
        title: "Google Developer Groups — Ranchi Hacks'26 Winner (Community Partner)",
        category: "Certificates",
        date: "Jan 2026",
        image: "assets/images/certificates/cert-gdg-ranchi-hacks.jpg"
    },
    {
        title: "TCS iON (Tata Consultancy Services) — Communication Skills",
        category: "Certificates",
        date: "Mar 2025",
        image: "assets/images/certificates/cert-tcs-ion-communication.png"
    },
    {
        title: "Simplilearn SkillUp — Deep Learning for Beginners",
        category: "Certificates",
        date: "Oct 2026",
        image: "assets/images/certificates/cert-simplilearn-deep-learning.jpg"
    },
    {
        title: "Simplilearn SkillUp — Terraform for Beginners",
        category: "Certificates",
        date: "Oct 2026",
        image: "assets/images/certificates/cert-simplilearn-terraform.jpg"
    },
    {
        title: "NIIT Foundation & UNICEF YuWaah — Digital Productivity",
        category: "Certificates",
        date: "Feb 2025",
        image: "assets/images/certificates/cert-niit-digital-productivity.jpg"
    },
    {
        title: "Future Finders — Python AI Course (120 Hrs ISO Certified)",
        category: "Certificates",
        date: "Jun – Jul 2026",
        image: "assets/images/certificates/cert-futurefinders-python-ai.jpg"
    },
    {
        title: "Future Finders — Python AI Industrial Training",
        category: "Certificates",
        date: "Jun – Jul 2026",
        image: "assets/images/certificates/cert-futurefinders-python-training.jpg"
    },
    {
        title: "Future Finders — Personality Development Course",
        category: "Certificates",
        date: "Jun – Jul 2026",
        image: "assets/images/certificates/cert-futurefinders-personality-dev.png"
    },
    {
        title: "Meander Software — Industrial Exposure in AI/ML",
        category: "Certificates",
        date: "Build with Meander",
        image: "assets/images/certificates/cert-meander-ai-ml.jpg"
    },

    // CAMPUS & EVENTS
    {
        title: "Prince Kumar — Robomania 2026 Tech Fest",
        category: "College Life",
        date: "Feb 2026",
        image: "assets/images/gallery/event.jpg"
    },

    // PERSONAL
    {
        title: "Prince Kumar — Developer & AIML Student",
        category: "Personal",
        date: "B.Tech CSE (AIML)",
        image: "assets/images/profile.jpg"
    }
];
