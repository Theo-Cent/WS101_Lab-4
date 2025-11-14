import java.util.Scanner;

void main() {
    Scanner scan = new Scanner(System.in);

    IO.println("Enter your name: ");
    String name = scan.nextLine();

    IO.println("Enter your age:");
    int age = scan.nextInt();

    IO.println("Hello " + name + ", you are " + age + " years old.");
}