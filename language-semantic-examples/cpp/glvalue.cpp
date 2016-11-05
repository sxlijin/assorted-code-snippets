#include <iostream>

int main() {
    int x = 5, y = 5;

    (0 ? x : y) = 3;
    (1 ? x : y) = 7;

    std::cout << x << std::endl;
    std::cout << y << std::endl;
}
