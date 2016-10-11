#include <iostream>

using std::cout;
using std::endl;

class Foo {

public:

    explicit Foo(const char *ptr = '\0') : m_ptr(ptr) {
        cout << "Constructing instance of Foo with pointer" << endl;
    }

private:
    const char *m_ptr;

};

int main() {
    Foo foo;
    return 0;
}
    
