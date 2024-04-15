package cloudfundding.accountApplication.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class ExceptionController {
    private static final Logger logger = LoggerFactory.getLogger(ExceptionController.class);

    @ExceptionHandler(SQLIntegrityConstraintViolationException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public Map<String, String> conflicData(Exception ex) {
        logger.error("Conflict data: {}", ex.getMessage());
        Map<String, String> map = new HashMap<>();
        map.put("code", "409");
        map.put("error", "conflict data");

        return map;
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    @ResponseStatus(HttpStatus.METHOD_NOT_ALLOWED)
    public Map<String, String> methodNotSupportedException(Exception ex) {
        logger.error("Method not supported: {}", ex.getMessage());
        Map<String, String> response = new HashMap<>();
        response.put("code", "405");
        response.put("error", "Method not allowed");

        return response;
    }
}
