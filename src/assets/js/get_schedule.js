export default async function get_schedule(date){
    // All API calls async
    const baseUrl = 'https://sph-s-api.olympics.com/summer/schedules/api/ENG/schedule/day/';
    const response = await fetch(`${baseUrl}${date}`);
    const results = await response.json();
    return results;
}