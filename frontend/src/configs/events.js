import network from "./axiosParams";

export async function getAllEvents(userId) {
    const response = await network.get('calendar/' + userId + '/all/');
    return response;
}

export async function deleteEvent (userId, eventId){
    const response = await network.delete('calendar/' + userId + '/' + eventId + '/delete');
    return response;
}

export async function getEventByID(userId, eventId){
    const response = await network.get(`calendar/${userId}/${eventId}`);
    return response;
}

export async function updateEvent(userId, eventId, data){
    const response = await network.patch(`/calendar/${userId}/${eventId}/update`, data);
    return response;
}