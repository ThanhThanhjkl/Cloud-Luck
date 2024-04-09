package cloudfundding.controller;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ExcreptionController {
    @ExceptionHandler(NullPointerException.class)
    public String nullPointer(Exception ex) {
        ex.printStackTrace();
        return "null-pointer";
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public String illegaArgument(Exception ex) {
        ex.printStackTrace();
        return "illega-argument";
    }

    @ExceptionHandler(Exception.class)
    public String excreption(Exception ex) {
        ex.printStackTrace();
        return "excreption";
    }
}
