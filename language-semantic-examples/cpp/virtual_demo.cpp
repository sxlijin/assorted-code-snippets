#include <iostream>

struct Animal {
    virtual ~Animal() {}

    virtual void says() {
        std::cout << "generic" << std::endl;
    }

    void saysTwice() {
        says();
        says();
    }
};

struct Dog : public Animal {
    virtual ~Dog() {}

    virtual void says() {
        std::cout << "woof" << std::endl;
    }
};

int main() {
    Animal *a = new Animal();
    Animal *b = new Dog();

    a->says();
    b->says();

    std::cout << std::endl;

    a->saysTwice();
    b->saysTwice();

    std::cout << std::endl;

    Dog d;
    d.saysTwice();

    return 0;
}
