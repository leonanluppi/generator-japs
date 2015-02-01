package <%= packageName + '.api' %>;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import com.google.gson.JsonObject;
import <%= packageName + '.service.HelloService' %>;

@Path("/")
@Produces("application/json")
public class HelloApi {

    @Inject
    HelloService helloService;

    @GET
    @Path("/hello")
    public String greeting(){
        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("res", helloService.greetName("XXXX"));
        return jsonObject.get("res").getAsString();
    }
}
