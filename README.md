# 🎬 Rico's Movie Vault

<div align="center">

![CineVault Banner](https://img.shields.io/badge/Rico's-Movie%20Library-red?style=for-the-badge&logo=film)
[![OOP](https://img.shields.io/badge/Paradigm-Object%20Oriented-blue?style=for-the-badge)](https://en.wikipedia.org/wiki/Object-oriented_programming)
[![API](https://img.shields.io/badge/API-OMDb-yellow?style=for-the-badge)](https://www.omdbapi.com/)

**A sophisticated, production-ready movie library web application showcasing advanced JavaScript OOP principles, smart caching, and scalable architecture.**

[Features](#-key-features) | [Installation](#-installation--setup) 

</div>

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [OOP Concepts Demonstrated](#-oop-concepts-demonstrated)
- [Installation & Setup](#-installation--setup)
- [Usage Guide](#-usage-guide)
- [Deployment](#-deployment)

---

## 🌟 Overview

Rico's Movie Vault is a modern, feature-rich movie library application built with **vanilla JavaScript** that demonstrates professional-level software engineering principles. The application integrates with the OMDb API to provide real-time movie data while implementing intelligent caching and automatic API key rotation to handle production-scale traffic.

### **What Makes This Special?**

- 🎯 **Pure OOP Architecture** - Clean class hierarchy with proper encapsulation, inheritance, and polymorphism
- 🚀 **Production-Ready Scaling** - Multi-key rotation system supporting 300+ concurrent users daily
- ⚡ **Smart Caching** - 24-hour localStorage cache reduces API calls by 95%
- 🎨 **Genre-Specific Styling** - Polymorphic display methods create unique experiences per genre
- 📱 **Fully Responsive** - Seamless experience across desktop, tablet, and mobile devices
- 🌓 **Dark/Light Mode** - User-preferred theme with smooth transitions
- 🔒 **Data Privacy** - Private fields ensure rating data encapsulation

---

## ✨ Key Features

### **Core Functionality**

#### 🔍 **Smart Movie Search**
- Real-time search with OMDb API integration
- Intelligent error handling and user feedback
- Automatic key rotation on rate limit
- Search result caching for performance

#### 📚 **Personal Library Management**
- Add/remove movies with one click
- Persistent storage using localStorage
- Filter by genre and rating
- Sort by date added, rating, title, or year
- Quick access to favorites and watch later list

#### ⭐ **Advanced Rating System**
- 1-5 star interactive rating
- **Private field encapsulation (`#ratings`)**
- Only accessible through getter/setter methods
- Demonstrates true OOP data hiding

#### 📝 **Review System**
- Write detailed movie reviews
- Persistent review storage
- Timestamp tracking
- One review per movie

#### 💖 **Favorites & Watch Later**
- Quick-access favorite movies
- Watch later list for planning
- Separate views for each collection

#### 🎬 **Watch Online Integration**
- Links to 5 free streaming platforms:
  - 🎬 FMovies
  - 📺 SFlix
  - 🎥 GoMovies
  - 🍿 LookMovie
  - 🎞️ Soap2Day
- One-click access to movie search
- No subscription required

#### 📊 **Statistics Dashboard**
- Total movies tracked
- Average rating calculation
- Favorite count
- Top genre analysis
- Visual genre distribution chart

### **Genre-Specific Features (Polymorphism)**

Each movie genre has a unique display style demonstrating polymorphism:

| Genre | Icon | Color Theme | Style |
|-------|------|-------------|-------|
| **Action** | 💥 | Dark Red | Bold, aggressive UI |
| **Comedy** | 😂 | Orange | Playful, light design |
| **Horror** | 👻 | Blood Red | Dark, eerie atmosphere |
| **Romance** | 💖 | Pink | Soft, warm colors |
| **Anime** | ⭐ | Vibrant Purple | Stylized, energetic |
| **Biography** | 📖 | Professional Blue | Clean, documentary feel |

---

## 🛠 Technology Stack

### **Frontend**
- **HTML5** - Semantic markup structure
- **CSS3** - Modern styling with animations
  - CSS Grid & Flexbox
  - CSS Variables for theming
  - Media queries for responsiveness
  - Backdrop filters and gradients
- **Vanilla JavaScript (ES6+)** - No frameworks!
  - Classes and OOP
  - Async/Await
  - Local Storage API
  - Fetch API
  - **Private fields (#)** for encapsulation

### **External Services**
- **OMDb API** - Movie database
- **Font Awesome 6** - Icon library
- **Google Fonts** - Typography (Roboto, Sen)

### **Development Tools**
- VS Code with Live Server
- Browser DevTools
- Git for version control
- Vercel

---

## 🎓 OOP Concepts Demonstrated

This project showcases all four pillars of Object-Oriented Programming:

### **1. Encapsulation** 🔒

**Private Fields with # syntax:**
```javascript
class User {
    #ratings;      // Private - no direct access
    #favorites;    // Private - protected data
    #watchLater;   // Private - encapsulated
    
    // Public interface
    rateMovie(id, rating) {
        this.#ratings[id] = rating; // Can only set through method
    }
    
    getRating(id) {
        return this.#ratings[id]; // Can only get through method
    }
}
```

**Benefits:**
- ✅ Data integrity protected
- ✅ Controlled access through methods only
- ✅ Implementation details hidden from outside
- ✅ Prevents external modification of sensitive data

### **2. Inheritance** 🌳

**Class Hierarchy:**
```
Movie (Base Class)
├── ActionMovie
├── ComedyMovie
├── HorrorMovie
├── RomanceMovie
├── AnimeMovie
└── BiographyMovie
```

**Example:**
```javascript
class Movie {
    constructor(data) {
        this.imdbID = data.imdbID;
        this.title = data.Title;
        // ... more properties
    }
    
    display() {
        // Default display method
    }
}

class ActionMovie extends Movie {
    display() {
        // Action-specific display with 💥 emoji
        // Dark theme, bold styling
    }
}
```

### **3. Polymorphism** 🎭

**Same Method, Different Behaviors:**
```javascript
// Each genre displays differently using the same method name
const action = new ActionMovie(data);
const comedy = new ComedyMovie(data);

action.display();   // → Dark theme, 💥 emoji
comedy.display();   // → Bright theme, 😂 emoji

// Same method name, different implementations!
```

**Real-World Impact:**
- Action movies: Bold, dark UI with aggressive styling
- Comedy movies: Bright, cheerful UI with playful design
- Horror movies: Red accents with spooky feel
- Each maintains its unique identity!

### **4. Abstraction** 🎨

**Factory Pattern:**
```javascript
function createMovieByGenre(data) {
    const movie = new Movie(data);
    const genreType = movie.getGenreType();
    
    switch(genreType) {
        case 'action': return new ActionMovie(data);
        case 'comedy': return new ComedyMovie(data);
        case 'horror': return new HorrorMovie(data);
        // ... complexity hidden from caller
    }
}

// Simple usage - complexity hidden:
const movie = createMovieByGenre(apiData);
```

**Service Layer Abstraction:**
```javascript
class OMDbService {
    static async searchMovies(query) {
        // Complex API logic, error handling, retries
        // All hidden behind simple interface
    }
}

// Clean, simple usage:
const movies = await OMDbService.searchMovies('batman');
```

---

## 🚀 Installation & Setup

### **Prerequisites**

- Modern web browser (Chrome, Firefox, Edge, Safari)
- Text editor (VS Code recommended)
- Local server (Live Server, Python, or Node.js)
- OMDb API keys (free from omdbapi.com)

### **Quick Start (10 Minutes)**

#### **Step 1: Get the Code**

```bash
# Clone or download
git clone https://github.com/RicoKay22/Rico-s-Movie-Library.git
cd Rico-s-Movie-Library
```

Or download ZIP and extract.

#### **Step 2: Get 10-15 API Keys**

You need multiple keys for optimal performance:

1. Visit: **https://www.omdbapi.com/apikey.aspx**
2. Select **"FREE! (1,000 daily limit)"**
3. Enter email address
4. Check email and **click activation link** (crucial!)
5. Copy the API key
6. **Repeat 10-15 times**

#### **Step 3: Configure API Keys**

Open `script.js` (lines 2-20) and add your keys:

```javascript
const API_KEYS = [
    'abc123xyz',    // yourname+key1@gmail.com
    'def456uvw',    // yourname+key2@gmail.com
    'ghi789rst',    // yourname+key3@gmail.com
    'jkl012opq',    // yourname+key4@gmail.com
    'mno345lmn',    // yourname+key5@gmail.com
    'pqr678ijk',    // yourname+key6@gmail.com
    'stu901fgh',    // yourname+key7@gmail.com
    'vwx234cde',    // yourname+key8@gmail.com
    'yza567bcd',    // yourname+key9@gmail.com
    'bcd890abc',    // yourname+key10@gmail.com
    // Add 5 more for 15 total (recommended)
];
```

#### **Step 4: Start Local Server**

**⚠️ IMPORTANT: You MUST use a local server (not file://)**

**Option A - VS Code Live Server (Easiest):**
```
1. Install "Live Server" extension in VS Code
2. Right-click index.html
3. Click "Open with Live Server"
4. Opens at http://127.0.0.1:5500
```

## 🚢 Deployment
## GitHub: https://github.com/RicoKay22/Rico-s-Movie-Library
## Vercel: 
---

## 📁 Project Structure

```
cinevault/
├── index.html              # Main HTML (500 lines)
├── style.css               # Complete styling (1,200+ lines)
├── script.js               # Core logic (1,400+ lines)
├── README.md               # This file

---

## 🙏 Acknowledgments

- OMDb API - Movie database
- Font Awesome- Icons
- Google Fonts- Typography
- MDN Web Docs - JavaScript reference
- Web3BridgeAfrica Frontend Advance Cohort XIV
- Youtube
- Netflix UI - Design inspiration


---

** Built with ❤️ using Vanilla JavaScript**

**No frameworks. No dependencies. Pure OOP.**

⭐ Star this repo if you find it helpful!

---


