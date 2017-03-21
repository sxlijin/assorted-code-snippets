#include <iostream>

#define TEMPLATIZE

#ifdef TEMPLATIZE
template <typename T> struct Animal
#else
                      struct Animal
#endif
{
    void printName() {
        std::cout << "printName() invoked" << std::endl;
    }

    virtual void saySomething() {
        std::cout << "Animal::saySomething()" << std::endl;
    }
};

#ifdef TEMPLATIZE
template <typename T> struct Dog : public Animal<T>
#else
                      struct Dog : public Animal
#endif
{
    virtual void saySomething() {
        std::cout << "Dog::saySomething(): ";
        printName();
    }
};

int main() {
#ifdef TEMPLATIZE
    Dog<int> d;
#else
    Dog d;
#endif
    d.saySomething();

    return 0;
}
