package com.example.bankloan.util;

import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;

public class EMIUtils {
    public static BigDecimal calculateEmi(BigDecimal principal, BigDecimal annualRatePercent, int months) {
        if (principal == null || annualRatePercent == null || months <= 0) {
            return BigDecimal.ZERO;
        }
        MathContext mc = new MathContext(20, RoundingMode.HALF_UP);
        BigDecimal monthlyRate = annualRatePercent.divide(BigDecimal.valueOf(12 * 100.0), mc);
        BigDecimal onePlusRPowerN = (BigDecimal.ONE.add(monthlyRate, mc)).pow(months, mc);
        BigDecimal numerator = principal.multiply(monthlyRate, mc).multiply(onePlusRPowerN, mc);
        BigDecimal denominator = onePlusRPowerN.subtract(BigDecimal.ONE, mc);
        if (denominator.compareTo(BigDecimal.ZERO) == 0) return BigDecimal.ZERO;
        return numerator.divide(denominator, 2, RoundingMode.HALF_UP);
    }
}
