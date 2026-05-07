# Joke Generator API Documentation

## Overview
The Joke Generator API provides access to a collection of jokes from the JokeAPI v2. It supports multiple categories, types, and filtering options.

## Base URL
```
http://localhost:5000/api/jokes
```

## Endpoints

### 1. Get Random Joke
**Endpoint:** `GET /api/jokes`

**Query Parameters:**
- `category` (optional): Category of joke
  - `any` (default) - Mix of all categories
  - `general` - Family-friendly jokes
  - `knock-knock` - Knock-knock jokes
  - `programming` - Programming jokes
  - `miscellaneous` - Miscellaneous jokes
  - `dark` - Dark humor
  - `spooky` - Spooky jokes
  - `christmas` - Holiday jokes

**Example Request:**
```bash
GET /api/jokes?category=programming
```

**Example Response:**
```json
{
  "success": true,
  "joke": {
    "setup": "Why do Java developers wear glasses?",
    "delivery": "Because they need to see their object-oriented code!",
    "category": "Programming",
    "type": "twopart",
    "id": 123,
    "safe": true
  }
}
```

### 2. Get Multiple Jokes
**Endpoint:** `GET /api/jokes/multiple/:count`

**Path Parameters:**
- `count` - Number of jokes to fetch (max 10)

**Query Parameters:**
- `category` (optional) - Joke category

**Example Request:**
```bash
GET /api/jokes/multiple/5?category=general
```

**Example Response:**
```json
{
  "success": true,
  "jokes": [
    { "joke": "...", "category": "General", "type": "single" },
    { "setup": "...", "delivery": "...", "category": "General", "type": "twopart" }
  ],
  "count": 5
}
```

### 3. Get Joke by ID
**Endpoint:** `GET /api/jokes/id/:id`

**Path Parameters:**
- `id` - Joke ID number

**Example Request:**
```bash
GET /api/jokes/id/42
```

### 4. Search Jokes
**Endpoint:** `GET /api/jokes/search/:keyword`

**Path Parameters:**
- `keyword` - Search term

**Example Request:**
```bash
GET /api/jokes/search/programmer
```

**Example Response:**
```json
{
  "success": true,
  "jokes": [...],
  "count": 3,
  "keyword": "programmer"
}
```

## Joke Categories API

### Get All Categories
**Endpoint:** `GET /api/joke-categories`

**Response:**
```json
{
  "success": true,
  "categories": [
    {
      "id": "programming",
      "name": "Programming",
      "description": "Programming and tech jokes",
      "emoji": "💻",
      "color": "#00d4ff"
    }
  ]
}
```

### Get Single Category
**Endpoint:** `GET /api/joke-categories/:categoryId`

**Example Request:**
```bash
GET /api/joke-categories/programming
```

## Response Format

### Successful Response
```json
{
  "success": true,
  "joke": {
    "setup": "Question part",
    "delivery": "Answer/punchline",
    "joke": "Full joke (for single-part)",
    "category": "Programming",
    "type": "twopart" | "single",
    "id": 123,
    "safe": true
  }
}
```

### Error Response
```json
{
  "error": "Error message",
  "message": "Detailed error description"
}
```

## Joke Types

1. **Single** - One-liner jokes
2. **Two-part** - Setup and delivery structure

## Rate Limiting
- No rate limiting on local API
- JokeAPI v2 has fair use limits (typically 100-150 requests per hour)

## CORS Headers
- All endpoints support CORS
- Safe for frontend requests

## Error Codes

| Code | Meaning |
|------|----------|
| 200 | Success |
| 400 | Bad request / No joke found |
| 404 | Resource not found |
| 500 | Server error |

## Caching

For production use, consider implementing caching:
```javascript
// Example with Redis
const cached = await redis.get(`joke:${category}`);
if (cached) return JSON.parse(cached);
```

## Frontend Integration

### JavaScript Fetch Example
```javascript
async function getJoke(category = 'any') {
  const response = await fetch(`/api/jokes?category=${category}`);
  const data = await response.json();
  
  if (data.success) {
    console.log(data.joke);
  }
}
```

### React Example
```javascript
const [joke, setJoke] = useState(null);
const [loading, setLoading] = useState(false);

const fetchJoke = async (category = 'any') => {
  setLoading(true);
  try {
    const response = await fetch(`/api/jokes?category=${category}`);
    const data = await response.json();
    setJoke(data.joke);
  } catch (error) {
    console.error('Error fetching joke:', error);
  } finally {
    setLoading(false);
  }
};
```

## External API

This API uses [JokeAPI v2](https://jokeapi.dev/) as the backend:
- Free to use
- No authentication required
- Comprehensive joke database
- Multiple categories available

## Examples

### Get a Programming Joke
```bash
curl http://localhost:5000/api/jokes?category=programming
```

### Get 3 General Jokes
```bash
curl http://localhost:5000/api/jokes/multiple/3?category=general
```

### Search for "coffee" jokes
```bash
curl http://localhost:5000/api/jokes/search/coffee
```

## Changelog

### v1.0.0
- Initial release
- Single and multiple joke endpoints
- Category filtering
- Search functionality
- Category information API

## Support

For issues or feature requests related to jokes:
- Visit [JokeAPI Documentation](https://jokeapi.dev/)
- Check the frontend implementation in `public/joke-generator.html`

## License

Jokes are provided by JokeAPI v2 which uses the WTFPL license.
