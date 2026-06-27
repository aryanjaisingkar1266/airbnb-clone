// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const filterBtns = document.querySelectorAll('.filter-btn');
const minPriceInput = document.getElementById('minPrice');
const maxPriceInput = document.getElementById('maxPrice');
const applyPriceBtn = document.getElementById('applyPrice');
const listingsGrid = document.getElementById('listingsGrid');
const favoriteBtns = document.querySelectorAll('.favorite-btn');
const bookBtns = document.querySelectorAll('.book-btn');
const modal = document.getElementById('bookingModal');
const closeModal = document.querySelector('.close');
const bookingForm = document.getElementById('bookingForm');

// Sample listings data (same as backend)
let listings = [
    {
        id: 1,
        title: "Modern Downtown Apartment",
        location: "New York, NY",
        price: 150,
        rating: 4.8,
        reviews: 124,
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400",
        amenities: ["WiFi", "Kitchen", "Air Conditioning"],
        guests: 4,
        bedrooms: 2,
        bathrooms: 1
    },
    {
        id: 2,
        title: "Cozy Beach House",
        location: "Malibu, CA",
        price: 350,
        rating: 4.9,
        reviews: 89,
        image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=400",
        amenities: ["WiFi", "Pool", "Beach Access", "Kitchen"],
        guests: 6,
        bedrooms: 3,
        bathrooms: 2
    },
    {
        id: 3,
        title: "Mountain Cabin Retreat",
        location: "Aspen, CO",
        price: 275,
        rating: 4.7,
        reviews: 56,
        image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400",
        amenities: ["Fireplace", "WiFi", "Kitchen", "Hot Tub"],
        guests: 4,
        bedrooms: 2,
        bathrooms: 1
    },
    {
        id: 4,
        title: "Urban Loft Studio",
        location: "San Francisco, CA",
        price: 180,
        rating: 4.6,
        reviews: 203,
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400",
        amenities: ["WiFi", "Gym", "Rooftop"],
        guests: 2,
        bedrooms: 1,
        bathrooms: 1
    },
    {
        id: 5,
        title: "Lakeside Villa",
        location: "Lake Tahoe, CA",
        price: 450,
        rating: 4.9,
        reviews: 78,
        image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400",
        amenities: ["Lake View", "WiFi", "Kitchen", "Dock", "BBQ"],
        guests: 8,
        bedrooms: 4,
        bathrooms: 3
    },
    {
        id: 6,
        title: "Historic Townhouse",
        location: "Boston, MA",
        price: 220,
        rating: 4.8,
        reviews: 145,
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400",
        amenities: ["WiFi", "Garden", "Fireplace", "Kitchen"],
        guests: 5,
        bedrooms: 3,
        bathrooms: 2
    }
];

// Current filter state
let currentFilter = 'all';
let currentSearch = '';
let currentMinPrice = 0;
let currentMaxPrice = Infinity;

// Search functionality
searchBtn.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performSearch();
});

function performSearch() {
    currentSearch = searchInput.value.toLowerCase();
    filterListings();
}

// Filter buttons
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        filterListings();
    });
});

// Price filter
applyPriceBtn.addEventListener('click', () => {
    currentMinPrice = parseFloat(minPriceInput.value) || 0;
    currentMaxPrice = parseFloat(maxPriceInput.value) || Infinity;
    filterListings();
});

// Filter listings
function filterListings() {
    const filtered = listings.filter(listing => {
        // Search filter
        const matchesSearch = currentSearch === '' || 
            listing.title.toLowerCase().includes(currentSearch) ||
            listing.location.toLowerCase().includes(currentSearch);
        
        // Category filter
        let matchesCategory = true;
        if (currentFilter !== 'all') {
            const titleLower = listing.title.toLowerCase();
            const locationLower = listing.location.toLowerCase();
            
            switch(currentFilter) {
                case 'beach':
                    matchesCategory = titleLower.includes('beach') || locationLower.includes('beach');
                    break;
                case 'mountain':
                    matchesCategory = titleLower.includes('mountain') || titleLower.includes('cabin') || locationLower.includes('mountain');
                    break;
                case 'urban':
                    matchesCategory = titleLower.includes('apartment') || titleLower.includes('loft') || titleLower.includes('studio') || locationLower.includes('new york') || locationLower.includes('san francisco') || locationLower.includes('boston');
                    break;
                case 'cabin':
                    matchesCategory = titleLower.includes('cabin') || titleLower.includes('retreat');
                    break;
            }
        }
        
        // Price filter
        const matchesPrice = listing.price >= currentMinPrice && listing.price <= currentMaxPrice;
        
        return matchesSearch && matchesCategory && matchesPrice;
    });
    
    renderListings(filtered);
}

