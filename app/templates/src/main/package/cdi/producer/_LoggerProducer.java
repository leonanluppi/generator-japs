package <%= packageName + '.producer' %>;

import javax.enterprise.inject.Produces;
import javax.enterprise.inject.spi.InjectionPoint;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class LoggerProducer {
    
    @Produces
    public Logger loggerProducer(InjectionPoint clazz) {
        return LoggerFactory.getLogger(clazz.getMember().getDeclaringClass().getName());
    }
}
