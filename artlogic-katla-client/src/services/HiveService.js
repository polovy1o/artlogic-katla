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

    addHive(hive) 
    {
        return null;
    }

    updateHive(hive) 
    {
        return null;
    }

    deleteHive(hiveId) 
    {
        return null;
    }

    setHiveStatus(hiveId, deletedStatus) 
    {
        return null;
    }
}

const hiveService = new HiveService()

export default hiveService