// Multiple API keys for load distribution
const API_KEYS = [
    'f06e4e37', 
    '4023865b', 
    'bab8b3f3',
    'a991cf10',
    'afcff110',
    '7b11c798',
    'ec6d4fb1',
    '22758ac4',
    '47d76a56',
    '76ad2d22',
    'f83b906c',
    '562a93f6',
    '9e94a7cc',
    '380abf66',
    'e46ca81d',
];

let currentKeyIndex = 0;

// gets current API key
function getAPIKey() {
    return API_KEYS[currentKeyIndex];
}

// this switches to the next API key
function rotateAPIKey() {
    currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length;
    console.log(`🔄 Switched to API key ${currentKeyIndex + 1}/${API_KEYS.length}`);
    return getAPIKey();
}

// this checks if we've tried all keys
function hasMoreKeys() {
    return currentKeyIndex < API_KEYS.length - 1;
}

const API_URL = 'https://www.omdbapi.com/';

// Free streaming sites for watching movies
const STREAMING_SITES = [
    {
        name: 'IMDb TV',
        url: 'https://www.imdb.to/search/',
        icon: '🎬',
        description: 'Popular free streaming site'
    },
    {
        name: 'SFlix',
        url: 'https://sflix.to/search/',
        icon: '📺',
        description: 'HD movies and TV shows'
    },
    {
        name: 'GoMovies',
        url: 'https://gomovies-online.link/search/',
        icon: '🎥',
        description: 'Watch movies online free'
    },
    {
        name: 'LookMovie',
        url: 'https://lookmovie2.to/search/?q=',
        icon: '🍿',
        description: 'Stream movies in HD'
    },
    {
        name: 'Soap2Day',
        url: 'https://soap2day.day/search/keyword/',
        icon: '🎞️',
        description: 'Free movies and series'
    }
];

// Base Movie class
class Movie {
    constructor(data) {
        this.imdbID = data.imdbID;
        this.title = data.Title;
        this.year = data.Year;
        this.poster = data.Poster !== 'N/A' ? data.Poster : 'https://via.placeholder.com/300x450?text=No+Poster';
        this.plot = data.Plot || 'No plot available';
        this.genre = data.Genre || 'Unknown';
        this.director = data.Director || 'Unknown';
        this.actors = data.Actors || 'Unknown';
        this.runtime = data.Runtime || 'N/A';
        this.rated = data.Rated || 'N/A';
        this.imdbRating = data.imdbRating || 'N/A';
        this.dateAdded = new Date().toISOString();
    }

    // Polymorphism - will be overridden by subclasses
    display() {
        return `
            <div class="movie-list-item" data-imdb-id="${this.imdbID}">
                <img class="movie-list-item-img" src="${this.poster}" alt="${this.title}">
                <div class="movie-overlay">
                    <div class="movie-list-item-title">${this.title}</div>
                    <div class="movie-list-item-meta">
                        <span class="movie-year">${this.year}</span>
                        <span class="movie-rating">
                            <i class="fas fa-star"></i> ${this.imdbRating}
                        </span>
                    </div>
                    <p class="movie-list-item-desc">${this.plot.substring(0, 100)}...</p>
                    <button class="movie-list-item-button">View Details</button>
                </div>
            </div>
        `;
    }

    getGenreType() {
        const genreLower = this.genre.toLowerCase();
        if (genreLower.includes('action')) return 'action';
        if (genreLower.includes('comedy')) return 'comedy';
        if (genreLower.includes('horror') || genreLower.includes('thriller')) return 'horror';
        if (genreLower.includes('romance')) return 'romance';
        if (genreLower.includes('animation') || genreLower.includes('anime')) return 'anime';
        if (genreLower.includes('biography') || genreLower.includes('documentary')) return 'biography';
        return 'other';
    }
}

// Genre specific classes - inheriting from Movie
class ActionMovie extends Movie {
    display() {
        return `
            <div class="movie-list-item genre-action" data-imdb-id="${this.imdbID}">
                <img class="movie-list-item-img" src="${this.poster}" alt="${this.title}">
                <div class="movie-overlay">
                    <div class="movie-list-item-title">
                        💥 ${this.title}
                    </div>
                    <div class="movie-list-item-meta">
                        <span class="movie-year">${this.year}</span>
                        <span class="movie-rating">
                            <i class="fas fa-star"></i> ${this.imdbRating}
                        </span>
                    </div>
                    <p class="movie-list-item-desc">${this.plot.substring(0, 100)}...</p>
                    <button class="movie-list-item-button">
                        <i class="fas fa-bolt"></i> View Details
                    </button>
                </div>
            </div>
        `;
    }
}

class ComedyMovie extends Movie {
    display() {
        return `
            <div class="movie-list-item genre-comedy" data-imdb-id="${this.imdbID}">
                <img class="movie-list-item-img" src="${this.poster}" alt="${this.title}">
                <div class="movie-overlay">
                    <div class="movie-list-item-title">
                        😂 ${this.title}
                    </div>
                    <div class="movie-list-item-meta">
                        <span class="movie-year">${this.year}</span>
                        <span class="movie-rating">
                            <i class="fas fa-star"></i> ${this.imdbRating}
                        </span>
                    </div>
                    <p class="movie-list-item-desc">${this.plot.substring(0, 100)}...</p>
                    <button class="movie-list-item-button">
                        <i class="fas fa-smile"></i> View Details
                    </button>
                </div>
            </div>
        `;
    }
}

class HorrorMovie extends Movie {
    display() {
        return `
            <div class="movie-list-item genre-horror" data-imdb-id="${this.imdbID}">
                <img class="movie-list-item-img" src="${this.poster}" alt="${this.title}">
                <div class="movie-overlay">
                    <div class="movie-list-item-title">
                        👻 ${this.title}
                    </div>
                    <div class="movie-list-item-meta">
                        <span class="movie-year">${this.year}</span>
                        <span class="movie-rating">
                            <i class="fas fa-star"></i> ${this.imdbRating}
                        </span>
                    </div>
                    <p class="movie-list-item-desc">${this.plot.substring(0, 100)}...</p>
                    <button class="movie-list-item-button">
                        <i class="fas fa-ghost"></i> View Details
                    </button>
                </div>
            </div>
        `;
    }
}

