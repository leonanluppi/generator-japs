package <%= packageName + '.exception' %>;

public class RestfulException extends RuntimeException {

    private static final long serialVersionUID = 1L;
    private int statusCode;

    public RestfulException(int statusCode, String errorMessage) {
        super(errorMessage);
        this.statusCode = statusCode;
    }

    public RestfulException(int statusCode, Throwable cause, String errorMessage) {
        super(errorMessage);
        this.statusCode = statusCode;
    }

    public RestfulException(int statusCode, Throwable cause) {
        super(cause);
        this.statusCode = statusCode;
    }

    public int getStatusCode() {
        return statusCode;
    }
}
