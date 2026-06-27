from flask import Flask, render_template, jsonify, request
import json

app = Flask(__name__)

# Sample data for listings
listings = [
    {
        "id": 1,
        "title": "Modern Downtown Apartment",
        "location": "New York, NY",
        "price": 150,
        "rating": 4.8,
        "reviews": 124,
        "image": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400",
        "amenities": ["WiFi", "Kitchen", "Air Conditioning"],
        "guests": 4,
        "bedrooms": 2,
        "bathrooms": 1
    },
    {
        "id": 2,
        "title": "Cozy Beach House",
        "location": "Malibu, CA",
        "price": 350,
        "rating": 4.9,
        "reviews": 89,
        "image": "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=400",
        "amenities": ["WiFi", "Pool", "Beach Access", "Kitchen"],
        "guests": 6,
        "bedrooms": 3,
        "bathrooms": 2
    },
    {
        "id": 3,
        "title": "Mountain Cabin Retreat",
        "location": "Aspen, CO",
        "price": 275,
        "rating": 4.7,
        "reviews": 56,
        "image": "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400",
        "amenities": ["Fireplace", "WiFi", "Kitchen", "Hot Tub"],
        "guests": 4,
        "bedrooms": 2,
        "bathrooms": 1
    },
    {
        "id": 4,
        "title": "Urban Loft Studio",
        "location": "San Francisco, CA",
        "price": 180,
        "rating": 4.6,
        "reviews": 203,
        "image": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400",
        "amenities": ["WiFi", "Gym", "Rooftop"],
        "guests": 2,
        "bedrooms": 1,
        "bathrooms": 1
    },
    {
        "id": 5,
        "title": "Lakeside Villa",
        "location": "Lake Tahoe, CA",
        "price": 450,
        "rating": 4.9,
        "reviews": 78,
        "image": "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400",
        "amenities": ["Lake View", "WiFi", "Kitchen", "Dock", "BBQ"],
        "guests": 8,
        "bedrooms": 4,
        "bathrooms": 3
    },
    {
        "id": 6,
        "title": "Historic Townhouse",
        "location": "Boston, MA",
        "price": 220,
        "rating": 4.8,
        "reviews": 145,
        "image": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400",
        "amenities": ["WiFi", "Garden", "Fireplace", "Kitchen"],
        "guests": 5,
        "bedrooms": 3,
        "bathrooms": 2
    }
]

@app.route('/')
def dashboard():
    return render_template('dashboard.html', listings=listings)

@app.route('/api/listings')
def get_listings():
    return jsonify(listings)

@app.route('/api/listings/<int:listing_id>')
def get_listing(listing_id):
    listing = next((l for l in listings if l['id'] == listing_id), None)
    if listing:
        return jsonify(listing)
    return jsonify({"error": "Listing not found"}), 404

@app.route('/api/search', methods=['POST'])
def search_listings():
    data = request.json
    query = data.get('query', '').lower()
    min_price = data.get('min_price', 0)
    max_price = data.get('max_price', float('inf'))
    
    filtered = [
        l for l in listings 
        if (query in l['title'].lower() or query in l['location'].lower())
        and min_price <= l['price'] <= max_price
    ]
    return jsonify(filtered)

if __name__ == '__main__':
    app.run(debug=True, port=5001)
