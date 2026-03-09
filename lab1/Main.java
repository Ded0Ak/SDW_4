package lab1;
import java.util.Random;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        System.out.println("Dev: Hrytsenok D.A.");

        Random random = new Random();
        int[][] A = new int[4][2];
        int min = -100, max = 100;

        for (int i = 0; i < A.length; i++) {
            for (int j = 0; j < A[i].length; j++) {
                A[i][j] = random.nextInt(max - min + 1) + min;
            }
        }

        Scanner scanner = new Scanner(System.in);

        System.out.print("Write number Y: ");
        int y = scanner.nextInt();

        scanner.close();

        int count = 0;
        for (int i = 0; i < 4; i++) {
            for (int j = 0; j < 2; j++) {
                if (A[i][j] < y) {
                    count++;
                }
            }
        }

        int[] B = new int[count];

        int index = 0;
        for (int i = 0; i < 4; i++) {
            for (int j = 0; j < 2; j++) {
                if (A[i][j] < y) {
                    B[index] = A[i][j];
                    index++;
                }
            }

        }

        int product = 1;

        for (int i = 0; i < B.length; i++) {
            product *= B[i];
        }


        System.out.println("Arr A:");
        for (int i = 0; i < A.length; i++) {
            for (int j = 0; j < A[i].length; j++) {
                System.out.printf("%6d", A[i][j]); 
            }
            System.out.println();
        }

        System.out.print("Arr B: ");
        for (int i = 0; i < B.length; i++) {
            System.out.print(B[i] + " ");
        }
        System.out.println();
        
        if (B.length == 0) {
            System.out.println("There are no elements smaller than Y.");
        } else {
            System.out.println("Product of elements: " + product);
        }
    }
}