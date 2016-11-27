#include <string>

template <typename T>
struct Foo {
    T *mPtr;

    Foo(T *ptr) : mPtr(ptr) {}

    T *operator->() const {
        return mPtr;
    }
};

int main() {
    std::string *s = new std::string("foobar");

    Foo<std::string> f(s);
    f->front();

    delete s;
}
