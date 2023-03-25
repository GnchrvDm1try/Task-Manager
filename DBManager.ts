export class DBManager {
    private static instance: DBManager;
    private constructor() {
    }

    public static getInstance(): DBManager {
        if (!DBManager.instance)
            DBManager.instance = new DBManager();
        return DBManager.instance;
    }

}