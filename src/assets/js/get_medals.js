export default async function get_medals() {
    // All API calls async
    const baseUrl = 'https://sph-c-api.olympics.com/summer/competition/api/ENG/medals';
    const response = await fetch(baseUrl);
    const results = await response.json();
    return results;
}