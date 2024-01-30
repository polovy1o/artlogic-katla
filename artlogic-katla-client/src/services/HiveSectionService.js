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

    setHiveSectionStatus(hiveSectionId, deletedStatus) {
        return null;
    }
}

const hiveSectionService = new HiveSectionService()

export default hiveSectionService