import java.util.Random;
import java.util.Scanner;

public class Main2 {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Random random = new Random();

        System.out.print("Введіть довжину чисел (кількість цифр): ");
        int length = scanner.nextInt();
        System.out.print("Введіть кількість чисел для генерації: ");
        int count = scanner.nextInt();

        System.out.println("\nЗгенеровані числа (як рядки):");
        for (int i = 0; i < count; i++) {
            String numberStr = generateRandomNumberString(length, random);
            System.out.println("  " + numberStr);
        }

        System.out.print("\nВведіть п’ятизначне натуральне число: ");
        String fiveDigit = scanner.next();

        if (!fiveDigit.matches("\\d{5}")) {
            System.out.println("Помилка: потрібно ввести рівно 5 цифр.");
        } else {
            String processed = processFiveDigit(fiveDigit);
            System.out.println("Вхідне число:  " + fiveDigit);
            System.out.println("Результат:     " + processed);
        }

        String text = """
                У 2026 році Java залишається популярною.
                Версія 21 була випущена у 2023 році.
                Код 12345 зустрічається в документації.
                """;

        System.out.println("\nТекст ДО обробки");
        System.out.println(text);

        int sumDigits = sumDigitsInText(text);

        System.out.println("Текст ПІСЛЯ обробки");
        System.out.println(text);

        System.out.println("Вхідні параметри для обробки тексту: відсутні");
        System.out.println("Сума всіх цифр у тексті: " + sumDigits);
    }

    private static String generateRandomNumberString(int length, Random random) {
        if (length <= 0) {
            return "";
        }
        StringBuilder sb = new StringBuilder();
        sb.append(random.nextInt(9) + 1);
        for (int i = 1; i < length; i++) {
            sb.append(random.nextInt(10));
        }
        return sb.toString();
    }

    private static String processFiveDigit(String s) {
        char[] chars = s.toCharArray();

        for (int i = 0; i < chars.length; i++) {
            int digit = chars[i] - '0';
            if (digit % 2 == 0) {
                digit = digit / 2;
                chars[i] = (char) ('0' + digit);
            }
        }

        char temp = chars[0];
        chars[0] = chars[1];
        chars[1] = temp;

        return new String(chars);
    }

    private static int sumDigitsInText(String text) {
        int sum = 0;
        for (char c : text.toCharArray()) {
            if (Character.isDigit(c)) {
                sum += c - '0';
            }
        }
        return sum;
    }
}