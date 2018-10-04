//if (${PACKAGE_NAME} && ${PACKAGE_NAME} != "")package ${PACKAGE_NAME};#end
        //parse("File Header.java")


public class Database {
    private static Database ourInstance;
    private ArrayList userList;
    private ArrayList passList;

    public static Database getInstance() {
        if (this.ourInstance != null) {
            return ourInstance
        }
        return ourInstance = new Database();
    }

    private Database() {
        userList = new ArrayList();
        passList = new ArrayList();
    }
}
