#include <iostream>

typedef char *ch_ptr;

using std::cout;
using std::endl;

class Foo {

public:
    explicit Foo() {
        std::cout << "Constructing instance of Foo" << std::endl;
    }

    explicit Foo(char *ptr) : m_ptr(ptr) {
        std::cout << "Constructing instance of Foo with pointer" << std::endl;
    }

    Foo &operator=(Foo &rhs) {
        std::cout << "Copy assignment of Foo" << std::endl;
        m_ptr = rhs.m_ptr;
    }

    char *&mine() {
        return m_ptr;
    }

private:
    char *m_ptr;

};

void method1(Foo obj) {
    cout << "Address of obj in method1 is " << &obj << endl;
}

void method2(Foo &obj) {
    cout << "Address of obj in method2 is " << &obj << endl;
}


int main(const int argc, const char **argv) {
    std::cout << "BEGIN argv" << std::endl;
    for (int i = 0; i < argc; i++) {
        cout << argv[i] << endl;
    }
    cout << "END argv" << endl;
    cout << endl;

    Foo foo;

    cout << "Address of foo is " << &foo << endl;
    method1(foo);
    cout << endl;

    cout << "Address of foo is " << &foo << endl;
    method2(foo);
    cout << endl;

    return 0;
}
    
