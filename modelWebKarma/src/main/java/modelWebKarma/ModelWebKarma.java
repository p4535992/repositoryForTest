package modelWebKarma;

import java.sql.Statement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

/**
 * Created by 4535992 on 18/11/2015.
 */
public class ModelWebKarma {

    private static final String PREFIX_KM = "@prefix rr: <http://www.w3.org/ns/r2rml#> .";
    private static final String PREFIX_R2RML ="@prefix km-dev: <http://isi.edu/integration/karma/dev#> .";
    private static final String KM = "km-dev:";

    private Connection conn;
    private String nameOfTable;
    private String sourceName;
    private String modelPublicationTime;
    private String modelVersion;


    public ModelWebKarma(Connection conn, String nameOfTable, String sourceName,
                         String modelPublicationTime,String modelVersion ) throws SQLException {
        this.conn = conn;
        this.nameOfTable = nameOfTable;
        this.sourceName = sourceName;
        this.modelPublicationTime = modelPublicationTime;
        this.modelVersion = modelVersion;

    }


    private String builder() throws SQLException {
        StringBuilder sb = new StringBuilder();
        Statement st = conn.createStatement();
        ResultSet rs = st.executeQuery("SELECT * FROM "+nameOfTable+"");
        ResultSetMetaData rsMetaData = rs.getMetaData();

        sb.append("_:node19pn5vcthx1 a km-dev:R2RMLMapping ;\n");



        int numberOfColumns = rsMetaData.getColumnCount();
        for(int k =0; k < numberOfColumns; k++){
            rsMetaData.getColumnName(k);
        }
    }

    private String cn(String columnName){
        return "[{\\\"columnName\\\":\\\""+columnName+"\\\"}]"
    }
}
