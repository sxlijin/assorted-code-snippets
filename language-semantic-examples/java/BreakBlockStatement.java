class BreakBlockStatement {
    public static void main(String[] args) {
        System.out.println("Demonstration of using a break with a label in Java");
        System.out.println();

        System.out.println("An example with a simple for-loop:");
        printSep();

forLoop:
        for (int i = 0; i < 3; i++) {
            System.out.printf("Outer loop: %d\n", i);
            for (int j = 0; j < 3; j++) {
                System.out.printf("  Inner loop: %d\n", j);
                if (2 == i && 0 == j) break forLoop;
            }
        }

        printSep();
        System.out.println();

        System.out.println("A more interesting example using a nested scope:");
        printSep();

scopedBlock:
        {
            System.out.println("Inside a scoped block!");
            for (int k = 0; k < 3; k++) {
                System.out.printf("Looping: %d\n", k);
                if (2 == k) break scopedBlock;
            }
            System.out.println("I never get written to the console");
        }
        printSep();
    }

    static void printSep() {
        for (int i = 0; i++ < 80;) System.out.print("=");
        System.out.println();
    }
}
