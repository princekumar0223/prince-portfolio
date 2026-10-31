// =========================================================
// PRINCE KUMAR PORTFOLIO — GALLERY DATA
// =========================================================
// Yaha aap apni nayi photos add kar sakte hain!
//
// STEP-BY-STEP GUIDE:
// 1. Apni photo ko 'assets/images/gallery/' folder me copy karein (jaise: college.jpg).
// 2. Niche GALLERY_PHOTOS array me ek naya block add karein:
//    {
//        title: "Campus Memory",
//        category: "College Life",
//        date: "2026",
//        image: "assets/images/gallery/college.jpg"
//    },
// 3. VS Code terminal me ye commands run karein:
//    git add .
//    git commit -m "Add new gallery photo"
//    git push
// 4. Vercel automatically update ho jayega aur photo website par dikhne lagegi!
// =========================================================

const GALLERY_PHOTOS = [
    {
        title: "Prince Kumar — Developer & AIML Student",
        category: "Personal",
        date: "B.Tech CSE (AIML)",
        image: "assets/images/profile.jpg"
    },
    {
        title: "A random image",  // Photo ka title
        category: "College Life",          // Category
        date: "2026",                      // Year/Date
        image: "assets/images/gallery/random.png" // Aapki photo ka path
    }
];