class RomanceMovie extends Movie {
    display() {
        return `
            <div class="movie-list-item genre-romance" data-imdb-id="${this.imdbID}">
                <img class="movie-list-item-img" src="${this.poster}" alt="${this.title}">
                <div class="movie-overlay">
                    <div class="movie-list-item-title">
                        💖 ${this.title}
                    </div>
                    <div class="movie-list-item-meta">
                        <span class="movie-year">${this.year}</span>
                        <span class="movie-rating">
                            <i class="fas fa-star"></i> ${this.imdbRating}
                        </span>
                    </div>
                    <p class="movie-list-item-desc">${this.plot.substring(0, 100)}...</p>
                    <button class="movie-list-item-button">
                        <i class="fas fa-heart"></i> View Details
                    </button>
                </div>
            </div>
        `;
    }
}

class AnimeMovie extends Movie {
    display() {
        return `
            <div class="movie-list-item genre-anime" data-imdb-id="${this.imdbID}">
                <img class="movie-list-item-img" src="${this.poster}" alt="${this.title}">
                <div class="movie-overlay">
                    <div class="movie-list-item-title">
                        ⭐ ${this.title}
                    </div>
                    <div class="movie-list-item-meta">
                        <span class="movie-year">${this.year}</span>
                        <span class="movie-rating">
                            <i class="fas fa-star"></i> ${this.imdbRating}
                        </span>
                    </div>
                    <p class="movie-list-item-desc">${this.plot.substring(0, 100)}...</p>
                    <button class="movie-list-item-button">
                        <i class="fas fa-play-circle"></i> View Details
                    </button>
                </div>
            </div>
        `;
    }
}

class BiographyMovie extends Movie {
    display() {
        return `
            <div class="movie-list-item genre-biography" data-imdb-id="${this.imdbID}">
                <img class="movie-list-item-img" src="${this.poster}" alt="${this.title}">
                <div class="movie-overlay">
                    <div class="movie-list-item-title">
                        📖 ${this.title}
                    </div>
                    <div class="movie-list-item-meta">
                        <span class="movie-year">${this.year}</span>
                        <span class="movie-rating">
                            <i class="fas fa-star"></i> ${this.imdbRating}
                        </span>
                    </div>
                    <p class="movie-list-item-desc">${this.plot.substring(0, 100)}...</p>
                    <button class="movie-list-item-button">
                        <i class="fas fa-book"></i> View Details
                    </button>
                </div>
            </div>
        `;
    }
}

// Review class for movie reviews
class Review {
    constructor(movieID, text, rating) {
        this.movieID = movieID;
        this.text = text;
        this.rating = rating;
        this.date = new Date().toLocaleDateString();
    }

    display() {
        return `
            <div class="review-display">
                <div class="review-rating">
                    ${'<i class="fas fa-star"></i>'.repeat(this.rating)}
                    ${'<i class="far fa-star"></i>'.repeat(5 - this.rating)}
                </div>
                <p>${this.text}</p>
                <p class="review-date">Reviewed on ${this.date}</p>
            </div>
        `;
    }
}

// User class - stores library, ratings, favorites etc
// Using private fields (#) for encapsulation
class User {
    #ratings; // Private - can only access through methods
    #favorites;
    #watchLater;

    constructor() {
        this.library = [];
        this.#ratings = {};
        this.#favorites = new Set();
        this.#watchLater = new Set();
        this.reviews = {};
        this.loadFromStorage();
    }

    // Add movie to library
    addMovie(movie) {
        if (!this.library.find(m => m.imdbID === movie.imdbID)) {
            this.library.push(movie);
            this.saveToStorage();
            return true;
        }
        return false;
    }

    // Remove movie from library
    removeMovie(imdbID) {
        this.library = this.library.filter(m => m.imdbID !== imdbID);
        delete this.#ratings[imdbID];
        delete this.reviews[imdbID];
        this.#favorites.delete(imdbID);
        this.#watchLater.delete(imdbID);
        this.saveToStorage();
    }

    // Rate movie (ENCAPSULATION - only way to set rating)
    rateMovie(imdbID, rating) {
        if (rating >= 1 && rating <= 5) {
            this.#ratings[imdbID] = rating;
            this.saveToStorage();
            return true;
        }
        return false;
    }

    // Get rating (ENCAPSULATION - only way to access rating)
    getRating(imdbID) {
        return this.#ratings[imdbID] || 0;
    }

    // Add review
    addReview(movieID, text, rating) {
        this.reviews[movieID] = new Review(movieID, text, rating);
        this.rateMovie(movieID, rating);
        this.saveToStorage();
    }

    // Get review
    getReview(movieID) {
        return this.reviews[movieID];
    }

    // Toggle favorite
    toggleFavorite(imdbID) {
        if (this.#favorites.has(imdbID)) {
            this.#favorites.delete(imdbID);
            this.saveToStorage();
            return false;
        } else {
            this.#favorites.add(imdbID);
            this.saveToStorage();
            return true;
        }
    }

    // Check if favorite
    isFavorite(imdbID) {
        return this.#favorites.has(imdbID);
    }

