// Change your config in GlobalApi.jsx to this if you ever use Google again:
const config = {
    headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY,
        'X-Goog-FieldMask': 'places.photos,places.displayName,places.id' // String format
    }
}