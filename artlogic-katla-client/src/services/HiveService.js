import axios from "axios";

class HiveService
{
    constructor()
    {
        this.instance = axios.create({
            timeout: 8000,
            baseURL: process.env.REACT_APP_SERVER_URL + '/api/hives/'
        })
    }

    getHives()
    {
        return this.instance.get('');
    }

    getHive(hiveId) 
    {
        return this.instance.get(hiveId);
    }

    getHiveSections(hiveId) 
    {
        return this.instance.get(hiveId + '/sections');
    }

    addHive(createRequest) 
    {
        return this.instance.post('', createRequest);
    }

    updateHive(hiveId, updateRequest) 
    {
        return this.instance.put('' + hiveId, updateRequest);
    }

    deleteHive(hiveId) 
    {
        return this.instance.delete('' + hiveId);
    }

    setHiveStatus(hiveId, deletedStatus) 
    {
        return this.instance.put(hiveId + '/status/' + deletedStatus);
    }
}

const hiveService = new HiveService()

export default hiveService