// Render listings
function renderListings(listingsToRender) {
    listingsGrid.innerHTML = '';
    
    if (listingsToRender.length === 0) {
        listingsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 48px; color: #717171;">No listings found matching your criteria.</p>';
        return;
    }
    
    listingsToRender.forEach(listing => {
        const card = createListingCard(listing);
        listingsGrid.appendChild(card);
    });
    
    // Re-attach event listeners
    attachEventListeners();
}

// Create listing card
function createListingCard(listing) {
    const card = document.createElement('div');
    card.className = 'listing-card';
    card.dataset.id = listing.id;
    
    card.innerHTML = `
        <div class="listing-image">
            <img src="${listing.image}" alt="${listing.title}">
            <button class="favorite-btn">
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; fill: none; height: 24px; width: 24px; stroke: currentcolor; stroke-width: 2; overflow: visible;">
                    <path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z"></path>
                </svg>
            </button>
        </div>
        <div class="listing-info">
            <div class="listing-header">
                <h3 class="listing-title">${listing.title}</h3>
                <div class="listing-rating">
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; fill: currentcolor; height: 12px; width: 12px;">
                        <path d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.54 1.736l7.293 6.815-1.991 9.692a1 1 0 0 0 1.488 1.081L16 26.224l8.64 4.834a1 1 0 0 0 1.488-1.08l-1.991-9.692 7.293-6.816a1 1 0 0 0-.54-1.736l-9.86-1.27-4.125-8.885a1 1 0 0 0-1.798 0z"></path>
                    </svg>
                    <span>${listing.rating}</span>
                    <span class="reviews">(${listing.reviews})</span>
                </div>
            </div>
            <p class="listing-location">${listing.location}</p>
            <p class="listing-details">${listing.guests} guests · ${listing.bedrooms} bedrooms · ${listing.bathrooms} bathrooms</p>
            <div class="listing-amenities">
                ${listing.amenities.slice(0, 3).map(amenity => `<span class="amenity-tag">${amenity}</span>`).join('')}
            </div>
            <div class="listing-footer">
                <p class="listing-price">$${listing.price} <span class="per-night">/ night</span></p>
                <button class="book-btn" data-id="${listing.id}">Book Now</button>
            </div>
        </div>
    `;
    
    return card;
}

// Attach event listeners
function attachEventListeners() {
    // Favorite buttons
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            btn.classList.toggle('active');
        });
    });
    
    // Book buttons
    document.querySelectorAll('.book-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const listingId = parseInt(btn.dataset.id);
            openBookingModal(listingId);
        });
    });
}

// Open booking modal
function openBookingModal(listingId) {
    const listing = listings.find(l => l.id === listingId);
    if (!listing) return;
    
    document.getElementById('modalTitle').textContent = listing.title;
    document.getElementById('modalBody').innerHTML = `
        <p><strong>Location:</strong> ${listing.location}</p>
        <p><strong>Price:</strong> $${listing.price} / night</p>
        <p><strong>Rating:</strong> ${listing.rating} (${listing.reviews} reviews)</p>
        <p><strong>Capacity:</strong> ${listing.guests} guests</p>
        <p><strong>Amenities:</strong> ${listing.amenities.join(', ')}</p>
    `;
    
    modal.classList.add('show');
}

// Close modal
closeModal.addEventListener('click', () => {
    modal.classList.remove('show');
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
    }
});

// Handle booking form submission
bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const checkIn = document.getElementById('checkIn').value;
    const checkOut = document.getElementById('checkOut').value;
    const guests = document.getElementById('guests').value;
    
    if (checkIn && checkOut && guests) {
        alert(`Booking confirmed!\n\nCheck-in: ${checkIn}\nCheck-out: ${checkOut}\nGuests: ${guests}`);
        modal.classList.remove('show');
        bookingForm.reset();
    }
});

// Set minimum date for check-in to today
const today = new Date().toISOString().split('T')[0];
document.getElementById('checkIn').setAttribute('min', today);
document.getElementById('checkOut').setAttribute('min', today);

// Initialize
attachEventListeners();
