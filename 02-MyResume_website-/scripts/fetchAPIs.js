require('dotenv').config();
const supabase = require('../config/supabase');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateSEOContent(apiName, description, category) {
    // Skip SEO generation if API key is not set or invalid
    if (!process.env.GEMINI_API_KEY) {
        console.log('Gemini API key not found, using fallback SEO content');
        return getFallbackSEO(apiName, description, category);
    }

    const prompt = `Generate SEO content for an API blog post about "${apiName}".
Description: ${description}
Category: ${category}

Provide:
1. SEO Title: (max 60 chars)
2. SEO Description: (max 160 chars)
3. Keywords: (comma separated, 5-7 keywords)
4. Tutorial: (short explanation of how to use the API, 200-300 words)
5. Example Code: (JavaScript fetch example)

Format as JSON:
{
  "seo_title": "...",
  "seo_description": "...",
  "keywords": "...",
  "tutorial": "...",
  "example_code": "..."
}`;

    try {
        // Try different models in order of preference
        const models = ['gemini-1.5-flash', 'gemini-pro', 'gemini-1.0-pro'];
        let result = null;
        let lastError = null;

        for (const modelName of models) {
            try {
                const model = genAI.getGenerativeModel({ model: modelName });
                result = await model.generateContent(prompt);
                break; // Success, exit loop
            } catch (error) {
                lastError = error;
                console.log(`Model ${modelName} failed, trying next...`);
                continue;
            }
        }

        if (!result) {
            throw lastError;
        }

        const response = await result.response;
        const text = response.text();
        // Clean the response to extract JSON
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        } else {
            throw new Error('No JSON found in response');
        }
    } catch (error) {
        console.error('Error generating SEO content:', error.message);
        return getFallbackSEO(apiName, description, category);
    }
}

function getFallbackSEO(apiName, description, category) {
    return {
        seo_title: `${apiName} API - Free ${category} API`,
        seo_description: `${description}. Learn how to use this free API for ${category} applications.`,
        keywords: `${apiName}, ${category}, API, free, REST, JSON`,
        tutorial: `The ${apiName} API provides ${description}. To get started, make HTTP requests to the endpoints provided. Check the official documentation at ${apiName} for detailed usage instructions.`,
        example_code: `// Example using ${apiName} API\nfetch('${apiName}')\n  .then(response => response.json())\n  .then(data => {\n    console.log('API Response:', data);\n  })\n  .catch(error => console.error('Error:', error));`
    };
}

async function fetchAndStoreAPIs() {
    try {
        console.log('Fetching APIs from public-apis.org...');

        // Always include these popular free APIs
        const fallbackAPIs = [
            {
                API: 'JSONPlaceholder',
                Description: 'Free fake API for testing and prototyping',
                Category: 'Development',
                Auth: '',
                HTTPS: true,
                Link: 'https://jsonplaceholder.typicode.com'
            },
            {
                API: 'Cat Facts',
                Description: 'Daily cat facts',
                Category: 'Animals',
                Auth: '',
                HTTPS: true,
                Link: 'https://catfact.ninja'
            },
            {
                API: 'Random User',
                Description: 'Generate random user data',
                Category: 'Test Data',
                Auth: '',
                HTTPS: true,
                Link: 'https://randomuser.me'
            },
            {
                API: 'OpenWeatherMap',
                Description: 'Weather data API',
                Category: 'Weather',
                Auth: 'apiKey',
                HTTPS: true,
                Link: 'https://openweathermap.org/api'
            },
            {
                API: 'REST Countries',
                Description: 'Get information about countries',
                Category: 'Geography',
                Auth: '',
                HTTPS: true,
                Link: 'https://restcountries.com'
            },
            {
                API: 'CoinGecko',
                Description: 'Cryptocurrency data',
                Category: 'Finance',
                Auth: '',
                HTTPS: true,
                Link: 'https://www.coingecko.com/en/api'
            },
            {
                API: 'The Movie Database',
                Description: 'Movie and TV show data',
                Category: 'Entertainment',
                Auth: 'apiKey',
                HTTPS: true,
                Link: 'https://www.themoviedb.org/documentation/api'
            },
            {
                API: 'NASA APOD',
                Description: 'Astronomy Picture of the Day',
                Category: 'Science',
                Auth: 'apiKey',
                HTTPS: true,
                Link: 'https://api.nasa.gov'
            }
        ];

        let apis = [...fallbackAPIs]; // Always start with fallback APIs

        try {
            const response = await fetch('https://api.publicapis.org/entries');
            const data = await response.json();
            if (data.entries && data.entries.length > 0) {
                // Add additional APIs from public-apis.org (limit to avoid duplicates)
                const additionalAPIs = data.entries.slice(0, 20).filter(api =>
                    !fallbackAPIs.some(fallback => fallback.API === api.API || fallback.Link === api.Link)
                );
                apis = [...fallbackAPIs, ...additionalAPIs];
                console.log(`Found ${additionalAPIs.length} additional APIs from public-apis.org`);
            }
        } catch (fetchError) {
            console.log('Using only fallback API list due to fetch error:', fetchError.message);
        }

        console.log(`Processing ${apis.length} APIs...`);

        let inserted = 0;
        let skipped = 0;

        for (const api of apis) {
            // Check if exists
            const { data: existing, error: checkError } = await supabase
                .from('api_blog')
                .select('id')
                .or(`name.eq.${api.API},link.eq.${api.Link}`)
                .single();

            if (existing) {
                skipped++;
                continue;
            }

            console.log(`Generating SEO for: ${api.API}`);
            // Generate SEO
            const seo = await generateSEOContent(api.API, api.Description, api.Category);

            // Insert
            const { error } = await supabase
                .from('api_blog')
                .insert({
                    name: api.API,
                    description: api.Description,
                    category: api.Category,
                    auth: api.Auth || '',
                    https: api.HTTPS || true,
                    link: api.Link,
                    seo_title: seo.seo_title,
                    seo_description: seo.seo_description,
                    keywords: seo.keywords,
                    tutorial: seo.tutorial,
                    example_code: seo.example_code
                });

            if (error) {
                console.error('Error inserting API:', api.API, error);
            } else {
                inserted++;
                console.log(`✅ Inserted: ${api.API}`);
            }
        }

        console.log(`Summary: ${inserted} inserted, ${skipped} skipped`);
    } catch (error) {
        console.error('Error in fetchAndStoreAPIs:', error);
    }
}

// Run if called directly
if (require.main === module) {
    fetchAndStoreAPIs();
}

module.exports = { fetchAndStoreAPIs };