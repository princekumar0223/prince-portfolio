# Photo Gallery Instructions / फोटो गैलरी निर्देश

Aap apni photos yaha add kar sakte hain:

### Step 1: Photo yaha copy karein
Apni photo file (jaise `event.jpg`, `campus.png`) is folder me paste karein:
`assets/images/gallery/`

### Step 2: `gallery-data.js` me photo add karein
Project root me `gallery-data.js` file kholein aur `GALLERY_PHOTOS` array me ek naya item add karein:

```javascript
{
    title: "Hamara College Event",
    category: "College Life",
    date: "2026",
    image: "assets/images/gallery/event.jpg"
},
```

### Step 3: GitHub par push karein
VS Code terminal me ye 3 commands chalayein:

```bash
git add .
git commit -m "Add new photo to gallery"
git push
```

Bas! Vercel automatically redeploy kar dega aur aapki nayi photo portfolio par live ho jayegi.
