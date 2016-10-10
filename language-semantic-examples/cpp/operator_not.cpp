#include <iostream>

using std::cout;
using std::endl;

struct Foo { operator !() { true; } };

int main() {
    Foo foo;

    bool boolFoo = !foo;

    //cout.setf(std::ios::boolalpha);
    cout << boolFoo << endl;
    cout << (true == boolFoo) << endl;

    return 0;
}
    
