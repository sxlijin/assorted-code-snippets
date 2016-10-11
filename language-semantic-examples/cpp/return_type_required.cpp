// on Linux GCC complains
// on Windows neither MSYS nor MinGW complain, even with -Wall

foo() { return true; }

int main() {
    foo();
    return 0;
}
