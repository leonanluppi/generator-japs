package <%= packageName + '.producer' %>;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.inject.Disposes;
import javax.enterprise.inject.Produces;
import javax.persistence.EntityManager;
import javax.persistence.Persistence;
import javax.persistence.PersistenceContext;

public class EntityProducer {

    @ApplicationScoped
    @Produces
    @PersistenceContext
    public EntityManager getEntityManager() {
        return Persistence.createEntityManagerFactory("<%= persistenceName %>").createEntityManager();
    }

    public void closeEntityManager(@Disposes EntityManager em) {
        em.close();
    }
}
