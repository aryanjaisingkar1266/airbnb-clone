# Airbnb Clone Dashboard

A modern Airbnb clone dashboard built with Python (Flask), HTML, CSS, and JavaScript.

## Features

- **Property Listings**: Browse through a curated list of properties with images, ratings, and details
- **Search Functionality**: Search listings by title or location
- **Category Filters**: Filter by property type (Beach, Mountain, Urban, Cabin)
- **Price Range Filter**: Set minimum and maximum price ranges
- **Booking System**: Interactive booking modal with date selection
- **Favorites**: Mark properties as favorites
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Tech Stack

- **Backend**: Python Flask
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with Airbnb-inspired design
- **Icons**: SVG icons

## Project Structure

```
airbnb-clone/
├── app.py                 # Flask application with routes and data
├── requirements.txt       # Python dependencies
├── templates/
│   └── dashboard.html    # Main dashboard template
└── static/
    ├── css/
    │   └── style.css     # Custom styling
    ├── js/
    │   └── script.js     # JavaScript functionality
    └── images/           # Image assets (if needed)
```

## Installation

1. Navigate to the project directory:
```bash
cd airbnb-clone
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

## Running the Application

Start the Flask development server:
```bash
python app.py
```

The application will be available at `http://localhost:5001`

## Usage

1. **Browse Listings**: View all available properties on the dashboard
2. **Search**: Use the search bar to find specific destinations
3. **Filter**: Click category buttons (All, Beach, Mountain, Urban, Cabin) to filter listings
4. **Price Filter**: Set min/max price and click "Apply" to filter by price
5. **Book**: Click "Book Now" on any listing to open the booking modal
6. **Favorites**: Click the heart icon to mark a property as favorite

## API Endpoints

- `GET /` - Main dashboard page
- `GET /api/listings` - Get all listings
- `GET /api/listings/<id>` - Get specific listing
- `POST /api/search` - Search listings (JSON body with query, min_price, max_price)

## Sample Data

The application includes 6 sample listings:
- Modern Downtown Apartment (New York)
- Cozy Beach House (Malibu)
- Mountain Cabin Retreat (Aspen)
- Urban Loft Studio (San Francisco)
- Lakeside Villa (Lake Tahoe)
- Historic Townhouse (Boston)

## Customization

- **Add Listings**: Edit the `listings` array in `app.py`
- **Modify Styling**: Update `static/css/style.css`
- **Change Functionality**: Modify `static/js/script.js`
- **Update Template**: Edit `templates/dashboard.html`

## Future Enhancements

- User authentication
- Database integration (SQLite/PostgreSQL)
- Payment integration
- User reviews and ratings
- Map integration
- Advanced search filters
- Admin dashboard
