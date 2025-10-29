package com.example.loan.service;

import java.time.Year;
import java.util.concurrent.ThreadLocalRandom;

public class IdUtil {
    public static String newPublicId() {
        int year = Year.now().getValue();
        int num = ThreadLocalRandom.current().nextInt(0, 1_000_000);
        return String.format("LA%d%06d", year, num);
    }
}
