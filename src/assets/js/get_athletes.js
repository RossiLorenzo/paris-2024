export default async function get_athletes() {
    // All API calls async
    const baseUrl = 'https://olympics.com/OG2024/data/MIS_Athletes~comp=OG2024~lang=ENG~functionCategory=A.json';
    const response = await fetch(baseUrl);
    const results = await response.json();
    return results;
}