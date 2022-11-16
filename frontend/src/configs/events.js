import network from "./axiosParams";

export async function getAllEvents(userId) {
    const response = await network.get('calendar/' + userId + '/all/');
    return response;
}

export async function deleteEvent (userId, eventId){
    const response = await network.delete('calendar/' + userId + '/' + eventId + '/delete');
    return response;
}