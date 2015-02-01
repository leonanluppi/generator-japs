package <%= packageName + ".repository" %>;

import java.lang.reflect.ParameterizedType;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

public class Repository<T> {

    @Inject
    private EntityManager em;
    private CriteriaBuilder criteriaBuilder;
    private CriteriaQuery<T> criteriaQuery;
    public Class<T> entity;

    @PostConstruct
    public void init() {
        criteriaBuilder = em.getCriteriaBuilder();
        getTypeClass();
    }

    protected List<T> fetch() {
        return em.createNamedQuery(entity.getSimpleName() + ".findAll", entity).getResultList();
    }

    protected T fetchById(Object id) {
        return em.find(entity, id);
    }

    protected List<T> fetchOrderBy(String field) {
        Root<T> root = criteriaQuery.from(entity);
        criteriaQuery.orderBy(criteriaBuilder.desc(root.get(field)));

        return em.createQuery(criteriaQuery).getResultList();
    }

    protected List<T> fetchBy(String field, Object value) {
        Root<T> root = criteriaQuery.from(entity);
        criteriaQuery.where(criteriaBuilder.equal(root.get(field), value));

        return em.createQuery(criteriaQuery).getResultList();
    }

    protected List<T> fetchBy(Map<String, Object> fieldsAndValues) {
        Root<T> root = criteriaQuery.from(entity);

        fieldsAndValues.forEach((field, value) -> {
            criteriaQuery.where(criteriaBuilder.equal(root.get(field), value));
        });

        return em.createQuery(criteriaQuery).getResultList();
    }

    protected void save(T entity) {
        em.persist(entity);
    }

    protected void update(T entity) {
        em.merge(entity);
    }

    protected void remove(T entity) {
        em.remove(entity);
    }

    @SuppressWarnings("unchecked")
    private void getTypeClass() {
        this.entity = (Class<T>) ((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[0];
    }
}
