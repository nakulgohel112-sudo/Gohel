const express = require('express');
const router = express.Router();

// External API endpoints
const JOKE_API_URL = 'https://v2.jokeapi.dev/joke';

/**
 * Fetch jokes from external JokeAPI
 * Supports categories: Any, General, Knock-Knock, Programming, Miscellaneous, Dark, Spooky, Christmas
 */
router.get('/', async (req, res) => {
  try {
    const category = req.query.category || 'any';
    
    // Map friendly category names to API categories
    const categoryMap = {
      'any': 'Any',
      'general': 'General',
      'knock-knock': 'Knock-Knock',
      'programming': 'Programming',
      'miscellaneous': 'Miscellaneous',
      'dark': 'Dark',
      'spooky': 'Spooky',
      'christmas': 'Christmas'
    };

    const apiCategory = categoryMap[category.toLowerCase()] || 'Any';
    const url = `${JOKE_API_URL}/${apiCategory}?type=single,twopart`;

    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      return res.status(400).json({ error: 'No joke found for this category' });
    }

    // Format response
    const joke = {
      setup: data.setup || null,
      delivery: data.delivery || null,
      joke: data.joke || null,
      value: data.value || null,
      category: data.category,
      type: data.type,
      id: data.id,
      safe: data.safe || false
    };

    res.json({ success: true, joke });
  } catch (error) {
    console.error('Joke API Error:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch joke',
      message: error.message 
    });
  }
});

/**
 * Get multiple jokes
 */
router.get('/multiple/:count', async (req, res) => {
  try {
    const count = Math.min(parseInt(req.params.count) || 1, 10); // Max 10
    const category = req.query.category || 'any';

    const categoryMap = {
      'any': 'Any',
      'general': 'General',
      'knock-knock': 'Knock-Knock',
      'programming': 'Programming'
    };

    const apiCategory = categoryMap[category.toLowerCase()] || 'Any';
    const url = `${JOKE_API_URL}/${apiCategory}?amount=${count}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      return res.status(400).json({ error: 'Failed to fetch jokes' });
    }

    const jokes = data.jokes.map(j => ({
      setup: j.setup || null,
      delivery: j.delivery || null,
      joke: j.joke || null,
      category: j.category,
      type: j.type,
      id: j.id
    }));

    res.json({ success: true, jokes, count: jokes.length });
  } catch (error) {
    console.error('Multiple Jokes API Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch jokes' });
  }
});

/**
 * Get joke by ID
 */
router.get('/id/:id', async (req, res) => {
  try {
    const url = `${JOKE_API_URL}/Any?idRange=${req.params.id}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.error || !data.jokes || data.jokes.length === 0) {
      return res.status(404).json({ error: 'Joke not found' });
    }

    const joke = data.jokes[0];
    res.json({ 
      success: true, 
      joke: {
        setup: joke.setup || null,
        delivery: joke.delivery || null,
        joke: joke.joke || null,
        category: joke.category,
        type: joke.type,
        id: joke.id
      }
    });
  } catch (error) {
    console.error('Joke by ID Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch joke' });
  }
});

/**
 * Search jokes by keyword
 */
router.get('/search/:keyword', async (req, res) => {
  try {
    const keyword = req.params.keyword;
    const url = `${JOKE_API_URL}/Any?contains=${encodeURIComponent(keyword)}`;
    
    const response = await fetch(url);
    const data = await response.json();

    if (data.error || !data.jokes) {
      return res.status(404).json({ error: `No jokes found containing "${keyword}"` });
    }

    const jokes = data.jokes.map(j => ({
      setup: j.setup || null,
      delivery: j.delivery || null,
      joke: j.joke || null,
      category: j.category,
      type: j.type,
      id: j.id
    }));

    res.json({ 
      success: true, 
      jokes, 
      count: jokes.length,
      keyword
    });
  } catch (error) {
    console.error('Search Error:', error.message);
    res.status(500).json({ error: 'Search failed' });
  }
});

module.exports = router;