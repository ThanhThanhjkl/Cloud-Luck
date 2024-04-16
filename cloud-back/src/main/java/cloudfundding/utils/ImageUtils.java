package cloudfundding.utils;

import java.util.Base64;

public class ImageUtils {
    public static byte[] extractImageData(String imageDataUrl) {
        // Tách dữ liệu base64 từ URL
        String base64Image = imageDataUrl.split(",")[1];
        // Chuyển đổi dữ liệu base64 thành mảng byte
        return Base64.getDecoder().decode(base64Image);
    }
}
