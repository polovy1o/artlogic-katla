import axios from "axios";

class HiveSectionService {
    constructor() {
        this.instance = axios.create({
            timeout: 8000,
            baseURL: process.env.REACT_APP_SERVER_URL + '/api/sections/'
        })
    }

    getHiveSections() {
        return this.instance.get('');
    }

    getHiveSection(hiveSectionId) {
        return this.instance.get('' + hiveSectionId);
    }

    addHiveSection(createRequest) 
    {
        return this.instance.post('', createRequest);
    }

    updateHiveSection(hiveSectionId, updateRequest) 
    {
        return this.instance.put('' + hiveSectionId, updateRequest);
    }

    deleteHiveSection(hiveSectionId) 
    {
        return this.instance.delete('' + hiveSectionId);
    }

    setHiveSectionStatus(hiveSectionId, deletedStatus) {
        return this.instance.put(hiveSectionId + '/status/' + deletedStatus);
    }
}

const hiveSectionService = new HiveSectionService()

export default hiveSectionService