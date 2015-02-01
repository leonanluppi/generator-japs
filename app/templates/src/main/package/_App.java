package <%= packageName %>;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

@ApplicationPath("'" + <%= restService %> + "'")
public class App extends Application {

}