    // Get favorites
    getFavorites() {
        return this.library.filter(m => this.#favorites.has(m.imdbID));
    }

    // Toggle watch later
    toggleWatchLater(imdbID) {
        if (this.#watchLater.has(imdbID)) {
            this.#watchLater.delete(imdbID);
            this.saveToStorage();
            return false;
        } else {
            this.#watchLater.add(imdbID);
            this.saveToStorage();
            return true;
        }
    }

    // Get watch later list
    getWatchLater() {
        return this.library.filter(m => this.#watchLater.has(m.imdbID));
    }

    // Get statistics
    getStatistics() {
        const totalMovies = this.library.length;
        const ratings = Object.values(this.#ratings);
        const avgRating = ratings.length > 0 
            ? (ratings.reduce((sum, r) => sum + r, 0) / ratings.length).toFixed(1)
            : 0;
        
        const genreCounts = {};
        this.library.forEach(movie => {
            const genre = movie.getGenreType();
            genreCounts[genre] = (genreCounts[genre] || 0) + 1;
        });

        const topGenre = Object.entries(genreCounts).sort((a, b) => b[1] - a[1])[0];

        return {
            totalMovies,
            avgRating,
            favorites: this.#favorites.size,
            topGenre: topGenre ? topGenre[0].charAt(0).toUpperCase() + topGenre[0].slice(1) : '-',
            genreCounts
        };
    }

    // Filter library
    filterLibrary(genreFilter, ratingFilter) {
        return this.library.filter(movie => {
            const genreMatch = genreFilter === 'all' || movie.getGenreType() === genreFilter;
            const userRating = this.getRating(movie.imdbID);
            const ratingMatch = ratingFilter === 'all' || userRating >= parseInt(ratingFilter);
            return genreMatch && ratingMatch;
        });
    }

    // Sort library
    sortLibrary(movies, sortBy) {
        const sorted = [...movies];
        switch(sortBy) {
            case 'rating':
                return sorted.sort((a, b) => this.getRating(b.imdbID) - this.getRating(a.imdbID));
            case 'title':
                return sorted.sort((a, b) => a.title.localeCompare(b.title));
            case 'year':
                return sorted.sort((a, b) => parseInt(b.year) - parseInt(a.year));
            case 'dateAdded':
            default:
                return sorted.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
        }
    }

    // Save to localStorage
    saveToStorage() {
        const data = {
            library: this.library.map(m => ({
                imdbID: m.imdbID,
                title: m.title,
                year: m.year,
                poster: m.poster,
                plot: m.plot,
                genre: m.genre,
                director: m.director,
                actors: m.actors,
                runtime: m.runtime,
                rated: m.rated,
                imdbRating: m.imdbRating,
                dateAdded: m.dateAdded
            })),
            ratings: this.#ratings,
            favorites: Array.from(this.#favorites),
            watchLater: Array.from(this.#watchLater),
            reviews: Object.entries(this.reviews).map(([id, review]) => ({
                movieID: id,
                text: review.text,
                rating: review.rating,
                date: review.date
            }))
        };
        localStorage.setItem('cinevault_user', JSON.stringify(data));
    }

    // Load from localStorage
    loadFromStorage() {
        const data = localStorage.getItem('cinevault_user');
        if (data) {
            const parsed = JSON.parse(data);
            this.library = parsed.library.map(m => createMovieByGenre(m));
            this.#ratings = parsed.ratings || {};
            this.#favorites = new Set(parsed.favorites || []);
            this.#watchLater = new Set(parsed.watchLater || []);
            this.reviews = {};
            (parsed.reviews || []).forEach(r => {
                this.reviews[r.movieID] = new Review(r.movieID, r.text, r.rating);
                this.reviews[r.movieID].date = r.date;
            });
        }
    }
}

// Helper function to create the right type of movie based on genre
function createMovieByGenre(data) {
    const movie = new Movie(data);
    const genreType = movie.getGenreType();

    switch(genreType) {
        case 'action':
            return new ActionMovie(data);
        case 'comedy':
            return new ComedyMovie(data);
        case 'horror':
            return new HorrorMovie(data);
        case 'romance':
            return new RomanceMovie(data);
        case 'anime':
            return new AnimeMovie(data);
        case 'biography':
            return new BiographyMovie(data);
        default:
            return movie;
    }
}

// API functions to interact with OMDb
class OMDbService {
    static async searchMovies(query, retryCount = 0) {
        try {
            const apiKey = getAPIKey();
            const searchUrl = `${API_URL}?apikey=${apiKey}&s=${encodeURIComponent(query)}`;
            console.log(`Fetching: ${searchUrl} (Key ${currentKeyIndex + 1}/${API_KEYS.length})`);
            
            const response = await fetch(searchUrl);
            const data = await response.json();
            
            console.log('API Response:', data);
            
            // If rate limit hit and we have more keys, try next key
            if (data.Response === 'False' && data.Error === 'Request limit reached!' && hasMoreKeys()) {
                console.log('⚠️ Rate limit hit! Trying next API key...');
                rotateAPIKey();
                return this.searchMovies(query, retryCount + 1); // Retry with next key
            }
            
            if (data.Response === 'True' && data.Search) {
                console.log(`Found ${data.Search.length} results, fetching details...`);
                const detailedMovies = await Promise.all(
                    data.Search.slice(0, 10).map(movie => this.getMovieDetails(movie.imdbID))
                );
                const validMovies = detailedMovies.filter(m => m !== null);
                console.log(`Returning ${validMovies.length} movies with details`);
                return validMovies;
            } else {
                console.log('No results or error:', data.Error || 'No matches found');
                return [];
            }
        } catch (error) {
            console.error('Error searching movies:', error);
            return [];
        }
    }

    static async getMovieDetails(imdbID, retryCount = 0) {
        try {
            const apiKey = getAPIKey();
            const response = await fetch(`${API_URL}?apikey=${apiKey}&i=${imdbID}&plot=full`);
            const data = await response.json();
            
            // If rate limit hit and we have more keys, try next key
            if (data.Response === 'False' && data.Error === 'Request limit reached!' && hasMoreKeys()) {
                rotateAPIKey();
                return this.getMovieDetails(imdbID, retryCount + 1); // Retry with next key
            }
            
            if (data.Response === 'True') {
                return createMovieByGenre(data);
            }
            return null;
        } catch (error) {
            console.error('Error fetching movie details:', error);
            return null;
        }
    }

    static async getMoviesByGenre(genre) {
        const queries = {
            action: ['action', 'avengers', 'mission impossible', 'fast furious'],
            comedy: ['comedy', 'hangover', 'superbad', 'bridesmaids'],
            horror: ['horror', 'conjuring', 'halloween', 'scream'],
            romance: ['romance', 'titanic', 'notebook', 'love actually'],
            anime: ['anime', 'spirited away', 'your name', 'akira'],
            biography: ['biography', 'social network', 'jobs', 'lincoln']
        };

        const searchTerms = queries[genre] || [genre];
        const allMovies = [];

        for (const term of searchTerms) {
            try {
                const movies = await this.searchMovies(term);
                allMovies.push(...movies);
                
                // Small delay to avoid hitting rate limits
                await new Promise(resolve => setTimeout(resolve, 100));
            } catch (error) {
                console.error(`Error fetching ${term}:`, error);
            }
        }

        // Remove duplicates and limit to 8
        const uniqueMovies = Array.from(new Map(allMovies.map(m => [m.imdbID, m])).values());
        return uniqueMovies.slice(0, 8);
    }
}

// Main app class that controls everything
class CineVaultApp {
    constructor() {
        this.user = new User();
        this.currentMovie = null;
        this.currentView = 'home';
        this.init();
    }

    init() {
        console.log('Initializing app...');
        this.setupEventListeners();
        this.testAPIConnection();
        this.loadFeaturedContent();
        this.loadGenreLists();
        this.updateStats();
    }

    async testAPIConnection() {
        try {
            const apiKey = getAPIKey();
            const testUrl = `${API_URL}?apikey=${apiKey}&i=tt0111161`;
            const response = await fetch(testUrl);
            const data = await response.json();
            
            if (data.Response === 'False') {
                console.error('❌ API Key Error:', data.Error);
                this.showToast('⚠️ API Key Issue - Check console');
            } else {
                console.log(`✅ API Connection OK (Using key ${currentKeyIndex + 1}/${API_KEYS.length})`);
                console.log(`📊 Total keys available: ${API_KEYS.length}`);
                console.log(`💡 Estimated capacity: ~${API_KEYS.length * 20} unique visitors/day`);
            }
        } catch (error) {
            console.error('❌ Network Error:', error);
        }
    }

    setupEventListeners() {
        try {
            // Search functionality
            const searchBtn = document.getElementById('searchBtn');
            const searchInput = document.getElementById('searchInput');
            
            if (searchBtn) {
                searchBtn.addEventListener('click', () => this.handleSearch());
            }
            
            if (searchInput) {
                searchInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') this.handleSearch();
                });
            }

            // Search icon in sidebar
            const searchIcon = document.getElementById('searchIcon');
            if (searchIcon) {
                searchIcon.addEventListener('click', () => {
                    document.getElementById('searchSection').scrollIntoView({ behavior: 'smooth' });
                    document.getElementById('searchInput').focus();
                });
            }

            // Navigation
            document.querySelectorAll('[data-nav]').forEach(el => {
                el.addEventListener('click', (e) => this.handleNavigation(e.target.dataset.nav));
            });

            // Category menu
            document.querySelectorAll('[data-category]').forEach(el => {
                el.addEventListener('click', (e) => this.handleCategoryClick(e.target.dataset.category));
            });

            // Dark mode toggle - making it easier to click
            const toggleContainer = document.querySelector('.toggle');
            const toggleBall = document.querySelector('.toggle-ball');
            
            if (toggleContainer) {
                toggleContainer.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.toggleDarkMode();
                });
            }
            
            if (toggleBall) {
                toggleBall.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.toggleDarkMode();
                });
            }

            // Clear cache button
            const clearCacheBtn = document.getElementById('clearCacheBtn');
            if (clearCacheBtn) {
                clearCacheBtn.addEventListener('click', () => {
                    if (confirm('Clear cached movies? This will reload fresh movies from the API.')) {
                        localStorage.removeItem('genre_movies_cache');
                        localStorage.removeItem('genre_movies_cache_time');
                        this.showToast('Cache cleared! Reloading...');
                        setTimeout(() => location.reload(), 1000);
                    }
                });
            }

            // Modal close
            const modalClose = document.querySelector('.modal-close');
            const movieModal = document.getElementById('movieModal');
            
            if (modalClose) {
                modalClose.addEventListener('click', () => this.closeModal());
            }
            
            if (movieModal) {
                movieModal.addEventListener('click', (e) => {
                    if (e.target.id === 'movieModal') this.closeModal();
                });
            }

            // Filter controls
            const genreFilter = document.getElementById('genreFilter');
            const ratingFilter = document.getElementById('ratingFilter');
            const sortBy = document.getElementById('sortBy');
            
            if (genreFilter) genreFilter.addEventListener('change', () => this.renderLibrary());
            if (ratingFilter) ratingFilter.addEventListener('change', () => this.renderLibrary());
            if (sortBy) sortBy.addEventListener('change', () => this.renderLibrary());

            // Modal actions
            const submitReview = document.getElementById('submitReview');
            if (submitReview) {
                submitReview.addEventListener('click', () => this.handleReviewSubmit());
            }
            
            // Watch online button
            const modalWatchOnline = document.getElementById('modalWatchOnline');
            const closeWatchOptions = document.getElementById('closeWatchOptions');
            const watchOptionsModal = document.getElementById('watchOptionsModal');
            
            if (modalWatchOnline) {
                modalWatchOnline.addEventListener('click', () => this.showWatchOptions());
            }
            
            if (closeWatchOptions) {
                closeWatchOptions.addEventListener('click', () => this.closeWatchOptions());
            }
            
            if (watchOptionsModal) {
                watchOptionsModal.addEventListener('click', (e) => {
                    if (e.target.id === 'watchOptionsModal') this.closeWatchOptions();
                });
            }
            
            // Star rating in modal
            document.querySelectorAll('#modalStarRating i').forEach((star, index) => {
                star.addEventListener('click', () => this.handleStarClick(index + 1));
                star.addEventListener('mouseenter', () => this.handleStarHover(index + 1));
            });
            
            const modalStarRating = document.getElementById('modalStarRating');
            if (modalStarRating) {
                modalStarRating.addEventListener('mouseleave', () => this.resetStars());
            }
            
            console.log('✅ Event listeners set up successfully');
        } catch (error) {
            console.error('Error setting up event listeners:', error);
        }
    }

    async handleSearch() {
        const query = document.getElementById('searchInput').value.trim();
        if (!query) {
            this.showToast('Please enter a search term');
            return;
        }

        const searchResults = document.getElementById('searchResults');
        searchResults.innerHTML = '<div class="loading" style="margin: 50px auto;"></div>';

        console.log('Searching for:', query);
        
        try {
            const movies = await OMDbService.searchMovies(query);
            console.log('Search results:', movies); // checking what we got
            
            if (movies && movies.length > 0) {
                searchResults.innerHTML = movies.map(movie => movie.display()).join('');
                this.attachMovieClickListeners();
                this.showToast(`Found ${movies.length} movies!`);
            } else {
                searchResults.innerHTML = `
                    <div style="text-align: center; padding: 50px; color: var(--text-secondary);">
                        <h3>No movies found for "${query}"</h3>
                        <p>Try:</p>
                        <ul style="list-style: none; padding: 20px;">
                            <li>✓ Using the full movie title</li>
                            <li>✓ Checking your spelling</li>
                            <li>✓ Using English titles</li>
                            <li>✓ Searching for popular movies (e.g., "Batman", "Avengers")</li>
                        </ul>
                    </div>
                `;
            }
        } catch (error) {
            console.error('Search error:', error);
            searchResults.innerHTML = `
                <div style="text-align: center; padding: 50px; color: var(--text-secondary);">
                    <h3>⚠️ Search Failed</h3>
                    <p>There was an error searching for movies.</p>
                    <p>Check your internet connection and try again.</p>
                </div>
            `;
            this.showToast('Search failed - check console for details');
        }
    }

    async loadFeaturedContent() {
        const featuredMovies = ['tt0111161', 'tt0068646', 'tt0468569', 'tt0109830', 'tt0120737'];
        const randomID = featuredMovies[Math.floor(Math.random() * featuredMovies.length)];
        const movie = await OMDbService.getMovieDetails(randomID);

        if (movie) {
            const featuredSection = document.getElementById('featuredContent');
            featuredSection.style.backgroundImage = `linear-gradient(to bottom, rgba(0,0,0,0), #151515), url('${movie.poster}')`;
            
            document.getElementById('featuredYear').textContent = movie.year;
            document.getElementById('featuredRating').textContent = `⭐ ${movie.imdbRating}`;
            document.getElementById('featuredGenre').textContent = movie.genre.split(',')[0];
            document.getElementById('featuredDesc').textContent = movie.plot;

            document.getElementById('featuredViewBtn').onclick = () => this.showMovieDetails(movie.imdbID);
            document.getElementById('featuredAddBtn').onclick = () => this.addToLibrary(movie);
        }
    }

    async loadGenreLists() {
        const genres = ['action', 'comedy', 'horror', 'romance', 'anime', 'biography'];
        const genreListsContainer = document.getElementById('genreLists');
        
        console.log('Loading genre lists...');
        
        // Check if we have cached movies from today
        const cacheKey = 'genre_movies_cache';
        const cacheTimeKey = 'genre_movies_cache_time';
        const cachedData = localStorage.getItem(cacheKey);
        const cacheTime = localStorage.getItem(cacheTimeKey);
        const oneDayInMs = 24 * 60 * 60 * 1000; // 24 hours
        
        // Use cache if it exists and is less than 24 hours old
        if (cachedData && cacheTime && (Date.now() - parseInt(cacheTime)) < oneDayInMs) {
            console.log('✅ Using cached movies (saves API requests!)');
            const cachedMovies = JSON.parse(cachedData);
            
            let totalMoviesLoaded = 0;
            for (const [genre, movies] of Object.entries(cachedMovies)) {
                if (movies.length > 0) {
                    const movieObjects = movies.map(m => createMovieByGenre(m));
                    const genreHTML = this.createGenreList(genre, movieObjects);
                    genreListsContainer.innerHTML += genreHTML;
                    totalMoviesLoaded += movies.length;
                }
            }
            
            console.log(`Total cached movies loaded: ${totalMoviesLoaded}`);
            this.setupCarousels();
            this.attachMovieClickListeners();
            console.log('Setup complete (from cache)!');
            return;
        }
        
        // No cache or expired - fetch from API
        console.log('No cache found, fetching from API...');
        genreListsContainer.innerHTML = '<div style="text-align: center; padding: 50px; color: white;"><h2>Loading movies...</h2><div class="loading"></div></div>';
        
        genreListsContainer.innerHTML = '';
        
        let totalMoviesLoaded = 0;
        const genreMoviesCache = {};
        
        for (const genre of genres) {
            try {
                const movies = await OMDbService.getMoviesByGenre(genre);
                console.log(`${genre} movies loaded:`, movies.length);
                
                if (movies.length > 0) {
                    // Store raw data for caching
                    genreMoviesCache[genre] = movies.map(m => ({
                        imdbID: m.imdbID,
                        Title: m.title,
                        Year: m.year,
                        Poster: m.poster,
                        Plot: m.plot,
                        Genre: m.genre,
                        Director: m.director,
                        Actors: m.actors,
                        Runtime: m.runtime,
                        Rated: m.rated,
                        imdbRating: m.imdbRating
                    }));
                    
                    const genreHTML = this.createGenreList(genre, movies);
                    genreListsContainer.innerHTML += genreHTML;
                    totalMoviesLoaded += movies.length;
                }
            } catch (error) {
                console.error(`Error loading ${genre} movies:`, error);
            }
        }

        // Save to cache
        if (totalMoviesLoaded > 0) {
            localStorage.setItem(cacheKey, JSON.stringify(genreMoviesCache));
            localStorage.setItem(cacheTimeKey, Date.now().toString());
            console.log('💾 Movies cached for 24 hours!');
        }

        if (totalMoviesLoaded === 0) {
            genreListsContainer.innerHTML = `
                <div style="text-align: center; padding: 50px; color: white;">
                    <h2>⚠️ Unable to Load Movies</h2>
                    <p>This could be due to:</p>
                    <ul style="list-style: none; padding: 20px;">
                        <li>🔑 Invalid or unactivated API key</li>
                        <li>⏱️ API rate limit exceeded (1000/day)</li>
                        <li>🌐 Network connection issue</li>
                    </ul>
                    <p>Check the browser console for details.</p>
                    <button onclick="localStorage.removeItem('genre_movies_cache'); localStorage.removeItem('genre_movies_cache_time'); location.reload()" style="padding: 15px 30px; margin-top: 20px; background: var(--primary-color); color: white; border: none; border-radius: 25px; cursor: pointer; font-size: 16px;">
                        Clear Cache & Try Again
                    </button>
                </div>
            `;
            return;
        }

        console.log(`Total movies loaded: ${totalMoviesLoaded}`);
        console.log('All genres loaded, setting up carousels...');
        this.setupCarousels();
        this.attachMovieClickListeners();
        console.log('Setup complete!');
    }

    createGenreList(genre, movies) {
        const genreTitle = genre.charAt(0).toUpperCase() + genre.slice(1);
        return `
            <div class="movie-list-container genre-${genre}">
                <h1 class="movie-list-title">${genreTitle.toUpperCase()} MOVIES</h1>
                <div class="movie-list-wrapper">
                    <i class="fas fa-chevron-left arrow arrow-left" style="left: 10px; right: auto;"></i>
                    <div class="movie-list">
                        ${movies.map(movie => movie.display()).join('')}
                    </div>
                    <i class="fas fa-chevron-right arrow arrow-right"></i>
                </div>
            </div>
        `;
    }

    setupCarousels() {
        const movieListWrappers = document.querySelectorAll(".movie-list-wrapper");

        movieListWrappers.forEach((wrapper) => {
            const movieList = wrapper.querySelector(".movie-list");
            const leftArrow = wrapper.querySelector(".arrow-left");
            const rightArrow = wrapper.querySelector(".arrow-right");
            let currentPosition = 0;
            
            const itemNumber = movieList.querySelectorAll(".movie-list-item").length;
            const itemWidth = 305; // 280px width + 25px gap
            
            // Update arrow visibility
            const updateArrows = () => {
                const containerWidth = wrapper.offsetWidth;
                const itemsVisible = Math.floor(containerWidth / itemWidth);
                const maxPosition = Math.max(0, itemNumber - itemsVisible);
                
                leftArrow.style.opacity = currentPosition > 0 ? '1' : '0.3';
                leftArrow.style.pointerEvents = currentPosition > 0 ? 'auto' : 'none';
                
                rightArrow.style.opacity = currentPosition < maxPosition ? '1' : '0.3';
                rightArrow.style.pointerEvents = currentPosition < maxPosition ? 'auto' : 'none';
            };
            
            // Right arrow click
            rightArrow.addEventListener("click", (e) => {
                e.stopPropagation();
                
                const containerWidth = wrapper.offsetWidth;
                const itemsVisible = Math.floor(containerWidth / itemWidth);
                const maxPosition = Math.max(0, itemNumber - itemsVisible);
                
                if (currentPosition < maxPosition) {
                    currentPosition += itemsVisible;
                    if (currentPosition > maxPosition) {
                        currentPosition = maxPosition;
                    }
                } else {
                    currentPosition = 0; // Loop back to start
                }
                
                const translateX = -currentPosition * itemWidth;
                movieList.style.transform = `translateX(${translateX}px)`;
                updateArrows();
            });
            
            // Left arrow click
            leftArrow.addEventListener("click", (e) => {
                e.stopPropagation();
                
                const containerWidth = wrapper.offsetWidth;
                const itemsVisible = Math.floor(containerWidth / itemWidth);
                
                if (currentPosition > 0) {
                    currentPosition -= itemsVisible;
                    if (currentPosition < 0) {
                        currentPosition = 0;
                    }
                }
                
                const translateX = -currentPosition * itemWidth;
                movieList.style.transform = `translateX(${translateX}px)`;
                updateArrows();
            });
            
            // Initial arrow state
            updateArrows();
            
            // Update on window resize
            let resizeTimeout;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    currentPosition = 0;
                    movieList.style.transform = 'translateX(0)';
                    updateArrows();
                }, 250);
            });
        });
    }

    attachMovieClickListeners() {
        document.querySelectorAll('.movie-list-item').forEach(item => {
            item.addEventListener('click', (e) => {
                if (!e.target.classList.contains('movie-list-item-button')) {
                    const imdbID = item.dataset.imdbId;
                    this.showMovieDetails(imdbID);
                }
            });
        });
    }

    async showMovieDetails(imdbID) {
        const movie = await OMDbService.getMovieDetails(imdbID);
        if (!movie) return;

        this.currentMovie = movie;
        const modal = document.getElementById('movieModal');
        
        // Populate modal
        document.getElementById('modalPoster').src = movie.poster;
        document.getElementById('modalTitle').textContent = movie.title;
        document.getElementById('modalYear').textContent = movie.year;
        document.getElementById('modalRuntime').textContent = movie.runtime;
        document.getElementById('modalRated').textContent = movie.rated;
        document.getElementById('modalImdbRating').textContent = movie.imdbRating;
        document.getElementById('modalGenre').textContent = movie.genre;
        document.getElementById('modalDirector').textContent = movie.director;
        document.getElementById('modalActors').textContent = movie.actors;
        document.getElementById('modalPlot').textContent = movie.plot;

        // Update buttons based on library status
        const inLibrary = this.user.library.find(m => m.imdbID === movie.imdbID);
        const addBtn = document.getElementById('modalAddToLibrary');
        const favBtn = document.getElementById('modalToggleFavorite');

        if (inLibrary) {
            addBtn.innerHTML = '<i class="fas fa-check"></i> In Library';
            addBtn.onclick = () => this.removeFromLibrary(movie.imdbID);
        } else {
            addBtn.innerHTML = '<i class="fas fa-plus"></i> Add to Library';
            addBtn.onclick = () => this.addToLibrary(movie);
        }

        const isFav = this.user.isFavorite(movie.imdbID);
        favBtn.innerHTML = isFav 
            ? '<i class="fas fa-heart"></i> Favorited' 
            : '<i class="far fa-heart"></i> Add to Favorites';
        favBtn.onclick = () => this.toggleFavorite(movie.imdbID);

        // Update rating
        this.updateModalRating(this.user.getRating(movie.imdbID));

        // Display review if exists
        const review = this.user.getReview(movie.imdbID);
        if (review) {
            document.getElementById('reviewText').value = review.text;
            document.getElementById('reviewDisplay').innerHTML = review.display();
        } else {
            document.getElementById('reviewText').value = '';
            document.getElementById('reviewDisplay').innerHTML = '';
        }

        modal.style.display = 'block';
    }

    closeModal() {
        document.getElementById('movieModal').style.display = 'none';
        this.currentMovie = null;
    }

    addToLibrary(movie) {
        if (this.user.addMovie(movie)) {
            this.showToast(`${movie.title} added to your library!`);
            this.updateStats();
            if (document.getElementById('movieModal').style.display === 'block') {
                document.getElementById('modalAddToLibrary').innerHTML = '<i class="fas fa-check"></i> In Library';
                document.getElementById('modalAddToLibrary').onclick = () => this.removeFromLibrary(movie.imdbID);
            }
        } else {
            this.showToast(`${movie.title} is already in your library.`);
        }
    }

    removeFromLibrary(imdbID) {
        const movie = this.user.library.find(m => m.imdbID === imdbID);
        if (movie) {
            this.user.removeMovie(imdbID);
            this.showToast(`${movie.title} removed from your library.`);
            this.updateStats();
            this.closeModal();
            if (this.currentView === 'library') {
                this.renderLibrary();
            }
        }
    }

    toggleFavorite(imdbID) {
        const isFav = this.user.toggleFavorite(imdbID);
        const favBtn = document.getElementById('modalToggleFavorite');
        favBtn.innerHTML = isFav 
            ? '<i class="fas fa-heart"></i> Favorited' 
            : '<i class="far fa-heart"></i> Add to Favorites';
        
        const movie = this.user.library.find(m => m.imdbID === imdbID);
        this.showToast(isFav ? `${movie.title} added to favorites!` : `${movie.title} removed from favorites.`);
        this.updateStats();
    }

    handleStarClick(rating) {
        if (this.currentMovie) {
            this.user.rateMovie(this.currentMovie.imdbID, rating);
            this.updateModalRating(rating);
            this.showToast(`Rated ${this.currentMovie.title} ${rating} stars!`);
            this.updateStats();
            console.log(`User rated ${this.currentMovie.title}: ${rating} stars`);
        }
    }

    handleStarHover(rating) {
        this.updateModalRating(rating);
    }

    resetStars() {
        if (this.currentMovie) {
            const userRating = this.user.getRating(this.currentMovie.imdbID);
            this.updateModalRating(userRating);
        }
    }

    updateModalRating(rating) {
        document.querySelectorAll('#modalStarRating i').forEach((star, index) => {
            if (index < rating) {
                star.classList.remove('far');
                star.classList.add('fas', 'active');
            } else {
                star.classList.remove('fas', 'active');
                star.classList.add('far');
            }
        });
    }

    handleReviewSubmit() {
        if (!this.currentMovie) return;

        const reviewText = document.getElementById('reviewText').value.trim();
        const rating = this.user.getRating(this.currentMovie.imdbID);

        if (!reviewText) {
            this.showToast('Please write a review!');
            return;
        }

        if (rating === 0) {
            this.showToast('Please rate the movie first!');
            return;
        }

        this.user.addReview(this.currentMovie.imdbID, reviewText, rating);
        const review = this.user.getReview(this.currentMovie.imdbID);
        document.getElementById('reviewDisplay').innerHTML = review.display();
        this.showToast('Review submitted successfully!');
    }

    handleNavigation(view) {
        this.currentView = view;

        // Hide all sections
        document.getElementById('searchSection').style.display = 'none';
        document.getElementById('featuredContent').style.display = 'none';
        document.getElementById('genreLists').style.display = 'none';
        document.getElementById('librarySection').style.display = 'none';
        document.getElementById('statsSection').style.display = 'none';

        // Update sidebar icons
        document.querySelectorAll('.left-menu-icon').forEach(icon => icon.classList.remove('active'));
        document.querySelector(`[data-nav="${view}"]`)?.classList.add('active');

        switch(view) {
            case 'home':
                document.getElementById('searchSection').style.display = 'block';
                document.getElementById('featuredContent').style.display = 'block';
                document.getElementById('genreLists').style.display = 'block';
                break;
            case 'library':
                document.getElementById('librarySection').style.display = 'block';
                this.renderLibrary();
                break;
            case 'favorites':
                document.getElementById('librarySection').style.display = 'block';
                this.renderFavorites();
                break;
            case 'watchlater':
                document.getElementById('librarySection').style.display = 'block';
                this.renderWatchLater();
                break;
            case 'stats':
                document.getElementById('statsSection').style.display = 'block';
                this.renderStatistics();
                break;
        }
    }

    handleCategoryClick(category) {
        document.querySelectorAll('.menu-list-item').forEach(item => item.classList.remove('active'));
        document.querySelector(`[data-category="${category}"]`).classList.add('active');

        if (category === 'home') {
            this.handleNavigation('home');
        } else {
            document.querySelector(`.genre-${category}`)?.scrollIntoView({ behavior: 'smooth' });
        }
    }

    renderLibrary() {
        const genreFilter = document.getElementById('genreFilter').value;
        const ratingFilter = document.getElementById('ratingFilter').value;
        const sortBy = document.getElementById('sortBy').value;

        let movies = this.user.filterLibrary(genreFilter, ratingFilter);
        movies = this.user.sortLibrary(movies, sortBy);

        const libraryGrid = document.getElementById('libraryGrid');
        
        if (movies.length === 0) {
            libraryGrid.innerHTML = '<p style="text-align: center; color: var(--text-secondary); grid-column: 1/-1;">Your library is empty. Start adding movies!</p>';
        } else {
            libraryGrid.innerHTML = movies.map(movie => {
                const rating = this.user.getRating(movie.imdbID);
                const stars = rating > 0 ? '⭐'.repeat(rating) : 'Not rated';
                return `
                    <div class="movie-list-item" data-imdb-id="${movie.imdbID}" style="width: 100%;">
                        <img class="movie-list-item-img" src="${movie.poster}" alt="${movie.title}">
                        <div class="movie-overlay">
                            <div class="movie-list-item-title">${movie.title}</div>
                            <div class="movie-list-item-meta">
                                <span class="movie-year">${movie.year}</span>
                                <span class="movie-rating">${stars}</span>
                            </div>
                            <p class="movie-list-item-desc">${movie.plot.substring(0, 80)}...</p>
                            <button class="movie-list-item-button">View Details</button>
                        </div>
                    </div>
                `;
            }).join('');
            this.attachMovieClickListeners();
        }
    }

    renderFavorites() {
        const favorites = this.user.getFavorites();
        const libraryGrid = document.getElementById('libraryGrid');
        document.querySelector('#librarySection .section-title').textContent = 'My Favorites';
        document.querySelector('.filter-controls').style.display = 'none';

        if (favorites.length === 0) {
            libraryGrid.innerHTML = '<p style="text-align: center; color: var(--text-secondary); grid-column: 1/-1;">You haven\'t added any favorites yet!</p>';
        } else {
            libraryGrid.innerHTML = favorites.map(movie => movie.display()).join('');
            this.attachMovieClickListeners();
        }
    }

    renderWatchLater() {
        const watchLater = this.user.getWatchLater();
        const libraryGrid = document.getElementById('libraryGrid');
        document.querySelector('#librarySection .section-title').textContent = 'Watch Later';
        document.querySelector('.filter-controls').style.display = 'none';

        if (watchLater.length === 0) {
            libraryGrid.innerHTML = '<p style="text-align: center; color: var(--text-secondary); grid-column: 1/-1;">Your watch later list is empty!</p>';
        } else {
            libraryGrid.innerHTML = watchLater.map(movie => movie.display()).join('');
            this.attachMovieClickListeners();
        }
    }

    renderStatistics() {
        const stats = this.user.getStatistics();
        
        document.getElementById('statTotal').textContent = stats.totalMovies;
        document.getElementById('statAvgRating').textContent = stats.avgRating;
        document.getElementById('statFavorites').textContent = stats.favorites;
        document.getElementById('statTopGenre').textContent = stats.topGenre;

        // Render genre chart
        const genreChart = document.getElementById('genreChart');
        const maxCount = Math.max(...Object.values(stats.genreCounts), 1);
        
        genreChart.innerHTML = Object.entries(stats.genreCounts)
            .sort((a, b) => b[1] - a[1])
            .map(([genre, count]) => {
                const percentage = (count / maxCount) * 100;
                return `
                    <div class="genre-bar">
                        <div class="genre-bar-label">${genre.charAt(0).toUpperCase() + genre.slice(1)}</div>
                        <div class="genre-bar-track">
                            <div class="genre-bar-fill" style="width: ${percentage}%">${count}</div>
                        </div>
                    </div>
                `;
            }).join('');
    }

    updateStats() {
        const stats = this.user.getStatistics();
        document.getElementById('totalMovies').textContent = stats.totalMovies;
        document.getElementById('avgRating').textContent = stats.avgRating;
    }

    toggleDarkMode() {
        const elements = document.querySelectorAll(
            ".container, .movie-list-title, .navbar-container, .sidebar, .left-menu-icon, .toggle"
        );
        
        elements.forEach((element) => {
            element.classList.toggle("active");
        });
        
        document.querySelector(".toggle-ball").classList.toggle("active");
    }

    showToast(message) {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    showWatchOptions() {
        if (!this.currentMovie) return;
        
        const modal = document.getElementById('watchOptionsModal');
        const titleEl = document.getElementById('watchMovieTitle');
        const linksContainer = document.getElementById('watchLinksContainer');
        
        titleEl.textContent = this.currentMovie.title;
        
        // Generate search query
        const searchQuery = encodeURIComponent(this.currentMovie.title);
        
        // Create watch links
        linksContainer.innerHTML = STREAMING_SITES.map(site => `
            <a href="${site.url}${searchQuery}" target="_blank" class="watch-link">
                <div class="watch-link-info">
                    <span class="watch-link-icon">${site.icon}</span>
                    <div class="watch-link-text">
                        <h4>${site.name}</h4>
                        <p>${site.description}</p>
                    </div>
                </div>
                <i class="fas fa-external-link-alt"></i>
            </a>
        `).join('');
        
        modal.style.display = 'flex';
    }

    closeWatchOptions() {
        document.getElementById('watchOptionsModal').style.display = 'none';
    }
}

// Start the app when page loads
let app;
document.addEventListener('DOMContentLoaded', () => {
    console.log('Page loaded, starting app...'); // debug
    try {
        app = new CineVaultApp();
        console.log('App initialized successfully!'); // debug
    } catch (error) {
        console.error('Error initializing app:', error);
    }
});
